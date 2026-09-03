"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A single refined beam of light passing through the scene, rendered as
 * a thin additive-blended cylinder with a soft pulsing glow. Intended to
 * read as "laser energy" without literal sci-fi effects (no lens flares,
 * no cartoon zaps).
 *
 * Two optional touches keep it from reading as a static decorative line:
 * `sweep` slowly slides the whole beam sideways, like a treatment pass,
 * and `hotspot` (on by default) travels a bright point along its length.
 */
export function LaserBeam({
  color = "#7FDBD4",
  length = 6,
  radius = 0.012,
  rotation = [0, 0, Math.PI / 5] as [number, number, number],
  sweep = 0,
  sweepSpeed = 0.12,
  hotspot = true,
  animate = true,
}: {
  color?: string;
  length?: number;
  radius?: number;
  rotation?: [number, number, number];
  /** Sideways travel distance, perpendicular to the beam. 0 = static. */
  sweep?: number;
  sweepSpeed?: number;
  hotspot?: boolean;
  animate?: boolean;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const meshRef = React.useRef<THREE.Mesh>(null);
  const glowRef = React.useRef<THREE.Mesh>(null);
  const hotspotRef = React.useRef<THREE.Mesh>(null);
  const hotspotGlowRef = React.useRef<THREE.Mesh>(null);

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

    if (animate && groupRef.current && sweep > 0) {
      groupRef.current.position.x = Math.sin(t * sweepSpeed) * sweep;
    }

    if (animate && hotspot && hotspotRef.current && hotspotGlowRef.current) {
      const travel = (Math.sin(t * 0.5) * 0.5 + 0.5) * length - length / 2;
      hotspotRef.current.position.y = travel;
      hotspotGlowRef.current.position.y = travel;
      const flicker = 0.85 + Math.sin(t * 3.1) * 0.15;
      (hotspotRef.current.material as THREE.MeshBasicMaterial).opacity = flicker;
    }
  });

  return (
    <group ref={groupRef} rotation={rotation}>
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
      {hotspot ? (
        <>
          <mesh ref={hotspotGlowRef}>
            <sphereGeometry args={[radius * 30, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh ref={hotspotRef}>
            <sphereGeometry args={[radius * 11, 16, 16]} />
            <meshBasicMaterial
              color="#FFFFFF"
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </>
      ) : null}
    </group>
  );
}
