'use client';
import { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { PATHWAY_NODES, PATHWAY_EDGES, PATHWAY_REGIONS } from '@/data/pathway-data';
import type { GeneNode, PathwayEdge, PathwayRegion } from '@/lib/types';

const TYPE_COLORS: Record<string, string> = {
  oncogene: '#ef4444',
  suppressor: '#3b82f6',
  kinase: '#f59e0b',
  adapter: '#94a3b8',
  other: '#10b981',
};

interface T { x: number; y: number; scale: number; }

function fitTransform(w: number, h: number): T {
  const worldW = 1980;
  const worldH = 1280;
  const scale = Math.min((w / worldW) * 0.88, (h / worldH) * 0.88, 0.52);
  return { x: (w - worldW * scale) / 2, y: (h - worldH * scale) / 2 + 20, scale };
}

function worldToScreen(wx: number, wy: number, t: T) {
  return { x: t.x + wx * t.scale, y: t.y + wy * t.scale };
}

function screenToWorld(sx: number, sy: number, t: T) {
  return { x: (sx - t.x) / t.scale, y: (sy - t.y) / t.scale };
}

function getHitNode(mx: number, my: number, t: T): GeneNode | null {
  const { x: wx, y: wy } = screenToWorld(mx, my, t);
  let best: GeneNode | null = null;
  let bestDist = Infinity;
  for (const node of PATHWAY_NODES) {
    const dx = wx - node.x, dy = wy - node.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hitR = node.r + Math.max(6, 10 / t.scale);
    if (dist < hitR && dist < bestDist) { best = node; bestDist = dist; }
  }
  return best;
}

function drawRegion(ctx: CanvasRenderingContext2D, region: PathwayRegion, t: T) {
  const x = t.x + region.x * t.scale;
  const y = t.y + region.y * t.scale;
  const w = region.w * t.scale;
  const h = region.h * t.scale;
  ctx.save();
  ctx.beginPath();
  const r = 14;
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = region.color + '09';
  ctx.fill();
  ctx.strokeStyle = region.color + '22';
  ctx.lineWidth = 1;
  ctx.stroke();
  if (t.scale > 0.22) {
    ctx.fillStyle = region.color + 'bb';
    const fs = Math.max(9, Math.min(13, 11.5 * t.scale));
    ctx.font = `700 ${fs}px Inter, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(region.label, x + 12, y + 10);
  }
  ctx.restore();
}

function drawEdge(ctx: CanvasRenderingContext2D, edge: PathwayEdge, t: T, hovId: string | null) {
  const from = PATHWAY_NODES.find(n => n.id === edge.from);
  const to = PATHWAY_NODES.find(n => n.id === edge.to);
  if (!from || !to) return;

  const isHov = edge.from === hovId || edge.to === hovId;
  const fs = worldToScreen(from.x, from.y, t);
  const ts = worldToScreen(to.x, to.y, t);
  const dx = ts.x - fs.x, dy = ts.y - fs.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return;

  const nx = -dy / len, ny = dx / len;
  const c = (edge.curve || 0) * t.scale * 0.55;
  const cpX = (fs.x + ts.x) / 2 + nx * c + (dx / len) * ((edge.curveY || 0) * t.scale * 0.4);
  const cpY = (fs.y + ts.y) / 2 + ny * c + (dy / len) * ((edge.curveY || 0) * t.scale * 0.4);

  // Shrink endpoints to node edge
  const fromR = (from.r + 2) * t.scale;
  const sdx = cpX - fs.x, sdy = cpY - fs.y;
  const slen = Math.sqrt(sdx * sdx + sdy * sdy) || 1;
  const sx = fs.x + (sdx / slen) * fromR;
  const sy = fs.y + (sdy / slen) * fromR;

  const toR = (to.r + 2) * t.scale;
  const edx = ts.x - cpX, edy = ts.y - cpY;
  const elen = Math.sqrt(edx * edx + edy * edy) || 1;
  const ex = ts.x - (edx / elen) * toR;
  const ey = ts.y - (edy / elen) * toR;

  const isInhib = edge.type === 'inhibition';
  const col = isInhib ? '#ef4444' : (edge.particleColor || '#94a3b8');
  const alpha = isHov ? '80' : '2e';

  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.quadraticCurveTo(cpX, cpY, ex, ey);
  ctx.strokeStyle = col + alpha;
  ctx.lineWidth = isHov ? Math.max(1.5, 2 * t.scale) : Math.max(0.6, 1.2 * t.scale);
  if (isInhib) ctx.setLineDash([4 * t.scale, 3 * t.scale]);
  ctx.stroke();
  ctx.setLineDash([]);

  const angle = Math.atan2(ey - cpY, ex - cpX);
  const aSize = Math.max(3.5, 6 * t.scale);
  if (isInhib) {
    ctx.beginPath();
    ctx.moveTo(ex + Math.sin(angle) * aSize * 0.7, ey - Math.cos(angle) * aSize * 0.7);
    ctx.lineTo(ex - Math.sin(angle) * aSize * 0.7, ey + Math.cos(angle) * aSize * 0.7);
    ctx.strokeStyle = '#ef4444' + (isHov ? '99' : '45');
    ctx.lineWidth = Math.max(1, 2 * t.scale);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - aSize * Math.cos(angle - 0.42), ey - aSize * Math.sin(angle - 0.42));
    ctx.lineTo(ex - aSize * Math.cos(angle + 0.42), ey - aSize * Math.sin(angle + 0.42));
    ctx.closePath();
    ctx.fillStyle = col + (isHov ? '90' : '45');
    ctx.fill();
  }
}

function drawNode(ctx: CanvasRenderingContext2D, node: GeneNode, t: T, isHov: boolean, isSel: boolean, dimmed: boolean) {
  const { x, y } = worldToScreen(node.x, node.y, t);
  const r = node.r * t.scale;
  const col = TYPE_COLORS[node.type] || '#94a3b8';

  if (isHov || isSel) {
    const glowR = r + (isSel ? 10 : 6) * t.scale;
    const grad = ctx.createRadialGradient(x, y, r * 0.5, x, y, glowR);
    grad.addColorStop(0, col + (isSel ? '50' : '30'));
    grad.addColorStop(1, col + '00');
    ctx.beginPath();
    ctx.arc(x, y, glowR, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = dimmed ? col + '08' : isSel ? col + '38' : isHov ? col + '28' : col + '16';
  ctx.fill();
  ctx.strokeStyle = col + (dimmed ? '18' : isSel ? 'ff' : isHov ? 'cc' : '72');
  ctx.lineWidth = isSel ? Math.max(2, 2.5 * t.scale) : Math.max(0.7, 1.4 * t.scale);
  ctx.stroke();

  if (r > 5 && !dimmed) {
    const fs = Math.max(7.5, Math.min(14, r * 0.75));
    ctx.fillStyle = isSel ? '#ffffff' : isHov ? '#ffffff' : col + 'ee';
    ctx.font = `${isSel || isHov ? 700 : 600} ${fs}px 'Space Grotesk', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.id, x, y);
  }

  // Pulse ring for high mutation rate
  if (!dimmed && node.mutRate > 20 && r > 10) {
    ctx.beginPath();
    ctx.arc(x, y, r + 4 * t.scale, 0, Math.PI * 2);
    ctx.strokeStyle = col + '22';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

export default function PathwayCanvas({
  onSelect,
  filteredIds,
}: {
  onSelect: (g: GeneNode | null) => void;
  filteredIds: Set<string> | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [transform, setTransform] = useState<T>({ x: 0, y: 0, scale: 0.4 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const dragging = useRef(false);
  const hasDragged = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const tRef = useRef(transform);
  const hovRef = useRef(hovered);
  const selRef = useRef(selected);
  const filtRef = useRef(filteredIds);

  useEffect(() => { tRef.current = transform; }, [transform]);
  useEffect(() => { hovRef.current = hovered; }, [hovered]);
  useEffect(() => { selRef.current = selected; }, [selected]);
  useEffect(() => { filtRef.current = filteredIds; }, [filteredIds]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    if (width > 0) setTransform(fitTransform(width, height));
  }, []);

  // Canvas draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const draw = () => {
      const t = tRef.current;
      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, W, H);

      for (const reg of PATHWAY_REGIONS) drawRegion(ctx, reg, t);

      const filt = filtRef.current;
      for (const edge of PATHWAY_EDGES) {
        if (filt && !filt.has(edge.from) && !filt.has(edge.to)) continue;
        drawEdge(ctx, edge, t, hovRef.current);
      }

      for (const node of PATHWAY_NODES) {
        const dimmed = filt !== null && !filt.has(node.id);
        drawNode(ctx, node, t, hovRef.current === node.id, selRef.current === node.id, dimmed);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  const getPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragging.current = true;
    hasDragged.current = false;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging.current) {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) hasDragged.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
    } else {
      const pos = getPos(e);
      const hit = getHitNode(pos.x, pos.y, tRef.current);
      const id = hit?.id ?? null;
      if (id !== hovRef.current) {
        setHovered(id);
        if (canvasRef.current) canvasRef.current.style.cursor = id ? 'pointer' : 'grab';
      }
    }
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    const wasDrag = hasDragged.current;
    dragging.current = false;
    hasDragged.current = false;
    if (wasDrag) return;
    const pos = getPos(e);
    const hit = getHitNode(pos.x, pos.y, tRef.current);
    if (hit) {
      setSelected(hit.id);
      onSelect(hit);
    } else {
      setSelected(null);
      onSelect(null);
    }
  }, [onSelect]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const pos = getPos(e);
    const factor = e.deltaY > 0 ? 0.88 : 1.12;
    setTransform(t => {
      const s = Math.max(0.1, Math.min(2.8, t.scale * factor));
      return { scale: s, x: pos.x - (pos.x - t.x) * (s / t.scale), y: pos.y - (pos.y - t.y) * (s / t.scale) };
    });
  }, []);

  // Touch support
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDist = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      hasDragged.current = false;
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDist.current = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && lastTouch.current) {
      const dx = e.touches[0].clientX - lastTouch.current.x;
      const dy = e.touches[0].clientY - lastTouch.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) hasDragged.current = true;
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
    } else if (e.touches.length === 2 && lastPinchDist.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const factor = dist / lastPinchDist.current;
      lastPinchDist.current = dist;
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const rect = canvasRef.current!.getBoundingClientRect();
      const cx = midX - rect.left, cy = midY - rect.top;
      setTransform(t => {
        const s = Math.max(0.1, Math.min(2.8, t.scale * factor));
        return { scale: s, x: cx - (cx - t.x) * (s / t.scale), y: cy - (cy - t.y) * (s / t.scale) };
      });
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!hasDragged.current && lastTouch.current) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const touch = e.changedTouches[0];
      const pos = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      const hit = getHitNode(pos.x, pos.y, tRef.current);
      if (hit) { setSelected(hit.id); onSelect(hit); }
    }
    lastTouch.current = null;
    lastPinchDist.current = null;
    hasDragged.current = false;
  };

  const zoom = (factor: number) => setTransform(t => {
    const s = Math.max(0.1, Math.min(2.8, t.scale * factor));
    const el = containerRef.current;
    if (!el) return { ...t, scale: s };
    const { width, height } = el.getBoundingClientRect();
    return { scale: s, x: width / 2 - (width / 2 - t.x) * (s / t.scale), y: height / 2 - (height / 2 - t.y) * (s / t.scale) };
  });

  const reset = () => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setTransform(fitTransform(width, height));
    setSelected(null);
    onSelect(null);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', flex: 1, overflow: 'hidden', background: '#070710', minHeight: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', cursor: 'grab', touchAction: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { dragging.current = false; setHovered(null); }}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {/* Zoom controls */}
      <div className="map-controls">
        {([['＋', 1.3], ['－', 1 / 1.3], ['⌂', 0]] as [string, number][]).map(([label, f]) => (
          <button key={label} onClick={() => f === 0 ? reset() : zoom(f)} className="map-btn">
            {label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="map-legend">
        {Object.entries(TYPE_COLORS).map(([type, col]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: col, flexShrink: 0 }} />
            <span style={{ textTransform: 'capitalize', fontSize: '0.68rem', color: 'var(--text3)' }}>{type}</span>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="map-hint">
        Scroll/pinch to zoom · Drag to pan · Tap a gene
      </div>
    </div>
  );
}
