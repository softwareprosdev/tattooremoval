/** Lightweight WebGL capability detection, used to decide whether to
 * mount any React Three Fiber scene or fall back to static artwork. */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Plain (non-hook) helper — intentionally not named with a `use` prefix
 * despite reading a browser API, since it holds no React hook calls
 * internally and is called imperatively from inside effects/callbacks.
 */
export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
