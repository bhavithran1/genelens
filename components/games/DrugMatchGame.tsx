'use client';
import { useState, useMemo } from 'react';

const PAIRS = [
  { drug: 'Imatinib (Gleevec)', target: 'BCR-ABL · CML', color: '#10b981' },
  { drug: 'Vemurafenib', target: 'BRAF V600E · Melanoma', color: '#3b82f6' },
  { drug: 'Trastuzumab (Herceptin)', target: 'HER2 amplification · Breast', color: '#7c3aed' },
  { drug: 'Olaparib', target: 'PARP · BRCA1/2 deficiency', color: '#f59e0b' },
  { drug: 'Pembrolizumab', target: 'PD-1 checkpoint · MSI-H', color: '#00d4ff' },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function DrugMatchGame({ onComplete }: { onComplete: () => void }) {
  const shuffledIdxs = useMemo(() => shuffle(PAIRS.map((_, i) => i)), []);
  const [selDrug, setSelDrug] = useState<number | null>(null);
  const [matched, setMatched] = useState(new Set<number>());
  const [wrongPair, setWrongPair] = useState<{ drug: number; target: number } | null>(null);

  const handleDrug = (i: number) => {
    if (matched.has(i)) return;
    setSelDrug(selDrug === i ? null : i);
    setWrongPair(null);
  };

  const handleTarget = (shuffleIdx: number) => {
    const pairIdx = shuffledIdxs[shuffleIdx];
    if (matched.has(pairIdx) || selDrug === null) return;
    if (selDrug === pairIdx) {
      setMatched(s => new Set([...s, pairIdx]));
      setSelDrug(null);
    } else {
      setWrongPair({ drug: selDrug, target: pairIdx });
      setSelDrug(null);
      setTimeout(() => setWrongPair(null), 600);
    }
  };

  const done = matched.size === PAIRS.length;

  return (
    <div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text3)', textAlign: 'center', marginBottom: '0.75rem' }}>
        Click a drug → then its target ({matched.size}/{PAIRS.length} matched)
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <div>
          {PAIRS.map((p, i) => {
            const m = matched.has(i);
            const sel = selDrug === i;
            const wrong = wrongPair?.drug === i;
            return (
              <button key={i} onClick={() => handleDrug(i)}
                style={{
                  display: 'block', width: '100%', padding: '0.6rem 0.75rem', borderRadius: 8, marginBottom: '0.4rem',
                  border: `2px solid ${m ? p.color : wrong ? '#ef4444' : sel ? p.color : 'var(--border2)'}`,
                  background: m ? p.color + '12' : wrong ? 'rgba(239,68,68,0.07)' : sel ? p.color + '10' : 'rgba(255,255,255,0.02)',
                  color: m ? p.color : wrong ? '#f87171' : sel ? p.color : 'var(--text2)',
                  fontSize: '0.78rem', cursor: m ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  fontWeight: sel ? 700 : 400,
                }}>
                {m ? '✅ ' : ''}{p.drug}
              </button>
            );
          })}
        </div>
        <div>
          {shuffledIdxs.map((pIdx, si) => {
            const p = PAIRS[pIdx];
            const m = matched.has(pIdx);
            const wrong = wrongPair?.target === pIdx;
            return (
              <button key={si} onClick={() => handleTarget(si)}
                style={{
                  display: 'block', width: '100%', padding: '0.6rem 0.75rem', borderRadius: 8, marginBottom: '0.4rem',
                  border: `2px solid ${m ? p.color : wrong ? '#ef4444' : 'var(--border2)'}`,
                  background: m ? p.color + '12' : wrong ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.02)',
                  color: m ? p.color : wrong ? '#f87171' : 'var(--text2)',
                  fontSize: '0.78rem', cursor: m ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s',
                }}>
                {m ? '✅ ' : ''}{p.target}
              </button>
            );
          })}
        </div>
      </div>
      {done && (
        <div style={{ textAlign: 'center', marginTop: '0.75rem', padding: '0.6rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10 }}>
          <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.4rem' }}>🎉 All 5 matched!</div>
          <button onClick={onComplete} className="btn-primary">Continue →</button>
        </div>
      )}
    </div>
  );
}
