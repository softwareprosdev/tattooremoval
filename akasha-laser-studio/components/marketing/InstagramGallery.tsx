"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/config/business";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/events";

export type InstagramPost = {
  imageSrc: string;
  alt: string;
  postUrl?: string;
};

/**
 * Manual gallery of Instagram content rather than a scraping integration.
 * Pass real post images via `posts` once supplied by the business;
 * renders an elegant empty state until then.
 */
export function InstagramGallery({ posts = [] }: { posts?: InstagramPost[] }) {
  return (
    <div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {posts.map((post, i) => (
            <a
              key={post.imageSrc + i}
              href={post.postUrl ?? business.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm bg-champagne-100"
            >
              <Image
                src={post.imageSrc}
                alt={post.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-obsidian/0 transition-colors duration-300 group-hover:bg-obsidian/30">
                <Instagram className="h-6 w-6 text-ivory-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-champagne-400 bg-champagne-50 px-8 py-16 text-center">
          <Instagram className="h-8 w-8 text-taupe-300" aria-hidden="true" />
          <p className="prose-body max-w-sm">
            Follow along for treatment education, studio updates, and
            real-time looks inside Akasha Laser Studio.
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button
          href={business.social.instagram.url}
          external
          variant="secondary"
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.INSTAGRAM_CLICKED, {
              source: "instagram_gallery",
            })
          }
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Follow {business.social.instagram.handle}
        </Button>
      </div>
    </div>
  );
}
