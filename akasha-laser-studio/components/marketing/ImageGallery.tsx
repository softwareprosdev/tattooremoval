"use client";

import * as React from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-sm bg-champagne-100"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActiveIndex(null)}
        title={active?.caption ?? "Image"}
      >
        {active ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-sm">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="90vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
