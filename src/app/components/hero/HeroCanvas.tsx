"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

import GiftModel from "./GiftModel";

export default function HeroCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0.4, 5]}
        fov={34}
      />

      {/* Ambient */}

      <ambientLight intensity={1.6} />

      {/* Main */}

      <directionalLight
        castShadow
        intensity={4}
        position={[4, 6, 5]}
      />

      {/* Rim */}

      <directionalLight
        intensity={2}
        position={[-4, 2, -4]}
        color="#ffe8b0"
      />

      <Environment preset="city" />

      <Float
        speed={2}
        rotationIntensity={0.35}
        floatIntensity={1}
      >
        <GiftModel />
      </Float>

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.35}
        blur={3}
        scale={7}
      />

      <EffectComposer>

        <Bloom
          intensity={0.45}
          luminanceThreshold={0.55}
          mipmapBlur
        />

      </EffectComposer>

    </Canvas>
  );
}
