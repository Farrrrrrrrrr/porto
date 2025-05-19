import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A simple robot-like shape to use as fallback
export function FallbackRobot() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Robot head */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#915EFF" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Robot eyes */}
      <mesh position={[0.15, 0.65, 0.26]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.15, 0.65, 0.26]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Robot body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.7, 0.6, 0.4]} />
        <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Robot arms */}
      <mesh position={[0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default FallbackRobot;
