import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  shape: "circle" | "triangle" | "square" | "heart" | "star";
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  fadeSpeed: number;
  gravity: number;
  resistance: number;
}

const ColorBombEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const lastExplosionTime = useRef<number>(0);

  // Colors for the particles
  const colors = [
    "#FF5252",
    "#FF4081",
    "#E040FB",
    "#7C4DFF",
    "#536DFE",
    "#448AFF",
    "#40C4FF",
    "#18FFFF",
    "#64FFDA",
    "#69F0AE",
    "#B2FF59",
    "#EEFF41",
    "#FFFF00",
    "#FFD740",
    "#FFAB40",
  ];

  // Shape-specific properties
  const shapeProperties = {
    circle: {
      colors: ["#FF5252", "#FF4081", "#E040FB", "#7C4DFF"],
      size: [2, 6],
      speed: [1, 3],
      gravity: 0.05,
      resistance: 0.99,
      count: [15, 25],
    },
    triangle: {
      colors: ["#448AFF", "#40C4FF", "#18FFFF", "#64FFDA"],
      size: [3, 7],
      speed: [1.5, 4],
      gravity: 0.04,
      resistance: 0.98,
      count: [12, 20],
    },
    square: {
      colors: ["#B2FF59", "#EEFF41", "#FFFF00", "#FFD740"],
      size: [2, 5],
      speed: [1, 2.5],
      gravity: 0.06,
      resistance: 0.97,
      count: [18, 30],
    },
    heart: {
      colors: ["#FF4081", "#E040FB", "#7C4DFF", "#FF5252"],
      size: [2, 4],
      speed: [0.8, 2],
      gravity: 0.03,
      resistance: 0.99,
      count: [10, 15],
    },
    star: {
      colors: ["#FFD740", "#FFAB40", "#FFFF00", "#EEFF41"],
      size: [3, 8],
      speed: [2, 5],
      gravity: 0.02,
      resistance: 0.96,
      count: [8, 12],
    },
  };

  // Shapes with their draw functions
  const drawShape = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    shape: Particle["shape"],
    rotation: number,
    color: string,
    opacity: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;

    switch (shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-size, size);
        ctx.lineTo(size, size);
        ctx.closePath();
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(-size, -size, size * 2, size * 2);
        break;
      case "heart":
        ctx.beginPath();
        const curve = size * 0.6;
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo(size, -size, size, curve, 0, size);
        ctx.bezierCurveTo(-size, curve, -size, -size, 0, -size);
        ctx.fill();
        break;
      case "star":
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(0, size);
          ctx.translate(0, size);
          ctx.rotate((Math.PI * 2) / 10);
          ctx.lineTo(0, -size * 0.5);
          ctx.translate(0, -size * 0.5);
          ctx.rotate((Math.PI * 6) / 10);
        }
        ctx.lineTo(0, size);
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  };

  // Create particles for a specific shape explosion
  const createShapeExplosion = (shape: Particle["shape"]) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const particles: Particle[] = [];
    const props = shapeProperties[shape];

    // Random position for the explosion
    const explosionX = Math.random() * canvas.width;
    const explosionY = Math.random() * canvas.height;

    const count =
      props.count[0] +
      Math.floor(Math.random() * (props.count[1] - props.count[0]));

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed =
        props.speed[0] + Math.random() * (props.speed[1] - props.speed[0]);

      particles.push({
        x: explosionX,
        y: explosionY,
        size: props.size[0] + Math.random() * (props.size[1] - props.size[0]),
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        color: props.colors[Math.floor(Math.random() * props.colors.length)],
        shape: shape,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        opacity: 0.6 + Math.random() * 0.3,
        fadeSpeed: 0.005 + Math.random() * 0.01,
        gravity: props.gravity,
        resistance: props.resistance,
      });
    }

    particlesRef.current = [...particlesRef.current, ...particles];
  };

  // Animation loop
  const animate = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas with very slight transparency for subtle trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.rotation += particle.rotationSpeed;
      particle.opacity -= particle.fadeSpeed;

      // Apply gravity
      particle.speedY += particle.gravity;

      // Apply air resistance
      particle.speedX *= particle.resistance;
      particle.speedY *= particle.resistance;

      // Draw particle with current opacity
      if (particle.opacity > 0) {
        drawShape(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.shape,
          particle.rotation,
          particle.color,
          particle.opacity
        );
      }

      // Remove particles that are off screen, too small, or fully faded
      if (
        particle.x < -particle.size ||
        particle.x > canvas.width + particle.size ||
        particle.y > canvas.height + particle.size ||
        particle.size < 0.1 ||
        particle.opacity <= 0
      ) {
        particlesRef.current.splice(index, 1);
      }
    });

    // Create random explosions of different shapes
    const now = Date.now();
    if (
      now - lastExplosionTime.current > 800 &&
      particlesRef.current.length < 200
    ) {
      const shapes: Particle["shape"][] = [
        "circle",
        "triangle",
        "square",
        "heart",
        "star",
      ];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      createShapeExplosion(randomShape);
      lastExplosionTime.current = now;
    }

    animationFrameId.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set canvas size
    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial explosions of different shapes
    const shapes: Particle["shape"][] = [
      "circle",
      "triangle",
      "square",
      "heart",
      "star",
    ];
    shapes.forEach((shape, index) => {
      setTimeout(() => createShapeExplosion(shape), index * 400);
    });

    // Start animation
    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Keep it in the background
        pointerEvents: "none", // Allow clicks to pass through
      }}
    />
  );
};

export default ColorBombEffect;
