'use client';
import { useState } from 'react';

const NODES = [
  { id: 'egfr', label: 'EGFR', sub: 'Growth factor receptor', color: '#f59e0b' },
  { id: 'kras', label: 'KRAS', sub: 'GTP-bound (active)', color: '#ef4444' },
  { id: 'braf', label: 'BRAF', sub: 'Serine/threonine kinase', color: '#ef4444' },
  { id: 'mek', label: 'MEK 1/2', sub: 'Dual kinase', color: '#f97316' },
  { id: 'erk', label: 'ERK 1/2', sub: 'Final effector', color: '#f59e0b' },
  { id: 'myc', label: 'MYC / ELK1', sub: 'Transcription factors → proliferation', color: '#8b5cf6' },
];

export default function CascadeGame({ onComplete }: { onComplete: () => void }) {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);

  const handleClick = (i: number) => {
    if (i === active && !done) {
      if (active === NODES.length - 1) setDone(true);
      else setActive(i + 1);
    }
  };

  return (
    <div>
      <p style={{ color: 'var(--text2)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.25rem' }}>
        Click the highlighted node to trace the RAS/MAPK proliferation signal from receptor to nucleus.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: 360, margin: '0 auto' }}>
        {NODES.map((n, i) => {
          const isActive = i === active && !done;
          const isPast = i < active;
          return (
            <div key={n.id}>
              <button onClick={() => handleClick(i)}
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: `2px solid ${isActive ? n.color : isPast ? n.color + '44' : 'var(--border)'}`,
                  background: isActive ? n.color + '15' : isPast ? n.color + '08' : 'rgba(255,255,255,0.02)',
                  cursor: isActive ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  transition: 'all 0.2s', animation: isActive ? 'pulse 1.5s infinite' : 'none',
                }}>
                <div style={{ fontSize: '1.1rem' }}>{isPast ? '✅' : isActive ? '⚡' : '⬜'}</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, color: isPast || isActive ? n.color : 'var(--text3)', fontSize: '0.95rem' }}>{n.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{n.sub}</div>
                </div>
              </button>
              {i < NODES.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', height: '1.2rem', alignItems: 'center' }}>
                  <div style={{ width: 2, height: '100%', background: i < active ? NODES[i].color + '66' : 'rgba(255,255,255,0.06)', transition: 'background 0.3s' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {done && (
        <div style={{ textAlign: 'center', marginTop: '1rem', padding: '0.75rem', borderRadius: 10, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.5rem' }}>🎉 Signal traced! EGFR → KRAS → BRAF → MEK → ERK → Nucleus</div>
          <button onClick={onComplete} className="btn-primary">Continue →</button>
        </div>
      )}
    </div>
  );
}
