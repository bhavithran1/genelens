'use client';
import { useState } from 'react';

const THERAPEUTICS = [
  {
    id: 'casgevy',
    name: 'Casgevy (Exa-cel)',
    status: '✅ FDA Approved — Dec 2023',
    target: 'BCL11A enhancer',
    disease: 'Sickle Cell Disease & β-Thalassemia',
    color: '#10b981',
    mechanism: 'Disrupts BCL11A enhancer, de-repressing fetal hemoglobin (HbF) gene. HbF outcompetes sickle hemoglobin — red blood cells function normally.',
    outcome: '94% of sickle cell patients free from severe pain crises. 93% of thalassemia patients transfusion-independent.',
    developer: 'Vertex + CRISPR Therapeutics',
    editType: 'Ex vivo — patient HSCs edited in lab, reinfused after myeloablative conditioning',
  },
  {
    id: 'cart',
    name: 'CRISPR-Enhanced CAR-T',
    status: '🔬 Clinical Trials (Phase 1/2)',
    target: 'PD-1, TRAC, B2M loci',
    disease: 'Multiple Blood Cancers',
    color: '#00d4ff',
    mechanism: 'Knock out PD-1 to prevent exhaustion. Knock out TRAC for allogeneic (donor) CAR-T manufacturing. Knock out B2M to evade host immune rejection.',
    outcome: 'Early data: deeper, more durable responses vs conventional CAR-T. CTX110 achieved 82% ORR in CD19+ B-cell cancers.',
    developer: 'CRISPR Therapeutics (CTX110), Allogene, Precision BioSciences',
    editType: 'Ex vivo — T-cells edited, expanded, infused',
  },
  {
    id: 'intellia',
    name: 'NTLA-2001 (TTR Amyloidosis)',
    status: '🔬 Phase 1 — First In Vivo CRISPR',
    target: 'TTR gene (liver)',
    disease: 'Transthyretin Amyloidosis',
    color: '#7c3aed',
    mechanism: 'LNP-delivered CRISPR-Cas9 directly injected IV. LNPs home to liver. Cas9 knocks out TTR gene. 90%+ reduction in misfolded protein production.',
    outcome: '87% reduction in serum TTR at 12 months with single dose. Potentially curative.',
    developer: 'Intellia Therapeutics + Regeneron',
    editType: 'In vivo — LNP delivery directly to liver cells',
  },
  {
    id: 'kras_edit',
    name: 'Anti-KRAS CRISPR Therapies',
    status: '🔬 Preclinical / Early Phase',
    target: 'KRAS G12D, G12V alleles',
    disease: 'Pancreatic, Lung, Colorectal Cancer',
    color: '#ef4444',
    mechanism: 'Allele-specific gRNAs designed to cut only the G12D/G12V mutant sequence — sparing wild-type KRAS. Delivered via lipid nanoparticles or viral vectors into tumor.',
    outcome: 'Preclinical: 80-90% tumor reduction in mouse models. Phase 1 trials initiating 2024.',
    developer: 'Multiple groups: Arbor Biotechnologies, CRISPR Therapeutics',
    editType: 'In vivo tumor delivery — LNP, AAV, or intratumoral injection',
  },
  {
    id: 'base_edit',
    name: 'Base Editing: BEAM-301',
    status: '🔬 Phase 1/2',
    target: 'ADAR2 splice site / β-globin',
    disease: 'Sickle Cell Disease variants',
    color: '#f59e0b',
    mechanism: 'Base editors (ABE8e) convert A•T to G•C without creating DSBs — safer, more precise. Corrects the E6V mutation directly at the DNA level without a repair template.',
    outcome: 'Preclinical: >80% allelic correction efficiency. Ongoing Phase 1 results awaited.',
    developer: 'Beam Therapeutics',
    editType: 'Ex vivo base editing — precise, no double-strand breaks',
  },
];

export default function TherapeuticsExplorer() {
  const [selected, setSelected] = useState(THERAPEUTICS[0]);

  return (
    <div style={{ maxWidth: 960 }}>
      <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem' }}>💊 CRISPR Therapeutic Applications</h2>
      <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        From approved medicines to early clinical trials — explore how CRISPR is being deployed to treat genetic diseases and cancer.
      </p>

      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Therapy list */}
        <div style={{ width: 240, flexShrink: 0 }}>
          {THERAPEUTICS.map(t => (
            <button key={t.id} onClick={() => setSelected(t)}
              style={{ display: 'block', width: '100%', padding: '0.75rem 0.9rem', borderRadius: 10, marginBottom: '0.4rem', textAlign: 'left', cursor: 'pointer', border: `1px solid ${selected.id === t.id ? t.color + '55' : 'var(--border)'}`, background: selected.id === t.id ? `${t.color}10` : 'var(--card)', transition: 'all 0.15s' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: selected.id === t.id ? t.color : 'var(--text)', marginBottom: '0.2rem' }}>{t.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{t.disease}</div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ background: 'var(--card)', border: `1px solid ${selected.color}22`, borderRadius: 14, padding: '1.5rem', borderTop: `3px solid ${selected.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ fontWeight: 900, fontSize: '1.15rem', color: selected.color, fontFamily: "'Space Grotesk',sans-serif" }}>{selected.name}</h3>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: 6, background: selected.status.startsWith('✅') ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${selected.status.startsWith('✅') ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`, fontSize: '0.75rem', fontWeight: 700, color: selected.status.startsWith('✅') ? '#10b981' : '#f59e0b' }}>
                {selected.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {[
                { label: 'Disease', value: selected.disease },
                { label: 'Target', value: selected.target },
                { label: 'Developer', value: selected.developer },
                { label: 'Edit Type', value: selected.editType },
              ].map(f => (
                <div key={f.label} style={{ padding: '0.65rem 0.75rem', borderRadius: 9, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: '0.2rem' }}>{f.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>{f.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: '0.4rem' }}>Mechanism</div>
              <p style={{ color: 'var(--text2)', fontSize: '0.87rem', lineHeight: 1.65 }}>{selected.mechanism}</p>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 10, background: `${selected.color}08`, border: `1px solid ${selected.color}22` }}>
              <div style={{ fontSize: '0.68rem', color: selected.color, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: '0.3rem' }}>Clinical Outcomes</div>
              <p style={{ color: 'var(--text)', fontSize: '0.87rem', lineHeight: 1.6 }}>{selected.outcome}</p>
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '0.9rem 1rem', borderRadius: 12, background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--accent)' }}>🎓 You&apos;ve completed the CRISPR Lab!</strong> You now understand how CRISPR works, how to design guide RNAs, what off-targets are, and how this technology is being used in real clinical trials. Head to the Learn section to continue your genomics education.
          </div>
        </div>
      </div>
    </div>
  );
}
