'use client';
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';

interface Mission {
  id: string;
  title: string;
  story: string;
  objective: string;
  required: string[];
  xp: number;
  badge: string;
  hint: string;
  difficulty: 'Rookie' | 'Explorer' | 'Scientist' | 'Oncologist';
}

const MISSIONS: Mission[] = [
  {
    id: 'find_kras',
    title: 'First Contact',
    story: 'A patient has pancreatic cancer with an unknown driver mutation. KRAS is mutated in 90% of pancreatic cases — start there.',
    objective: 'Find and click the KRAS gene on the map',
    required: ['KRAS'],
    xp: 30, badge: '🎯', difficulty: 'Rookie',
    hint: 'KRAS is in the RAS/MAPK region — the red zone in the center-left of the map',
  },
  {
    id: 'kras_downstream',
    title: 'Follow the Signal',
    story: 'KRAS is stuck "on". Now trace the cascade it triggers. Find the three genes directly downstream.',
    objective: 'Explore BRAF, MEK, and ERK',
    required: ['BRAF', 'MEK', 'ERK'],
    xp: 60, badge: '⬇️', difficulty: 'Explorer',
    hint: 'KRAS → BRAF → MEK → ERK. All 3 are in the red RAS/MAPK region below KRAS',
  },
  {
    id: 'guardian',
    title: 'The Guardian Falls',
    story: 'TP53 is mutated in >50% of all human cancers. When it fails, the genome loses its primary checkpoint. Find it.',
    objective: 'Click on TP53',
    required: ['TP53'],
    xp: 40, badge: '🛡️', difficulty: 'Rookie',
    hint: 'TP53 is in the p53/Apoptosis region — center-bottom of the map. It\'s the largest blue node.',
  },
  {
    id: 'brca_pair',
    title: 'DNA Repair Heroes',
    story: 'BRCA1 and BRCA2 deficiency predisposes to breast and ovarian cancer — and also makes tumors exquisitely sensitive to PARP inhibitors. Find both.',
    objective: 'Explore BRCA1 and BRCA2',
    required: ['BRCA1', 'BRCA2'],
    xp: 70, badge: '🔬', difficulty: 'Explorer',
    hint: 'Both BRCA genes are in the DNA Repair region — the pink zone on the far right of the map',
  },
  {
    id: 'survival_pathway',
    title: 'The Survival Trio',
    story: 'The PI3K/AKT/mTOR axis is the main survival pathway — keeping cancer cells alive even when they should die. Trace it.',
    objective: 'Find PI3K, AKT, and mTOR',
    required: ['PI3K', 'AKT', 'mTOR'],
    xp: 80, badge: '💪', difficulty: 'Scientist',
    hint: 'All three are in the PI3K/AKT region — the amber/yellow zone on the right side of the map',
  },
  {
    id: 'tumor_suppressors',
    title: 'All Brakes Cut',
    story: 'Cancer disables tumor suppressors to remove growth controls. Find four of the most important ones.',
    objective: 'Explore TP53, PTEN, RB1, and CDKN2A',
    required: ['TP53', 'PTEN', 'RB1', 'CDKN2A'],
    xp: 110, badge: '🔒', difficulty: 'Scientist',
    hint: 'Blue nodes = tumor suppressors. TP53 is center, PTEN is right of KRAS, RB1 and CDKN2A are in the Cell Cycle region (bottom-left)',
  },
  {
    id: 'wnt_pathway',
    title: 'The Stem Cell Circuit',
    story: 'The Wnt pathway drives stem cell renewal and is hijacked in colorectal cancer. APC is mutated in 80% of CRC. Explore the circuit.',
    objective: 'Find APC, β-Catenin (CTNNB1), and MYC',
    required: ['APC', 'CTNNB1', 'MYC'],
    xp: 90, badge: '🌿', difficulty: 'Scientist',
    hint: 'The Wnt pathway is in the green region at the bottom-right. APC → β-Catenin → MYC.',
  },
  {
    id: 'drug_scan',
    title: 'Drugging the Undruggable',
    story: 'KRAS was considered undruggable for 40 years. Find all genes with FDA-approved targeted therapies by exploring 6 high-profile targets.',
    objective: 'Explore EGFR, ALK, BRAF, BCL2, BRCA1, and PI3K',
    required: ['EGFR', 'ALK', 'BRAF', 'BCL2', 'BRCA1', 'PI3K'],
    xp: 180, badge: '💊', difficulty: 'Oncologist',
    hint: 'These are scattered across the whole map. Check the top row for EGFR and ALK, and explore the other pathways.',
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Rookie: '#10b981', Explorer: '#00d4ff', Scientist: '#7c3aed', Oncologist: '#f59e0b',
};

function getMissionProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('gl_missions') || '{}'); } catch { return {}; }
}
function saveMissionProgress(p: Record<string, boolean>) {
  localStorage.setItem('gl_missions', JSON.stringify(p));
}

export default function MissionPanel({ exploredGenes }: { exploredGenes: Set<string> }) {
  const { addXP } = useProgress();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [justCompleted, setJustCompleted] = useState<Mission | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const saved = getMissionProgress();
    setCompleted(saved);
    // Find first incomplete mission
    const firstIncomplete = MISSIONS.findIndex(m => !saved[m.id]);
    setCurrentIdx(firstIncomplete >= 0 ? firstIncomplete : MISSIONS.length - 1);
    setShowIntro(Object.keys(saved).length === 0);
  }, []);

  // Check if current mission is accomplished
  useEffect(() => {
    const mission = MISSIONS[currentIdx];
    if (!mission || completed[mission.id]) return;
    const done = mission.required.every(g => exploredGenes.has(g));
    if (done) {
      const newCompleted = { ...completed, [mission.id]: true };
      setCompleted(newCompleted);
      saveMissionProgress(newCompleted);
      addXP(mission.xp);
      setJustCompleted(mission);
      setTimeout(() => {
        setJustCompleted(null);
        const next = MISSIONS.findIndex((m, i) => i > currentIdx && !newCompleted[m.id]);
        if (next >= 0) setCurrentIdx(next);
      }, 3200);
    }
  }, [exploredGenes, currentIdx, completed, addXP]);

  const mission = MISSIONS[currentIdx];
  const allDone = MISSIONS.every(m => completed[m.id]);
  const completedCount = Object.values(completed).filter(Boolean).length;

  const progress = mission ? mission.required.filter(g => exploredGenes.has(g)).length : 0;
  const total    = mission?.required.length ?? 1;

  return (
    <>
      {/* Completion flash */}
      {justCompleted && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          background: 'rgba(10,10,20,0.96)', border: '1px solid #10b981',
          borderRadius: 20, padding: '2rem 3rem', textAlign: 'center', zIndex: 50,
          animation: 'fadeIn 0.3s ease',
          boxShadow: '0 0 60px rgba(16,185,129,0.4)',
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{justCompleted.badge}</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#10b981', fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.25rem' }}>
            Mission Complete!
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--text2)', marginBottom: '0.5rem' }}>{justCompleted.title}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b', fontFamily: "'Space Grotesk',sans-serif" }}>
            +{justCompleted.xp} XP
          </div>
        </div>
      )}

      {/* Intro prompt */}
      {showIntro && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          background: 'rgba(10,10,20,0.97)', border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 20, padding: '2rem', maxWidth: 400, width: 'calc(100% - 48px)', zIndex: 40,
          boxShadow: '0 0 60px rgba(0,212,255,0.2)',
        }}>
          <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>🗺️</div>
          <h3 style={{ textAlign: 'center', fontWeight: 900, fontSize: '1.3rem', fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.5rem' }}>
            Welcome to Genome Explorer
          </h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.65, textAlign: 'center', marginBottom: '1.5rem' }}>
            44 cancer genes. 50+ pathway connections. Real clinical data.<br/><br/>
            Complete missions to learn how cancer pathways work — and how we target them.
          </p>
          <button onClick={() => setShowIntro(false)} className="btn-primary" style={{ width: '100%', textAlign: 'center', padding: '0.85rem' }}>
            🚀 Start First Mission
          </button>
        </div>
      )}

      {/* Mission panel */}
      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, width: 'min(460px, calc(100vw - 24px))',
        background: 'rgba(10,10,20,0.94)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        transition: 'all 0.3s',
      }}>
        {/* Header */}
        <div
          onClick={() => setCollapsed(c => !c)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.7rem 1rem', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1rem' }}>{mission?.badge ?? '🏆'}</span>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: DIFFICULTY_COLORS[mission?.difficulty ?? 'Rookie'] }}>
                {allDone ? 'All Missions Complete' : `Mission ${currentIdx + 1} of ${MISSIONS.length} · ${mission?.difficulty}`}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                {allDone ? '🏆 Genome Expert!' : mission?.title}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Overall progress dots */}
            <div style={{ display: 'flex', gap: 3 }}>
              {MISSIONS.map((m, i) => (
                <div key={m.id} style={{
                  width: i === currentIdx ? 14 : 6, height: 6, borderRadius: 3,
                  background: completed[m.id] ? '#10b981' : i === currentIdx ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
            <span style={{ color: 'var(--text3)', fontSize: '0.75rem', transform: collapsed ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>▲</span>
          </div>
        </div>

        {/* Body */}
        {!collapsed && !allDone && mission && (
          <div style={{ padding: '0 1rem 1rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text2)', fontSize: '0.82rem', lineHeight: 1.6, marginTop: '0.75rem', marginBottom: '0.75rem' }}>
              {mission.story}
            </p>

            {/* Objective */}
            <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 10, padding: '0.65rem 0.85rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.3rem' }}>Objective</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600 }}>{mission.objective}</div>
            </div>

            {/* Target genes checklist */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
              {mission.required.map(g => {
                const found = exploredGenes.has(g);
                return (
                  <div key={g} style={{
                    padding: '0.2rem 0.6rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700,
                    background: found ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${found ? '#10b981' : 'var(--border)'}`,
                    color: found ? '#10b981' : 'var(--text3)',
                    transition: 'all 0.3s',
                  }}>
                    {found ? '✓ ' : ''}{g}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>Progress</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700 }}>{progress}/{total} · +{mission.xp} XP</span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(progress / total) * 100}%`, background: 'linear-gradient(90deg,var(--accent),#0099cc)', borderRadius: 3, transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => alert(`💡 Hint: ${mission.hint}`)}
                style={{ padding: '0.38rem 0.85rem', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                💡 Hint
              </button>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {currentIdx > 0 && (
                  <button onClick={() => setCurrentIdx(i => i - 1)}
                    style={{ padding: '0.38rem 0.75rem', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', fontSize: '0.75rem', cursor: 'pointer' }}>
                    ← Prev
                  </button>
                )}
                {currentIdx < MISSIONS.length - 1 && (
                  <button onClick={() => setCurrentIdx(i => i + 1)}
                    style={{ padding: '0.38rem 0.75rem', borderRadius: 8, border: '1px solid rgba(0,212,255,0.2)', background: 'transparent', color: 'var(--accent)', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Skip →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All done state */}
        {!collapsed && allDone && (
          <div style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
              You&apos;ve completed all 8 missions and explored {exploredGenes.size} genes.<br />
              <span style={{ color: 'var(--accent)' }}>Total earned: {MISSIONS.reduce((s, m) => s + m.xp, 0)} XP</span>
            </div>
            <button onClick={() => { saveMissionProgress({}); setCompleted({}); setCurrentIdx(0); setShowIntro(false); }}
              style={{ marginTop: '0.75rem', padding: '0.45rem 1rem', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', fontSize: '0.78rem', cursor: 'pointer' }}>
              🔄 Reset missions
            </button>
          </div>
        )}
      </div>
    </>
  );
}
