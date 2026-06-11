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
  summary: string;
  difficulty: 'Rookie' | 'Explorer' | 'Scientist' | 'Oncologist' | 'Legend';
}

const MISSIONS: Mission[] = [
  {
    id: 'find_kras',
    title: 'First Contact',
    story: 'A patient has pancreatic cancer with an unknown driver mutation. KRAS is mutated in 90% of pancreatic cases — start there.',
    objective: 'Find and click the KRAS gene on the map',
    required: ['KRAS'],
    xp: 30, badge: '🎯', difficulty: 'Rookie',
    hint: 'KRAS is in the RAS/MAPK region — the red zone in the center-left of the map.',
    summary: "KRAS is like a car's accelerator pedal stuck to the floor. Normally it turns on briefly to signal growth, then shuts off. When mutated, it stays \"always on\" — constantly telling the cell to divide. This single change drives 90% of pancreatic cancers and a third of all cancers.",
  },
  {
    id: 'kras_downstream',
    title: 'Follow the Signal',
    story: 'KRAS is stuck "on". Trace the cascade it triggers all the way to BRAF, MEK, and ERK.',
    objective: 'Explore BRAF, MEK, and ERK',
    required: ['BRAF', 'MEK', 'ERK'],
    xp: 60, badge: '⬇️', difficulty: 'Explorer',
    hint: 'All 3 are in the red RAS/MAPK region below KRAS. Click each node to explore.',
    summary: 'Think of this as a telephone relay: KRAS calls BRAF, BRAF calls MEK, MEK calls ERK. ERK enters the nucleus and flips on "grow and divide" genes. This cascade is so important that blocking any step stops certain cancers — Vemurafenib blocks BRAF, Trametinib blocks MEK.',
  },
  {
    id: 'guardian',
    title: 'The Guardian Falls',
    story: 'TP53 is the "guardian of the genome," mutated in >50% of all cancers. Find it and learn why losing it is so catastrophic.',
    objective: 'Click on TP53',
    required: ['TP53'],
    xp: 40, badge: '🛡️', difficulty: 'Rookie',
    hint: 'TP53 is the large blue node in the center-bottom of the map, in the p53/Apoptosis region.',
    summary: 'TP53 is like a security guard patrolling the cell\'s DNA. When it detects damage, it halts division and orders repairs — or if damage is too severe, orders the cell to self-destruct (apoptosis). When TP53 is mutated and the guard goes off duty, damaged cells keep dividing freely, accumulating more mutations. That\'s how tumors grow.',
  },
  {
    id: 'brca_pair',
    title: 'DNA Repair Heroes',
    story: 'BRCA1 and BRCA2 fix the most dangerous type of DNA break. Without them, cells become genomically unstable — and also vulnerable to PARP inhibitors.',
    objective: 'Explore BRCA1 and BRCA2',
    required: ['BRCA1', 'BRCA2'],
    xp: 70, badge: '🔬', difficulty: 'Explorer',
    hint: 'Both BRCA genes are in the pink DNA Repair region on the far right of the map.',
    summary: 'Every cell has two copies of its DNA. When one copy breaks, BRCA1/2 are the repair crew that fixes it using the undamaged copy as a template. Without them, breaks are repaired sloppily, causing mutations. BRCA-deficient cancer cells become addicted to a backup repair enzyme called PARP — so PARP inhibitors like Olaparib kill them selectively while sparing normal cells.',
  },
  {
    id: 'survival_pathway',
    title: 'The Survival Trio',
    story: 'The PI3K/AKT/mTOR axis is the main survival pathway — keeping cancer cells alive even when they should die. Trace all three.',
    objective: 'Find PI3K, AKT, and mTOR',
    required: ['PI3K', 'AKT', 'mTOR'],
    xp: 80, badge: '💪', difficulty: 'Scientist',
    hint: 'All three are in the amber/yellow PI3K/AKT region on the right side of the map.',
    summary: 'Imagine PI3K/AKT/mTOR as a cell\'s "stay alive" emergency button. In cancer, mutations keep this permanently switched on, blocking apoptosis (cell death), boosting protein production, and forcing the cell to consume nutrients constantly. mTOR is the master scheduler — it decides whether the cell should grow or conserve energy.',
  },
  {
    id: 'egfr_addiction',
    title: 'Receptor Addiction',
    story: 'Some lung cancers become completely dependent on EGFR signals to survive — a concept called "oncogene addiction." Find EGFR and HER2.',
    objective: 'Find EGFR and HER2',
    required: ['EGFR', 'HER2'],
    xp: 65, badge: '📡', difficulty: 'Explorer',
    hint: 'Both are receptor tyrosine kinases in the amber membrane region at the top of the map.',
    summary: 'EGFR is like an antenna on the cell surface that receives "grow" messages from outside. When mutated, it signals constantly. Some cancer cells become so dependent on this one signal that if you block it (with Osimertinib), the entire cancer collapses — even though normal cells barely notice. This "oncogene addiction" is why targeted therapy works so dramatically in EGFR-mutant lung cancer.',
  },
  {
    id: 'tumor_suppressors',
    title: 'All Brakes Cut',
    story: 'Cancer must disable its own brakes before it can accelerate. Find the four most commonly lost tumor suppressors.',
    objective: 'Explore TP53, PTEN, RB1, and CDKN2A',
    required: ['TP53', 'PTEN', 'RB1', 'CDKN2A'],
    xp: 110, badge: '🔒', difficulty: 'Scientist',
    hint: 'Blue nodes are tumor suppressors. PTEN is near KRAS, RB1 and CDKN2A are in the Cell Cycle region (bottom-left).',
    summary: 'Think of tumor suppressors as a car\'s brake system. Cancer needs to cut multiple brakes before it can run away. TP53 pauses division if DNA is damaged. PTEN turns off the PI3K survival signal. RB1 is the gatekeeper of the cell cycle. CDKN2A is the handbrake — it stops the enzymes (CDKs) that push the cell forward. Cancers typically accumulate mutations in several of these to escape all checkpoints.',
  },
  {
    id: 'wnt_pathway',
    title: 'The Stem Cell Circuit',
    story: 'The Wnt pathway controls stem cell renewal and tissue repair. Hijacked in colorectal cancer, it drives uncontrolled self-renewal.',
    objective: 'Find APC, CTNNB1 (β-Catenin), and MYC',
    required: ['APC', 'CTNNB1', 'MYC'],
    xp: 90, badge: '🌿', difficulty: 'Scientist',
    hint: 'The Wnt pathway is in the teal region at the bottom-right. APC acts as a brake on β-Catenin.',
    summary: 'In a normal cell, β-Catenin is held in a "destruction complex" by APC. When a Wnt signal arrives, APC releases β-Catenin, which travels to the nucleus and turns on growth genes including MYC. In 80% of colorectal cancers, APC is mutated and permanently releases β-Catenin — the Wnt pathway is stuck "on" without any Wnt signal, telling cells to act like immortal stem cells.',
  },
  {
    id: 'apoptosis_evasion',
    title: 'Immortal Cells',
    story: 'Cancer cells must escape programmed death (apoptosis) to survive. BCL-2 controls the cell\'s internal suicide switch.',
    objective: 'Find BCL2 and MDM2',
    required: ['BCL2', 'MDM2'],
    xp: 75, badge: '☠️', difficulty: 'Scientist',
    hint: 'BCL2 and MDM2 are in or near the p53/Apoptosis region in the center of the map.',
    summary: 'Every cell carries the molecular machinery to self-destruct — a failsafe to prevent cancer. BCL-2 is an anti-apoptosis protein that locks that machinery shut. When BCL-2 is overexpressed, the cell becomes "immortal" because no matter how damaged it is, it cannot die. MDM2 works differently — it targets and destroys TP53. Venetoclax (for leukemia) blocks BCL-2 directly, forcing cancer cells to die.',
  },
  {
    id: 'kinase_trio',
    title: 'The Kinase Empire',
    story: 'Kinases relay signals by tagging proteins with phosphate groups. Nearly 30% of approved cancer drugs target kinases.',
    objective: 'Explore ALK, RET, and MET',
    required: ['ALK', 'RET', 'MET'],
    xp: 85, badge: '⚗️', difficulty: 'Scientist',
    hint: 'ALK and RET are in the membrane/receptor region. MET is also in the upper portion of the map.',
    summary: 'Kinases are molecular switches that add a phosphate tag to proteins, turning them on or off. Cancer hijacks kinases to keep growth signals permanently flowing. ALK, RET, and MET can form "fusions" — they get spliced with unrelated genes during DNA rearrangements, creating permanently active super-kinases. Targeted drugs (Lorlatinib for ALK, Selpercatinib for RET) fit precisely into the kinase active site and block it — like putting a key in a lock backwards.',
  },
  {
    id: 'cell_cycle',
    title: 'The Cell Cycle Clock',
    story: 'CDK4/6 push cells from the growth phase into DNA replication. In breast cancer, they\'re chronically overactivated.',
    objective: 'Find CDK4, CDK6, and CCND1',
    required: ['CDK4', 'CDK6', 'CCND1'],
    xp: 95, badge: '⏱️', difficulty: 'Scientist',
    hint: 'These are in the Cell Cycle region at the bottom-left of the map.',
    summary: 'Think of the cell cycle like a washing machine with timed stages. CDK4 and CDK6 are the motors that push the cycle from the preparation stage into DNA copying. They only activate when their partner protein Cyclin D1 (CCND1) is present. In hormone receptor-positive breast cancer, this system is chronically overactivated. CDK4/6 inhibitors (Palbociclib, Ribociclib) put the cancer cell\'s division clock on pause indefinitely.',
  },
  {
    id: 'epigenetic_regulators',
    title: 'The Gene Silencers',
    story: 'Not all cancer mutations change protein sequences. Some mutations alter how genes are packaged — the epigenome.',
    objective: 'Find EZH2 and DNMT3A',
    required: ['EZH2', 'DNMT3A'],
    xp: 100, badge: '🧵', difficulty: 'Oncologist',
    hint: 'EZH2 and DNMT3A are in the outer regions of the map.',
    summary: 'Imagine your DNA as text in a book. Epigenetic changes do not rewrite the text — they use highlighters to change which pages are read. EZH2 adds a "silence" mark to tumor suppressor genes, hiding them from the cell\'s reading machinery. DNMT3A methylates DNA directly, permanently silencing genes. Crucially, these changes are reversible — unlike DNA mutations. That\'s why EZH2 inhibitors like Tazemetostat can sometimes reactivate silenced tumor suppressors.',
  },
  {
    id: 'drug_scan',
    title: 'Drugging the Undruggable',
    story: 'KRAS was considered undruggable for 40 years because its surface was too smooth for drugs to grip. A hidden pocket changed everything in 2021.',
    objective: 'Explore KRAS, EGFR, BRAF, BCL2, BRCA1, and PI3K',
    required: ['KRAS', 'EGFR', 'BRAF', 'BCL2', 'BRCA1', 'PI3K'],
    xp: 180, badge: '💊', difficulty: 'Oncologist',
    hint: 'These are scattered across the whole map. Use the checklist to track which ones you have found.',
    summary: 'Sotorasib locks KRAS G12C in its inactive state using the mutation itself as an anchor — a beautiful example of precision medicine. Each gene here represents a different drugging strategy: blocking an antenna (EGFR), inhibiting a relay (BRAF), forcing cell death (BCL2), exploiting a repair defect (BRCA1), blocking the survival switch (PI3K). Together they represent 20+ years of targeted therapy breakthroughs.',
  },
  {
    id: 'master_explorer',
    title: 'Master Explorer',
    story: 'You have traced oncogenes, tumor suppressors, DNA repair, cell cycle checkpoints, and druggable targets. Now explore the full map — click 20 unique genes.',
    objective: 'Explore any 20 genes total',
    required: [],
    xp: 250, badge: '🏆', difficulty: 'Legend',
    hint: 'Just keep clicking genes you have not seen yet — each one teaches something new!',
    summary: 'Cancer requires three core changes: sustained growth signals (KRAS, EGFR, BRAF), loss of growth restraints (TP53, RB1, PTEN), and escape from cell death (BCL2, MDM2). Every cancer is a unique combination of these failures — which is why two patients with "the same cancer" can respond to completely different drugs. You now understand the entire framework of cancer biology.',
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Rookie: '#10b981', Explorer: '#00d4ff', Scientist: '#7c3aed', Oncologist: '#f59e0b', Legend: '#f43f5e',
};

function getMissionProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('gl_missions') || '{}'); } catch { return {}; }
}
function saveMissionProgress(p: Record<string, boolean>) {
  localStorage.setItem('gl_missions', JSON.stringify(p));
}

function isMissionComplete(mission: Mission, exploredGenes: Set<string>): boolean {
  if (mission.id === 'master_explorer') return exploredGenes.size >= 20;
  return mission.required.every(g => exploredGenes.has(g));
}

export default function MissionPanel({ exploredGenes }: { exploredGenes: Set<string> }) {
  const { addXP } = useProgress();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [justCompleted, setJustCompleted] = useState<Mission | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const saved = getMissionProgress();
    setCompleted(saved);
    const firstIncomplete = MISSIONS.findIndex(m => !saved[m.id]);
    setCurrentIdx(firstIncomplete >= 0 ? firstIncomplete : MISSIONS.length - 1);
    setShowIntro(Object.keys(saved).length === 0);
  }, []);

  useEffect(() => {
    const mission = MISSIONS[currentIdx];
    if (!mission || completed[mission.id]) return;
    const done = isMissionComplete(mission, exploredGenes);
    if (done) {
      const newCompleted = { ...completed, [mission.id]: true };
      setCompleted(newCompleted);
      saveMissionProgress(newCompleted);
      addXP(mission.xp);
      setJustCompleted(mission);
      setShowSummary(true);
      setTimeout(() => {
        setJustCompleted(null);
        const next = MISSIONS.findIndex((m, i) => i > currentIdx && !newCompleted[m.id]);
        if (next >= 0) setCurrentIdx(next);
      }, 4500);
    }
  }, [exploredGenes, currentIdx, completed, addXP]);

  const mission = MISSIONS[currentIdx];
  const allDone = MISSIONS.every(m => completed[m.id]);
  const completedCount = Object.values(completed).filter(Boolean).length;

  const progress = mission
    ? mission.id === 'master_explorer'
      ? Math.min(exploredGenes.size, 20)
      : mission.required.filter(g => exploredGenes.has(g)).length
    : 0;
  const total = mission
    ? mission.id === 'master_explorer' ? 20 : mission.required.length
    : 1;

  return (
    <>
      {/* Completion flash */}
      {justCompleted && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          background: 'rgba(10,10,20,0.97)', border: '1px solid #10b981',
          borderRadius: 20, padding: '2rem 2.5rem', textAlign: 'center', zIndex: 50,
          animation: 'fadeIn 0.3s ease',
          boxShadow: '0 0 60px rgba(16,185,129,0.4)',
          maxWidth: 'min(420px, calc(100vw - 40px))',
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{justCompleted.badge}</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#10b981', fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.25rem' }}>
            Mission Complete!
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--text2)', marginBottom: '0.5rem' }}>{justCompleted.title}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b', fontFamily: "'Space Grotesk',sans-serif", marginBottom: '1rem' }}>
            +{justCompleted.xp} XP
          </div>
          <div style={{ fontSize: '0.81rem', color: 'var(--text2)', lineHeight: 1.65, textAlign: 'left', background: 'rgba(124,58,237,0.08)', borderRadius: 10, padding: '0.85rem', border: '1px solid rgba(124,58,237,0.25)' }}>
            <span style={{ fontSize: '0.65rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: '0.3rem' }}>What this means</span>
            {justCompleted.summary}
          </div>
        </div>
      )}

      {/* Intro prompt */}
      {showIntro && !justCompleted && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          background: 'rgba(10,10,20,0.97)', border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 20, padding: '2rem', maxWidth: 400, width: 'calc(100% - 40px)', zIndex: 40,
          boxShadow: '0 0 60px rgba(0,212,255,0.2)',
        }}>
          <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>🗺️</div>
          <h3 style={{ textAlign: 'center', fontWeight: 900, fontSize: '1.3rem', fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.5rem' }}>
            Welcome to Genome Explorer
          </h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.65, textAlign: 'center', marginBottom: '1.5rem' }}>
            44 cancer genes · 50+ pathway connections · Real clinical data
            <br /><br />
            Complete <strong style={{ color: 'var(--accent)' }}>14 progressive missions</strong> to learn how cancer pathways work — and how we target them with drugs.
          </p>
          <button onClick={() => setShowIntro(false)} className="btn-primary" style={{ width: '100%', textAlign: 'center', padding: '0.85rem' }}>
            🚀 Start First Mission
          </button>
        </div>
      )}

      {/* Mission panel */}
      <div style={{
        position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, width: 'min(480px, calc(100vw - 20px))',
        background: 'rgba(10,10,20,0.94)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      }}>
        {/* Header — always visible */}
        <div
          onClick={() => setCollapsed(c => !c)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.85rem', cursor: 'pointer', gap: '0.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{mission?.badge ?? '🏆'}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.59rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: DIFFICULTY_COLORS[mission?.difficulty ?? 'Rookie'], whiteSpace: 'nowrap' }}>
                {allDone ? 'All Done' : `${completedCount}/${MISSIONS.length} · ${mission?.difficulty}`}
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {allDone ? '🏆 Genome Master!' : mission?.title}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 2, flexWrap: 'nowrap' }}>
              {MISSIONS.map((m, i) => (
                <div
                  key={m.id}
                  onClick={e => { e.stopPropagation(); setCurrentIdx(i); setCollapsed(false); }}
                  title={m.title}
                  style={{
                    width: i === currentIdx ? 10 : 4, height: 4, borderRadius: 2,
                    background: completed[m.id] ? '#10b981' : i === currentIdx ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s', cursor: 'pointer',
                  }}
                />
              ))}
            </div>
            <span style={{ color: 'var(--text3)', fontSize: '0.68rem', transform: collapsed ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>▲</span>
          </div>
        </div>

        {/* Body */}
        {!collapsed && !allDone && mission && (
          <div style={{ padding: '0 0.85rem 0.85rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text2)', fontSize: '0.79rem', lineHeight: 1.6, marginTop: '0.6rem', marginBottom: '0.6rem' }}>
              {mission.story}
            </p>

            {/* Objective */}
            <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 9, padding: '0.5rem 0.75rem', marginBottom: '0.6rem' }}>
              <div style={{ fontSize: '0.59rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.2rem' }}>Objective</div>
              <div style={{ fontSize: '0.79rem', color: 'var(--text)', fontWeight: 600 }}>{mission.objective}</div>
            </div>

            {/* Gene checklist */}
            {(mission.required.length > 0 || mission.id === 'master_explorer') && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28rem', marginBottom: '0.6rem' }}>
                {mission.required.map(g => {
                  const found = exploredGenes.has(g);
                  return (
                    <div key={g} style={{
                      padding: '0.16rem 0.5rem', borderRadius: 5, fontSize: '0.7rem', fontWeight: 700,
                      background: found ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${found ? '#10b981' : 'var(--border)'}`,
                      color: found ? '#10b981' : 'var(--text3)',
                      transition: 'all 0.3s',
                    }}>
                      {found ? '✓ ' : ''}{g}
                    </div>
                  );
                })}
                {mission.id === 'master_explorer' && (
                  <div style={{ padding: '0.16rem 0.5rem', borderRadius: 5, fontSize: '0.7rem', fontWeight: 700, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--accent)' }}>
                    {exploredGenes.size}/20 genes clicked
                  </div>
                )}
              </div>
            )}

            {/* Progress bar */}
            <div style={{ marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>Progress</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700 }}>{progress}/{total} · +{mission.xp} XP</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(progress / Math.max(total, 1)) * 100}%`, background: 'linear-gradient(90deg,var(--accent),#0099cc)', borderRadius: 2, transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* Summary / explain box */}
            {showSummary && (
              <div style={{ marginBottom: '0.6rem', background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.22)', borderRadius: 9, padding: '0.65rem 0.8rem' }}>
                <div style={{ fontSize: '0.58rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.3rem' }}>💡 What this means</div>
                <p style={{ fontSize: '0.77rem', color: 'var(--text2)', lineHeight: 1.65, margin: 0 }}>{mission.summary}</p>
              </div>
            )}

            {/* Actions row */}
            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <button
                  onClick={() => alert(`💡 Hint: ${mission.hint}`)}
                  style={{ padding: '0.3rem 0.65rem', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', fontSize: '0.7rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                  💡 Hint
                </button>
                <button
                  onClick={() => setShowSummary(s => !s)}
                  style={{
                    padding: '0.3rem 0.65rem', borderRadius: 6, fontSize: '0.7rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif',
                    border: `1px solid ${showSummary ? 'rgba(124,58,237,0.4)' : 'var(--border)'}`,
                    background: showSummary ? 'rgba(124,58,237,0.1)' : 'transparent',
                    color: showSummary ? '#a78bfa' : 'var(--text3)',
                  }}>
                  🧠 Explain
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {currentIdx > 0 && (
                  <button onClick={() => setCurrentIdx(i => i - 1)}
                    style={{ padding: '0.3rem 0.6rem', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', fontSize: '0.7rem', cursor: 'pointer' }}>
                    ←
                  </button>
                )}
                {currentIdx < MISSIONS.length - 1 && (
                  <button onClick={() => setCurrentIdx(i => i + 1)}
                    style={{ padding: '0.3rem 0.6rem', borderRadius: 6, border: '1px solid rgba(0,212,255,0.2)', background: 'transparent', color: 'var(--accent)', fontSize: '0.7rem', cursor: 'pointer' }}>
                    Skip →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All done */}
        {!collapsed && allDone && (
          <div style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.6 }}>
              All 14 missions complete · {exploredGenes.size} genes explored<br />
              <span style={{ color: 'var(--accent)' }}>Total: {MISSIONS.reduce((s, m) => s + m.xp, 0)} XP earned</span>
            </div>
            <button onClick={() => { saveMissionProgress({}); setCompleted({}); setCurrentIdx(0); }}
              style={{ marginTop: '0.75rem', padding: '0.38rem 0.85rem', borderRadius: 7, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', fontSize: '0.74rem', cursor: 'pointer' }}>
              🔄 Reset missions
            </button>
          </div>
        )}
      </div>
    </>
  );
}
