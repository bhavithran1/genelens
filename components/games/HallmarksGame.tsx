'use client';
import { useState } from 'react';

const HALLMARKS = [
  { name: 'Sustaining Proliferative Signaling', icon: '🔴', driver: 'KRAS, EGFR, HER2', drug: 'KRAS inhibitors, TKIs', color: '#ef4444' },
  { name: 'Evading Growth Suppressors', icon: '🔵', driver: 'TP53, RB1, CDKN2A', drug: 'CDK4/6 inhibitors', color: '#3b82f6' },
  { name: 'Resisting Cell Death', icon: '🟣', driver: 'BCL-2, MCL-1, BCL-XL', drug: 'Venetoclax (BCL-2i)', color: '#8b5cf6' },
  { name: 'Enabling Replicative Immortality', icon: '⚪', driver: 'TERT (telomerase)', drug: 'Telomerase inhibitors (research)', color: '#94a3b8' },
  { name: 'Inducing Angiogenesis', icon: '🩸', driver: 'VEGF, HIF-1α, PDGF', drug: 'Bevacizumab, Sunitinib', color: '#dc2626' },
  { name: 'Activating Invasion & Metastasis', icon: '🟠', driver: 'MMP, E-cadherin loss', drug: 'Research targets', color: '#f97316' },
  { name: 'Reprogramming Energy Metabolism', icon: '⚡', driver: 'Warburg effect (aerobic glycolysis)', drug: 'IDH inhibitors (Ivosidenib)', color: '#f59e0b' },
  { name: 'Evading Immune Destruction', icon: '🛡️', driver: 'PD-L1, IDO, CTLA-4', drug: 'Pembrolizumab, Ipilimumab', color: '#10b981' },
  { name: 'Tumor-Promoting Inflammation', icon: '🔥', driver: 'NF-κB, IL-6, COX-2', drug: 'Aspirin (prevention)', color: '#f59e0b' },
  { name: 'Genome Instability & Mutation', icon: '💥', driver: 'MLH1, BRCA1/2, POLE', drug: 'PARP inhibitors, Pembrolizumab (MSI-H)', color: '#f472b6' },
];

export default function HallmarksGame({ onComplete }: { onComplete: () => void }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [seen, setSeen] = useState(new Set<number>());

  const toggleExpand = (i: number) => {
    setExpanded(expanded === i ? null : i);
    setSeen(s => new Set([...s, i]));
  };

  return (
    <div>
      <p style={{ color: 'var(--text3)', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem' }}>
        Click each hallmark to reveal the genetic driver and therapy. Find all {HALLMARKS.length}! ({seen.size}/{HALLMARKS.length} explored)
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {HALLMARKS.map((h, i) => (
          <button key={i} onClick={() => toggleExpand(i)}
            style={{
              background: seen.has(i) ? `${h.color}0f` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${seen.has(i) ? h.color + '33' : 'var(--border)'}`,
              borderRadius: 10, padding: '0.75rem 1rem', textAlign: 'left', cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem' }}>{h.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: seen.has(i) ? h.color : 'var(--text)' }}>{h.name}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--text3)', fontSize: '0.75rem' }}>{expanded === i ? '▲' : '▼'}</span>
            </div>
            {expanded === i && (
              <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: `1px solid ${h.color}22`, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.2rem' }}>Key Driver</div>
                  <div style={{ fontSize: '0.83rem', color: h.color, fontWeight: 600 }}>{h.driver}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.2rem' }}>Therapy</div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text2)' }}>{h.drug}</div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      {seen.size >= 5 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={onComplete} className="btn-primary">
            {seen.size === HALLMARKS.length ? '✅ All 10 Explored! Continue →' : `Continue → (${seen.size}/${HALLMARKS.length} seen)`}
          </button>
        </div>
      )}
    </div>
  );
}
