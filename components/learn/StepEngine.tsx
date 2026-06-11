'use client';
import { useState, useCallback } from 'react';
import type { Lesson } from '@/lib/types';
import GameZone from '../games/GameZone';
import QuizCard from './QuizCard';

interface Props {
  lesson: Lesson;
  isCompleted: boolean;
  onDone: () => void;
  onNext: () => void;
}

export default function StepEngine({ lesson, isCompleted, onDone, onNext }: Props) {
  const [step, setStep] = useState(0);
  const [quizDone, setQuizDone] = useState(isCompleted);
  const [gameDone, setGameDone] = useState(false);

  const steps = lesson.steps || [];
  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const canAdvance = useCallback(() => {
    if (!currentStep) return true;
    if (currentStep.type === 'quiz') return quizDone;
    if (currentStep.type === 'game') return gameDone;
    return true;
  }, [currentStep, quizDone, gameDone]);

  const handleNext = () => {
    if (isLastStep) {
      onDone();
    } else {
      setStep(s => s + 1);
      setGameDone(false);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(s => s - 1);
      setGameDone(false);
    }
  };

  // No steps — show full content
  if (steps.length === 0) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <LessonHeader lesson={lesson} />
        <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        <QuizCard quiz={lesson.quiz} onCorrect={() => onDone()} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1.75rem', justifyContent: 'center' }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i < step ? 'var(--accent3)' : i === step ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>

      {/* Step content */}
      <div key={`${lesson.id}-${step}`}>
        {currentStep?.type === 'hook' && (
          <HookStep data={currentStep as any} />
        )}
        {currentStep?.type === 'learn' && (
          <>
            <LessonHeader lesson={lesson} />
            <div dangerouslySetInnerHTML={{ __html: lesson.content }}
              style={{ color: 'var(--text2)', lineHeight: 1.75, fontSize: '0.95rem' }}
            />
          </>
        )}
        {currentStep?.type === 'game' && (
          <GameZone
            gameId={(currentStep as any).gameId}
            title={(currentStep as any).title}
            instructions={(currentStep as any).instructions}
            onComplete={() => setGameDone(true)}
          />
        )}
        {currentStep?.type === 'quiz' && (
          <QuizCard quiz={lesson.quiz} onCorrect={() => setQuizDone(true)} />
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={handlePrev}
          disabled={step === 0}
          style={{ padding: '0.6rem 1.25rem', borderRadius: 9, border: '1px solid var(--border2)', background: 'transparent', color: step === 0 ? 'var(--text3)' : 'var(--text2)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: '0.88rem' }}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canAdvance()}
          style={{
            padding: '0.6rem 1.5rem', borderRadius: 9, border: 'none', fontSize: '0.9rem', fontWeight: 700, cursor: canAdvance() ? 'pointer' : 'not-allowed',
            background: canAdvance() ? 'linear-gradient(135deg,var(--accent),#0099cc)' : 'rgba(255,255,255,0.06)',
            color: canAdvance() ? '#000' : 'var(--text3)',
            transition: 'all 0.2s',
          }}
        >
          {isLastStep ? '✓ Complete Lesson' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}

function LessonHeader({ lesson }: { lesson: Lesson }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '0.68rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: '0.4rem' }}>{lesson.section}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '2rem' }}>{lesson.icon}</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif" }}>{lesson.title}</h2>
      </div>
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--text3)' }}>
        <span>⏱ {lesson.duration}</span>
        <span style={{ color: '#f59e0b' }}>⚡ {lesson.xp} XP</span>
      </div>
      <div style={{ height: 1, background: 'var(--border)', margin: '1rem 0' }} />
    </div>
  );
}

function HookStep({ data }: { data: { emoji: string; stat: string; label: string; sub: string; color: string } }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{data.emoji}</div>
      <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, color: data.color, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1, marginBottom: '1rem' }}>
        {data.stat}
      </div>
      <div style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', maxWidth: 500, margin: '0 auto 1rem', lineHeight: 1.4 }}>
        {data.label}
      </div>
      <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>{data.sub}</p>
    </div>
  );
}
