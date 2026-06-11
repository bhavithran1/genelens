'use client';
import { useState, useMemo } from 'react';

const CORRECT = ['Growth Factor (EGF)', 'EGFR (Receptor)', 'RAS (GTP-bound)', 'RAF (BRAF/CRAF)', 'MEK 1/2', 'ERK 1/2 → Nucleus'];
const COLORS = ['#10b981', '#00d4ff', '#3b82f6', '#7c3aed', '#f59e0b', '#ef4444'];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function PathwayOrderGame({ onComplete }: { onComplete: () => void }) {
  const shuffled = useMemo(() => shuffle(CORRECT.map((_, i) => i)), []);
  const [picks, setPicks] = useState<number[]>([]);

  const pick = (idx: number) => {
    if (picks.includes(idx)) return;
    setPicks(p => [...p, idx]);
  };

  const reset = () => setPicks([]);

  const done = picks.length === CORRECT.length;
  const allOk = done && picks.every((v, i) => v === i);

  return (
    <div>
      <p style={{ color: 'var(--text2)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.75rem' }}>
        {done ? (allOk ? '🎉 Perfect order!' : '❌ Not quite — see correct order') : 'Click nodes in cascade order (1 → 6)'}
      </p>

      {!done && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
          {shuffled.map(idx => {
            const picked = picks.includes(idx);
            const num = picks.indexOf(idx);
            return (
              <button key={idx} onClick={() => pick(idx)}
                style={{
                  padding: '0.6rem 1rem', borderRadius: 8, cursor: picked ? 'default' : 'pointer',
                  border: `2px solid ${picked ? COLORS[idx] + '88' : 'var(--border2)'}`,
                  background: picked ? COLORS[idx] + '12' : 'rgba(255,255,255,0.02)',
                  color: picked ? COLORS[idx] : 'var(--text2)',
                  fontSize: '0.82rem', position: 'relative', transition: 'all 0.2s',
                }}>
                {CORRECT[idx]}
                {picked && (
                  <span style={{ position: 'absolute', top: -8, right: -8, width: 18, height: 18, background: COLORS[idx], borderRadius: '50%', color: '#000', fontSize: '0.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {num + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {done && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
          {CORRECT.map((n, i) => {
            const ok = picks[i] === i;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ padding: '0.5rem 1.25rem', borderRadius: 8, border: `2px solid ${ok ? COLORS[i] : '#ef4444'}`, background: ok ? COLORS[i] + '15' : 'rgba(239,68,68,0.07)', color: ok ? COLORS[i] : '#f87171', fontSize: '0.82rem', minWidth: 180, textAlign: 'center' }}>
                  {ok ? '✅' : '❌'} {n}
                </div>
                {i < CORRECT.length - 1 && <div style={{ color: ok ? COLORS[i + 1] : 'rgba(255,255,255,0.1)', fontSize: '0.9rem' }}>↓</div>}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {picks.length > 0 && !done && (
          <button onClick={reset} style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer', fontSize: '0.82rem' }}>↺ Reset</button>
        )}
        {done && <button onClick={onComplete} className="btn-primary">{allOk ? '✅ Perfect! Continue →' : 'Continue anyway →'}</button>}
      </div>
    </div>
  );
}
