'use client';
import { useState } from 'react';
import type { Quiz } from '@/lib/types';

interface Props {
  quiz: Quiz;
  onCorrect: () => void;
}

export default function QuizCard({ quiz, onCorrect }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const answered = selected !== null;
  const correct = selected === quiz.correct;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === quiz.correct) onCorrect();
  };

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', marginTop: '1.5rem' }}>
      <div style={{ fontSize: '0.68rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: '0.75rem' }}>Knowledge Check</div>
      <p style={{ fontWeight: 600, marginBottom: '1.25rem', lineHeight: 1.5 }}>{quiz.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {quiz.opts.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.02)';
          let border = 'var(--border2)';
          let color = 'var(--text)';
          if (answered) {
            if (i === quiz.correct) { bg = 'rgba(16,185,129,0.1)'; border = 'rgba(16,185,129,0.4)'; color = '#10b981'; }
            else if (i === selected) { bg = 'rgba(239,68,68,0.1)'; border = 'rgba(239,68,68,0.3)'; color = '#f87171'; }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                padding: '0.75rem 1rem', borderRadius: 10, border: `1px solid ${border}`, background: bg, color,
                textAlign: 'left', cursor: answered ? 'default' : 'pointer', fontSize: '0.9rem', transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {answered && i === quiz.correct ? '✓ ' : answered && i === selected ? '✗ ' : ''}{opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', borderRadius: 10, background: correct ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)', border: `1px solid ${correct ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}` }}>
          <div style={{ fontWeight: 700, color: correct ? '#10b981' : '#f59e0b', marginBottom: '0.4rem' }}>{correct ? '✅ Correct!' : '💡 Explanation'}</div>
          <p style={{ color: 'var(--text2)', fontSize: '0.86rem', lineHeight: 1.6 }}>{quiz.exp}</p>
        </div>
      )}
    </div>
  );
}
