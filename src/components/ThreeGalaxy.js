import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeGalaxy.css';

export default function ThreeGalaxy() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Prevent double initialization in React StrictMode
    if (isInitializedRef.current) {
      return;
    }
    
    // Check WebGL support before attempting to create renderer
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('webgl2') || canvas.getContext('experimental-webgl');
        if (!gl) {
          return false;
        }
        
        // Check if WebGL is actually functional (not disabled)
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (vendor === 'Disabled' || renderer === 'Disabled') {
            console.warn('WebGL is disabled in browser settings');
            return false;
          }
        }
        
        return true;
      } catch (e) {
        console.warn('WebGL support check failed:', e);
        return false;
      }
    };
    
    if (!checkWebGLSupport()) {
      console.warn('WebGL is not available or disabled. Three.js galaxy will not be rendered.');
      // Hide the canvas element
      if (mountRef.current) {
        mountRef.current.style.display = 'none';
      }
      return;
    }
    
    // Check if canvas already has a context (React StrictMode double render)
    let existingContext = null;
    try {
      existingContext = mountRef.current.getContext('webgl', { 
        failIfMajorPerformanceCaveat: false 
      });
      if (!existingContext) {
        existingContext = mountRef.current.getContext('webgl2', { 
          failIfMajorPerformanceCaveat: false 
        });
      }
    } catch (e) {
      existingContext = null;
    }
    
    if (existingContext && isInitializedRef.current) {
      console.log('Canvas already initialized, skipping');
      return;
    }

    let renderer = null;
    let scene = null;
    let camera = null;

    // Scene setup
    scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer - let Three.js handle WebGL context creation
    try {
      // Mark as initializing to prevent double initialization
      isInitializedRef.current = true;
      
      renderer = new THREE.WebGLRenderer({
        canvas: mountRef.current,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
      });
      
      if (!renderer) {
        console.warn('Failed to create WebGL renderer');
        isInitializedRef.current = false;
        return;
      }
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // Transparent background
      
      // Check if WebGL is actually available
      const gl = renderer.getContext();
      if (!gl) {
        console.warn('WebGL is not supported or disabled in this browser.');
        if (renderer) {
          renderer.dispose();
        }
        isInitializedRef.current = false;
        if (mountRef.current) {
          mountRef.current.style.display = 'none';
        }
        return;
      }
      
      // Verify context is not disabled
      try {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const rendererInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (vendor === 'Disabled' || rendererInfo === 'Disabled') {
            console.warn('WebGL is disabled. Hiding Three.js canvas.');
            if (renderer) {
              renderer.dispose();
            }
            isInitializedRef.current = false;
            if (mountRef.current) {
              mountRef.current.style.display = 'none';
            }
            return;
          }
        }
      } catch (e) {
        // Debug info not available, continue anyway
      }
    } catch (error) {
      console.warn('Failed to create WebGL renderer:', error);
      isInitializedRef.current = false;
      if (mountRef.current) {
        mountRef.current.style.display = 'none';
      }
      return;
    }

    // Early return if renderer, scene, or camera weren't created
    if (!renderer || !scene || !camera) {
      return;
    }

    // Galaxy parameters - optimized for performance and visibility
    const isMobile = window.innerWidth < 768;
    const parameters = {
      count: isMobile ? 30000 : 100000,
      size: 0.02, // Increased size for better visibility
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.5,
      randomnessPower: 3,
      insideColor: '#ff6030', // Bright orange
      outsideColor: '#4a90e2', // Brighter blue for better visibility
    };

    // Declare variables for Three.js objects
    let geometry = null;
    let material = null;
    let points = null;
    let stars = null;
    let nebula = null;
    let starsGeometry = null;
    let starsMaterial = null;
    let nebulaGeometry = null;
    let nebulaMaterial = null;

    const generateGalaxy = () => {
      // Dispose old galaxy
      if (points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);
      const scales = new Float32Array(parameters.count);

      const insideColor = new THREE.Color(parameters.insideColor);
      const outsideColor = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Position
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;
        const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;
        const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color
        const mixedColor = insideColor.clone();
        mixedColor.lerp(outsideColor, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

        // Scale
        scales[i] = Math.random();
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

      material = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: `
          attribute float aScale;
          
          varying vec3 vColor;
          
          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            
            gl_Position = projectedPosition;
            gl_PointSize = aScale * 2.0;
            gl_PointSize *= (1.0 / - viewPosition.z);
            
            vColor = color;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float strength = 0.1 / distanceToCenter - 0.2;
            strength = clamp(strength, 0.0, 1.0);
            
            gl_FragColor = vec4(vColor, strength * 1.5);
          }
        `,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);
      
      // Debug: Log to ensure galaxy is created
      console.log('Galaxy created with', parameters.count, 'particles');
    };

    generateGalaxy();
    
    // Debug: Ensure scene has objects
    console.log('Scene children:', scene.children.length);

    // Stars field - enhanced with twinkling
    starsGeometry = new THREE.BufferGeometry();
    const starsCount = isMobile ? 2000 : 5000;
    const starsPositions = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      starsPositions[i3] = (Math.random() - 0.5) * 2000;
      starsPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
      starsPositions[i3 + 2] = (Math.random() - 0.5) * 2000;

      // Random star colors (white to blue)
      const color = new THREE.Color();
      const hue = 0.5 + Math.random() * 0.2; // Blue-white range
      color.setHSL(hue, 0.5, 0.5 + Math.random() * 0.5);
      starsColors[i3] = color.r;
      starsColors[i3 + 1] = color.g;
      starsColors[i3 + 2] = color.b;
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starsPositions, 3)
    );
    starsGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(starsColors, 3)
    );

    starsMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Add nebula clouds (particle system)
    nebulaGeometry = new THREE.BufferGeometry();
    const nebulaCount = isMobile ? 1000 : 3000;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      nebulaPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      nebulaPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      nebulaPositions[i3 + 2] = radius * Math.cos(phi);

      // Purple/pink nebula colors
      const nebulaColor = new THREE.Color();
      const hue = 0.7 + Math.random() * 0.2; // Purple-pink range
      nebulaColor.setHSL(hue, 0.8, 0.3 + Math.random() * 0.3);
      nebulaColors[i3] = nebulaColor.r;
      nebulaColors[i3 + 1] = nebulaColor.g;
      nebulaColors[i3 + 2] = nebulaColor.b;
    }

    nebulaGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(nebulaPositions, 3)
    );
    nebulaGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(nebulaColors, 3)
    );

    nebulaMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll interaction for 3D effects
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.innercontainer');
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        scrollProgressRef.current = Math.max(0, Math.min(1, progress));
      }
    };

    const scrollContainer = document.querySelector('.innercontainer');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    // Animation
    const clock = new THREE.Clock();
    let previousTime = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;
      const scrollProgress = scrollProgressRef.current;

      // Dynamic galaxy rotation based on scroll
      if (points) {
        const baseRotation = elapsedTime * 0.15;
        const scrollRotation = scrollProgress * Math.PI * 2;
        points.rotation.y = baseRotation + scrollRotation * 0.5;
        
        // Scale galaxy based on scroll (zoom effect)
        const scale = 1 + scrollProgress * 0.5;
        points.scale.set(scale, scale, scale);
      }

      // Rotate stars with scroll influence
      stars.rotation.y = elapsedTime * 0.05 + scrollProgress * Math.PI;
      stars.rotation.x = scrollProgress * Math.PI * 0.3;

      // Rotate nebula with dynamic scroll effects
      nebula.rotation.x = elapsedTime * 0.02 + scrollProgress * Math.PI * 0.4;
      nebula.rotation.y = elapsedTime * 0.03 + scrollProgress * Math.PI * 0.6;
      
      // Nebula opacity changes with scroll
      const baseNebulaOpacity = 0.3;
      if (nebulaMaterial) {
        nebulaMaterial.opacity = baseNebulaOpacity + scrollProgress * 0.4;
      }

      // Twinkling stars effect - enhanced with scroll
      const twinkle = Math.sin(elapsedTime * 1.5) * 0.5 + 0.5;
      starsMaterial.opacity = (0.6 + twinkle * 0.2) * (1 - scrollProgress * 0.3);

      // Dynamic camera movement based on scroll and mouse
      if (camera && scene) {
        const scrollOffset = scrollProgress * 3;
        const mouseInfluence = 0.5;
        
        const targetX = mouse.x * mouseInfluence;
        const targetY = (mouse.y * mouseInfluence) + scrollOffset;
        const targetZ = 5 - (scrollProgress * 2);
        
        // Capped speed regardless of fast scrolling (adjusted for frame rate)
        const frameSpeedMult = Math.min(deltaTime * 60, 2); 
        const maxSpeedBase = 0.04 * frameSpeedMult;
        
        const approach = (current, target, factor, maxStep) => {
          const diff = target - current;
          const step = diff * factor;
          return current + (Math.abs(step) > maxStep ? Math.sign(step) * maxStep : step);
        };
        
        camera.position.x = approach(camera.position.x, targetX, 0.05, maxSpeedBase);
        camera.position.y = approach(camera.position.y, targetY, 0.05, maxSpeedBase);
        camera.position.z = approach(camera.position.z, targetZ, 0.05, maxSpeedBase * 2);
        
        camera.lookAt(scene.position);
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        console.warn('Renderer, scene, or camera is missing');
      }
    };

    animate();
    
    // Debug: Log renderer status
    console.log('Three.js initialized:', {
      renderer: !!renderer,
      scene: !!scene,
      camera: !!camera,
      canvas: mountRef.current,
      sceneChildren: scene ? scene.children.length : 0
    });

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      const scrollContainer = document.querySelector('.innercontainer');
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Cleanup all Three.js objects
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (points) {
        scene.remove(points);
        points = null;
      }
      
      if (starsGeometry) starsGeometry.dispose();
      if (starsMaterial) starsMaterial.dispose();
      if (stars) {
        scene.remove(stars);
        stars = null;
      }
      
      if (nebulaGeometry) nebulaGeometry.dispose();
      if (nebulaMaterial) nebulaMaterial.dispose();
      if (nebula) {
        scene.remove(nebula);
        nebula = null;
      }
      
      if (renderer) {
        renderer.dispose();
        renderer = null;
      }
      
      // Clear the canvas context
      if (mountRef.current) {
        const gl = mountRef.current.getContext('webgl') || mountRef.current.getContext('webgl2');
        if (gl) {
          const loseContext = gl.getExtension('WEBGL_lose_context');
          if (loseContext) {
            loseContext.loseContext();
          }
        }
      }
    };
  }, []);

  return <canvas ref={mountRef} className="three-galaxy-canvas" />;
}

