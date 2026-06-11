'use client';
import { useState } from 'react';
import Link from 'next/link';

const GENES = [
  {
    id: 'EGFR', x: 60, label: 'EGFR', color: '#f59e0b', type: 'RTK',
    mut: '18%', cancer: 'Lung Adenocarcinoma', drug: 'Osimertinib (3rd-gen TKI)',
    desc: 'Receptor tyrosine kinase. Exon 19 del & L858R mutations drive ~20% of lung cancers.',
    badge: '🔑 Approved target',
  },
  {
    id: 'KRAS', x: 220, label: 'KRAS', color: '#ef4444', type: 'Oncogene',
    mut: '28%', cancer: 'Pancreatic, Lung, Colon', drug: 'Sotorasib / Adagrasib (G12C)',
    desc: 'Most commonly mutated oncogene. G12C/D/V mutations lock KRAS "always-on", driving uncontrolled proliferation.',
    badge: '🔥 Most mutated oncogene',
  },
  {
    id: 'BRAF', x: 380, label: 'BRAF', color: '#ef4444', type: 'Kinase',
    mut: '14%', cancer: 'Melanoma (50%), Thyroid', drug: 'Vemurafenib + Cobimetinib',
    desc: 'V600E mutation creates a constitutively active kinase. BRAF+MEK combo therapy transformed melanoma outcomes.',
    badge: '💊 Landmark drug target',
  },
  {
    id: 'MEK', x: 540, label: 'MEK', color: '#ef4444', type: 'Kinase',
    mut: '4%', cancer: 'Melanoma, Lung', drug: 'Trametinib',
    desc: 'Phosphorylated by RAF, activates ERK. MEK inhibitors synergise with BRAF inhibitors to delay resistance.',
    badge: '⚡ Combination therapy node',
  },
  {
    id: 'ERK', x: 700, label: 'ERK', color: '#ef4444', type: 'Kinase',
    mut: '2%', cancer: 'Melanoma, Lung', drug: 'ERK inhibitors (clinical trials)',
    desc: 'Terminal effector of the RAS/MAPK cascade. Translocates to nucleus to activate proliferation genes including MYC.',
    badge: '🎯 Resistance escape route',
  },
  {
    id: 'MYC', x: 860, label: 'MYC', color: '#ef4444', type: 'Transcription factor',
    mut: '20%', cancer: 'Breast, Lymphoma, Lung', drug: 'BET inhibitors (JQ1, OTX015)',
    desc: 'Drives transcription of ~15% of the genome. Amplified in >50% of cancers — the "master regulator" of growth.',
    badge: '🧬 Amplified in 50%+ cancers',
  },
];

const ARROWS = [
  { from: 0, to: 1, label: 'activates via GRB2/SOS' },
  { from: 1, to: 2, label: 'directly activates' },
  { from: 2, to: 3, label: 'phosphorylates' },
  { from: 3, to: 4, label: 'phosphorylates' },
  { from: 4, to: 5, label: 'activates transcription' },
];

export default function PathwayPreview() {
  const [active, setActive] = useState<typeof GENES[0] | null>(null);

  return (
    <section style={{ padding: '5rem 1.5rem', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>Live Preview</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
          Click any gene to explore it
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text2)', marginBottom: '3rem', fontSize: '0.95rem' }}>
          This is the RAS / MAPK proliferation cascade — the most drugged pathway in cancer.
          <br />
          <span style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>Mutated in 30% of all human cancers.</span>
        </p>

        {/* Pathway visualization */}
        <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 960, maxWidth: 980, margin: '0 auto', position: 'relative' }}>
            {GENES.map((gene, i) => (
              <div key={gene.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                {/* Gene node */}
                <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                  <button
                    onClick={() => setActive(active?.id === gene.id ? null : gene)}
                    style={{
                      width: 72, height: 72, borderRadius: '50%',
                      background: active?.id === gene.id ? gene.color + '35' : gene.color + '14',
                      border: `2px solid ${active?.id === gene.id ? gene.color : gene.color + '55'}`,
                      cursor: 'pointer', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s',
                      boxShadow: active?.id === gene.id ? `0 0 28px ${gene.color}55` : 'none',
                      transform: active?.id === gene.id ? 'scale(1.12)' : 'scale(1)',
                    }}
                    onMouseEnter={e => { if (active?.id !== gene.id) (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)'; }}
                    onMouseLeave={e => { if (active?.id !== gene.id) (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                  >
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: '0.95rem', color: gene.color }}>{gene.label}</span>
                    <span style={{ fontSize: '0.6rem', color: gene.color + 'aa', marginTop: 2 }}>{gene.type}</span>
                  </button>
                  {/* Mutation rate badge */}
                  <div style={{ marginTop: 6, padding: '0.15rem 0.5rem', borderRadius: 6, background: gene.color + '18', border: `1px solid ${gene.color}33`, fontSize: '0.65rem', color: gene.color, fontWeight: 700 }}>
                    {gene.mut} mut
                  </div>
                </div>

                {/* Arrow connector */}
                {i < GENES.length - 1 && (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '0 4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <div style={{ flex: 1, height: 1.5, background: 'linear-gradient(90deg,rgba(239,68,68,0.3),rgba(239,68,68,0.7))' }} />
                      <span style={{ color: '#ef4444', fontSize: '1rem', marginLeft: -1 }}>›</span>
                    </div>
                    <div style={{ fontSize: '0.58rem', color: 'var(--text3)', textAlign: 'center', lineHeight: 1.2 }}>
                      {ARROWS[i].label}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detail card */}
        <div style={{
          marginTop: '2rem', maxWidth: 600, margin: '2rem auto 0',
          minHeight: 140,
          transition: 'all 0.3s',
        }}>
          {active ? (
            <div style={{ background: 'var(--card)', border: `1px solid ${active.color}33`, borderRadius: 16, padding: '1.5rem', borderLeft: `4px solid ${active.color}`, animation: 'fadeIn 0.25s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: active.color, fontFamily: "'Space Grotesk',sans-serif" }}>{active.label}</h3>
                  <div style={{ display: 'inline-block', marginTop: 4, padding: '0.15rem 0.6rem', borderRadius: 5, background: active.color + '18', fontSize: '0.7rem', color: active.color, fontWeight: 700 }}>{active.badge}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: active.color, fontFamily: "'Space Grotesk',sans-serif" }}>{active.mut}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>mutation rate</div>
                </div>
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.87rem', lineHeight: 1.65, marginBottom: '0.85rem' }}>{active.desc}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text3)' }}>Cancer: </span>
                  <span style={{ color: '#f87171' }}>{active.cancer}</span>
                </div>
                <div style={{ fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text3)' }}>Drug: </span>
                  <span style={{ color: '#10b981' }}>{active.drug}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text3)', fontSize: '0.88rem', borderRadius: 12, border: '1px dashed var(--border)' }}>
              ☝️ Click any gene node above to explore its biology, cancer associations, and approved drugs
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/explorer" className="btn-primary" style={{ fontSize: '0.95rem' }}>
            🗺️ Open Full Genome Explorer — 40+ Genes →
          </Link>
          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text3)' }}>
            Pan · zoom · click any gene · follow any pathway
          </div>
        </div>
      </div>
    </section>
  );
}
