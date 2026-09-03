"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import {
  MAX_PHOTOS_PER_SUBMISSION,
  MAX_PHOTO_SIZE_BYTES,
  validatePhoto,
} from "@/lib/storage/photoValidation";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

export function PhotoUploadField({
  files,
  onChange,
  className,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  className?: string;
}) {
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previews = React.useMemo(
    () => files.map((f) => ({ file: f, url: URL.createObjectURL(f) })),
    [files]
  );

  React.useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setError(null);
    const incomingArray = Array.from(incoming);

    if (files.length + incomingArray.length > MAX_PHOTOS_PER_SUBMISSION) {
      setError(`You can attach up to ${MAX_PHOTOS_PER_SUBMISSION} photos.`);
      return;
    }

    for (const file of incomingArray) {
      const err = validatePhoto(file);
      if (err === "invalid_type") {
        setError("Photos must be JPEG, PNG, WEBP, or HEIC.");
        return;
      }
      if (err === "too_large") {
        setError(`Each photo must be under ${MAX_PHOTO_SIZE_BYTES / (1024 * 1024)}MB.`);
        return;
      }
    }

    onChange([...files, ...incomingArray]);
    trackEvent(ANALYTICS_EVENTS.PHOTO_UPLOADED, { count: incomingArray.length });
  };

  return (
    <div className={className}>
      <div className="rounded-sm border border-champagne-300/70 bg-champagne-50 p-4 text-xs text-charcoal-100">
        Photos are used only to help us understand your inquiry and prepare
        for your consultation. They are stored securely and are never
        published without your permission.
      </div>

      <div
        className="mt-4 flex flex-col items-center justify-center gap-3 rounded-sm border-2 border-dashed border-champagne-400 px-6 py-10 text-center transition-colors hover:border-taupe-300"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <ImagePlus className="h-7 w-7 text-taupe-300" aria-hidden="true" />
        <p className="text-sm text-charcoal-100">
          Drag photos here, or{" "}
          <button
            type="button"
            className="font-semibold text-charcoal-500 underline underline-offset-2"
            onClick={() => inputRef.current?.click()}
          >
            browse your device
          </button>
        </p>
        <p className="text-xs text-taupe-300">
          JPEG, PNG, WEBP, or HEIC · up to {MAX_PHOTOS_PER_SUBMISSION} photos
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic"
          multiple
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
          aria-label="Upload photos"
        />
      </div>

      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      {previews.length > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {previews.map((p, i) => (
            <div
              key={p.url}
              className="group relative aspect-square overflow-hidden rounded-sm border border-champagne-300/70"
            >
              <Image
                src={p.url}
                alt={`Uploaded photo ${i + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => onChange(files.filter((_, idx) => idx !== i))}
                className={cn(
                  "absolute right-1 top-1 rounded-full bg-obsidian/70 p-1 text-ivory-100 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                )}
                aria-label={`Remove photo ${i + 1}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
