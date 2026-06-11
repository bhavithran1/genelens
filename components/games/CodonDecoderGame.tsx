'use client';
import { useState } from 'react';

const CODONS = [
  { codon: 'AUG', answer: 'Methionine (Start)', opts: ['Methionine (Start)', 'Leucine', 'Valine', 'STOP'], exp: 'AUG is the universal start codon and encodes Methionine. Every protein synthesis begins here.' },
  { codon: 'UAA', answer: 'STOP', opts: ['Lysine', 'Tyrosine', 'STOP', 'Threonine'], exp: 'UAA, UAG, and UGA are the three stop codons. Nonsense mutations create premature stop codons.' },
  { codon: 'UGG', answer: 'Tryptophan', opts: ['Cysteine', 'Arginine', 'STOP', 'Tryptophan'], exp: "UGG is the only codon for Tryptophan — no synonymous codons exist. It's the rarest amino acid in the proteome." },
  { codon: 'GUU', answer: 'Valine', opts: ['Leucine', 'Valine', 'Isoleucine', 'Alanine'], exp: 'GUU encodes Valine. KRAS G12V has Glycine (GGU) → Valine (GUU) — one nucleotide powering 10% of all cancers.' },
  { codon: 'CAG', answer: 'Glutamine', opts: ['Glutamic acid', 'Glutamine', 'Lysine', 'Histidine'], exp: "CAG encodes Glutamine. CAG repeat expansions in huntingtin cause Huntington's disease." },
  { codon: 'UGA', answer: 'STOP', opts: ['Serine', 'Glycine', 'STOP', 'Cysteine'], exp: 'UGA is a stop codon. In some organisms it also encodes selenocysteine — the "21st amino acid."' },
  { codon: 'GCU', answer: 'Alanine', opts: ['Glycine', 'Alanine', 'Serine', 'Proline'], exp: 'GCU, GCC, GCA, GCG all encode Alanine — classic codon degeneracy (synonymous codons).' },
  { codon: 'UUU', answer: 'Phenylalanine', opts: ['Leucine', 'Phenylalanine', 'Isoleucine', 'Tryptophan'], exp: 'UUU was the first codon decoded by Nirenberg and Matthaei in 1961 — a landmark in molecular biology.' },
];

export default function CodonDecoderGame({ onComplete }: { onComplete: () => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const c = CODONS[qi];
  const answered = chosen !== null;

  const handleSelect = (opt: string) => {
    if (answered) return;
    setChosen(opt);
    if (opt === c.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qi + 1 >= CODONS.length) setDone(true);
    else { setQi(i => i + 1); setChosen(null); }
  };

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem' }}>
        <div style={{ fontSize: '2.5rem' }}>🧬</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: score >= 6 ? '#10b981' : '#f59e0b', margin: '0.5rem 0' }}>{score}/{CODONS.length} Correct</div>
        <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: '1rem' }}>{score >= 6 ? 'Excellent codon knowledge!' : 'Tip: AUG=Start, UAA/UAG/UGA=Stop, UGG=Trp'}</p>
        <button onClick={onComplete} className="btn-primary">Continue →</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginBottom: '0.5rem' }}>Round {qi + 1}/{CODONS.length} · Score: {score}</div>
      <p style={{ color: 'var(--text2)', marginBottom: '0.5rem', fontSize: '0.88rem' }}>This mRNA codon encodes:</p>
      <div style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 900, color: 'var(--accent)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.1em', marginBottom: '1.25rem', textShadow: '0 0 20px rgba(0,212,255,0.3)' }}>
        {c.codon}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', maxWidth: 340, margin: '0 auto' }}>
        {c.opts.map(opt => {
          let border = 'var(--border2)';
          let bg = 'rgba(255,255,255,0.03)';
          let color = 'var(--text)';
          if (answered) {
            if (opt === c.answer) { border = 'rgba(16,185,129,0.5)'; bg = 'rgba(16,185,129,0.1)'; color = '#10b981'; }
            else if (opt === chosen) { border = 'rgba(239,68,68,0.4)'; bg = 'rgba(239,68,68,0.07)'; color = '#f87171'; }
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)}
              style={{ padding: '0.7rem 0.6rem', borderRadius: 9, border: `1px solid ${border}`, background: bg, color, fontSize: '0.84rem', cursor: answered ? 'default' : 'pointer', transition: 'all 0.15s', fontFamily: 'Inter,sans-serif' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: '0.75rem', padding: '0.7rem 1rem', borderRadius: 10, background: 'rgba(255,255,255,0.03)', fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6, textAlign: 'left', maxWidth: 340, margin: '0.75rem auto 0' }}>
          {chosen === c.answer ? '✅ ' : `❌ It's ${c.answer}. `}{c.exp}
          <br />
          <div style={{ textAlign: 'center' }}>
            <button onClick={handleNext} style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 7, cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
              {qi + 1 >= CODONS.length ? 'See Results' : 'Next →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
