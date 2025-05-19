import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Robot = React.forwardRef((props, ref) => {
  const groupRef = useRef();
  const headRef = useRef();
  
  // Expose the refs via the forwarded ref
  React.useImperativeHandle(ref, () => ({
    headRef,
    groupRef
  }));
  
  // Subtle idle animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Subtle breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
    
    // Head movement
    if (headRef.current && props.headRotation) {
      headRef.current.rotation.x += (props.headRotation[0] - headRef.current.rotation.x) * 0.1;
      headRef.current.rotation.y += (props.headRotation[1] - headRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]}>
        <capsuleGeometry args={[0.5, 1.2, 8, 16]} />
        <meshStandardMaterial color="black" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Head */}
      <group ref={headRef} position={[0, 1.7, 0]}>
        <mesh>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshStandardMaterial color="black" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
      </group>
      
      {/* Arms */}
      <mesh position={[-0.7, 0.7, 0]}>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="black" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.7, 0.7, 0]}>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="black" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.3, -0.8, 0]}>
        <capsuleGeometry args={[0.18, 1.2, 8, 16]} />
        <meshStandardMaterial color="black" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.3, -0.8, 0]}>
        <capsuleGeometry args={[0.18, 1.2, 8, 16]} />
        <meshStandardMaterial color="black" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Chest reactor */}
      <mesh position={[0, 0.6, 0.4]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#0affff" emissive="#0affff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
});

Robot.displayName = 'Robot';

export { Robot };
