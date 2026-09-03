"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A single refined beam of light passing through the scene, rendered as
 * a thin additive-blended cylinder with a soft pulsing glow. Intended to
 * read as "laser energy" without literal sci-fi effects (no lens flares,
 * no cartoon zaps).
 */
export function LaserBeam({
  color = "#7FDBD4",
  length = 6,
  radius = 0.012,
  rotation = [0, 0, Math.PI / 5] as [number, number, number],
}: {
  color?: string;
  length?: number;
  radius?: number;
  rotation?: [number, number, number];
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const glowRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = 0.75 + Math.sin(t * 1.4) * 0.2;
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = pulse;
    }
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = pulse * 0.35;
    }
  });

  return (
    <group rotation={rotation}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[radius, radius, length, 16, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={glowRef}>
        <cylinderGeometry args={[radius * 6, radius * 6, length, 16, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
