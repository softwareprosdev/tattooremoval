"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { ParticleField } from "@/components/3d/ParticleField";
import { LaserBeam } from "@/components/3d/LaserBeam";

function GlassOrb() {
  const meshRef = React.useRef<THREE.Mesh>(null);

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.15, 4]} />
        <meshPhysicalMaterial
          color="#EFE4D2"
          transparent
          opacity={0.18}
          roughness={0.05}
          metalness={0.1}
          transmission={0.9}
          thickness={1.2}
          ior={1.4}
          clearcoat={1}
        />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial
          color="#7FDBD4"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={30} color="#A8F0E8" />
      <pointLight position={[-3, -2, -2]} intensity={18} color="#E8DCC8" />

      <GlassOrb />

      <LaserBeam
        color="#7FDBD4"
        rotation={[0, 0, Math.PI / 7]}
        length={7.5}
        radius={0.01}
        sweep={reduced ? 0 : 0.9}
        sweepSpeed={0.11}
        hotspot={!reduced}
        animate={!reduced}
      />

      <ParticleField
        count={reduced ? 120 : 320}
        radius={2.6}
        color="#7FDBD4"
        size={0.025}
        speed={reduced ? 0 : 0.15}
      />
    </>
  );
}

/**
 * The primary hero visualization: a soft luminous beam passing through a
 * dark environment around a translucent glass form. This component
 * assumes WebGL support has already been confirmed by its caller
 * (components/3d/index.tsx) — it does not re-check.
 */
export default function LaserHero({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <Scene reduced={reducedMotion} />
    </Canvas>
  );
}
