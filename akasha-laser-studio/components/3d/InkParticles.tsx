"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleField } from "@/components/3d/ParticleField";

/**
 * Educational visualization of the "Fade → Treat → Heal → Repeat →
 * Reveal" concept: a dense, ink-like particle cluster gradually
 * disperses and lightens across a slow, looping cycle. This is a
 * conceptual illustration only — it does not represent a guaranteed or
 * literal clinical timeline or outcome (communicated in the surrounding
 * page copy, not just here).
 */
function InkCycle({ reduced }: { reduced: boolean }) {
  const [dispersion, setDispersion] = React.useState(0);
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.getElapsedTime();
    // 12s loop: 0 -> 1 -> 0, an ease-like pulse via cosine remap.
    const cycle = (Math.cos((t / 12) * Math.PI * 2) + 1) / 2;
    setDispersion(1 - cycle);
    if (groupRef.current) groupRef.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      <ParticleField
        count={reduced ? 150 : 500}
        radius={1.8}
        color="#2B2925"
        size={0.028}
        speed={reduced ? 0 : 0.12}
        dispersion={reduced ? 0.4 : dispersion}
      />
      <ParticleField
        count={reduced ? 60 : 200}
        radius={1.4}
        color="#7FDBD4"
        size={0.02}
        speed={reduced ? 0 : 0.18}
        dispersion={reduced ? 0.4 : dispersion}
      />
    </group>
  );
}

export default function InkParticles({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <ambientLight intensity={0.6} />
      <InkCycle reduced={reducedMotion} />
    </Canvas>
  );
}
