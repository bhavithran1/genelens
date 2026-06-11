'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; color: string; alpha: number; phase: number;
}

const COLORS = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#00d4ff', '#7c3aed'];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let t = 0;

    const dpr = () => window.devicePixelRatio || 1;

    const resize = () => {
      const d = dpr();
      canvas.width  = canvas.offsetWidth  * d;
      canvas.height = canvas.offsetHeight * d;
      ctx.resetTransform();
      ctx.scale(d, d);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const N_PARTICLES = 55;
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = Array.from({ length: N_PARTICLES }, () => ({
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.6 + Math.random() * 2.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.35 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    initParticles();

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);
      t += 0.01;

      // Radial dark gradient for depth
      const grad = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, Math.max(w, h) * 0.6);
      grad.addColorStop(0,   'rgba(14,10,30,0.0)');
      grad.addColorStop(0.5, 'rgba(8,8,18,0.1)');
      grad.addColorStop(1,   'rgba(4,4,12,0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Connections
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const a = (1 - d / 130) * 0.11;
            ctx.strokeStyle = `rgba(0,212,255,${a})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        // Mouse connection highlight
        const pdx = particles[i].x - mx, pdy = particles[i].y - my;
        const pd  = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pd < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(0,212,255,${(1 - pd / 160) * 0.22})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      // Particles
      for (const p of particles) {
        // Gentle mouse gravity
        const mdx = mx - p.x, mdy = my - p.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 250 && md > 0) {
          p.vx += (mdx / md) * 0.025;
          p.vy += (mdy / md) * 0.025;
        }
        p.vx *= 0.978;
        p.vy *= 0.978;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.4) { p.vx = (p.vx / spd) * 1.4; p.vy = (p.vy / spd) * 1.4; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;

        const a = p.alpha * (0.65 + 0.35 * Math.sin(t * 1.4 + p.phase));
        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        grd.addColorStop(0, p.color + Math.round(a * 80).toString(16).padStart(2, '0'));
        grd.addColorStop(1, p.color + '00');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(a * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }

      // DNA helix down the center
      const cx   = w / 2;
      const amp  = Math.min(w * 0.08, 55);
      const per  = 85;
      const ts   = t * 0.45;

      for (let strand = 0; strand < 2; strand++) {
        const po = strand * Math.PI;
        const col = strand === 0 ? '0,212,255' : '124,58,237';
        ctx.beginPath();
        for (let y = -10; y < h + 10; y += 3) {
          const x = cx + amp * Math.sin(y / per + ts + po);
          if (y === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${col},0.14)`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      // Rungs with base pair colors
      const baseCols = ['rgba(239,68,68,0.22)', 'rgba(59,130,246,0.22)', 'rgba(16,185,129,0.22)', 'rgba(167,139,250,0.22)'];
      let bi = 0;
      for (let y = 0; y < h; y += 20) {
        const x1 = cx + amp * Math.sin(y / per + ts);
        const x2 = cx + amp * Math.sin(y / per + ts + Math.PI);
        ctx.beginPath();
        ctx.moveTo(x1, y); ctx.lineTo(x2, y);
        ctx.strokeStyle = baseCols[bi % baseCols.length];
        ctx.lineWidth = 1;
        ctx.stroke();
        bi++;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
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
