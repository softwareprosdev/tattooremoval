"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * GPU-light instanced particle field. Used as the shared building block
 * for the hero laser visualization, the tattoo-fade demonstration, and
 * the PMU pigment-fade demonstration. Particle count is kept modest and
 * is halved automatically on touch/coarse-pointer devices via the
 * `mobileCount` prop passed from the parent scene.
 */
export function ParticleField({
  count = 400,
  radius = 2.4,
  color = "#7FDBD4",
  size = 0.03,
  speed = 0.15,
  dispersion = 0,
}: {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
  speed?: number;
  /** 0 = tightly packed, 1 = fully dispersed. Drives fade/disperse animations. */
  dispersion?: number;
}) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const dispersionRef = React.useRef(dispersion);
  dispersionRef.current = dispersion;

  const { positions, basePositions, phases } = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      const z = r * Math.cos(phi) * 0.6;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, basePositions, phases };
  }, [count, radius]);

  useFrame((state) => {
    const geometry = pointsRef.current?.geometry;
    if (!geometry) return;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = state.clock.getElapsedTime();
    const d = dispersionRef.current;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3] ?? 0;
      const by = basePositions[i * 3 + 1] ?? 0;
      const bz = basePositions[i * 3 + 2] ?? 0;
      const phase = phases[i] ?? 0;

      const drift = Math.sin(t * speed + phase) * 0.15;
      const disperseAmount = d * (2 + (phase % 2));

      posAttr.setXYZ(
        i,
        bx + drift * 0.4 + bx * disperseAmount * 0.6,
        by + Math.cos(t * speed * 0.8 + phase) * 0.12 + by * disperseAmount * 0.6,
        bz + drift * 0.3 + bz * disperseAmount * 0.6
      );
    }
    posAttr.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
