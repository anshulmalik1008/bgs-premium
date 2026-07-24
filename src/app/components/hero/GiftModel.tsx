"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GiftModelProps = {
  modelPath?: string;
  scale?: number;
  position?: [number, number, number];
};

export default function GiftModel({
  modelPath = "/models/gift-box.glb",
  scale = 1.6,
  position = [0, -0.65, 0],
}: GiftModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(modelPath);

  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if (!material) return;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = 1.4;
          material.roughness = Math.min(material.roughness, 0.55);
          material.metalness = Math.max(material.metalness, 0.05);
          material.needsUpdate = true;
        }

        if (material instanceof THREE.MeshPhysicalMaterial) {
          material.envMapIntensity = 1.5;
          material.clearcoat = Math.max(material.clearcoat, 0.15);
          material.clearcoatRoughness = Math.min(
            material.clearcoatRoughness,
            0.35
          );
          material.needsUpdate = true;
        }
      });
    });
  }, [clonedScene]);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) return;

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    const targetRotationY = pointerX * 0.4;
    const targetRotationX = -pointerY * 0.18;

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      targetRotationX,
      0.05
    );

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      targetRotationY,
      0.05
    );

    group.rotation.y += delta * 0.12;

    const floatingY = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.08;

    group.position.y = THREE.MathUtils.lerp(
      group.position.y,
      floatingY,
      0.08
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      dispose={null}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload("/models/gift-box.glb");