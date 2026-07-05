import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Particles.css';

const Particles = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const pointsRef = useRef([]);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size to viewport (it's fixed position)
    canvas.width = width;
    canvas.height = height;

    // Target position for mouse (viewport-relative since canvas is fixed)
    targetRef.current = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    };

    // Create points - these are viewport-relative since canvas is fixed
    const points = [];
    const spacing = 40;
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        const px = x + (Math.random() * spacing) / 2;
        const py = y + (Math.random() * spacing) / 2;
        points.push({ 
          x: px, 
          originX: px, 
          y: py, 
          originY: py,
          circle: null,
          closest: [],
          active: 0
        });
      }
    }

    // Find closest points for each point
    points.forEach((p1, i) => {
      const closest = [];
      points.forEach((p2, j) => {
        if (i !== j) {
          const dist = getDistance(p1, p2);
          if (closest.length < 5) {
            closest.push(p2);
          } else {
            const maxDist = Math.max(...closest.map(p => getDistance(p1, p)));
            if (dist < maxDist) {
              const maxIndex = closest.findIndex(p => getDistance(p1, p) === maxDist);
              closest[maxIndex] = p2;
            }
          }
        }
      });
      p1.closest = closest;
    });

    // Create circles for each point
    points.forEach((point) => {
      point.circle = {
        radius: 2 + Math.random() * 2,
        color: `rgba(156, 217, 249,`,
        active: 0
      };
    });

    pointsRef.current = points;

    // Mouse move handler - viewport-relative (canvas is fixed)
    const handleMouseMove = (e) => {
      targetRef.current = { 
        x: e.clientX,
        y: e.clientY
      };
    };

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop - ALWAYS runs, no scroll cutoff
    const animate = () => {
      if (!ctx) return;

      // Always clear and animate
      ctx.clearRect(0, 0, width, height);
      
      // Get scroll-based intensity multiplier
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? Math.min(window.scrollY / scrollHeight, 1) : 0;
      // Particles stay visible but slightly fade on scroll (min 40% intensity)
      const intensityMultiplier = Math.max(0.4, 1 - scrollProgress * 0.3);

      pointsRef.current.forEach((point) => {
        // Calculate distance to cursor (viewport-relative)
        const cursorX = targetRef.current.x;
        const cursorY = targetRef.current.y;
        const dist = Math.pow(point.x - cursorX, 2) + Math.pow(point.y - cursorY, 2);
        
        if (dist < 4000) {
          point.active = 0.3 * intensityMultiplier;
          if (point.circle) point.circle.active = 0.6 * intensityMultiplier;
        } else if (dist < 20000) {
          point.active = 0.1 * intensityMultiplier;
          if (point.circle) point.circle.active = 0.3 * intensityMultiplier;
        } else if (dist < 40000) {
          point.active = 0.02 * intensityMultiplier;
          if (point.circle) point.circle.active = 0.1 * intensityMultiplier;
        } else {
          point.active = 0;
          if (point.circle) point.circle.active = 0;
        }

        drawLines(ctx, point);
        drawCircle(ctx, point);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Helper functions
    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    function drawLines(ctx, p) {
      if (!p.active || !p.closest) return;
      p.closest.forEach((closestPoint) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closestPoint.x, closestPoint.y);
        ctx.strokeStyle = `rgba(156, 217, 249, ${p.active})`;
        ctx.stroke();
      });
    }

    function drawCircle(ctx, p) {
      if (!p.active || !p.circle) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.circle.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = `${p.circle.color}${p.circle.active})`;
      ctx.fill();
    }

    // Shift points animation
    const shiftPoint = (p) => {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: 'power2.inOut',
        onComplete: () => shiftPoint(p),
      });
    };

    pointsRef.current.forEach(shiftPoint);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="particle-canvas"
      className="particle-canvas"
    />
  );
};

export default Particles;