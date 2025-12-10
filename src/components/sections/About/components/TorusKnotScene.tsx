"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow position={[0, 0.5, 0]}>
      <torusKnotGeometry args={[1, 0.3, 64, 16]} />
      <meshStandardMaterial
        color="#171717"
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <circleGeometry args={[15, 128]} />
      <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
    </mesh>
  );
}

function MovingSpotlight({ color, initialAngle, speed }: {
  color: string;
  initialAngle: number;
  speed: number;
}) {
  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.elapsedTime * speed + initialAngle;
      lightRef.current.position.x = Math.cos(time) * 4;
      lightRef.current.position.z = Math.sin(time) * 4;
    }
  });

  return (
    <spotLight
      ref={lightRef}
      color={color}
      intensity={50}
      position={[4, 5, 0]}
      angle={0.5}
      penumbra={0.5}
      decay={2}
      castShadow
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
    />
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />

      <MovingSpotlight color="#ffffff" initialAngle={0} speed={0.5} />
      <MovingSpotlight color="#a3a3a3" initialAngle={Math.PI} speed={0.3} />

      <TorusKnot />
      <Ground />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />
    </>
  );
}

export function TorusKnotScene() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden bg-muted cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        shadows
        gl={{
          antialias: true,
          powerPreference: "default"
        }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
