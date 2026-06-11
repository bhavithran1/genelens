'use client';
import { useState, useMemo } from 'react';

const TARGET_GENES = [
  { id: 'TP53', seq: 'ATGGAGGAGCCGCAGTCAGATCC', pam: 'NGG', desc: 'Reactivate TP53 function in Li-Fraumeni syndrome cells' },
  { id: 'KRAS G12C', seq: 'GTAGTTGGAGCTGGTGGCGTAGG', pam: 'NGG', desc: 'Knock out mutant KRAS G12C allele selectively' },
  { id: 'BCL11A', seq: 'CTTGTTCTTGTTCAACCCGCCAG', pam: 'NGG', desc: 'Disrupt BCL11A enhancer to reactivate fetal hemoglobin (sickle cell therapy)' },
  { id: 'PD-1 (PDCD1)', seq: 'GCCTCGGCCCTGAATCTGGGCGG', pam: 'NGG', desc: 'Knockout PD-1 in T-cells to enhance CAR-T anti-tumor activity' },
  { id: 'Custom', seq: '', pam: 'NGG', desc: 'Design your own guide RNA' },
];

function scoreGRNA(seq: string): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  if (seq.length !== 20) { issues.push('gRNA must be exactly 20 nucleotides'); score -= 40; }
  if (!/^[ACGTU]+$/.test(seq.toUpperCase())) { issues.push('Only A, C, G, T (or U) allowed'); score -= 30; }
  const gcCount = (seq.match(/[GC]/gi) || []).length;
  const gcPct = (gcCount / seq.length) * 100;
  if (gcPct < 40 || gcPct > 70) { issues.push(`GC content ${gcPct.toFixed(0)}% (optimal: 40-70%)`); score -= 20; }
  if (/TTTT|AAAA/i.test(seq)) { issues.push('Avoid poly-T/A runs (affects Pol III termination)'); score -= 15; }
  if (/^G/i.test(seq)) score += 5;
  return { score: Math.max(0, Math.min(100, score)), issues };
}

export default function GuideRNADesigner({ onNext }: { onNext: () => void }) {
  const [selectedGene, setSelectedGene] = useState(TARGET_GENES[0]);
  const [gSeq, setGSeq] = useState(TARGET_GENES[0].seq.slice(0, 20));
  const [designed, setDesigned] = useState(false);

  const { score, issues } = useMemo(() => scoreGRNA(gSeq), [gSeq]);
  const scoreColor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

  const handleGeneSelect = (gene: typeof TARGET_GENES[0]) => {
    setSelectedGene(gene);
    if (gene.id !== 'Custom') setGSeq(gene.seq.slice(0, 20));
    else setGSeq('');
    setDesigned(false);
  };

  return (
    <div style={{ maxWidth: 760 }}>
      <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem' }}>🧬 Guide RNA Designer</h2>
      <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        The guide RNA (gRNA) is a 20-nucleotide sequence that directs Cas9 to your genomic target. A good gRNA has 40-70% GC content and targets adjacent to a PAM sequence (5&apos;-NGG-3&apos; for SpCas9).
      </p>

      {/* Gene selector */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Target Gene</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {TARGET_GENES.map(g => (
            <button key={g.id} onClick={() => handleGeneSelect(g)}
              style={{ padding: '0.4rem 0.9rem', borderRadius: 8, border: `1px solid ${selectedGene.id === g.id ? '#10b981' : 'var(--border2)'}`, background: selectedGene.id === g.id ? 'rgba(16,185,129,0.1)' : 'transparent', color: selectedGene.id === g.id ? '#10b981' : 'var(--text2)', fontSize: '0.82rem', cursor: 'pointer', fontWeight: selectedGene.id === g.id ? 700 : 400, transition: 'all 0.15s' }}>
              {g.id}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text3)' }}>{selectedGene.desc}</div>
      </div>

      {/* gRNA input */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.75rem' }}>Guide RNA Sequence (20 nt)</div>

        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: '1.1rem', letterSpacing: '0.08em', color: 'var(--accent)', wordBreak: 'break-all' }}>
            5&apos;- {gSeq.toUpperCase() || '──────────────────────'} -3&apos;
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>+ NGG (PAM)</span>
        </div>

        <input
          value={gSeq}
          onChange={e => { setGSeq(e.target.value.slice(0, 20)); setDesigned(false); }}
          placeholder="Enter 20 nucleotides (A/C/G/T)"
          maxLength={20}
          style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: 9, border: '1px solid var(--border2)', background: 'rgba(255,255,255,0.04)', color: 'var(--text)', fontSize: '0.95rem', fontFamily: "'Space Grotesk',monospace", outline: 'none', letterSpacing: '0.06em' }}
        />

        {/* Score */}
        {gSeq.length > 5 && (
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>gRNA Quality Score</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: scoreColor }}>{score}/100</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${score}%`, background: scoreColor, borderRadius: 3, transition: 'width 0.4s ease' }} />
            </div>
            {issues.map(issue => (
              <div key={issue} style={{ fontSize: '0.78rem', color: '#f59e0b', marginTop: '0.3rem' }}>⚠️ {issue}</div>
            ))}
            {issues.length === 0 && gSeq.length === 20 && (
              <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '0.3rem' }}>✅ Excellent gRNA quality!</div>
            )}
          </div>
        )}
      </div>

      {/* GC content visual */}
      {gSeq.length === 20 && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.75rem' }}>Sequence Composition</div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {gSeq.toUpperCase().split('').map((b, i) => {
              const col = b === 'A' ? '#ef4444' : b === 'T' ? '#3b82f6' : b === 'G' ? '#10b981' : '#f59e0b';
              return (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: `${col}20`, border: `1px solid ${col}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: col, fontFamily: "'Space Grotesk',sans-serif" }}>
                  {b}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem' }}>
            {['A', 'T', 'G', 'C'].map(b => {
              const count = (gSeq.match(new RegExp(b, 'gi')) || []).length;
              const col = b === 'A' ? '#ef4444' : b === 'T' ? '#3b82f6' : b === 'G' ? '#10b981' : '#f59e0b';
              return (
                <div key={b} style={{ color: col }}>
                  <span style={{ fontWeight: 700 }}>{b}</span>: {count} ({Math.round((count / 20) * 100)}%)
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={() => setDesigned(true)}
          disabled={gSeq.length !== 20}
          style={{ padding: '0.7rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: gSeq.length === 20 ? 'pointer' : 'not-allowed', background: gSeq.length === 20 ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(255,255,255,0.06)', color: gSeq.length === 20 ? '#fff' : 'var(--text3)', fontSize: '0.9rem', transition: 'all 0.2s' }}>
          ✅ Confirm gRNA Design
        </button>
        {designed && (
          <button onClick={onNext} className="btn-primary">
            Next: Cas9 Simulation →
          </button>
        )}
      </div>
    </div>
  );
}
