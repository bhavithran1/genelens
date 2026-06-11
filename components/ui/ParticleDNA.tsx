'use client';
import { useEffect, useRef } from 'react';

export default function ParticleDNA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resize();
    window.addEventListener('resize', resize);

    const BASE_COLORS = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];
    const N = 80;
    type Particle = { phase: number; speed: number; size: number; strand: 0 | 1; color: string };
    const particles: Particle[] = Array.from({ length: N }, (_, i) => ({
      phase: (i / N) * Math.PI * 6,
      speed: 0.25 + Math.random() * 0.35,
      size: 1.5 + Math.random() * 2.5,
      strand: (i % 2) as 0 | 1,
      color: BASE_COLORS[i % BASE_COLORS.length],
    }));

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const amp = Math.min(W * 0.18, 90);
      const period = 90;

      // Strands
      for (let strand = 0; strand < 2; strand++) {
        const phaseOff = strand * Math.PI;
        ctx.beginPath();
        for (let y = -10; y < H + 20; y += 3) {
          const x = cx + amp * Math.sin(y / period + t + phaseOff);
          if (y <= -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = strand === 0 ? 'rgba(0,212,255,0.12)' : 'rgba(124,58,237,0.12)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Rungs
      for (let y = 0; y < H; y += 22) {
        const x1 = cx + amp * Math.sin(y / period + t);
        const x2 = cx + amp * Math.sin(y / period + t + Math.PI);
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Particles
      for (const p of particles) {
        const progress = ((p.phase + t * p.speed) % (Math.PI * 6)) / (Math.PI * 6);
        const py = progress * H;
        const phaseOff = p.strand * Math.PI;
        const px = cx + amp * Math.sin(py / period + t + phaseOff);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + 'bb';
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '22';
        ctx.fill();
      }

      t += 0.007;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
