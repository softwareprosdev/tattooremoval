import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import {
  ALLOWED_PHOTO_TYPES,
  MAX_PHOTOS_PER_SUBMISSION,
  MAX_PHOTO_SIZE_BYTES,
  uploadLeadPhotos,
  validatePhoto,
} from "@/lib/storage/uploads";
import { createLead } from "@/lib/database/leads";
import {
  sendLeadConfirmationEmail,
  sendLeadNotificationEmail,
} from "@/lib/email/resend";
import type { LeadRecord } from "@/lib/validation/lead";

type SubmissionInput = Omit<
  LeadRecord,
  "photo_urls" | "status" | "source"
> & {
  source: string;
};

/**
 * Shared pipeline for both /api/consultation and /api/contact: rate
 * limit -> Turnstile verification -> photo upload -> persist lead ->
 * notify. Every external dependency (Supabase, Resend, Turnstile)
 * degrades gracefully rather than failing the whole request, since a
 * missing integration shouldn't block a real client's submission — the
 * important thing is the lead is captured wherever possible and staff
 * are notified when email is configured.
 */
export async function handleLeadSubmission({
  request,
  turnstileToken,
  photos,
  lead,
}: {
  request: Request;
  turnstileToken: string;
  photos: File[];
  lead: SubmissionInput;
}): Promise<NextResponse> {
  const ip = getClientIp(request.headers);
  const { allowed } = rateLimit(`lead:${ip}`, { limit: 5, windowMs: 60_000 });

  if (!allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many requests. Please wait a moment before trying again.",
      },
      { status: 429 }
    );
  }

  const verification = await verifyTurnstileToken(turnstileToken, ip);
  if (!verification.ok) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please refresh and try again." },
      { status: 400 }
    );
  }

  if (photos.length > MAX_PHOTOS_PER_SUBMISSION) {
    return NextResponse.json(
      { ok: false, error: `You can attach up to ${MAX_PHOTOS_PER_SUBMISSION} photos.` },
      { status: 400 }
    );
  }

  for (const photo of photos) {
    const error = validatePhoto(photo);
    if (error === "invalid_type") {
      return NextResponse.json(
        { ok: false, error: "Photos must be JPEG, PNG, WEBP, or HEIC." },
        { status: 400 }
      );
    }
    if (error === "too_large") {
      return NextResponse.json(
        {
          ok: false,
          error: `Each photo must be under ${MAX_PHOTO_SIZE_BYTES / (1024 * 1024)}MB.`,
        },
        { status: 400 }
      );
    }
  }

  let photoUrls: string[] = [];
  if (photos.length > 0) {
    const leadFolderId = crypto.randomUUID();
    const uploadResult = await uploadLeadPhotos(photos, leadFolderId);
    if (uploadResult.ok) {
      photoUrls = uploadResult.urls;
    }
    // If storage isn't configured or the upload fails, we intentionally
    // continue without photos rather than blocking the whole submission.
  }

  const fullLead: LeadRecord = {
    ...lead,
    photo_urls: photoUrls,
    status: "NEW",
  };

  const result = await createLead(fullLead);

  // Fire-and-forget notification + confirmation emails; a slow or failed
  // email provider should never delay the response the visitor sees.
  void sendLeadNotificationEmail(fullLead);
  void sendLeadConfirmationEmail(fullLead);

  return NextResponse.json({
    ok: true,
    leadId: result.ok ? result.id : undefined,
    persisted: result.ok,
  });
}

export { ALLOWED_PHOTO_TYPES };
