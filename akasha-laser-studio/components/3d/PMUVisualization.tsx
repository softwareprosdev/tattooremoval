"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleField } from "@/components/3d/ParticleField";

/**
 * Educational visualization of unwanted cosmetic pigment gradually
 * softening/fading — a slow, gentle particle dispersion in a warm
 * pigment tone. Illustrative only; not a representation of a guaranteed
 * clinical outcome or timeline.
 */
function PigmentFade({ reduced }: { reduced: boolean }) {
  const [dispersion, setDispersion] = React.useState(0.15);
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.getElapsedTime();
    const cycle = (Math.sin((t / 10) * Math.PI * 2) + 1) / 2;
    setDispersion(0.1 + cycle * 0.6);
    if (groupRef.current) groupRef.current.rotation.z = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <ParticleField
        count={reduced ? 140 : 420}
        radius={1.6}
        color="#8B7F6E"
        size={0.024}
        speed={reduced ? 0 : 0.1}
        dispersion={reduced ? 0.3 : dispersion}
      />
      <ParticleField
        count={reduced ? 60 : 180}
        radius={1.2}
        color="#D9C7A6"
        size={0.018}
        speed={reduced ? 0 : 0.14}
        dispersion={reduced ? 0.3 : dispersion}
      />
    </group>
  );
}

export default function PMUVisualization({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <ambientLight intensity={0.6} />
      <PigmentFade reduced={reducedMotion} />
    </Canvas>
  );
}
