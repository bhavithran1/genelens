'use client';
import { useState, useCallback } from 'react';
import type { Lesson } from '@/lib/types';
import StepEngine from './StepEngine';

interface Props {
  lessons: Lesson[];
  initialIdx: number;
  completed: Record<string, boolean>;
  onComplete: (id: string, xp: number) => void;
  onBack: () => void;
}

export default function LessonView({ lessons, initialIdx, completed, onComplete, onBack }: Props) {
  const [lessonIdx, setLessonIdx] = useState(initialIdx);
  const [showCompletion, setShowCompletion] = useState(false);

  const lesson = lessons[lessonIdx];

  const handleLessonDone = useCallback(() => {
    onComplete(lesson.id, lesson.xp);
    if (lessonIdx < lessons.length - 1) {
      setLessonIdx(i => i + 1);
    } else {
      setShowCompletion(true);
    }
  }, [lesson, lessonIdx, lessons.length, onComplete]);

  if (showCompletion) {
    return (
      <div style={{ maxWidth: 600, margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.75rem' }}>Path Complete!</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>You&apos;ve finished all beginner lessons. You&apos;re ready to explore the genome!</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/explorer" className="btn-primary">🗺️ Explore the Genome</a>
          <button onClick={onBack} className="btn-ghost">← Back to Lessons</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      {/* Sidebar */}
      <div style={{ width: 260, borderRight: '1px solid var(--border)', padding: '1.25rem', flexShrink: 0, overflowY: 'auto' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '0.82rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 6 }}>
          ← All Lessons
        </button>
        <div style={{ fontSize: '0.68rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: '0.75rem' }}>Beginner Path</div>
        {lessons.map((l, i) => {
          const done = !!completed[l.id];
          const active = i === lessonIdx;
          return (
            <button
              key={l.id}
              onClick={() => setLessonIdx(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.6rem 0.75rem',
                borderRadius: 9, border: 'none', marginBottom: '0.25rem', cursor: 'pointer', textAlign: 'left',
                background: active ? 'rgba(0,212,255,0.08)' : 'transparent',
                color: active ? 'var(--accent)' : done ? 'var(--text2)' : 'var(--text3)',
                fontSize: '0.82rem', fontWeight: active ? 600 : 400,
                borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{done ? '✅' : l.icon}</span>
              <span style={{ lineHeight: 1.3 }}>{l.title}</span>
            </button>
          );
        })}
      </div>

      {/* Lesson content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        <StepEngine
          lesson={lesson}
          isCompleted={!!completed[lesson.id]}
          onDone={handleLessonDone}
          onNext={() => lessonIdx < lessons.length - 1 && setLessonIdx(i => i + 1)}
        />
      </div>
    </div>
  );
}
