import { NextResponse } from "next/server";
import { consultationSchema } from "@/lib/validation/lead";
import { handleLeadSubmission } from "@/lib/api/handleLeadSubmission";

export const runtime = "nodejs";

/**
 * Accepts multipart/form-data: a JSON "payload" field (validated with
 * consultationSchema) plus zero or more "photos" files. Using
 * multipart rather than JSON lets the consultation wizard submit its
 * optional photo-upload step in the same request as the rest of the
 * form.
 */
export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form submission." },
      { status: 400 }
    );
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") {
    return NextResponse.json(
      { ok: false, error: "Missing form payload." },
      { status: 400 }
    );
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawPayload);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed form payload." },
      { status: 400 }
    );
  }

  const parsed = consultationSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form for errors.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot — silently accept without persisting to avoid tipping off bots.
  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true, leadId: undefined, persisted: false });
  }

  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File);
  const v = parsed.data;

  return handleLeadSubmission({
    request,
    turnstileToken: v.turnstileToken,
    photos,
    lead: {
      first_name: v.firstName,
      last_name: v.lastName,
      email: v.email,
      phone: v.phone,
      service: v.service,
      location: v.location || null,
      tattoo_size: v.approximateSize || null,
      tattoo_colors: v.colors || null,
      tattoo_age: v.approximateAge || null,
      previous_treatments: v.previousTreatments || null,
      desired_outcome: v.desiredOutcome || null,
      preferred_date: v.preferredDate || null,
      preferred_time: v.preferredTime || null,
      message: v.message || null,
      source: "book_consultation_wizard",
      utm_source: v.utmSource || null,
      utm_medium: v.utmMedium || null,
      utm_campaign: v.utmCampaign || null,
    },
  });
}
