'use client';
import { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { PATHWAY_NODES, PATHWAY_EDGES, PATHWAY_REGIONS } from '@/data/pathway-data';
import type { GeneNode, PathwayEdge, PathwayRegion } from '@/lib/types';

const TYPE_COLORS: Record<string, string> = {
  oncogene: '#ef4444', suppressor: '#3b82f6', kinase: '#f59e0b', adapter: '#94a3b8', other: '#10b981',
};

interface T { x: number; y: number; scale: number; }

function fit(w: number, h: number): T {
  const scale = Math.min((w / 1980) * 0.9, (h / 1280) * 0.9, 0.54);
  return { x: (w - 1980 * scale) / 2, y: (h - 1280 * scale) / 2 + 10, scale };
}

const ws = (wx: number, wy: number, t: T) => ({ x: t.x + wx * t.scale, y: t.y + wy * t.scale });
const sw = (sx: number, sy: number, t: T) => ({ x: (sx - t.x) / t.scale, y: (sy - t.y) / t.scale });

function hitNode(mx: number, my: number, t: T): GeneNode | null {
  const { x: wx, y: wy } = sw(mx, my, t);
  let best: GeneNode | null = null, bestD = Infinity;
  for (const n of PATHWAY_NODES) {
    const d = Math.hypot(wx - n.x, wy - n.y);
    const hr = n.r + Math.max(7, 12 / t.scale);
    if (d < hr && d < bestD) { best = n; bestD = d; }
  }
  return best;
}

// Get all directly connected gene IDs for a given node
function getConnected(id: string): Set<string> {
  const s = new Set<string>();
  for (const e of PATHWAY_EDGES) {
    if (e.from === id) s.add(e.to);
    if (e.to   === id) s.add(e.from);
  }
  return s;
}

function drawRegion(ctx: CanvasRenderingContext2D, r: PathwayRegion, t: T) {
  const x = t.x + r.x * t.scale, y = t.y + r.y * t.scale;
  const w = r.w * t.scale, h = r.h * t.scale;
  ctx.save();
  ctx.beginPath();
  const rad = 14;
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y,     x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x,     y + h, rad);
  ctx.arcTo(x,     y + h, x,     y,     rad);
  ctx.arcTo(x,     y,     x + w, y,     rad);
  ctx.closePath();
  ctx.fillStyle   = r.color + '09';
  ctx.fill();
  ctx.strokeStyle = r.color + '22';
  ctx.lineWidth   = 1;
  ctx.stroke();
  if (t.scale > 0.2) {
    const fs = Math.max(9, Math.min(13, 11 * t.scale));
    ctx.font      = `700 ${fs}px Inter, sans-serif`;
    ctx.fillStyle = r.color + 'bb';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(r.label, x + 12, y + 10);
  }
  ctx.restore();
}

function drawEdge(
  ctx: CanvasRenderingContext2D,
  edge: PathwayEdge, t: T,
  hovId: string | null, selId: string | null,
  frameT: number,
) {
  const from = PATHWAY_NODES.find(n => n.id === edge.from);
  const to   = PATHWAY_NODES.find(n => n.id === edge.to);
  if (!from || !to) return;

  const isHov = edge.from === hovId || edge.to === hovId || edge.from === selId || edge.to === selId;
  const fs = ws(from.x, from.y, t), ts = ws(to.x, to.y, t);
  const dx = ts.x - fs.x, dy = ts.y - fs.y;
  const len = Math.hypot(dx, dy);
  if (len < 1) return;

  const nx = -dy / len, ny = dx / len;
  const c   = (edge.curve  || 0) * t.scale * 0.55;
  const cy2 = (edge.curveY || 0) * t.scale * 0.4;
  const cpX = (fs.x + ts.x) / 2 + nx * c + (dx / len) * cy2;
  const cpY = (fs.y + ts.y) / 2 + ny * c + (dy / len) * cy2;

  const shrink = (px: number, py: number, refX: number, refY: number, rPx: number) => {
    const edx = px - refX, edy = py - refY;
    const el  = Math.hypot(edx, edy) || 1;
    return { x: px - (edx / el) * rPx, y: py - (edy / el) * rPx };
  };
  const { x: sx, y: sy } = shrink(fs.x, fs.y, cpX, cpY, -(from.r + 2) * t.scale);
  const { x: ex, y: ey } = shrink(ts.x, ts.y, cpX, cpY,  (to.r   + 3) * t.scale);

  const isInhib = edge.type === 'inhibition';
  const col     = isInhib ? '#ef4444' : (edge.particleColor || '#94a3b8');
  const alpha   = isHov ? '88' : '2a';

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.quadraticCurveTo(cpX, cpY, ex, ey);
  ctx.strokeStyle = col + alpha;
  ctx.lineWidth   = isHov ? Math.max(1.8, 2.2 * t.scale) : Math.max(0.6, 1.1 * t.scale);
  if (isInhib) ctx.setLineDash([4 * t.scale, 3 * t.scale]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrow / T-bar
  const angle = Math.atan2(ey - cpY, ex - cpX);
  const aSize = Math.max(3.5, 6 * t.scale);
  if (isInhib) {
    ctx.beginPath();
    ctx.moveTo(ex + Math.sin(angle) * aSize * 0.7, ey - Math.cos(angle) * aSize * 0.7);
    ctx.lineTo(ex - Math.sin(angle) * aSize * 0.7, ey + Math.cos(angle) * aSize * 0.7);
    ctx.strokeStyle = '#ef4444' + (isHov ? '99' : '44');
    ctx.lineWidth   = Math.max(1, 2 * t.scale);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - aSize * Math.cos(angle - 0.42), ey - aSize * Math.sin(angle - 0.42));
    ctx.lineTo(ex - aSize * Math.cos(angle + 0.42), ey - aSize * Math.sin(angle + 0.42));
    ctx.closePath();
    ctx.fillStyle = col + (isHov ? '99' : '44');
    ctx.fill();
  }

  // Animated particle along edge when highlighted
  if (isHov && !isInhib) {
    const prog = (frameT * 0.6) % 1;
    const px   = sx + (cpX - sx) * 2 * prog * (1 - prog) + ex * prog * prog;
    const py   = sy + (cpY - sy) * 2 * prog * (1 - prog) + ey * prog * prog;
    ctx.beginPath();
    ctx.arc(px, py, Math.max(2.5, 3 * t.scale), 0, Math.PI * 2);
    ctx.fillStyle = col + 'ee';
    ctx.fill();
    // Glow
    const grd = ctx.createRadialGradient(px, py, 0, px, py, 8 * t.scale);
    grd.addColorStop(0, col + '66'); grd.addColorStop(1, col + '00');
    ctx.beginPath();
    ctx.arc(px, py, 8 * t.scale, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }
  ctx.restore();
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  node: GeneNode, t: T,
  isHov: boolean, isSel: boolean,
  dimmed: boolean, connected: boolean,
) {
  const { x, y } = ws(node.x, node.y, t);
  const r   = node.r * t.scale;
  const col = TYPE_COLORS[node.type] || '#94a3b8';

  if ((isHov || isSel || connected) && !dimmed) {
    const glowR = r + (isSel ? 12 : 7) * t.scale;
    const grd   = ctx.createRadialGradient(x, y, r * 0.4, x, y, glowR);
    grd.addColorStop(0, col + (isSel ? '60' : connected ? '35' : '30'));
    grd.addColorStop(1, col + '00');
    ctx.beginPath(); ctx.arc(x, y, glowR, 0, Math.PI * 2);
    ctx.fillStyle = grd; ctx.fill();
  }

  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle   = dimmed ? col + '07' : isSel ? col + '40' : isHov ? col + '2c' : connected ? col + '1c' : col + '14';
  ctx.fill();
  ctx.strokeStyle = col + (dimmed ? '15' : isSel ? 'ff' : isHov ? 'dd' : connected ? '99' : '66');
  ctx.lineWidth   = isSel ? Math.max(2, 2.8 * t.scale) : connected ? Math.max(1, 1.8 * t.scale) : Math.max(0.6, 1.2 * t.scale);
  ctx.stroke();

  if (r > 5 && !dimmed) {
    const fs = Math.max(7, Math.min(14, r * 0.72));
    ctx.font         = `${isSel || isHov ? 700 : 600} ${fs}px 'Space Grotesk', sans-serif`;
    ctx.textAlign    = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle    = isSel ? '#fff' : isHov ? '#fff' : col + 'ee';
    ctx.fillText(node.id, x, y);
  }

  // Pulse ring for highly mutated genes
  if (!dimmed && node.mutRate > 20 && r > 9) {
    ctx.beginPath(); ctx.arc(x, y, r + 4 * t.scale, 0, Math.PI * 2);
    ctx.strokeStyle = col + '1e'; ctx.lineWidth = 1; ctx.stroke();
  }
}

function drawMinimap(
  ctx: CanvasRenderingContext2D,
  canvasW: number, canvasH: number, t: T,
  selId: string | null,
) {
  const mW = 120, mH = 78, mX = canvasW - mW - 10, mY = canvasH - mH - 10;
  const mScale = mW / 1980;

  ctx.save();
  ctx.globalAlpha = 0.82;
  ctx.fillStyle   = 'rgba(10,10,20,0.88)';
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.roundRect(mX, mY, mW, mH, 6);
  ctx.fill(); ctx.stroke();

  // Nodes on minimap
  for (const node of PATHWAY_NODES) {
    const nx = mX + node.x * mScale;
    const ny = mY + node.y * (mH / 1280);
    const nr = Math.max(1.5, node.r * mScale * 1.4);
    ctx.beginPath(); ctx.arc(nx, ny, nr, 0, Math.PI * 2);
    ctx.fillStyle = (TYPE_COLORS[node.type] || '#94a3b8') + (selId === node.id ? 'ff' : '88');
    ctx.fill();
  }

  // Viewport rect
  const vx = mX + (-t.x / t.scale) * mScale;
  const vy = mY + (-t.y / t.scale) * (mH / 1280);
  const vw = (1980 / t.scale) * mScale;   // viewport width in world units → minimap
  const vh = (1280 / t.scale) * (mH / 1280);
  ctx.strokeStyle = 'rgba(0,212,255,0.6)';
  ctx.lineWidth   = 1;
  ctx.strokeRect(Math.max(mX, vx), Math.max(mY, vy), Math.min(vw, mW), Math.min(vh, mH));

  ctx.globalAlpha = 1;
  ctx.restore();
}

export default function PathwayCanvas({
  onSelect, filteredIds,
}: {
  onSelect: (g: GeneNode | null) => void;
  filteredIds: Set<string> | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const [transform, setTransform] = useState<T>({ x: 0, y: 0, scale: 0.4 });
  const [hovered,   setHovered]   = useState<string | null>(null);
  const [selected,  setSelected]  = useState<string | null>(null);

  const dragging     = useRef(false);
  const hasDragged   = useRef(false);
  const lastPos      = useRef({ x: 0, y: 0 });
  const tRef         = useRef(transform);
  const hovRef       = useRef(hovered);
  const selRef       = useRef(selected);
  const filtRef      = useRef(filteredIds);
  const connRef      = useRef<Set<string>>(new Set());
  const frameRef     = useRef(0);

  useEffect(() => { tRef.current   = transform;    }, [transform]);
  useEffect(() => { hovRef.current = hovered;      }, [hovered]);
  useEffect(() => {
    selRef.current  = selected;
    connRef.current = selected ? getConnected(selected) : (hovered ? getConnected(hovered) : new Set());
  }, [selected, hovered]);
  useEffect(() => { filtRef.current = filteredIds; }, [filteredIds]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    if (width > 0) setTransform(fit(width, height));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      const { width: w, height: h } = container.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      canvas.width = w * d; canvas.height = h * d;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.resetTransform(); ctx.scale(d, d);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const draw = () => {
      frameRef.current += 0.016;
      const t   = tRef.current;
      const d   = window.devicePixelRatio || 1;
      const W   = canvas.width / d, H = canvas.height / d;
      ctx.clearRect(0, 0, W, H);

      for (const reg of PATHWAY_REGIONS) drawRegion(ctx, reg, t);

      const filt = filtRef.current;
      const hov  = hovRef.current, sel = selRef.current;
      const conn = connRef.current;

      for (const edge of PATHWAY_EDGES) {
        if (filt && !filt.has(edge.from) && !filt.has(edge.to)) continue;
        drawEdge(ctx, edge, t, hov, sel, frameRef.current);
      }

      for (const node of PATHWAY_NODES) {
        const dimmed    = filt !== null && !filt.has(node.id);
        const isConn    = !dimmed && conn.has(node.id) && node.id !== sel && node.id !== hov;
        drawNode(ctx, node, t, hov === node.id, sel === node.id, dimmed, isConn);
      }

      drawMinimap(ctx, W, H, t, sel);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  const getPos = (e: React.MouseEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragging.current = true; hasDragged.current = false;
    lastPos.current  = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging.current) {
      const dx = e.clientX - lastPos.current.x, dy = e.clientY - lastPos.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) hasDragged.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
    } else {
      const p   = getPos(e);
      const hit = hitNode(p.x, p.y, tRef.current);
      const id  = hit?.id ?? null;
      if (id !== hovRef.current) {
        setHovered(id);
        if (!selRef.current) connRef.current = id ? getConnected(id) : new Set();
        if (canvasRef.current) canvasRef.current.style.cursor = id ? 'pointer' : 'grab';
      }
    }
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    const wasDrag = hasDragged.current;
    dragging.current = false; hasDragged.current = false;
    if (wasDrag) return;
    const p   = getPos(e);
    const hit = hitNode(p.x, p.y, tRef.current);
    if (hit) {
      setSelected(hit.id);
      connRef.current = getConnected(hit.id);
      onSelect(hit);
    } else {
      setSelected(null);
      connRef.current = hovRef.current ? getConnected(hovRef.current) : new Set();
      onSelect(null);
    }
  }, [onSelect]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const p = getPos(e);
    const f = e.deltaY > 0 ? 0.88 : 1.12;
    setTransform(t => {
      const s = Math.max(0.1, Math.min(2.8, t.scale * f));
      return { scale: s, x: p.x - (p.x - t.x) * (s / t.scale), y: p.y - (p.y - t.y) * (s / t.scale) };
    });
  }, []);

  // Touch
  const lastTouch     = useRef<{ x:number; y:number } | null>(null);
  const lastPinchDist = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) { lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; hasDragged.current = false; }
    else if (e.touches.length === 2) { lastPinchDist.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && lastTouch.current) {
      const dx = e.touches[0].clientX - lastTouch.current.x, dy = e.touches[0].clientY - lastTouch.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) hasDragged.current = true;
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
    } else if (e.touches.length === 2 && lastPinchDist.current) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const f = d / lastPinchDist.current; lastPinchDist.current = d;
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const r  = canvasRef.current!.getBoundingClientRect();
      const px = cx - r.left, py = cy - r.top;
      setTransform(t => { const s = Math.max(0.1, Math.min(2.8, t.scale * f)); return { scale: s, x: px - (px - t.x) * (s / t.scale), y: py - (py - t.y) * (s / t.scale) }; });
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!hasDragged.current && lastTouch.current) {
      const r     = canvasRef.current!.getBoundingClientRect();
      const touch = e.changedTouches[0];
      const hit   = hitNode(touch.clientX - r.left, touch.clientY - r.top, tRef.current);
      if (hit) { setSelected(hit.id); connRef.current = getConnected(hit.id); onSelect(hit); }
    }
    lastTouch.current = null; lastPinchDist.current = null; hasDragged.current = false;
  };

  const zoom = (f: number) => setTransform(t => {
    const s  = Math.max(0.1, Math.min(2.8, t.scale * f));
    const el = containerRef.current;
    if (!el) return { ...t, scale: s };
    const { width: w, height: h } = el.getBoundingClientRect();
    return { scale: s, x: w / 2 - (w / 2 - t.x) * (s / t.scale), y: h / 2 - (h / 2 - t.y) * (s / t.scale) };
  });

  const reset = () => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setTransform(fit(width, height));
    setSelected(null); connRef.current = new Set(); onSelect(null);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', flex: 1, overflow: 'hidden', background: '#06060f', minHeight: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', cursor: 'grab', touchAction: 'none' }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { dragging.current = false; setHovered(null); }}
        onWheel={onWheel}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      />

      {/* Zoom controls */}
      <div className="map-controls">
        {([['＋', 1.3], ['－', 1 / 1.3], ['⌂', 0]] as [string, number][]).map(([l, f]) => (
          <button key={l} onClick={() => f === 0 ? reset() : zoom(f)} className="map-btn">{l}</button>
        ))}
      </div>

      {/* Legend */}
      <div className="map-legend">
        {Object.entries(TYPE_COLORS).map(([type, col]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: col, flexShrink: 0 }} />
            <span style={{ textTransform: 'capitalize', fontSize: '0.67rem', color: 'var(--text3)' }}>{type}</span>
          </div>
        ))}
        <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
        <div style={{ fontSize: '0.62rem', color: 'var(--text3)' }}>→ activation</div>
        <div style={{ fontSize: '0.62rem', color: 'var(--text3)' }}>- - inhibition</div>
      </div>

      <div className="map-hint">Scroll/pinch to zoom · Drag to pan · Click gene</div>
    </div>
  );
}
