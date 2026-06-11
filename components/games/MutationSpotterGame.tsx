'use client';
import { useState } from 'react';

const ROUNDS = [
  { label: 'One nucleotide changed — a different amino acid is now encoded:', normal: 'ATG · GAC · TTC · TAA', mutant: 'ATG · [GTC] · TTC · TAA', answer: 'Missense', opts: ['Missense', 'Nonsense', 'Frameshift', 'Silent'], exp: 'GAC (Aspartic acid) → GTC (Valine): same position, different amino acid = missense. Famous example: KRAS G12V.' },
  { label: 'One base changed — a STOP codon now appears mid-sequence:', normal: 'ATG · GAC · TTC · TAA', mutant: 'ATG · GAC · [TGA] · TAA', answer: 'Nonsense', opts: ['Missense', 'Nonsense', 'Silent', 'Frameshift'], exp: 'TTC (Phe) → TGA (Stop codon): translation terminates prematurely = nonsense mutation.' },
  { label: 'A base was inserted — how does this change the reading frame?', normal: 'ATG · GAC · TTC · TAA', mutant: 'ATG · G[A]AC · TTC · TAA', answer: 'Frameshift (Insertion)', opts: ['Frameshift (Insertion)', 'Frameshift (Deletion)', 'Missense', 'Silent'], exp: 'Inserting one base shifts every downstream codon. All amino acids after the insertion are wrong = frameshift.' },
  { label: 'One nucleotide changed — but the same amino acid is still produced:', normal: 'ATG · GAC · TTC · TAA', mutant: 'ATG · GAC · [TTT] · TAA', answer: 'Silent', opts: ['Missense', 'Nonsense', 'Silent', 'Frameshift'], exp: 'TTC and TTT both encode Phenylalanine. No amino acid change = silent (synonymous) mutation. Codon degeneracy.' },
];

function highlightMutant(seq: string) {
  return seq.replace(/\[([^\]]+)\]/g, (_, m) =>
    `<span style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);border-radius:3px;padding:0 3px;color:#f87171;font-weight:700">${m}</span>`
  );
}

export default function MutationSpotterGame({ onComplete }: { onComplete: () => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const r = ROUNDS[qi];
  const answered = chosen !== null;

  const handleSelect = (opt: string) => {
    if (answered) return;
    setChosen(opt);
    if (opt === r.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qi + 1 >= ROUNDS.length) setDone(true);
    else { setQi(i => i + 1); setChosen(null); }
  };

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔬</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: score >= 3 ? '#10b981' : '#f59e0b', marginBottom: '0.5rem' }}>{score}/{ROUNDS.length} Correct</div>
        <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: '1rem' }}>{score >= 3 ? 'Excellent! You can identify mutation types.' : 'Review: missense=AA change, nonsense=stop, frameshift=insertion/deletion, silent=no change.'}</p>
        <button onClick={onComplete} className="btn-primary">Continue →</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text3)', textAlign: 'center', marginBottom: '0.75rem' }}>Round {qi + 1}/{ROUNDS.length} · Score: {score}</div>
      <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{r.label}</p>
      <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 9, padding: '0.65rem 0.9rem', marginBottom: '0.4rem', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ fontSize: '0.62rem', color: '#10b981', fontWeight: 700, marginBottom: 3 }}>NORMAL</div>
        <div style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}>{r.normal}</div>
      </div>
      <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 9, padding: '0.65rem 0.9rem', marginBottom: '1rem', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ fontSize: '0.62rem', color: '#ef4444', fontWeight: 700, marginBottom: 3 }}>MUTANT</div>
        <div style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }} dangerouslySetInnerHTML={{ __html: highlightMutant(r.mutant) }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {r.opts.map(opt => {
          let border = 'var(--border2)';
          let bg = 'rgba(255,255,255,0.02)';
          let color = 'var(--text)';
          if (answered) {
            if (opt === r.answer) { border = 'rgba(16,185,129,0.5)'; bg = 'rgba(16,185,129,0.08)'; color = '#10b981'; }
            else if (opt === chosen) { border = 'rgba(239,68,68,0.4)'; bg = 'rgba(239,68,68,0.06)'; color = '#f87171'; }
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 8, border: `1px solid ${border}`, background: bg, color, fontSize: '0.82rem', textAlign: 'left', cursor: answered ? 'default' : 'pointer', transition: 'all 0.15s', fontFamily: 'Inter,sans-serif' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: '0.75rem', padding: '0.7rem', borderRadius: 9, background: 'rgba(255,255,255,0.03)', fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>
          {chosen === r.answer ? '✅ ' : `❌ It was: ${r.answer}. `}{r.exp}
          <br />
          <button onClick={handleNext} style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 7, cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
            {qi + 1 >= ROUNDS.length ? 'See Results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
