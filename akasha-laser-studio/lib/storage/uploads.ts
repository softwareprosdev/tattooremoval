import { getSupabaseServerClient } from "@/lib/database/supabase";
import {
  ALLOWED_PHOTO_TYPES,
  MAX_PHOTOS_PER_SUBMISSION,
  MAX_PHOTO_SIZE_BYTES,
  validatePhoto,
} from "@/lib/storage/photoValidation";

const BUCKET = "lead-photos";

export type UploadResult =
  | { ok: true; urls: string[] }
  | { ok: false; reason: "not_configured" | "upload_failed"; error?: unknown };

/**
 * Uploads consultation/contact photo attachments to a private Supabase
 * Storage bucket and returns signed URLs for internal (staff) viewing.
 * These images may depict sensitive body areas, so the bucket must be
 * configured as private with signed-URL access only — never public.
 * Server-only module (imports the service-role Supabase client) —
 * never import this from a client component; use
 * lib/storage/photoValidation.ts there instead.
 *
 * Degrades gracefully (ok:false, reason:"not_configured") when Supabase
 * isn't wired up yet, so form submissions without a backend configured
 * still succeed for the rest of the payload.
 */
export async function uploadLeadPhotos(
  files: File[],
  leadFolderId: string
): Promise<UploadResult> {
  const client = getSupabaseServerClient();
  if (!client) {
    return { ok: false, reason: "not_configured" };
  }

  try {
    const urls: string[] = [];
    for (const [index, file] of files.entries()) {
      const extension = file.name.split(".").pop() ?? "jpg";
      const path = `${leadFolderId}/${Date.now()}-${index}.${extension}`;
      const arrayBuffer = await file.arrayBuffer();

      const { error: uploadError } = await client.storage
        .from(BUCKET)
        .upload(path, arrayBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        return { ok: false, reason: "upload_failed", error: uploadError };
      }

      // 7-day signed URL — long enough for staff to review during
      // consultation prep, short enough not to leak indefinitely.
      const { data: signed, error: signError } = await client.storage
        .from(BUCKET)
        .createSignedUrl(path, 60 * 60 * 24 * 7);

      if (signError || !signed) {
        return { ok: false, reason: "upload_failed", error: signError };
      }

      urls.push(signed.signedUrl);
    }

    return { ok: true, urls };
  } catch (error) {
    return { ok: false, reason: "upload_failed", error };
  }
}

export {
  ALLOWED_PHOTO_TYPES,
  MAX_PHOTOS_PER_SUBMISSION,
  MAX_PHOTO_SIZE_BYTES,
  validatePhoto,
};
