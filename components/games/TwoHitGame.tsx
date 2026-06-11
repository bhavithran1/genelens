'use client';
import { useState } from 'react';

export default function TwoHitGame({ onComplete }: { onComplete: () => void }) {
  const [hits, setHits] = useState([false, false]);
  const [done, setDone] = useState(false);
  const [shown, setShown] = useState(false);

  const hit = (i: number) => {
    if (hits[i]) return;
    const newHits = [...hits];
    newHits[i] = true;
    setHits(newHits);
    if (newHits[0] && newHits[1]) {
      setDone(true);
    }
    setShown(true);
  };

  const allLost = hits[0] && hits[1];

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        TP53 requires BOTH copies to be inactivated. Click each copy to mutate it.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        {[0, 1].map(i => (
          <button key={i} onClick={() => hit(i)}
            style={{
              width: 110, height: 110, borderRadius: 12, border: `2px solid ${hits[i] ? '#ef4444' : '#10b981'}`,
              background: hits[i] ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.08)',
              cursor: hits[i] ? 'default' : 'pointer', transition: 'all 0.3s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            }}>
            <div style={{ fontSize: '2rem' }}>{hits[i] ? '💀' : '🛡️'}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: hits[i] ? '#ef4444' : '#10b981' }}>
              {hits[i] ? 'MUTATED' : 'TP53 Copy ' + (i + 1)}
            </div>
            {!hits[i] && <div style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>Click to mutate</div>}
          </button>
        ))}
      </div>

      <div style={{ padding: '0.85rem', borderRadius: 10, marginBottom: '1rem',
        background: allLost ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.06)',
        border: `1px solid ${allLost ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.2)'}`,
        color: allLost ? '#ef4444' : '#10b981', fontWeight: 700 }}>
        {allLost ? '⚠️ Both copies lost — TP53 protection FAILED. Cancer can now accumulate mutations unchecked.'
          : hits[0] || hits[1] ? '✅ One copy remains — TP53 protection still active (haploinsufficiency is rare for TP53).'
          : '✅ Both copies intact — full TP53 tumor suppressor function'}
      </div>

      {shown && (
        <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '1rem' }}>
          {allLost
            ? "This is Knudson's Two-Hit Hypothesis in action. With both copies lost, cells with damaged DNA survive and keep dividing."
            : "One functional copy of TP53 is usually sufficient to prevent cancer. In Li-Fraumeni syndrome, patients are born with one mutant copy — only one more 'hit' needed."}
        </div>
      )}

      {done && <button onClick={onComplete} className="btn-primary">Continue →</button>}
    </div>
  );
}
