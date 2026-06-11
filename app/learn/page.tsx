'use client';
import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { BEGINNER_LESSONS } from '@/data/lessons';
import LessonView from '@/components/learn/LessonView';

export default function LearnPage() {
  const { state, completeLesson, hydrated } = useProgress();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (!hydrated) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text3)' }}>Loading...</div>;
  }

  if (activeIdx !== null) {
    return (
      <LessonView
        lessons={BEGINNER_LESSONS}
        initialIdx={activeIdx}
        completed={state.completed}
        onComplete={(id, xp) => completeLesson(id, xp)}
        onBack={() => setActiveIdx(null)}
      />
    );
  }

  const totalXP = BEGINNER_LESSONS.reduce((s, l) => s + l.xp, 0);
  const earnedXP = BEGINNER_LESSONS.filter(l => state.completed[l.id]).reduce((s, l) => s + l.xp, 0);
  const pct = Math.round((earnedXP / totalXP) * 100);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: '0.5rem' }}>Learning Paths</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.5rem' }}>Beginner Path</h1>
        <p style={{ color: 'var(--text2)', marginBottom: '1.25rem' }}>From DNA basics to reading real genomic reports — 11 lessons, 11 interactive games</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,var(--accent),var(--accent2))', borderRadius: 4, transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text3)', whiteSpace: 'nowrap' }}>{earnedXP} / {totalXP} XP</span>
        </div>
      </div>

      {/* Lesson grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {BEGINNER_LESSONS.map((lesson, idx) => {
          const done = !!state.completed[lesson.id];
          const locked = !lesson.free;
          return (
            <button
              key={lesson.id}
              onClick={() => !locked && setActiveIdx(idx)}
              disabled={locked}
              style={{
                background: 'var(--card)',
                border: `1px solid ${done ? 'rgba(16,185,129,0.3)' : 'var(--border)'}`,
                borderRadius: 14,
                padding: '1.25rem',
                textAlign: 'left',
                cursor: locked ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: locked ? 0.5 : 1,
                position: 'relative',
              }}
              onMouseEnter={e => { if (!locked) (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              {done && (
                <div style={{ position: 'absolute', top: 12, right: 12, width: 22, height: 22, background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>✓</div>
              )}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{lesson.icon}</div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.25rem' }}>
                    {lesson.section}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.97rem', marginBottom: '0.25rem' }}>{lesson.title}</div>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text3)' }}>
                    <span>⏱ {lesson.duration}</span>
                    <span style={{ color: '#f59e0b' }}>⚡ {lesson.xp} XP</span>
                    {lesson.steps?.some(s => s.type === 'game') && <span style={{ color: 'var(--accent)' }}>🎮 Game</span>}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Upgrade cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        {['Intermediate', 'Advanced'].map(path => (
          <div key={path} style={{ background: 'var(--card)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 14, padding: '1.5rem', textAlign: 'center', opacity: 0.6 }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{path === 'Intermediate' ? '🔬' : '⚗️'}</div>
            <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>{path} Path</div>
            <div style={{ fontSize: '0.83rem', color: 'var(--text3)', marginBottom: '1rem' }}>
              {path === 'Intermediate' ? 'Cancer-type genomics, pathway deep dives, treatment selection' : 'Computational genomics, tumor evolution, clinical trials design'}
            </div>
            <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 8, fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600 }}>
              🔒 Complete Beginner Path to Unlock
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
