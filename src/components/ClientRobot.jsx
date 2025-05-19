"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function ClientRobot() {
  const [hover, setHover] = useState(false);
  const svgRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const originalY2Values = useRef([8, 16, 19, 27, 31]); // Store the original values
  const mousePosition = useRef({ x: 0, y: 0 }); // Store current mouse position
  const lastMousePosition = useRef({ x: 0, y: 0 }); // Store last mouse position for speed calculation
  
  // Track mouse position for head/eye following
  const handleMouseMove = (event) => {
    // Calculate mouse position relative to window center
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    mousePosition.current = { 
      x: (event.clientX / windowWidth) * 2 - 1, // -1 to +1 range
      y: (event.clientY / windowHeight) * 2 - 1 // -1 to +1 range
    };
  };
  
  // Animation function
  const animate = () => {
    if (!svgRef.current) return;
    
    const time = Date.now() - startTimeRef.current;
    const hoverY = Math.sin(time * 0.001) * 15; // Increased vertical hover amplitude
    
    // Apply animation transforms - just vertical hover, rotation comes from mouse
    svgRef.current.style.transform = `translateY(${hoverY}px) scale(1.5)`;
    
    // Get mouse position for head/eye tracking
    const mouseX = mousePosition.current.x;
    const mouseY = mousePosition.current.y;
    
    // Find head and eyes elements
    const robotHead = svgRef.current.querySelector('#robot-head');
    const leftEye = svgRef.current.querySelector('#left-eye');
    const rightEye = svgRef.current.querySelector('#right-eye');
    const visor = svgRef.current.querySelector('#visor');
    
    // Apply more natural head rotation based on mouse position
    if (robotHead) {
      // Create more realistic head movement with damping effect
      // Less movement when cursor is near center, more at edges
      const headTurnCurve = x => Math.sign(x) * Math.pow(Math.abs(x), 1.5); // Non-linear response curve
      
      // Apply easing to make movements smoother and more natural
      const headRotationX = Math.min(15, Math.max(-15, headTurnCurve(mouseY) * 15)); // Limit vertical tilt
      const headRotationY = Math.min(20, Math.max(-20, headTurnCurve(mouseX) * 20)); // Limit horizontal turn
      
      // Apply more realistic transform order - first pitch (X), then yaw (Y)
      robotHead.style.transform = `rotateX(${headRotationX}deg) rotateY(${headRotationY}deg)`;
      robotHead.style.transformOrigin = '50% 30%'; // Move pivot point more natural spot (lower in the head)
      
      // Add subtle head bob to make it more lifelike
      const headBob = Math.sin(time * 0.002) * 3;
      robotHead.style.marginTop = `${headBob}px`;
      
      // Subtle head tilt/roll based on horizontal movement (feels more organic)
      const subtleRoll = -mouseX * 3; // Small roll in opposite direction of turn
      robotHead.style.transform += ` rotateZ(${subtleRoll}deg)`;
    }
    
    // Eye movements - match eye direction with head movement but with tighter focus
    if (leftEye && rightEye) {
      // Blink eyes occasionally
      if (Math.sin(time * 0.002) > 0.97) {
        leftEye.setAttribute('ry', '1');
        rightEye.setAttribute('ry', '1');
      } else {
        // Default eye shape
        leftEye.setAttribute('ry', '7');
        rightEye.setAttribute('ry', '7');
        
        // More realistic eye movement - eyes move less than head but stay focused
        // Eyes move in same direction but smaller amount when head turns
        const eyeMovementScale = 3 + Math.abs(mouseX) * 4; // Eyes move more when head turns more
        const eyeX = mouseX * eyeMovementScale;
        const eyeY = mouseY * eyeMovementScale;
        
        leftEye.setAttribute('cx', 130 + eyeX);
        leftEye.setAttribute('cy', 75 + eyeY);
        rightEye.setAttribute('cx', 170 + eyeX);
        rightEye.setAttribute('cy', 75 + eyeY);
        
        // Add eye glow intensity variation based on cursor proximity
        const cursorProximity = Math.min(1, Math.sqrt(mouseX * mouseX + mouseY * mouseY));
        const glowIntensity = 0.8 + cursorProximity * 0.5;
        
        // Create dynamic eye glow effect
        const eyeGlowFilter = svgRef.current.querySelector('#glow');
        if (eyeGlowFilter) {
          const glowBlur = eyeGlowFilter.querySelector('feGaussianBlur');
          if (glowBlur) {
            glowBlur.setAttribute('stdDeviation', 2 + cursorProximity * 1.5);
          }
        }
      }
    }
    
    // Enhanced visor scanning light follows cursor horizontally with variable width
    if (visor) {
      const scanPosition = ((mouseX + 1) / 2) * 60 + 110; // Map -1 to 1 range to 110-170
      const scanLight = svgRef.current.querySelector('#scanning-light');
      if (scanLight) {
        scanLight.setAttribute('x', scanPosition.toString());
        
        // Make scan width vary based on horizontal cursor movement
        const scanWidth = 5 + Math.abs(mouseX) * 8;
        scanLight.setAttribute('width', scanWidth.toString());
        
        // Vary opacity based on vertical cursor position
        const scanOpacity = 0.3 + Math.abs(mouseY) * 0.7;
        scanLight.setAttribute('opacity', scanOpacity.toString());
      }
    }
    
    // More dynamic core pulsing
    const core = svgRef.current.querySelector('#core');
    if (core) {
      const basePulse = Math.sin(time * 0.003);
      const cursorProximity = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const pulseScale = 1 + basePulse * 0.2 + (1 - cursorProximity) * 0.15; // Core grows when cursor is closer to center
      core.setAttribute('r', (15 * pulseScale).toString());
      
      // Make core glow brighter when cursor is near center
      const coreOpacity = 0.7 + basePulse * 0.3 + (1 - cursorProximity) * 0.3;
      core.style.opacity = coreOpacity.toString();
    }
    
    // Animate holographic display with more dynamic movement
    const holoLines = svgRef.current.querySelectorAll('.holo-line');
    holoLines.forEach((line, i) => {
      const originalY2 = originalY2Values.current[i] || 0;
      // More pronounced vertical movement
      const offset = Math.sin(time * 0.002 + i * 0.5) * 3.5; // Increased from 2
      line.setAttribute('y2', (originalY2 + offset).toString());
      
      // Add horizontal movement too
      const horizontalOffset = Math.cos(time * 0.003 + i * 0.4) * 2;
      line.setAttribute('x2', (25 + horizontalOffset).toString());
      
      // More dynamic opacity
      line.style.opacity = 0.5 + Math.sin(time * 0.003 + i * 0.2) * 0.5;
    });
    
    // More dynamic energy flows
    const energyFlows = svgRef.current.querySelectorAll('.energy-flow');
    energyFlows.forEach((flow, i) => {
      const baseSpeed = 3000; // Base animation cycle time in ms
      const cursorFactor = Math.max(0.5, Math.min(1.5, 1 + mouseX * 0.5)); // Cursor affects flow speed
      const cycleDuration = baseSpeed / cursorFactor;
      const animateVal = (time % cycleDuration) / cycleDuration;
      flow.setAttribute('offset', animateVal.toString());
    });
    
    // Add subtle shake when mouse moves quickly - using refs instead of static variables
    const lastMouseX = lastMousePosition.current.x;
    const lastMouseY = lastMousePosition.current.y;
    
    const mouseSpeed = Math.sqrt(
      Math.pow(mouseX - lastMouseX, 2) + 
      Math.pow(mouseY - lastMouseY, 2)
    );
    
    if (mouseSpeed > 0.05) { // If mouse is moving quickly
      const shakeX = (Math.random() - 0.5) * mouseSpeed * 10;
      const shakeY = (Math.random() - 0.5) * mouseSpeed * 10;
      
      // Add subtle shake to robot head - make sure we apply it consistently
      if (robotHead) {
        // Get the existing transform and append the shake without overriding
        // This ensures the rotation and shake work together
        robotHead.style.transform += ` translate(${shakeX}px, ${shakeY}px)`;
      }
    }
    
    // Update last mouse position for next frame
    lastMousePosition.current = { x: mouseX, y: mouseY };
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    // Set up mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <svg 
        ref={svgRef}
        width="500" 
        height="400" 
        viewBox="50 0 200 250"
        style={{ 
          transition: 'transform 0.05s',
          cursor: hover ? 'pointer' : 'default',
          transform: 'scale(1.5)',
          perspective: '1000px', // Add perspective for 3D transforms
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Definitions for gradients and filters */}
        <defs>
          {/* Metal textures */}
          <linearGradient id="metal-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          
          <linearGradient id="metal-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#333333" />
            <stop offset="50%" stopColor="#3a3a3a" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
          
          {/* Tech glows */}
          <radialGradient id="tech-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity="1" />
            <stop offset="70%" stopColor="#0088AA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#004455" stopOpacity="0" />
          </radialGradient>
          
          {/* Energy flows */}
          <linearGradient id="energy-flow">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00FFFF" stopOpacity="1" className="energy-flow" />
            <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
          </linearGradient>
          
          {/* Circuit patterns */}
          <pattern id="circuit-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#111111" />
            <path d="M5,0 L5,15 L20,15" stroke="#333333" fill="none" strokeWidth="1" />
            <path d="M15,0 L15,5 L0,5" stroke="#333333" fill="none" strokeWidth="1" />
            <rect x="4" y="14" width="2" height="2" fill="#00FFFF" opacity="0.5" />
            <rect x="14" y="4" width="2" height="2" fill="#00FFFF" opacity="0.5" />
          </pattern>
          
          {/* Glow filter */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Hologram filter */}
          <filter id="hologram">
            <feTurbulence baseFrequency="0.05" numOctaves="2" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" />
          </filter>
        </defs>
        
        {/* Robot Head - Now with a proper ID for selection */}
        <g id="robot-head">
          {/* Head base with texture */}
          <rect x="100" y="40" width="100" height="90" rx="20" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
            
          {/* Antenna with energy flow */}
          <line x1="150" y1="40" x2="150" y2="20" 
            stroke="url(#energy-flow)" strokeWidth="3" />
          <circle cx="150" cy="15" r="5" fill="url(#tech-glow)" filter="url(#glow)" />
            
          {/* Tech visor with scanning light - Added ID for visor */}
          <rect id="visor" x="110" y="60" width="80" height="30" rx="10" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="1" />
          <rect id="scanning-light" x="120" y="65" width="5" height="20" 
            fill="#00FFFF" opacity="0.5" filter="url(#glow)" />
            
          {/* Advanced eyes - IDs were already there */}
          <ellipse id="left-eye" cx="130" cy="75" rx="7" ry="7" 
            fill="url(#tech-glow)" filter="url(#glow)" />
          <ellipse id="right-eye" cx="170" cy="75" rx="7" ry="7" 
            fill="url(#tech-glow)" filter="url(#glow)" />
            
          {/* Circuit pattern details on head */}
          <rect x="120" y="100" width="60" height="10" rx="3" 
            fill="url(#circuit-pattern)" />
          
          {/* Tech details on sides */}
          <rect x="105" y="50" width="5" height="20" rx="2" fill="#00FFFF" opacity="0.7" />
          <rect x="190" y="50" width="5" height="20" rx="2" fill="#00FFFF" opacity="0.7" />
        </g>
        
        {/* Holographic display floating next to head - fixed y2 values */}
        <g id="holo-display" filter="url(#hologram)" opacity="0.7" transform="translate(210, 65)">
          <rect x="0" y="0" width="30" height="40" rx="2" fill="#00FFFF" opacity="0.1" />
          <line className="holo-line" x1="5" y1="10" x2="25" y2="8" stroke="#00FFFF" strokeWidth="0.5" />
          <line className="holo-line" x1="5" y1="15" x2="25" y2="16" stroke="#00FFFF" strokeWidth="0.5" />
          <line className="holo-line" x1="5" y1="20" x2="25" y2="19" stroke="#00FFFF" strokeWidth="0.5" />
          <line className="holo-line" x1="5" y1="25" x2="25" y2="27" stroke="#00FFFF" strokeWidth="0.5" />
          <line className="holo-line" x1="5" y1="30" x2="25" y2="31" stroke="#00FFFF" strokeWidth="0.5" />
        </g>
        
        {/* Neck with tech pattern */}
        <rect x="130" y="130" width="40" height="20" rx="5" 
          fill="url(#metal-light)" stroke="#333333" strokeWidth="1" />
        <path d="M135,135 h30 M135,140 h30 M135,145 h30" stroke="#00FFFF" strokeWidth="0.5" opacity="0.5" />
          
        {/* Body */}
        <g id="robot-body">
          {/* Torso upper with circuit patterns */}
          <rect x="80" y="150" width="140" height="90" rx="15" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <rect x="100" y="155" width="100" height="20" fill="url(#circuit-pattern)" opacity="0.8" />
            
          {/* Futuristic energy core */}
          <circle id="core" cx="150" cy="180" r="15" 
            fill="url(#tech-glow)" filter="url(#glow)" />
          <circle cx="150" cy="180" r="18" 
            fill="transparent" stroke="#00FFFF" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="150" cy="180" r="22" 
            fill="transparent" stroke="#00FFFF" strokeWidth="0.5" />
            
          {/* Tech chest plates with energy flows */}
          <rect x="95" y="165" width="40" height="30" rx="5" 
            fill="url(#metal-light)" stroke="url(#energy-flow)" strokeWidth="1" />
          <rect x="165" y="165" width="40" height="30" rx="5" 
            fill="url(#metal-light)" stroke="url(#energy-flow)" strokeWidth="1" />
            
          {/* Tech details */}
          <line x1="95" y1="205" x2="205" y2="205" stroke="#00FFFF" strokeWidth="0.5" strokeDasharray="5 3" />
          <line x1="95" y1="220" x2="205" y2="220" stroke="#00FFFF" strokeWidth="0.5" strokeDasharray="5 3" />
            
          {/* Lower torso with tech details */}
          <rect x="100" y="240" width="100" height="30" rx="10" 
            fill="url(#metal-light)" stroke="#333333" strokeWidth="2" />
          <path d="M110,245 h80 M110,255 h80 M110,265 h80" stroke="#00FFFF" strokeWidth="0.5" opacity="0.5" />
        </g>
        
        {/* Arms with tech enhancements */}
        <g id="robot-arms">
          {/* Left arm upper */}
          <rect x="55" y="155" width="25" height="60" rx="10" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <circle cx="67.5" cy="180" r="6" 
            fill="url(#tech-glow)" opacity="0.6" filter="url(#glow)" />
            
          {/* Left arm joint with tech ring */}
          <circle cx="67.5" cy="215" r="12" fill="#333333" />
          <circle cx="67.5" cy="215" r="8" fill="transparent" stroke="#00FFFF" strokeWidth="0.5" />
            
          {/* Left forearm with energy lines */}
          <rect x="55" y="225" width="25" height="70" rx="10" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <path d="M60,235 h15 M60,250 h15 M60,265 h15" stroke="#00FFFF" strokeWidth="0.5" opacity="0.5" />
            
          {/* Left tech hand */}
          <rect x="57.5" y="295" width="20" height="25" rx="5" 
            fill="url(#metal-light)" />
          <line x1="62.5" y1="300" x2="62.5" y2="315" stroke="#00FFFF" strokeWidth="0.5" />
          <line x1="67.5" y1="300" x2="67.5" y2="315" stroke="#00FFFF" strokeWidth="0.5" />
          <line x1="72.5" y1="300" x2="72.5" y2="315" stroke="#00FFFF" strokeWidth="0.5" />
            
          {/* Right arm upper */}
          <rect x="220" y="155" width="25" height="60" rx="10" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <circle cx="232.5" cy="180" r="6" 
            fill="url(#tech-glow)" opacity="0.6" filter="url(#glow)" />
            
          {/* Right arm joint with tech ring */}
          <circle cx="232.5" cy="215" r="12" fill="#333333" />
          <circle cx="232.5" cy="215" r="8" fill="transparent" stroke="#00FFFF" strokeWidth="0.5" />
            
          {/* Right forearm with energy lines */}
          <rect x="220" y="225" width="25" height="70" rx="10" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <path d="M225,235 h15 M225,250 h15 M225,265 h15" stroke="#00FFFF" strokeWidth="0.5" opacity="0.5" />
            
          {/* Right tech hand */}
          <rect x="222.5" y="295" width="20" height="25" rx="5" 
            fill="url(#metal-light)" />
          <line x1="227.5" y1="300" x2="227.5" y2="315" stroke="#00FFFF" strokeWidth="0.5" />
          <line x1="232.5" y1="300" x2="232.5" y2="315" stroke="#00FFFF" strokeWidth="0.5" />
          <line x1="237.5" y1="300" x2="237.5" y2="315" stroke="#00FFFF" strokeWidth="0.5" />
        </g>
        
        {/* Legs with hydraulic animations */}
        <g id="robot-legs">
          {/* Left upper leg with tech details */}
          <rect x="110" y="270" width="30" height="70" rx="10" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <rect x="120" y="290" width="10" height="30" rx="5" 
            fill="url(#circuit-pattern)" opacity="0.8" />
            
          {/* Left knee with tech */}
          <circle cx="125" cy="340" r="12" fill="#333333" />
          <circle cx="125" cy="340" r="8" fill="transparent" stroke="#00FFFF" strokeWidth="0.5" />
          <circle cx="125" cy="340" r="4" fill="#00FFFF" opacity="0.5" />
            
          {/* Left lower leg with hydraulic lines */}
          <rect x="110" y="350" width="30" height="80" rx="8" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <line x1="115" y1="360" x2="115" y2="420" stroke="#333333" strokeWidth="3" />
          <line x1="135" y1="360" x2="135" y2="420" stroke="#333333" strokeWidth="3" />
          <line x1="115" y1="390" x2="135" y2="390" stroke="#00FFFF" strokeWidth="0.5" />
          <line x1="115" y1="400" x2="135" y2="400" stroke="#00FFFF" strokeWidth="0.5" />
          <line x1="115" y1="410" x2="135" y2="410" stroke="#00FFFF" strokeWidth="0.5" />
            
          {/* Left tech foot */}
          <rect x="105" y="430" width="40" height="15" rx="5" 
            fill="url(#metal-light)" stroke="#333333" strokeWidth="2" />
          <rect x="115" y="430" width="20" height="5" fill="#00FFFF" opacity="0.3" />
            
          {/* Right upper leg with tech details */}
          <rect x="160" y="270" width="30" height="70" rx="10" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <rect x="170" y="290" width="10" height="30" rx="5" 
            fill="url(#circuit-pattern)" opacity="0.8" />
            
          {/* Right knee with tech */}
          <circle cx="175" cy="340" r="12" fill="#333333" />
          <circle cx="175" cy="340" r="8" fill="transparent" stroke="#00FFFF" strokeWidth="0.5" />
          <circle cx="175" cy="340" r="4" fill="#00FFFF" opacity="0.5" />
            
          {/* Right lower leg with hydraulic lines */}
          <rect x="160" y="350" width="30" height="80" rx="8" 
            fill="url(#metal-dark)" stroke="#333333" strokeWidth="2" />
          <line x1="165" y1="360" x2="165" y2="420" stroke="#333333" strokeWidth="3" />
          <line x1="185" y1="360" x2="185" y2="420" stroke="#333333" strokeWidth="3" />
          <line x1="165" y1="390" x2="185" y2="390" stroke="#00FFFF" strokeWidth="0.5" />
          <line x1="165" y1="400" x2="185" y2="400" stroke="#00FFFF" strokeWidth="0.5" />
          <line x1="165" y1="410" x2="185" y2="410" stroke="#00FFFF" strokeWidth="0.5" />
            
          {/* Right tech foot */}
          <rect x="155" y="430" width="40" height="15" rx="5" 
            fill="url(#metal-light)" stroke="#333333" strokeWidth="2" />
          <rect x="165" y="430" width="20" height="5" fill="#00FFFF" opacity="0.3" />
        </g>
        
        {/* Energy field effects */}
        <ellipse cx="150" cy="180" rx="60" ry="20" 
          fill="url(#tech-glow)" opacity="0.1" filter="url(#glow)" />
          
        {/* Robot shadow (subtle) */}
        <ellipse cx="150" cy="445" rx="70" ry="5" 
          fill="#000000" fillOpacity="0.3" />
      </svg>
    </div>
  );
}
