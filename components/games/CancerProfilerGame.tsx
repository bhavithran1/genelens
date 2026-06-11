'use client';
import { useState } from 'react';

const CASES = [
  { muts: ['EGFR L858R exon 21', 'STK11 frameshift', 'KRAS wild-type', 'PD-L1 TPS 70%'], opts: ['Lung adenocarcinoma', 'Colorectal cancer', 'Glioblastoma', 'Breast cancer'], answer: 0, exp: 'EGFR L858R is the classic LUAD driver. KRAS wild-type confirms this. EGFR TKIs (Osimertinib) are first-line.' },
  { muts: ['APC frameshift (truncation)', 'KRAS G12D', 'TP53 R248W', 'MSS status'], opts: ['Colorectal carcinoma', 'Lung adenocarcinoma', 'Pancreatic cancer', 'Endometrial cancer'], answer: 0, exp: 'APC + KRAS + TP53 is the classic Vogelstein colorectal adenoma-carcinoma sequence. MSS means low TMB.' },
  { muts: ['IDH1 R132H', 'ATRX loss', 'TERT promoter mutation', '1p/19q intact'], opts: ['Astrocytoma (IDH-mutant)', 'Oligodendroglioma', 'Glioblastoma (IDH-WT)', 'Medulloblastoma'], answer: 0, exp: 'IDH1 R132H + ATRX loss without 1p/19q co-deletion = IDH-mutant astrocytoma. IDH mutation is a good prognostic marker.' },
  { muts: ['BRCA2 6174delT frameshift', 'TP53 missense', 'PTEN loss', 'HER2 not amplified'], opts: ['High-grade serous ovarian', 'Lung squamous cell', 'CML (BCR-ABL+)', 'Cervical SCC'], answer: 0, exp: 'BRCA2 + TP53 + PTEN = classic high-grade serous ovarian. PARP inhibitors (Olaparib) exploit synthetic lethality.' },
];

export default function CancerProfilerGame({ onComplete }: { onComplete: () => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const c = CASES[qi];
  const answered = chosen !== null;

  const handleSelect = (i: number) => {
    if (answered) return;
    setChosen(i);
    if (i === c.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qi + 1 >= CASES.length) setDone(true);
    else { setQi(i => i + 1); setChosen(null); }
  };

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem' }}>
        <div style={{ fontSize: '2.5rem' }}>🏥</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: score >= 3 ? '#10b981' : '#f59e0b', margin: '0.5rem 0' }}>{score}/{CASES.length} Correct</div>
        <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: '1rem' }}>{score >= 3 ? 'Excellent! You can profile cancer mutations.' : 'Review the cancer types in the lessons!'}</p>
        <button onClick={onComplete} className="btn-primary">Continue →</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginBottom: '0.6rem', textAlign: 'center' }}>Case {qi + 1}/{CASES.length} · Score: {score}</div>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.4rem' }}>Mutation Profile</div>
      <div style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 10, padding: '0.7rem 0.9rem', marginBottom: '1rem' }}>
        {c.muts.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '3px 0', borderBottom: i < c.muts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: '0.83rem', fontFamily: "'Space Grotesk',sans-serif" }}>
            <span style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>▸</span>{m}
          </div>
        ))}
      </div>
      <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.88rem' }}>Most likely cancer type:</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {c.opts.map((o, i) => {
          let border = 'var(--border2)';
          let bg = 'rgba(255,255,255,0.02)';
          let color = 'var(--text)';
          if (answered) {
            if (i === c.answer) { border = 'rgba(16,185,129,0.4)'; bg = 'rgba(16,185,129,0.08)'; color = '#10b981'; }
            else if (i === chosen) { border = 'rgba(239,68,68,0.3)'; bg = 'rgba(239,68,68,0.06)'; color = '#f87171'; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)}
              style={{ padding: '0.65rem 0.9rem', borderRadius: 9, border: `1px solid ${border}`, background: bg, color, fontSize: '0.86rem', textAlign: 'left', cursor: answered ? 'default' : 'pointer', transition: 'all 0.15s', fontFamily: 'Inter,sans-serif' }}>
              {o}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: '0.75rem', padding: '0.7rem', borderRadius: 9, background: 'rgba(255,255,255,0.03)', fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>
          {chosen === c.answer ? '✅ Correct! ' : '❌ '}{c.exp}
          <br />
          <button onClick={handleNext} style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 7, cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
            {qi + 1 >= CASES.length ? 'See Results' : 'Next Case →'}
          </button>
        </div>
      )}
    </div>
  );
}
