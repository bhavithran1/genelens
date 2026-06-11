'use client';
import { useState } from 'react';

export default function KRASGame({ onComplete }: { onComplete: () => void }) {
  const [mutant, setMutant] = useState(false);
  const [clicked, setClicked] = useState(false);

  const toggleMutant = () => {
    setMutant(m => !m);
    if (!clicked) setClicked(true);
  };

  const signals = mutant
    ? ['KRAS G12V (locked GTP)', 'RAF → always ON', 'MEK → always ON', 'ERK → always ON', '🔴 Proliferation: Uncontrolled']
    : ['KRAS (GDP-bound)', 'RAF → inactive', 'MEK → inactive', 'ERK → inactive', '✅ Proliferation: Normal'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', gap: '1rem' }}>
        <button onClick={() => { setMutant(false); setClicked(true); }}
          style={{ padding: '0.5rem 1.25rem', borderRadius: 9, border: `2px solid ${!mutant ? '#10b981' : 'var(--border2)'}`, background: !mutant ? 'rgba(16,185,129,0.1)' : 'transparent', color: !mutant ? '#10b981' : 'var(--text2)', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s' }}>
          Normal KRAS
        </button>
        <button onClick={() => { setMutant(true); setClicked(true); }}
          style={{ padding: '0.5rem 1.25rem', borderRadius: 9, border: `2px solid ${mutant ? '#ef4444' : 'var(--border2)'}`, background: mutant ? 'rgba(239,68,68,0.1)' : 'transparent', color: mutant ? '#ef4444' : 'var(--text2)', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s' }}>
          Mutant KRAS G12V ⚠️
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: 380, margin: '0 auto' }}>
        {signals.map((s, i) => (
          <div key={i} style={{
            padding: '0.65rem 1rem', borderRadius: 9,
            background: mutant ? 'rgba(239,68,68,0.07)' : 'rgba(16,185,129,0.05)',
            border: `1px solid ${mutant ? 'rgba(239,68,68,0.25)' : 'rgba(16,185,129,0.2)'}`,
            color: mutant ? (i === 4 ? '#ef4444' : 'var(--text)') : (i === 4 ? '#10b981' : 'var(--text)'),
            fontSize: '0.88rem', fontWeight: i === 4 ? 700 : 400,
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{ color: mutant ? '#ef4444' : '#10b981', fontSize: '0.7rem' }}>{'→'.repeat(Math.min(i + 1, 3))}</span>
            {s}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>
        {mutant
          ? '⚠️ G12V mutation replaces Glycine with Valine. This blocks GTPase activity — KRAS is permanently GTP-bound and constitutively active. The proliferation signal never turns off.'
          : '✅ Normal KRAS cycles between active (GTP-bound) and inactive (GDP-bound) states. It only signals when growth factors are present.'}
      </div>

      {clicked && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={onComplete} className="btn-primary">Continue →</button>
        </div>
      )}
    </div>
  );
}
