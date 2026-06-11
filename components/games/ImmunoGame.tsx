'use client';
import { useState } from 'react';

export default function ImmunoGame({ onComplete }: { onComplete: () => void }) {
  const [pdl1Blocked, setPdl1Blocked] = useState(false);
  const [ctla4Blocked, setCtla4Blocked] = useState(false);
  const [kills, setKills] = useState(0);
  const [done, setDone] = useState(false);

  const handleKill = () => {
    if (!pdl1Blocked && !ctla4Blocked) return;
    const newKills = kills + 1;
    setKills(newKills);
    if (newKills >= 3) setDone(true);
  };

  const tCellPower = pdl1Blocked && ctla4Blocked ? 'Full' : pdl1Blocked || ctla4Blocked ? 'Partial' : 'Suppressed';
  const tCellColor = tCellPower === 'Full' ? '#10b981' : tCellPower === 'Partial' ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        Block immune checkpoints to release T-cell suppression, then eliminate cancer cells!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', maxWidth: 400, margin: '0 auto 1.25rem' }}>
        <button onClick={() => setPdl1Blocked(b => !b)}
          style={{ padding: '0.85rem', borderRadius: 11, border: `2px solid ${pdl1Blocked ? '#10b981' : '#ef4444'}`, background: pdl1Blocked ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', cursor: 'pointer', transition: 'all 0.2s' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{pdl1Blocked ? '✅' : '🔴'}</div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: pdl1Blocked ? '#10b981' : '#f87171' }}>
            {pdl1Blocked ? 'PD-1/PD-L1 BLOCKED' : 'PD-1/PD-L1 Active'}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text3)', marginTop: '0.2rem' }}>
            {pdl1Blocked ? 'Pembrolizumab ✓' : 'Suppressing T-cells'}
          </div>
        </button>
        <button onClick={() => setCtla4Blocked(b => !b)}
          style={{ padding: '0.85rem', borderRadius: 11, border: `2px solid ${ctla4Blocked ? '#10b981' : '#ef4444'}`, background: ctla4Blocked ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', cursor: 'pointer', transition: 'all 0.2s' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{ctla4Blocked ? '✅' : '🔴'}</div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: ctla4Blocked ? '#10b981' : '#f87171' }}>
            {ctla4Blocked ? 'CTLA-4 BLOCKED' : 'CTLA-4 Active'}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text3)', marginTop: '0.2rem' }}>
            {ctla4Blocked ? 'Ipilimumab ✓' : 'Suppressing T-cells'}
          </div>
        </button>
      </div>

      <div style={{ marginBottom: '1rem', padding: '0.65rem', borderRadius: 10, background: `${tCellColor}10`, border: `1px solid ${tCellColor}33` }}>
        <div style={{ color: tCellColor, fontWeight: 700, fontSize: '0.9rem' }}>T-Cell Power: {tCellPower}</div>
        {!pdl1Blocked && !ctla4Blocked && <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginTop: '0.25rem' }}>Block at least one checkpoint to activate T-cells</div>}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} style={{ width: 50, height: 50, borderRadius: '50%', background: i < kills ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.1)', border: `2px solid ${i < kills ? '#10b981' : '#ef4444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', transition: 'all 0.3s' }}>
            {i < kills ? '✅' : '🦠'}
          </div>
        ))}
      </div>

      <button onClick={handleKill}
        disabled={!pdl1Blocked && !ctla4Blocked}
        style={{
          padding: '0.65rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: pdl1Blocked || ctla4Blocked ? 'pointer' : 'not-allowed',
          background: pdl1Blocked || ctla4Blocked ? '#10b981' : 'rgba(255,255,255,0.06)',
          color: pdl1Blocked || ctla4Blocked ? '#000' : 'var(--text3)',
          marginBottom: '1rem', transition: 'all 0.2s',
        }}>
        ⚔️ Attack Cancer Cell ({kills}/3 eliminated)
      </button>

      {done && (
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.5rem' }}>🎉 Cancer eliminated! The immune system is a powerful weapon when checkpoints are released.</div>
          <button onClick={onComplete} className="btn-primary">Continue →</button>
        </div>
      )}
    </div>
  );
}
