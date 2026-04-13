"use client";

import { useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import type { Group } from "three";
import { Color } from "three";

const orbConfigs = [
  { position: [-1.8, 1.1, -0.6], scale: 0.75, color: "#b8ff6f" },
  { position: [1.2, 0.45, -0.8], scale: 1.15, color: "#4ad6ff" },
  { position: [0.4, -1.2, -0.4], scale: 0.95, color: "#ff7d7d" },
];

function FloatingCluster({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<Group | null>(null);

  useFrame((state) => {
    if (!ref.current || reducedMotion) {
      return;
    }

    ref.current.rotation.y = state.clock.elapsedTime * 0.16;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <group ref={ref}>
      {orbConfigs.map((orb) => (
        <mesh
          key={orb.color}
          position={orb.position as [number, number, number]}
          scale={orb.scale}
        >
          <icosahedronGeometry args={[1, 8]} />
          <meshStandardMaterial
            color={new Color(orb.color)}
            emissive={new Color(orb.color)}
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.35}
            wireframe
          />
        </mesh>
      ))}
      <mesh rotation={[0.3, 0.2, 0]}>
        <torusGeometry args={[2.15, 0.04, 16, 160]} />
        <meshStandardMaterial color="#ffffff" opacity={0.18} transparent />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[36px] border border-[color:var(--panel-border)] bg-[radial-gradient(circle_at_top,var(--hero-rim),transparent_34%),linear-gradient(145deg,var(--hero-top),var(--hero-bottom))] shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,255,111,0.07),transparent_28%,rgba(74,214,255,0.12)_58%,transparent_90%)]" />
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <color attach="background" args={["#04050a"]} />
        <ambientLight intensity={0.45} />
        <directionalLight intensity={1.1} position={[3, 4, 5]} color="#aef96b" />
        <pointLight intensity={1.3} position={[-4, -3, 4]} color="#51d8ff" />
        <FloatingCluster reducedMotion={Boolean(prefersReducedMotion)} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-[28px] border border-[color:var(--panel-border)] bg-[color:var(--hero-panel-bg)] p-4 backdrop-blur-md">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
          Live identity layer
        </p>
        <p className="mt-2 text-sm text-[color:var(--text-soft)]">
          Motion-led UI, tactical structure, and atmospheric 3D used only where it earns
          attention.
        </p>
      </div>
    </div>
  );
}
