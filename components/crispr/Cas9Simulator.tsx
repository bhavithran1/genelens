'use client';
import { useState } from 'react';

type Phase = 'idle' | 'scanning' | 'binding' | 'cutting' | 'repair' | 'done';

const REPAIR_PATHS = [
  {
    id: 'nhej',
    label: 'NHEJ — Non-Homologous End Joining',
    desc: 'Error-prone repair that often introduces insertions or deletions (indels). Use this to KNOCK OUT a gene.',
    outcome: 'Frameshift mutation → protein knockout',
    color: '#ef4444',
    example: 'Used in CAR-T cell manufacturing to knock out PD-1 and enhance anti-tumor activity.',
  },
  {
    id: 'hdr',
    label: 'HDR — Homology-Directed Repair',
    desc: 'Precise repair using a DNA template. Use this to CORRECT a specific mutation.',
    outcome: 'Precise single nucleotide correction',
    color: '#10b981',
    example: 'Used in Casgevy (sickle cell) therapy to correct the HBB E6V mutation.',
  },
];

export default function Cas9Simulator({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [repairChoice, setRepairChoice] = useState<string | null>(null);

  const advance = () => {
    const order: Phase[] = ['idle', 'scanning', 'binding', 'cutting', 'repair', 'done'];
    const idx = order.indexOf(phase);
    setPhase(order[idx + 1] ?? 'done');
  };

  const PHASES = {
    idle: { icon: '🧬', label: 'Ready', desc: 'Cas9 loaded with guide RNA. Awaiting target DNA.' },
    scanning: { icon: '🔍', label: 'Scanning genome...', desc: 'Cas9-gRNA complex slides along DNA, reading each sequence for PAM (NGG).' },
    binding: { icon: '🔗', label: 'Target found — binding!', desc: 'PAM detected. Cas9 unwinds DNA and checks gRNA complementarity across 20 bases.' },
    cutting: { icon: '✂️', label: 'CUTTING!', desc: 'HNH domain cuts the guide-matching strand. RuvC cuts the non-complementary strand. Double-strand break created.' },
    repair: { icon: '🔧', label: 'Choose repair pathway', desc: 'The cell detects the DSB and initiates repair. Choose NHEJ (knockout) or HDR (correction).' },
    done: { icon: '✅', label: 'Edit complete!', desc: 'The selected repair pathway has modified the target sequence. Verify your edit.' },
  };

  const current = PHASES[phase];

  const colors: Record<Phase, string> = {
    idle: '#94a3b8', scanning: '#f59e0b', binding: '#00d4ff', cutting: '#ef4444', repair: '#7c3aed', done: '#10b981'
  };

  return (
    <div style={{ maxWidth: 760 }}>
      <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem' }}>✂️ Cas9 Cutting Simulator</h2>
      <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Walk through each step of the CRISPR-Cas9 editing process — from genome scanning to DNA repair.
      </p>

      {/* Visual DNA strip */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <div className="dna-strip">
          {('ATGGAGGAGCCGCAGTCAGATCC' + 'NGG').split('').map((b, i) => {
            const isPAM = i >= 23;
            const isCut = (phase === 'cutting' || phase === 'repair' || phase === 'done') && i >= 17 && i <= 22;
            const isGuide = (phase === 'binding' || phase === 'cutting' || phase === 'repair' || phase === 'done') && i < 20;
            const col = isPAM ? '#f59e0b' : b === 'A' ? '#ef4444' : b === 'T' ? '#3b82f6' : b === 'G' ? '#10b981' : '#a78bfa';
            return (
              <div key={i} className="dna-base" style={{
                background: isCut ? 'rgba(239,68,68,0.2)' : isGuide ? `${col}22` : `${col}12`,
                border: `1px solid ${isCut ? '#ef4444' : isGuide ? `${col}66` : isPAM ? '#f59e0b44' : `${col}33`}`,
                color: isCut ? '#ef4444' : col,
              }}>
                {b}
              </div>
            );
          })}
        </div>

        {/* Phase indicator */}
        <div style={{ textAlign: 'center', padding: '1.25rem', borderRadius: 12, background: `${colors[phase]}10`, border: `1px solid ${colors[phase]}33`, transition: 'all 0.4s' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{current.icon}</div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: colors[phase], marginBottom: '0.4rem' }}>{current.label}</div>
          <p style={{ color: 'var(--text2)', fontSize: '0.86rem', lineHeight: 1.6 }}>{current.desc}</p>
        </div>
      </div>

      {/* Repair choice */}
      {phase === 'repair' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          {REPAIR_PATHS.map(r => (
            <button key={r.id} onClick={() => setRepairChoice(r.id)}
              style={{ padding: '1rem', borderRadius: 12, border: `2px solid ${repairChoice === r.id ? r.color : 'var(--border)'}`, background: repairChoice === r.id ? `${r.color}10` : 'var(--card)', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontWeight: 700, color: r.color, marginBottom: '0.4rem', fontSize: '0.88rem' }}>{r.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5, marginBottom: '0.4rem' }}>{r.desc}</div>
              <div style={{ fontSize: '0.74rem', color: r.color, fontWeight: 600 }}>→ {r.outcome}</div>
            </button>
          ))}
        </div>
      )}

      {/* Done result */}
      {phase === 'done' && repairChoice && (
        <div style={{ marginBottom: '1rem', padding: '1rem', borderRadius: 12, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.4rem' }}>🎉 Editing Complete!</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
            {REPAIR_PATHS.find(r => r.id === repairChoice)?.example}
          </div>
        </div>
      )}

      {/* Step progress */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
        {(['idle', 'scanning', 'binding', 'cutting', 'repair', 'done'] as Phase[]).map((p, i) => {
          const current_idx = ['idle', 'scanning', 'binding', 'cutting', 'repair', 'done'].indexOf(phase);
          return (
            <div key={p} style={{ width: i === current_idx ? 24 : 8, height: 8, borderRadius: 4, background: i <= current_idx ? colors[p] : 'rgba(255,255,255,0.1)', transition: 'all 0.3s' }} />
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {phase !== 'done' && (
          <button onClick={advance}
            disabled={phase === 'repair' && !repairChoice}
            style={{ padding: '0.7rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: (phase !== 'repair' || repairChoice) ? 'pointer' : 'not-allowed', background: (phase !== 'repair' || repairChoice) ? `linear-gradient(135deg,${colors[phase]},${colors[phase]}bb)` : 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.9rem', transition: 'all 0.2s' }}>
            {phase === 'idle' ? '🚀 Start Scanning' : phase === 'scanning' ? '🔗 Found Target!' : phase === 'binding' ? '✂️ Cut DNA!' : phase === 'cutting' ? '🔧 Initiate Repair' : '✅ Apply Repair'}
          </button>
        )}
        {phase === 'done' && <button onClick={onNext} className="btn-primary">Next: Off-Target Prediction →</button>}
      </div>
    </div>
  );
}
