import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function ModelDebug() {
  useEffect(() => {
    // Try loading the model directly with Three.js
    const loader = new GLTFLoader();
    loader.load(
      '/models/robot.glb',
      (gltf) => {
        console.log('Model loaded successfully:', gltf);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }, []);

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>3D Model Debug</h2>
      <p>Check the console for model loading information.</p>
    </div>
  );
}
