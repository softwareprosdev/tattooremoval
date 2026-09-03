"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { WebGLFallback } from "@/components/3d/WebGLFallback";
import { isWebGLAvailable, getPrefersReducedMotion } from "@/lib/webgl";

const LaserHero = dynamic(() => import("@/components/3d/LaserHero"), {
  ssr: false,
  loading: () => null,
});
const InkParticles = dynamic(() => import("@/components/3d/InkParticles"), {
  ssr: false,
  loading: () => null,
});
const PMUVisualization = dynamic(
  () => import("@/components/3d/PMUVisualization"),
  { ssr: false, loading: () => null }
);

const SCENES = {
  hero: LaserHero,
  ink: InkParticles,
  pmu: PMUVisualization,
} as const;

export type Scene3DKind = keyof typeof SCENES;

/**
 * Universal entry point for every 3D visualization on the site.
 *
 * - Never runs on the server (dynamic import, ssr:false) so it can never
 *   block the initial HTML paint.
 * - Detects WebGL support and prefers-reduced-motion on mount; renders
 *   the elegant static fallback artwork instead of mounting a Canvas
 *   when either is unavailable/preferred.
 * - Particle counts inside each scene are already reduced when
 *   `reducedMotion` is true, kept for browsers that support WebGL but
 *   whose user prefers less motion.
 */
export function Scene3D({
  kind,
  className,
}: {
  kind: Scene3DKind;
  className?: string;
}) {
  const [ready, setReady] = React.useState(false);
  const [supported, setSupported] = React.useState(true);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    setSupported(isWebGLAvailable());
    setReducedMotion(getPrefersReducedMotion());
    setReady(true);
  }, []);

  if (!ready) {
    return <WebGLFallback variant={kind} className={className} />;
  }

  if (!supported) {
    return <WebGLFallback variant={kind} className={className} />;
  }

  const SceneComponent = SCENES[kind];

  return (
    <div className={className}>
      <React.Suspense
        fallback={<WebGLFallback variant={kind} className="h-full w-full" />}
      >
        <SceneComponent reducedMotion={reducedMotion} />
      </React.Suspense>
    </div>
  );
}
