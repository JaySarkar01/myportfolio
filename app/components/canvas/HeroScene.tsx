"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

const AbstractObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    // Base rotation + interactive pointer tracking
    const targetX = time * 0.2 + (state.pointer.y * 0.5);
    const targetY = time * 0.3 + (state.pointer.x * 0.5);
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 0]} />
        <meshPhysicalMaterial
          color="#000000"
          emissive="#7000ff"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={true}
        />
      </mesh>
      
      {/* Inner solid geometry for contrast */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshPhysicalMaterial
          color="#030305"
          roughness={0.4}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 100 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));
    }
  }, [particlesPosition]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const targetY = time * 0.05 + (state.pointer.x * 0.2);
    const targetX = time * 0.02 + (state.pointer.y * 0.2);
    
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetY, 0.05);
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetX, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.05}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-[#030305]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#7000ff" />
        <Environment preset="city" />
        
        <AbstractObject />
        <Particles count={300} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={["#030305", 5, 20]} />
      </Canvas>
    </div>
  );
};
