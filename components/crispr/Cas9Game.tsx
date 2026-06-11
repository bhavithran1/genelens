'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useProgress } from '@/hooks/useProgress';

type Stage = 'intro' | 'target' | 'design' | 'scan' | 'cut' | 'repair' | 'done';

const KRAS_SEQUENCE = 'GAGTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGT'.split('');
// G12C mutation at index 24 (the G in codon GGT→TGT)
const MUTATION_IDX = 24;

const GRNA_OPTIONS = [
  { seq: 'GTAGTTGGAGCTGGTGGCGT', gc: 60, correct: true,  label: 'gRNA-A', note: 'GC 60% · 0 off-targets predicted' },
  { seq: 'AACTTGCCTGTGGACAAGGT', gc: 50, correct: false, label: 'gRNA-B', note: 'GC 50% · 3 off-targets' },
  { seq: 'AAAAAACTTGACGATACAGC', gc: 35, correct: false, label: 'gRNA-C', note: 'GC 35% — too low' },
  { seq: 'GCAAGAGTGCCTTGACGATA', gc: 55, correct: false, label: 'gRNA-D', note: 'GC 55% · misses PAM site' },
];

const REPAIR_PATHS = [
  {
    id: 'nhej', label: 'NHEJ', full: 'Non-Homologous End Joining',
    icon: '⚡', color: '#ef4444',
    outcome: 'Frameshift → KRAS G12C knocked out',
    detail: 'Error-prone repair creates small insertions/deletions. This disrupts the reading frame and destroys the mutant KRAS protein — exactly what we want for a cancer knockout.',
    xp: 150, stars: 3,
  },
  {
    id: 'hdr', label: 'HDR', full: 'Homology-Directed Repair',
    icon: '🔧', color: '#10b981',
    outcome: 'Precise G→C correction at codon 12',
    detail: 'With a repair template, HDR corrects G12C back to wild-type. This is harder clinically (requires template delivery) but gives precise correction rather than disruption.',
    xp: 180, stars: 3,
  },
];

function useParticleEffect(canvasRef: React.RefObject<HTMLCanvasElement | null>, trigger: boolean) {
  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const COLORS = ['#ef4444','#f59e0b','#00d4ff','#7c3aed','#10b981'];
    type P = { x:number; y:number; vx:number; vy:number; r:number; col:string; life:number; };
    const cx = W / 2, cy = H / 2;

    const parts: P[] = Array.from({ length: 120 }, () => {
      const a = Math.random() * Math.PI * 2;
      const spd = 3 + Math.random() * 7;
      return { x: cx, y: cy, vx: Math.cos(a)*spd, vy: Math.sin(a)*spd,
               r: 2 + Math.random()*4, col: COLORS[Math.floor(Math.random()*COLORS.length)], life: 1 };
    });

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.93; p.vy *= 0.93; p.vy += 0.12;
        p.life -= 0.018;
        if (p.life > 0) {
          alive = true;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.col;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (alive) animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [trigger, canvasRef]);
}

export default function Cas9Game({ onNext }: { onNext: () => void }) {
  const [stage, setStage]             = useState<Stage>('intro');
  const [clickedIdx, setClickedIdx]   = useState<number | null>(null);
  const [selectedRNA, setSelectedRNA] = useState<number | null>(null);
  const [scanPos, setScanPos]         = useState(0);
  const [pamFound, setPamFound]       = useState(false);
  const [bindClicked, setBindClicked] = useState(false);
  const [cutDone, setCutDone]         = useState(false);
  const [repair, setRepair]           = useState<'nhej' | 'hdr' | null>(null);
  const [score, setScore]             = useState(0);
  const [feedback, setFeedback]       = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [cutTriggered, setCutTriggered] = useState(false);
  const scanRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cutCanvasRef = useRef<HTMLCanvasElement>(null);
  const { addXP } = useProgress();

  useParticleEffect(cutCanvasRef, cutTriggered);

  const flash = (msg: string) => {
    setFeedback(msg);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1800);
  };

  // Scanning animation
  useEffect(() => {
    if (stage !== 'scan') return;
    setScanPos(0); setPamFound(false); setBindClicked(false);
    scanRef.current = setInterval(() => {
      setScanPos(p => {
        const next = p + 1;
        if (next >= KRAS_SEQUENCE.length - 3) {
          clearInterval(scanRef.current!);
          setPamFound(true);
          return KRAS_SEQUENCE.length - 4;
        }
        return next;
      });
    }, 65);
    return () => clearInterval(scanRef.current!);
  }, [stage]);

  const handleTargetClick = (idx: number) => {
    setClickedIdx(idx);
    if (Math.abs(idx - MUTATION_IDX) <= 1) {
      flash('🎯 Perfect! You identified the G12C mutation at codon 12!');
      setScore(s => s + 50);
      setTimeout(() => setStage('design'), 1600);
    } else {
      flash('❌ Not quite — look for the unusual codon near the center');
    }
  };

  const handleRNASelect = (idx: number) => {
    setSelectedRNA(idx);
    if (GRNA_OPTIONS[idx].correct) {
      flash('✅ Excellent choice! Highest GC%, zero predicted off-targets.');
      setScore(s => s + 50);
      setTimeout(() => setStage('scan'), 1400);
    } else {
      flash(`⚠️ ${GRNA_OPTIONS[idx].note} — try again`);
    }
  };

  const handleBind = () => {
    if (!pamFound) return;
    setBindClicked(true);
    setScore(s => s + 40);
    flash('🔗 Cas9 bound! PAM confirmed. Initiating cut sequence...');
    setTimeout(() => setStage('cut'), 1800);
  };

  const handleCut = () => {
    setCutTriggered(true);
    setCutDone(true);
    setScore(s => s + 40);
    setTimeout(() => { setCutTriggered(false); }, 2500);
    setTimeout(() => setStage('repair'), 2000);
  };

  const handleRepair = (r: 'nhej' | 'hdr') => {
    const path = REPAIR_PATHS.find(p => p.id === r)!;
    setRepair(r);
    setScore(s => s + path.xp);
    addXP(path.xp);
    setTimeout(() => setStage('done'), 500);
  };

  const baseColor = (b: string) =>
    b === 'A' ? '#ef4444' : b === 'T' ? '#3b82f6' : b === 'G' ? '#10b981' : b === 'C' ? '#a78bfa' : '#f59e0b';

  const STAGE_LABELS: Record<Stage, string> = {
    intro: 'Mission Briefing', target: '1 · Identify Mutation', design: '2 · Design gRNA',
    scan: '3 · Cas9 Scanning', cut: '4 · Execute Cut', repair: '5 · Repair Pathway', done: 'Mission Complete',
  };
  const STAGES_ORDER: Stage[] = ['intro','target','design','scan','cut','repair','done'];
  const stageIdx = STAGES_ORDER.indexOf(stage);

  return (
    <div style={{ maxWidth: 780, position: 'relative' }}>
      {/* Feedback toast */}
      {showFeedback && (
        <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: 'rgba(10,10,15,0.95)', border: '1px solid var(--border2)', borderRadius: 12, padding: '0.7rem 1.5rem', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)', zIndex: 999, backdropFilter: 'blur(12px)', transition: 'opacity 0.3s', whiteSpace: 'nowrap' }}>
          {feedback}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.25rem' }}>
          ✂️ CRISPR Knockout Quest
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>
          Mission: Deploy CRISPR to knockout mutant KRAS G12C — the oncogene driving pancreatic cancer.
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem', alignItems: 'center' }}>
        {STAGES_ORDER.filter(s => s !== 'intro').map((s, i) => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: stageIdx > i + 1 ? 'var(--accent3)' : stageIdx === i + 1 ? 'var(--accent)' : 'rgba(255,255,255,0.08)', transition: 'all 0.4s' }} />
        ))}
        <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700, marginLeft: 8, flexShrink: 0 }}>{score} pts</span>
      </div>

      {/* Stage label */}
      <div style={{ fontSize: '0.7rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: '1rem' }}>
        {STAGE_LABELS[stage]}
      </div>

      {/* ═══ INTRO ═══ */}
      {stage === 'intro' && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '2rem', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem', textAlign: 'center' }}>🎯</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem', fontFamily: "'Space Grotesk',sans-serif" }}>
            Operation: Knockout KRAS G12C
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { icon: '🦠', title: 'The Target', text: 'KRAS G12C — mutated in 13% of lung adenocarcinomas and 1-3% of pancreatic cancers. The G→C swap locks KRAS in "always-on" mode.' },
              { icon: '✂️', title: 'The Tool', text: 'CRISPR-Cas9: a programmable molecular scissors guided by a custom RNA sequence. You will design and deploy it.' },
              { icon: '🏆', title: 'The Goal', text: 'Guide Cas9 to cut the mutant allele, trigger repair, and knockout the oncogene. Max score = 330 points.' },
            ].map(c => (
              <div key={c.title} style={{ padding: '0.85rem', borderRadius: 12, background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '0.3rem' }}>{c.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5 }}>{c.text}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setStage('target')} className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2.5rem' }}>
              🚀 Begin Mission
            </button>
          </div>
        </div>
      )}

      {/* ═══ TARGET ═══ */}
      {stage === 'target' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
            <strong style={{ color: '#ef4444' }}>Task:</strong> The KRAS G12C mutation is a single base change in codon 12 (GGT→TGT). Find it in the DNA sequence below and click the mutant base to confirm your target.
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.75rem', fontSize: '0.7rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              KRAS exon 2 — 5&apos; to 3&apos;
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {KRAS_SEQUENCE.map((b, i) => {
                const isMut = i === MUTATION_IDX;
                const isClicked = clickedIdx === i;
                const isNearMut = Math.abs(i - MUTATION_IDX) <= 1;
                return (
                  <button key={i} onClick={() => handleTargetClick(i)}
                    style={{
                      width: 24, height: 26, borderRadius: 5, fontSize: '0.68rem', fontWeight: 700,
                      fontFamily: "'Space Grotesk',sans-serif",
                      background: isClicked
                        ? (isNearMut ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.3)')
                        : isMut ? 'rgba(239,68,68,0.2)' : `${baseColor(b)}12`,
                      border: `1px solid ${isClicked ? (isNearMut ? '#10b981' : '#ef4444') : isMut ? '#ef444466' : baseColor(b) + '44'}`,
                      color: isMut ? '#ef4444' : baseColor(b),
                      cursor: 'pointer', transition: 'all 0.15s',
                      transform: isClicked ? 'scale(1.15)' : 'scale(1)',
                    }}>
                    {b}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: '0.85rem', fontSize: '0.72rem' }}>
              {[['A','#ef4444'],['T','#3b82f6'],['G','#10b981'],['C','#a78bfa']].map(([b, c]) => (
                <span key={b} style={{ color: c as string }}>● {b}</span>
              ))}
              <span style={{ color: '#ef4444', marginLeft: 8 }}>🔴 = suspect position</span>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>
            💡 Hint: codon 12 of KRAS is GGT (Glycine) in normal cells. G12C changes the first G to T.
          </div>
        </div>
      )}

      {/* ═══ gRNA DESIGN ═══ */}
      {stage === 'design' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text2)' }}>
            <strong style={{ color: 'var(--accent)' }}>Task:</strong> Select the best guide RNA to direct Cas9 to the G12C site. The ideal gRNA has 40–70% GC content and zero predicted off-target sites.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {GRNA_OPTIONS.map((opt, i) => (
              <button key={i} onClick={() => handleRNASelect(i)}
                style={{
                  padding: '1rem 1.1rem', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
                  border: `2px solid ${selectedRNA === i ? (opt.correct ? '#10b981' : '#ef4444') : 'var(--border)'}`,
                  background: selectedRNA === i ? (opt.correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)') : 'var(--card)',
                  transition: 'all 0.2s',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: selectedRNA === i ? (opt.correct ? '#10b981' : '#ef4444') : 'var(--text)', fontFamily: "'Space Grotesk',sans-serif" }}>
                    {opt.label} — 5&apos;-{opt.seq}-3&apos;
                  </span>
                  <span style={{
                    padding: '0.18rem 0.55rem', borderRadius: 5, fontSize: '0.7rem', fontWeight: 700,
                    background: opt.gc >= 50 && opt.gc <= 70 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.12)',
                    color: opt.gc >= 50 && opt.gc <= 70 ? '#10b981' : '#ef4444',
                  }}>
                    GC {opt.gc}%
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{opt.note}</div>
                {/* GC bar */}
                <div style={{ marginTop: '0.5rem', height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${opt.gc}%`, background: opt.gc >= 50 ? '#10b981' : '#ef4444', borderRadius: 2, transition: 'width 0.4s' }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ SCAN ═══ */}
      {stage === 'scan' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text2)' }}>
            <strong style={{ color: '#f59e0b' }}>Watch:</strong> Cas9 is scanning the KRAS DNA strand, reading the sequence for the PAM site (NGG). When it finds the target, click <strong style={{ color: 'var(--accent)' }}>BIND!</strong>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', marginBottom: '1.25rem' }}>
            {/* Cas9 molecule visual */}
            <div style={{ position: 'relative', height: 48, marginBottom: '1rem' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'rgba(0,212,255,0.12)', borderRadius: 1, top: '50%', transform: 'translateY(-50%)' }} />
              <div style={{
                position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)',
                left: `${(scanPos / (KRAS_SEQUENCE.length - 4)) * 100}%`,
                transition: 'left 0.06s linear',
                width: 44, height: 44, borderRadius: 10,
                background: pamFound ? 'rgba(16,185,129,0.25)' : 'rgba(0,212,255,0.15)',
                border: `2px solid ${pamFound ? '#10b981' : 'var(--accent)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', boxShadow: pamFound ? '0 0 20px #10b98155' : '0 0 14px rgba(0,212,255,0.3)',
              }}>
                {pamFound ? '🔗' : '✂️'}
              </div>
            </div>

            {/* DNA sequence with scan indicator */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {KRAS_SEQUENCE.map((b, i) => {
                const isScanned = i < scanPos;
                const isAt = i === scanPos;
                const isPAM = i >= KRAS_SEQUENCE.length - 4 && i <= KRAS_SEQUENCE.length - 2;
                return (
                  <div key={i} style={{
                    width: 20, height: 22, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.62rem', fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif",
                    background: isAt ? baseColor(b) + '50' : isPAM && pamFound ? 'rgba(16,185,129,0.3)' : isScanned ? baseColor(b) + '18' : `${baseColor(b)}08`,
                    border: `1px solid ${isAt ? baseColor(b) : isPAM && pamFound ? '#10b981' : baseColor(b) + (isScanned ? '44' : '22')}`,
                    color: isAt ? '#fff' : baseColor(b) + (isScanned ? 'cc' : '55'),
                    transition: 'all 0.08s',
                  }}>
                    {b}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text3)' }}>
              {pamFound
                ? <span style={{ color: '#10b981', fontWeight: 700 }}>✅ PAM site (NGG) found at position {scanPos}! Ready to bind.</span>
                : <span>Scanning... position {scanPos}/{KRAS_SEQUENCE.length - 4}</span>
              }
            </div>
          </div>

          <button onClick={handleBind} disabled={!pamFound}
            style={{
              padding: '0.85rem 2.5rem', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: '1rem',
              cursor: pamFound ? 'pointer' : 'not-allowed',
              background: pamFound ? 'linear-gradient(135deg,#00d4ff,#0099cc)' : 'rgba(255,255,255,0.06)',
              color: pamFound ? '#000' : 'var(--text3)',
              transition: 'all 0.3s',
              animation: pamFound && !bindClicked ? 'pulse-glow 1.5s infinite' : 'none',
              boxShadow: pamFound ? '0 0 30px rgba(0,212,255,0.4)' : 'none',
            }}>
            {bindClicked ? '🔗 Binding...' : pamFound ? '⚡ BIND! Click Now!' : '⏳ Waiting for PAM...'}
          </button>
        </div>
      )}

      {/* ═══ CUT ═══ */}
      {stage === 'cut' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text2)' }}>
            <strong style={{ color: '#ef4444' }}>Task:</strong> Cas9 is bound to the target. HNH and RuvC domains are aligned. Hit the cut button to create the double-strand break!
          </div>

          {/* DNA double strand visual */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
            <canvas ref={cutCanvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

            <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '0.5rem', lineHeight: 2.2 }}>
              <div style={{ color: 'var(--accent)' }}>5&apos;— G·G·T·G·G·C·G·T·A·<span style={{ color: '#ef4444', fontWeight: 900, fontSize: '1rem' }}>G</span>·G·C —3&apos;</div>
              {cutDone
                ? <div style={{ display: 'flex', justifyContent: 'center', gap: 8, color: '#ef4444', fontWeight: 900, animation: 'fadeIn 0.3s' }}>
                    <span>✂️ ✂️ ✂️</span><span>CUT!</span><span>✂️ ✂️ ✂️</span>
                  </div>
                : <div style={{ color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>···············✂️···············</div>
              }
              <div style={{ color: 'var(--accent2)' }}>3&apos;— C·C·A·C·C·G·C·A·T·<span style={{ color: '#ef4444', fontWeight: 900, fontSize: '1rem' }}>C</span>·C·G —5&apos;</div>
            </div>

            <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--text3)' }}>
              Cas9 bound · PAM confirmed · gRNA matched — cut site at position 17
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={handleCut} disabled={cutDone}
              style={{
                padding: '1.1rem 3rem', borderRadius: 14, border: 'none', fontWeight: 900, fontSize: '1.15rem',
                cursor: cutDone ? 'default' : 'pointer',
                background: cutDone ? 'rgba(16,185,129,0.2)' : 'linear-gradient(135deg,#ef4444,#dc2626)',
                color: cutDone ? '#10b981' : '#fff',
                transition: 'all 0.3s',
                boxShadow: cutDone ? '0 0 20px rgba(16,185,129,0.3)' : '0 0 30px rgba(239,68,68,0.5)',
                transform: cutDone ? 'scale(0.96)' : 'scale(1)',
              }}>
              {cutDone ? '✅ Double-Strand Break Created!' : '✂️ EXECUTE CUT'}
            </button>
          </div>
        </div>
      )}

      {/* ═══ REPAIR ═══ */}
      {stage === 'repair' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text2)' }}>
            <strong style={{ color: '#7c3aed' }}>Decision:</strong> The double-strand break has been created. The cell will now attempt to repair it. You choose which repair pathway to trigger.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '0.9rem', marginBottom: '1.25rem' }}>
            {REPAIR_PATHS.map(r => (
              <button key={r.id} onClick={() => handleRepair(r.id as 'nhej' | 'hdr')} disabled={!!repair}
                style={{
                  padding: '1.25rem', borderRadius: 14, textAlign: 'left', cursor: repair ? 'default' : 'pointer',
                  border: `2px solid ${repair === r.id ? r.color : 'var(--border)'}`,
                  background: repair === r.id ? `${r.color}12` : 'var(--card)',
                  transition: 'all 0.25s',
                  transform: repair === r.id ? 'scale(1.02)' : 'scale(1)',
                }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{r.icon}</div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: r.color, marginBottom: '0.2rem', fontFamily: "'Space Grotesk',sans-serif" }}>{r.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginBottom: '0.75rem' }}>{r.full}</div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.5rem' }}>→ {r.outcome}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.55 }}>{r.detail}</div>
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.78rem', color: r.color, fontWeight: 700 }}>+{r.xp} XP</span>
                  <span style={{ fontSize: '0.82rem' }}>{'⭐'.repeat(r.stars)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ DONE ═══ */}
      {stage === 'done' && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.5rem' }}>
            Mission Complete!
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent)', fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.25rem' }}>
            {score} / 330
          </div>
          <div style={{ color: 'var(--text3)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            {score >= 280 ? '🏆 CRISPR Master — flawless execution!' : score >= 200 ? '⭐ Great work — oncologist material!' : '👍 Mission accomplished — keep learning!'}
          </div>

          {repair && (
            <div style={{ background: `${REPAIR_PATHS.find(r => r.id === repair)!.color}10`, border: `1px solid ${REPAIR_PATHS.find(r => r.id === repair)!.color}30`, borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: REPAIR_PATHS.find(r => r.id === repair)!.color, marginBottom: '0.4rem' }}>
                Outcome: {REPAIR_PATHS.find(r => r.id === repair)!.outcome}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                Your CRISPR edit successfully disrupted the KRAS G12C oncogene. In a real therapeutic context, this approach is being tested in clinical trials using lipid nanoparticle delivery directly to tumor cells.
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setStage('intro'); setClickedIdx(null); setSelectedRNA(null); setScanPos(0); setPamFound(false); setBindClicked(false); setCutDone(false); setRepair(null); setScore(0); }}
              className="btn-ghost">
              🔄 Play Again
            </button>
            <button onClick={onNext} className="btn-primary">
              Next: Off-Target Prediction →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
