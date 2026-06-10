// GeneLens AI — PathwayMap: Google Maps-style interactive pathway engine
'use strict';

class PathwayMap {
  constructor(canvas, nodes, edges, regions, opts = {}) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.nodes  = nodes;
    this.edges  = edges;
    this.regions = regions;

    // viewport transform
    this.scale   = 0.38;
    this.offsetX = -160;
    this.offsetY = -30;
    this.minScale = 0.18;
    this.maxScale = 2.2;

    // interaction state
    this._dragging   = false;
    this._dragStart  = { x: 0, y: 0 };
    this._lastOffset = { x: 0, y: 0 };
    this._pinchDist  = null;

    // selected / hovered
    this.selectedNode = null;
    this.hoveredNode  = null;

    // active layer: 'default' | 'drugs' | 'heatmap'
    this.layer = opts.layer || 'default';

    // cancer filter: null = all
    this.activeCancer = null;

    // callbacks
    this.onNodeSelect = opts.onNodeSelect || (() => {});

    // particles
    this._particles = [];
    this._particleTimer = 0;

    // animation frame
    this._raf = null;
    this._lastTime = 0;

    // mini-map state
    this.miniW = 160;
    this.miniH = 100;
    this.WORLD_W = 1900;
    this.WORLD_H = 1400;

    this._bindEvents();
    this._spawnParticles();
    this._loop(0);
  }

  // ── public API ────────────────────────────────────────────

  setLayer(layer) { this.layer = layer; }

  setCancer(cancerCode) {
    this.activeCancer = cancerCode || null;
  }

  panToNode(nodeId, done) {
    const nd = this.nodes.find(n => n.id === nodeId);
    if (!nd) return;
    const targetScale = Math.max(this.scale, 0.9);
    const cw = this.canvas.width, ch = this.canvas.height;
    const targetOffX = cw / 2 - nd.x * targetScale;
    const targetOffY = ch / 2 - nd.y * targetScale;

    const startScale  = this.scale;
    const startOffX   = this.offsetX;
    const startOffY   = this.offsetY;
    const duration    = 600;
    const startTime   = performance.now();

    const animate = (t) => {
      const p = Math.min((t - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      this.scale   = startScale  + (targetScale - startScale)  * ease;
      this.offsetX = startOffX   + (targetOffX  - startOffX)   * ease;
      this.offsetY = startOffY   + (targetOffY  - startOffY)   * ease;
      if (p < 1) { requestAnimationFrame(animate); }
      else {
        this.selectedNode = nd;
        this.onNodeSelect(nd);
        if (done) done();
      }
    };
    requestAnimationFrame(animate);
  }

  destroy() {
    cancelAnimationFrame(this._raf);
    this._unbindEvents();
  }

  // ── events ────────────────────────────────────────────────

  _bindEvents() {
    const c = this.canvas;
    this._onWheel     = this._handleWheel.bind(this);
    this._onMouseDown = this._handleMouseDown.bind(this);
    this._onMouseMove = this._handleMouseMove.bind(this);
    this._onMouseUp   = this._handleMouseUp.bind(this);
    this._onDblClick  = this._handleDblClick.bind(this);
    this._onTouchStart= this._handleTouchStart.bind(this);
    this._onTouchMove = this._handleTouchMove.bind(this);
    this._onTouchEnd  = this._handleTouchEnd.bind(this);

    c.addEventListener('wheel',      this._onWheel,      { passive: false });
    c.addEventListener('mousedown',  this._onMouseDown);
    c.addEventListener('mousemove',  this._onMouseMove);
    c.addEventListener('mouseup',    this._onMouseUp);
    c.addEventListener('mouseleave', this._onMouseUp);
    c.addEventListener('dblclick',   this._onDblClick);
    c.addEventListener('touchstart', this._onTouchStart, { passive: false });
    c.addEventListener('touchmove',  this._onTouchMove,  { passive: false });
    c.addEventListener('touchend',   this._onTouchEnd);
  }

  _unbindEvents() {
    const c = this.canvas;
    c.removeEventListener('wheel',      this._onWheel);
    c.removeEventListener('mousedown',  this._onMouseDown);
    c.removeEventListener('mousemove',  this._onMouseMove);
    c.removeEventListener('mouseup',    this._onMouseUp);
    c.removeEventListener('mouseleave', this._onMouseUp);
    c.removeEventListener('dblclick',   this._onDblClick);
    c.removeEventListener('touchstart', this._onTouchStart);
    c.removeEventListener('touchmove',  this._onTouchMove);
    c.removeEventListener('touchend',   this._onTouchEnd);
  }

  _handleWheel(e) {
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    this._zoomAt(mx, my, factor);
  }

  _zoomAt(mx, my, factor) {
    const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale * factor));
    const ratio = newScale / this.scale;
    this.offsetX = mx - ratio * (mx - this.offsetX);
    this.offsetY = my - ratio * (my - this.offsetY);
    this.scale = newScale;
  }

  _handleMouseDown(e) {
    this._dragging   = true;
    this._dragStart  = { x: e.clientX, y: e.clientY };
    this._lastOffset = { x: this.offsetX, y: this.offsetY };
    this.canvas.style.cursor = 'grabbing';
  }

  _handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (this._dragging) {
      this.offsetX = this._lastOffset.x + (e.clientX - this._dragStart.x);
      this.offsetY = this._lastOffset.y + (e.clientY - this._dragStart.y);
      this.canvas.style.cursor = 'grabbing';
      this.hoveredNode = null;
      return;
    }

    // hover detection
    const wx = (mx - this.offsetX) / this.scale;
    const wy = (my - this.offsetY) / this.scale;
    const hit = this._hitNode(wx, wy);
    this.hoveredNode = hit;
    this.canvas.style.cursor = hit ? 'pointer' : 'grab';
  }

  _handleMouseUp(e) {
    if (!this._dragging) return;
    const dx = e.clientX - this._dragStart.x;
    const dy = e.clientY - this._dragStart.y;
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      // click
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      this._handleClick(mx, my);
    }
    this._dragging = false;
    this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'grab';
  }

  _handleDblClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    this._zoomAt(e.clientX - rect.left, e.clientY - rect.top, 1.5);
  }

  _handleClick(mx, my) {
    const wx = (mx - this.offsetX) / this.scale;
    const wy = (my - this.offsetY) / this.scale;
    const nd = this._hitNode(wx, wy);
    if (nd) {
      this.selectedNode = nd;
      this.onNodeSelect(nd);
    } else {
      // check mini-map click
      const mmLeft = this.canvas.width  - this.miniW - 12;
      const mmTop  = this.canvas.height - this.miniH - 12;
      if (mx >= mmLeft && mx <= mmLeft + this.miniW &&
          my >= mmTop  && my <= mmTop  + this.miniH) {
        const wPct = (mx - mmLeft) / this.miniW;
        const hPct = (my - mmTop)  / this.miniH;
        this.offsetX = this.canvas.width  / 2 - wPct * this.WORLD_W * this.scale;
        this.offsetY = this.canvas.height / 2 - hPct * this.WORLD_H * this.scale;
      }
    }
  }

  _handleTouchStart(e) {
    e.preventDefault();
    if (e.touches.length === 2) {
      this._pinchDist = this._getTouchDist(e.touches);
    } else {
      this._dragging   = true;
      this._dragStart  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      this._lastOffset = { x: this.offsetX, y: this.offsetY };
    }
  }

  _handleTouchMove(e) {
    e.preventDefault();
    if (e.touches.length === 2 && this._pinchDist !== null) {
      const newDist = this._getTouchDist(e.touches);
      const factor  = newDist / this._pinchDist;
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const rect = this.canvas.getBoundingClientRect();
      this._zoomAt(cx - rect.left, cy - rect.top, factor);
      this._pinchDist = newDist;
    } else if (this._dragging && e.touches.length === 1) {
      this.offsetX = this._lastOffset.x + (e.touches[0].clientX - this._dragStart.x);
      this.offsetY = this._lastOffset.y + (e.touches[0].clientY - this._dragStart.y);
    }
  }

  _handleTouchEnd(e) {
    this._dragging  = false;
    this._pinchDist = null;
  }

  _getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  _hitNode(wx, wy) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i];
      const r = (n.r || 18) + 4;
      if ((wx - n.x) ** 2 + (wy - n.y) ** 2 <= r * r) return n;
    }
    return null;
  }

  // ── particles ────────────────────────────────────────────

  _spawnParticles() {
    const activationEdges = this.edges.filter(e => e.type === 'activation');
    this._particles = [];
    const count = Math.min(activationEdges.length * 2, 80);
    for (let i = 0; i < count; i++) {
      const edge = activationEdges[i % activationEdges.length];
      this._particles.push(this._makeParticle(edge, Math.random()));
    }
  }

  _makeParticle(edge, t = 0) {
    const fromNode = this.nodes.find(n => n.id === edge.from);
    const toNode   = this.nodes.find(n => n.id === edge.to);
    return {
      edge,
      fromNode,
      toNode,
      t,
      speed: 0.002 + Math.random() * 0.003,
      color: edge.particleColor || '#00d4ff',
      size:  2 + Math.random() * 2,
    };
  }

  _updateParticles(dt) {
    for (let i = 0; i < this._particles.length; i++) {
      const p = this._particles[i];
      p.t += p.speed * dt * 0.06;
      if (p.t >= 1) {
        // respawn on same or new edge
        const activationEdges = this.edges.filter(e => e.type === 'activation');
        const edge = activationEdges[Math.floor(Math.random() * activationEdges.length)];
        this._particles[i] = this._makeParticle(edge, 0);
      }
    }
  }

  _getEdgePoint(fromNode, toNode, edge, t) {
    const x1 = fromNode.x, y1 = fromNode.y;
    const x2 = toNode.x,   y2 = toNode.y;
    const curve = edge.curve || 0;
    if (curve === 0) {
      return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t };
    }
    // quadratic bezier
    const mx = (x1 + x2) / 2 + curve * (-(y2 - y1) / Math.sqrt((x2-x1)**2 + (y2-y1)**2 + 1));
    const my = (y1 + y2) / 2 + curve * ((x2 - x1)  / Math.sqrt((x2-x1)**2 + (y2-y1)**2 + 1));
    const it = 1 - t;
    return {
      x: it * it * x1 + 2 * it * t * mx + t * t * x2,
      y: it * it * y1 + 2 * it * t * my + t * t * y2,
    };
  }

  // ── render ────────────────────────────────────────────────

  _loop(time) {
    const dt = time - this._lastTime;
    this._lastTime = time;
    this._updateParticles(dt || 16);
    this._draw();
    this._raf = requestAnimationFrame(t => this._loop(t));
  }

  _draw() {
    const { ctx, canvas, scale, offsetX, offsetY } = this;
    const cw = canvas.width, ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    // background
    const bg = ctx.createRadialGradient(cw/2, ch/2, 0, cw/2, ch/2, cw*0.8);
    bg.addColorStop(0, '#0d1829');
    bg.addColorStop(1, '#050a14');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, cw, ch);

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    const zoomLevel = scale < 0.32 ? 'low' : scale < 0.75 ? 'medium' : 'high';

    if (zoomLevel === 'low') {
      this._drawRegions();
    } else {
      this._drawGrid();
      this._drawEdges(zoomLevel);
      this._drawParticles(zoomLevel);
      this._drawNodes(zoomLevel);
    }

    ctx.restore();

    this._drawMiniMap();
    this._drawZoomHint(zoomLevel);
  }

  _drawGrid() {
    const { ctx, offsetX, offsetY, scale, canvas } = this;
    const step = 100;
    // compute world-space viewport bounds
    const wx0 = -offsetX / scale;
    const wy0 = -offsetY / scale;
    const wx1 = wx0 + canvas.width  / scale;
    const wy1 = wy0 + canvas.height / scale;
    const sx = Math.floor(wx0 / step) * step;
    const sy = Math.floor(wy0 / step) * step;

    ctx.strokeStyle = 'rgba(0,212,255,0.04)';
    ctx.lineWidth = 1 / scale;
    for (let x = sx; x < wx1; x += step) {
      ctx.beginPath(); ctx.moveTo(x, wy0); ctx.lineTo(x, wy1); ctx.stroke();
    }
    for (let y = sy; y < wy1; y += step) {
      ctx.beginPath(); ctx.moveTo(wx0, y); ctx.lineTo(wx1, y); ctx.stroke();
    }
  }

  _drawRegions() {
    const { ctx } = this;
    for (const reg of this.regions) {
      const alpha = 0.13;
      ctx.fillStyle = reg.color + '22';
      ctx.strokeStyle = reg.color + '55';
      ctx.lineWidth = 3;
      const r = 24;
      const x = reg.x - reg.w / 2, y = reg.y - reg.h / 2;
      ctx.beginPath();
      ctx.roundRect(x, y, reg.w, reg.h, r);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = reg.color;
      ctx.font = 'bold 28px Inter,sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // newlines
      const lines = reg.label.split('\n');
      lines.forEach((l, i) => {
        ctx.fillText(l, reg.x, reg.y + (i - (lines.length - 1) / 2) * 34);
      });
    }
  }

  _drawEdges(zoomLevel) {
    const { ctx, nodes } = this;
    for (const edge of this.edges) {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode   = nodes.find(n => n.id === edge.to);
      if (!fromNode || !toNode) continue;

      // cancer filter — dim edges whose nodes don't match
      const dimmed = this.activeCancer &&
        !(fromNode.cancers || []).includes(this.activeCancer) &&
        !(toNode.cancers   || []).includes(this.activeCancer);

      const alpha = dimmed ? 0.08 : (edge.type === 'activation' ? 0.5 : 0.4);
      const color = edge.type === 'activation' ? '#00d4ff' : '#ef4444';
      ctx.strokeStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0');
      ctx.lineWidth   = 1.5 / this.scale;
      ctx.setLineDash(edge.type === 'inhibition' ? [8 / this.scale, 4 / this.scale] : []);

      const x1 = fromNode.x, y1 = fromNode.y;
      const x2 = toNode.x,   y2 = toNode.y;
      const curve = edge.curve || 0;

      ctx.beginPath();
      if (curve !== 0) {
        const dLen = Math.sqrt((x2-x1)**2 + (y2-y1)**2) || 1;
        const mx = (x1 + x2) / 2 + curve * (-(y2 - y1) / dLen);
        const my = (y1 + y2) / 2 + curve * ((x2 - x1)  / dLen);
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(mx, my, x2, y2);
      } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // arrowhead
      if (!dimmed) this._drawArrow(x1, y1, x2, y2, edge.curve || 0, color, alpha);

      // edge label at high zoom
      if (zoomLevel === 'high' && edge.label && !dimmed) {
        ctx.fillStyle = 'rgba(180,200,230,0.7)';
        ctx.font = `${10 / this.scale}px Inter,sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(edge.label, (x1 + x2) / 2, (y1 + y2) / 2 - 6 / this.scale);
      }
    }
  }

  _drawArrow(x1, y1, x2, y2, curve, color, alpha) {
    const { ctx } = this;
    const dLen = Math.sqrt((x2-x1)**2+(y2-y1)**2) || 1;
    let ax, ay;
    if (curve !== 0) {
      const mx = (x1 + x2) / 2 + curve * (-(y2 - y1) / dLen);
      const my = (y1 + y2) / 2 + curve * ((x2 - x1)  / dLen);
      ax = x2 - mx; ay = y2 - my;
    } else {
      ax = x2 - x1; ay = y2 - y1;
    }
    const alen = Math.sqrt(ax*ax+ay*ay) || 1;
    ax /= alen; ay /= alen;
    const sz = 10 / this.scale;
    const px = -ay, py = ax;
    ctx.fillStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0');
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ax * sz + px * sz * 0.4, y2 - ay * sz + py * sz * 0.4);
    ctx.lineTo(x2 - ax * sz - px * sz * 0.4, y2 - ay * sz - py * sz * 0.4);
    ctx.closePath();
    ctx.fill();
  }

  _drawParticles(zoomLevel) {
    if (zoomLevel === 'low') return;
    const { ctx } = this;
    for (const p of this._particles) {
      if (!p.fromNode || !p.toNode) continue;
      const dimmed = this.activeCancer &&
        !(p.fromNode.cancers || []).includes(this.activeCancer) &&
        !(p.toNode.cancers   || []).includes(this.activeCancer);
      if (dimmed) continue;

      const pos = this._getEdgePoint(p.fromNode, p.toNode, p.edge, p.t);
      const alpha = Math.sin(p.t * Math.PI) * 0.9;
      const r = p.size / this.scale;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, '0');
      ctx.fill();

      // glow
      const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r * 3);
      grd.addColorStop(0, p.color + '55');
      grd.addColorStop(1, p.color + '00');
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }
  }

  _drawNodes(zoomLevel) {
    const { ctx } = this;
    for (const nd of this.nodes) {
      const isSelected = this.selectedNode && this.selectedNode.id === nd.id;
      const isHovered  = this.hoveredNode  && this.hoveredNode.id  === nd.id;
      const dimmed = this.activeCancer && !(nd.cancers || []).includes(this.activeCancer);

      const r    = nd.r || 18;
      const baseAlpha = dimmed ? 0.18 : 1;

      // glow ring for selected/hovered
      if ((isSelected || isHovered) && !dimmed) {
        const grd = ctx.createRadialGradient(nd.x, nd.y, r, nd.x, nd.y, r * 2.5);
        grd.addColorStop(0, nd.color + 'aa');
        grd.addColorStop(1, nd.color + '00');
        ctx.beginPath(); ctx.arc(nd.x, nd.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      }

      // node body
      let fillColor = nd.color;
      if (this.layer === 'heatmap') {
        const heat = Math.min(nd.mutRate / 40, 1);
        fillColor = this._heatColor(heat);
      } else if (this.layer === 'drugs') {
        fillColor = (nd.drugs && nd.drugs.length > 0) ? '#10b981' : '#334155';
      }

      ctx.beginPath(); ctx.arc(nd.x, nd.y, r, 0, Math.PI * 2);
      ctx.fillStyle = fillColor + (dimmed ? '30' : 'dd');
      ctx.fill();
      ctx.strokeStyle = isSelected ? '#ffffff' : (isHovered ? '#ffffffaa' : fillColor);
      ctx.lineWidth = (isSelected ? 3 : 1.5) / this.scale;
      ctx.stroke();

      // type icon at medium/high zoom
      if (zoomLevel !== 'low') {
        const icon = nd.type === 'suppressor' ? '🛡' : nd.type === 'oncogene' ? '⚡' : nd.type === 'kinase' ? '🔑' : '●';
        if (zoomLevel === 'high') {
          ctx.font = `${Math.round(r * 0.85)}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(icon, nd.x, nd.y);
        }
      }

      // label
      if (!dimmed) {
        ctx.fillStyle = '#e2e8f0';
        const fontSize = zoomLevel === 'high' ? 12 / this.scale : 9 / this.scale;
        ctx.font = `bold ${fontSize}px Inter,sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(nd.id, nd.x, nd.y + r + 3 / this.scale);
      }

      // mutation rate badge at high zoom
      if (zoomLevel === 'high' && !dimmed && nd.mutRate > 0) {
        const bx = nd.x + r * 0.7, by = nd.y - r * 0.7;
        const br = 8 / this.scale;
        ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${9 / this.scale}px Inter,sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillText(nd.mutRate + '%', bx, by);
      }
    }
  }

  _heatColor(t) {
    // 0=blue, 0.5=yellow, 1=red
    const r = Math.round(255 * Math.min(t * 2, 1));
    const g = Math.round(255 * (1 - Math.abs(t * 2 - 1)));
    const b = Math.round(255 * Math.max(0, 1 - t * 2));
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  }

  // ── mini-map ──────────────────────────────────────────────

  _drawMiniMap() {
    const { ctx, canvas, miniW, miniH, WORLD_W, WORLD_H } = this;
    const ml = canvas.width  - miniW - 12;
    const mt = canvas.height - miniH - 12;

    // background
    ctx.fillStyle = 'rgba(5,10,20,0.88)';
    ctx.strokeStyle = 'rgba(0,212,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(ml, mt, miniW, miniH, 6);
    else ctx.rect(ml, mt, miniW, miniH);
    ctx.fill(); ctx.stroke();

    // nodes on mini-map
    for (const nd of this.nodes) {
      const mx = ml + (nd.x / WORLD_W) * miniW;
      const my = mt + (nd.y / WORLD_H) * miniH;
      ctx.beginPath();
      ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = nd.color + 'cc';
      ctx.fill();
    }

    // viewport rect
    const vx0 = -this.offsetX / this.scale;
    const vy0 = -this.offsetY / this.scale;
    const vx1 = vx0 + canvas.width  / this.scale;
    const vy1 = vy0 + canvas.height / this.scale;
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(
      ml + (vx0 / WORLD_W) * miniW,
      mt + (vy0 / WORLD_H) * miniH,
      ((vx1 - vx0) / WORLD_W) * miniW,
      ((vy1 - vy0) / WORLD_H) * miniH
    );
    ctx.stroke();

    // label
    ctx.fillStyle = 'rgba(148,163,184,0.6)';
    ctx.font = '9px Inter,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('OVERVIEW', ml + miniW / 2, mt - 3);
  }

  _drawZoomHint(zoomLevel) {
    const { ctx, canvas } = this;
    const labels = { low: 'Pathway Neighborhoods', medium: 'Gene Nodes', high: 'Gene Detail' };
    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.font = '11px Inter,sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`🔍 ${labels[zoomLevel]}  |  scroll to zoom  •  drag to pan  •  dbl-click to zoom in`, 12, canvas.height - 12);
  }
}

// expose globally
window.PathwayMap = PathwayMap;
