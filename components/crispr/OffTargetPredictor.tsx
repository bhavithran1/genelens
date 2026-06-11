'use client';
import { useState } from 'react';

const OFF_TARGETS = [
  { site: 'Chr 12: 25,380,275', mismatches: 0, score: 100, risk: 'ON-TARGET', riskColor: '#10b981', gene: 'KRAS exon 2', consequence: 'Desired edit — KRAS G12C knockout' },
  { site: 'Chr 7: 140,453,136', mismatches: 2, score: 42, risk: 'Low', riskColor: '#f59e0b', gene: 'BRAF intron 14', consequence: 'Intronic — likely benign' },
  { site: 'Chr 17: 41,244,880', mismatches: 3, score: 18, risk: 'Very Low', riskColor: '#10b981', gene: 'BRCA1 intron 9', consequence: 'Intronic — unlikely functional impact' },
  { site: 'Chr 3: 178,950,000', mismatches: 4, score: 8, risk: 'Minimal', riskColor: '#10b981', gene: 'Intergenic region', consequence: 'No known gene — negligible risk' },
  { site: 'Chr 1: 115,247,090', mismatches: 5, score: 2, risk: 'Negligible', riskColor: '#94a3b8', gene: 'Intergenic region', consequence: 'Effectively zero activity at 5 mismatches' },
];

export default function OffTargetPredictor({ onNext }: { onNext: () => void }) {
  const [run, setRun] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 760 }}>
      <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem' }}>⚠️ Off-Target Prediction</h2>
      <p style={{ color: 'var(--text2)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
        CRISPR is highly specific, but Cas9 can sometimes cut at sites with similar (but not identical) sequences. Predicting and minimizing off-targets is critical for therapeutic applications.
      </p>

      <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '1rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
        <strong style={{ color: '#f59e0b' }}>Tools used in practice:</strong> CRISPOR, Cas-OFFinder, GUIDE-seq (experimental), CIRCLE-seq. High-fidelity Cas9 variants (eSpCas9, HiFi Cas9) significantly reduce off-targets by requiring perfect complementarity.
      </div>

      {!run ? (
        <div style={{ textAlign: 'center', padding: '2.5rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Run In Silico Off-Target Analysis</div>
          <p style={{ color: 'var(--text3)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Scanning the human genome for similar sequences to your gRNA...</p>
          <button onClick={() => setRun(true)} style={{ padding: '0.7rem 1.75rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#000', fontSize: '0.9rem' }}>
            🚀 Run Off-Target Analysis
          </button>
        </div>
      ) : (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)' }}>Predicted Off-Target Sites (genome-wide)</span>
            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>✅ Analysis complete — 4 off-targets found (all low risk)</span>
          </div>

          {OFF_TARGETS.map((ot, i) => (
            <button key={i} onClick={() => setExpanded(expanded === i ? null : i)}
              style={{ display: 'block', width: '100%', padding: '0.85rem 1rem', borderBottom: i < OFF_TARGETS.length - 1 ? '1px solid var(--border)' : 'none', textAlign: 'left', background: i === 0 ? 'rgba(16,185,129,0.04)' : 'transparent', cursor: 'pointer', transition: 'background 0.15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.78rem', color: ot.riskColor, fontWeight: 700, minWidth: 90 }}>{ot.risk}</div>
                <div style={{ fontSize: '0.8rem', fontFamily: "'Space Grotesk',monospace", color: 'var(--text2)' }}>{ot.site}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginLeft: 'auto' }}>
                  {ot.mismatches === 0 ? '0 mismatches' : `${ot.mismatches} mm`} · Score: {ot.score}
                </div>
              </div>
              {expanded === i && (
                <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text3)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, marginBottom: '0.2rem' }}>Location</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>{ot.gene}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text3)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, marginBottom: '0.2rem' }}>Assessment</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>{ot.consequence}</div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {run && (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {[
            { label: 'High-Fidelity Cas9', desc: 'eSpCas9 or HiFi Cas9 variants require perfect complementarity → near-zero off-targets', color: '#10b981' },
            { label: 'Truncated gRNAs', desc: '17-18 nt gRNAs (vs 20 nt) can improve specificity by reducing mismatch tolerance', color: '#00d4ff' },
            { label: 'Paired Nickases', desc: 'Two Cas9 nickases → only cuts when both bind nearby → dramatically reduces off-targets', color: '#7c3aed' },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, minWidth: 180, padding: '0.75rem', borderRadius: 10, background: `${s.color}08`, border: `1px solid ${s.color}22` }}>
              <div style={{ fontWeight: 700, color: s.color, fontSize: '0.82rem', marginBottom: '0.3rem' }}>💡 {s.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      )}

      {run && <button onClick={onNext} className="btn-primary">Next: Therapeutic Applications →</button>}
    </div>
  );
}
