import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audio.ts';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  flicker: boolean;
  gravity: number;
  resistance: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
  isHeart: boolean;
}

interface FireworksCanvasProps {
  autoLaunch?: boolean;
  intensity?: 'gentle' | 'vibrant' | 'glorious';
  allowClickToLaunch?: boolean;
}

const PALETTES = [
  ['#a855f7', '#c084fc', '#e9d5ff', '#faf5ee'], // Romantic lavender & ivory
  ['#9333ea', '#7c3aed', '#d8b4fe', '#fef3c7'], // Royal violet & champagne
  ['#d97706', '#f59e0b', '#fbbf24', '#fdf4dc'], // Warm beige golden sparkle
  ['#8b5cf6', '#d946ef', '#f5d0fe', '#faebd7'], // Soft purple orchid & beige
  ['#c4b5fd', '#a78bfa', '#e0e7ff', '#fffbeb'], // Pastel lilac & warm cream
];

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({
  autoLaunch = true,
  intensity = 'vibrant',
  allowClickToLaunch = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const lastAutoLaunchRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const createHeartParticles = (centerX: number, centerY: number, palette: string[]) => {
      const count = 75;
      for (let i = 0; i < count; i++) {
        const t = (Math.PI * 2 * i) / count;
        // Parametric heart formula
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const speed = 0.15 + Math.random() * 0.05;

        particlesRef.current.push({
          x: centerX,
          y: centerY,
          vx: hx * speed,
          vy: hy * speed,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.008,
          color: palette[Math.floor(Math.random() * palette.length)],
          size: Math.random() * 3 + 2,
          flicker: Math.random() > 0.4,
          gravity: 0.04,
          resistance: 0.98,
        });
      }
    };

    const createStandardParticles = (centerX: number, centerY: number, palette: string[]) => {
      const count = intensity === 'glorious' ? 120 : intensity === 'vibrant' ? 80 : 50;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 1.5;
        particlesRef.current.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.015 + Math.random() * 0.015,
          color: palette[Math.floor(Math.random() * palette.length)],
          size: Math.random() * 3 + 1.5,
          flicker: Math.random() > 0.5,
          gravity: 0.06,
          resistance: 0.97,
        });
      }
    };

    const explodeRocket = (rocket: Rocket) => {
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      soundEngine.playFireworkBurst();

      if (rocket.isHeart) {
        createHeartParticles(rocket.x, rocket.y, palette);
      } else {
        createStandardParticles(rocket.x, rocket.y, palette);
      }
    };

    const launchRocket = (startX?: number, targetY?: number, isHeartForce?: boolean) => {
      const x = startX ?? Math.random() * (width - 200) + 100;
      const target = targetY ?? Math.random() * (height * 0.45) + height * 0.1;
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const isHeart = isHeartForce !== undefined ? isHeartForce : Math.random() > 0.45; // 55% heart explosions for romance!

      rocketsRef.current.push({
        x,
        y: height,
        targetY: target,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 4 + 11),
        color: palette[0],
        trail: [],
        isHeart,
      });
    };

    // Animation loop
    const render = (time: number) => {
      // Create trailing blur effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Auto launch interval
      const interval = intensity === 'glorious' ? 900 : intensity === 'vibrant' ? 1800 : 3200;
      if (autoLaunch && time - lastAutoLaunchRef.current > interval) {
        launchRocket();
        lastAutoLaunchRef.current = time;
      }

      // Update and render rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.05; // tiny gravity on rocket

        // Add to rocket trail
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 8) r.trail.shift();

        // Draw trail
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          pt.alpha -= 0.1;
          if (pt.alpha > 0) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${pt.alpha})`;
            ctx.fill();
          }
        }

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Check if reached destination
        if (r.y <= r.targetY || r.vy >= -1) {
          explodeRocket(r);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update and render particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= p.resistance;
        p.vy *= p.resistance;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        const currentAlpha = p.flicker ? Math.max(0, p.alpha * (0.6 + Math.random() * 0.4)) : p.alpha;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    const handleCanvasClick = (e: MouseEvent) => {
      if (!allowClickToLaunch) return;
      launchRocket(e.clientX, e.clientY, true);
    };

    window.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoLaunch, intensity, allowClickToLaunch]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
