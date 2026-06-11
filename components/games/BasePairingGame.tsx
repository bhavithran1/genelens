'use client';
import { useState } from 'react';

const PAIRS = [
  { base: 'A', correct: 'T', opts: ['T', 'G', 'C', 'A'], fact: 'Adenine pairs with Thymine via 2 hydrogen bonds. In RNA, Adenine pairs with Uracil (U) instead.' },
  { base: 'G', correct: 'C', opts: ['T', 'A', 'C', 'G'], fact: 'Guanine pairs with Cytosine via 3 hydrogen bonds — the strongest base pair. This is why GC-rich regions are more stable.' },
  { base: 'T', correct: 'A', opts: ['G', 'C', 'A', 'T'], fact: 'Thymine pairs with Adenine. Thymine has a methyl group that Uracil lacks — distinguishing DNA from RNA.' },
  { base: 'C', correct: 'G', opts: ['A', 'G', 'T', 'C'], fact: 'Cytosine pairs with Guanine. The 5-methylcytosine modification (5mC) is the basis of DNA methylation — a key epigenetic mark in cancer.' },
];

const BASE_COLORS: Record<string, string> = { A: '#ef4444', T: '#3b82f6', G: '#10b981', C: '#f59e0b' };

export default function BasePairingGame({ onComplete }: { onComplete: () => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const round = PAIRS[qi];
  const answered = chosen !== null;

  const handleSelect = (opt: string) => {
    if (answered) return;
    setChosen(opt);
    if (opt === round.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qi + 1 >= PAIRS.length) { setDone(true); }
    else { setQi(i => i + 1); setChosen(null); }
  };

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧬</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: score >= 3 ? '#10b981' : '#f59e0b', marginBottom: '0.5rem' }}>{score}/{PAIRS.length} Correct</div>
        <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: '1rem' }}>{score === 4 ? 'Perfect! A=T, G=C is the foundation of all molecular biology.' : 'Remember: A pairs with T, G pairs with C!'}</p>
        <button onClick={onComplete} className="btn-primary">Continue →</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginBottom: '0.75rem' }}>Round {qi + 1}/{PAIRS.length} · Score: {score}</div>
      <p style={{ color: 'var(--text2)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>This DNA base pairs with:</p>
      <div style={{ fontSize: '4rem', fontWeight: 900, color: BASE_COLORS[round.base], fontFamily: "'Space Grotesk',sans-serif", marginBottom: '1.5rem', textShadow: `0 0 30px ${BASE_COLORS[round.base]}44` }}>
        {round.base}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', maxWidth: 300, margin: '0 auto 1rem' }}>
        {round.opts.map(opt => {
          let border = 'var(--border2)';
          let bg = 'rgba(255,255,255,0.02)';
          let color = 'var(--text)';
          if (answered) {
            if (opt === round.correct) { border = 'rgba(16,185,129,0.5)'; bg = 'rgba(16,185,129,0.1)'; color = '#10b981'; }
            else if (opt === chosen) { border = 'rgba(239,68,68,0.4)'; bg = 'rgba(239,68,68,0.08)'; color = '#f87171'; }
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)}
              style={{ padding: '0.75rem', borderRadius: 10, border: `1px solid ${border}`, background: bg, color, fontSize: '1.5rem', fontWeight: 700, cursor: answered ? 'default' : 'pointer', transition: 'all 0.2s', fontFamily: "'Space Grotesk',sans-serif" }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: 10, background: 'rgba(255,255,255,0.03)', fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6, textAlign: 'left' }}>
          {chosen === round.correct ? '✅ ' : `❌ It was ${round.correct}. `}{round.fact}
          <br />
          <button onClick={handleNext} style={{ marginTop: '0.6rem', padding: '0.5rem 1rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem' }}>
            {qi + 1 >= PAIRS.length ? 'See Results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
