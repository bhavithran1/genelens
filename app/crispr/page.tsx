'use client';
import { useState } from 'react';
import Cas9Simulator from '@/components/crispr/Cas9Simulator';
import GuideRNADesigner from '@/components/crispr/GuideRNADesigner';
import OffTargetPredictor from '@/components/crispr/OffTargetPredictor';
import TherapeuticsExplorer from '@/components/crispr/TherapeuticsExplorer';

const TABS = [
  { id: 'intro', label: '📖 How CRISPR Works' },
  { id: 'design', label: '🧬 Guide RNA Designer' },
  { id: 'cas9', label: '✂️ Cas9 Simulator' },
  { id: 'offtarget', label: '⚠️ Off-Target Predictor' },
  { id: 'therapeutics', label: '💊 Therapeutics' },
];

export default function CRISPRPage() {
  const [tab, setTab] = useState('intro');

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: '0.5rem' }}>Interactive Lab</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.5rem' }}>✂️ CRISPR-Cas9 Lab</h1>
        <p style={{ color: 'var(--text2)' }}>Design guide RNAs, simulate Cas9 cutting, predict off-targets, and explore therapeutic applications — all interactively.</p>
      </div>

      {/* Tab bar */}
      <div className="crispr-tabs">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className="crispr-tab"
            style={{ fontWeight: tab === t.id ? 700 : 400, background: tab === t.id ? 'rgba(16,185,129,0.12)' : 'transparent', color: tab === t.id ? '#10b981' : 'var(--text2)' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'intro' && <CRISPRIntro onStart={() => setTab('design')} />}
      {tab === 'design' && <GuideRNADesigner onNext={() => setTab('cas9')} />}
      {tab === 'cas9' && <Cas9Simulator onNext={() => setTab('offtarget')} />}
      {tab === 'offtarget' && <OffTargetPredictor onNext={() => setTab('therapeutics')} />}
      {tab === 'therapeutics' && <TherapeuticsExplorer />}
    </div>
  );
}

function CRISPRIntro({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: 780 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: '🧬', title: 'Guide RNA (gRNA)', desc: 'A 20-nucleotide sequence that directs Cas9 to the exact genomic location. Paired with PAM sequence (NGG for SpCas9).' },
          { icon: '✂️', title: 'Cas9 Nuclease', desc: 'The molecular scissors. Two nuclease domains (RuvC and HNH) each cut one strand of DNA, creating a double-strand break.' },
          { icon: '🔧', title: 'DNA Repair', desc: 'The cell repairs the break via NHEJ (error-prone, creates knockouts) or HDR (precise editing with a template).' },
          { icon: '💊', title: 'Therapeutic Use', desc: 'From sickle cell disease (Casgevy, 2023) to cancer immunotherapy (CAR-T enhancement) — CRISPR is transforming medicine.' },
        ].map(c => (
          <div key={c.title} style={{ background: 'var(--card)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{c.icon}</div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10b981', marginBottom: '0.4rem' }}>{c.title}</h3>
            <p style={{ color: 'var(--text2)', fontSize: '0.83rem', lineHeight: 1.55 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.75rem', fontSize: '1.1rem' }}>The CRISPR-Cas9 Mechanism</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            { step: '1', desc: 'Design a 20-nt guide RNA (gRNA) complementary to your target DNA sequence', color: '#00d4ff' },
            { step: '2', desc: 'The gRNA + Cas9 complex scans the genome for the PAM sequence (5\'-NGG-3\')', color: '#7c3aed' },
            { step: '3', desc: 'Cas9 unwinds the DNA and checks for gRNA complementarity — must match 20/20 bases', color: '#f59e0b' },
            { step: '4', desc: 'On match: RuvC cuts the non-template strand, HNH cuts the template strand → DSB', color: '#ef4444' },
            { step: '5', desc: 'Cell repairs via NHEJ (indels → knockout) or HDR with template (precise edit)', color: '#10b981' },
          ].map(s => (
            <div key={s.step} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${s.color}20`, border: `1px solid ${s.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.step}</div>
              <p style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
        <strong style={{ color: '#f59e0b' }}>🏆 Nobel Prize 2020:</strong> Jennifer Doudna and Emmanuelle Charpentier won the Nobel Prize in Chemistry for developing CRISPR-Cas9 as a genome editing tool. In 2023, Casgevy became the first approved CRISPR therapy — curing sickle cell disease.
      </div>

      <button onClick={onStart} className="btn-primary" style={{ background: 'linear-gradient(135deg,#10b981,#059669)', fontSize: '1rem', padding: '0.85rem 2rem' }}>
        🧬 Start the Lab: Design Your Guide RNA →
      </button>
    </div>
  );
}
