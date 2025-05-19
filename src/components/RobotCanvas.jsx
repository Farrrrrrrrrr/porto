"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import dynamic from 'next/dynamic';

// Dynamically import Robot3D to avoid SSR issues
const Robot3D = dynamic(() => import('./Robot3D/Robot3D').then(mod => mod.default), {
  ssr: false
});

export function RobotCanvas() {
  // Use state to track if component is mounted (client-side)
  const [mounted, setMounted] = useState(false);

  // Only render the canvas after component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on server-side
  }

  return (
    <div style={{ 
      position: 'fixed',
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 10
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['transparent']} />
        <Suspense fallback={null}>
          <Robot3D />
          <Environment preset="night" intensity={0.3} />
          <ambientLight intensity={1.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={2} 
            castShadow 
            color="#ffffff"
          />
          <spotLight
            position={[0, 5, 10]}
            angle={0.3}
            penumbra={1}
            intensity={3}
            castShadow
            color="#ffffff"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RobotCanvas;
