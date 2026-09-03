/**
 * Pure, dependency-free photo validation rules shared between the
 * client (instant feedback before upload) and the server (source of
 * truth). Deliberately has no import of the Supabase client so it's
 * safe to bundle into client components without pulling in
 * server-only secrets.
 */

export const ALLOWED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
] as const;

export const MAX_PHOTO_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
export const MAX_PHOTOS_PER_SUBMISSION = 6;

export type PhotoValidationError =
  | "invalid_type"
  | "too_large"
  | "too_many_files";

export function validatePhoto(file: File): PhotoValidationError | null {
  if (
    !ALLOWED_PHOTO_TYPES.includes(
      file.type as (typeof ALLOWED_PHOTO_TYPES)[number]
    )
  ) {
    return "invalid_type";
  }
  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    return "too_large";
  }
  return null;
}
