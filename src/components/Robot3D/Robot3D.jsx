"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Assuming you have your robot model in the public directory
const ROBOT_PATH = "/models/robot.glb";

export function Robot3D() {
  const robotRef = useRef();
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Load the robot model
  let scene;
  
  try {
    // Try to load the model and handle any potential errors
    const result = useGLTF(ROBOT_PATH);
    scene = result.scene;
    
    useEffect(() => {
      if (scene) {
        // Apply materials to make the robot visible on dark background
        scene.traverse((child) => {
          if (child.isMesh) {
            // Add emissive property to make parts glow slightly
            if (child.material) {
              child.material = new THREE.MeshStandardMaterial({
                ...child.material,
                emissive: new THREE.Color(0x444444),
                emissiveIntensity: 0.2,
                metalness: 0.8,
                roughness: 0.2,
              });
              child.castShadow = true;
              child.receiveShadow = true;
            }
          }
        });
        
        setModelLoaded(true);
        console.log("Robot model loaded successfully");
      }
    }, [scene]);
  } catch (error) {
    console.error("Error loading robot model:", error);
    // Use a simple placeholder geometry if model fails to load
    scene = new THREE.Group();
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x915eff,
      emissive: 0x333333
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }
  
  // Handle mouse movement to update target position
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert screen coordinates to normalized device coordinates (-1 to +1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Limit the movement range
      const limitedX = Math.max(-1.5, Math.min(1.5, x * 3));
      const limitedY = Math.max(-1, Math.min(1, y * 2));
      
      setTargetPosition({ x: limitedX, y: limitedY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Smoothly animate the robot to follow cursor position
  useFrame((state, delta) => {
    if (robotRef.current) {
      // Smooth interpolation towards target
      robotRef.current.position.x += (targetPosition.x - robotRef.current.position.x) * 2 * delta;
      robotRef.current.position.y += (targetPosition.y - robotRef.current.position.y) * 2 * delta;
      
      // Make the robot slightly rotate based on cursor position
      robotRef.current.rotation.z = -targetPosition.x * 0.2;
      robotRef.current.rotation.x = -targetPosition.y * 0.2;
      
      // Add subtle floating animation
      robotRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
    }
  });
  
  if (!scene) {
    return null;
  }
  
  return (
    <group>
      <primitive 
        object={scene} 
        ref={robotRef}
        position={[0, 0, 0]}
        scale={0.5}
        castShadow
        receiveShadow
      />
    </group>
  );
}

export default Robot3D;
