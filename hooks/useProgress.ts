'use client';
import { useState, useEffect, useCallback } from 'react';
import type { ProgressState } from '@/lib/types';
import { DEFAULT_PROGRESS, XP_LEVELS } from '@/lib/constants';

const KEY = 'glState';

function load(): ProgressState {
  if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT_PROGRESS, ...JSON.parse(raw) } : { ...DEFAULT_PROGRESS };
  } catch { return { ...DEFAULT_PROGRESS }; }
}

function save(s: ProgressState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>({ ...DEFAULT_PROGRESS });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  const update = useCallback((patch: Partial<ProgressState>) => {
    setState(prev => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    setState(prev => {
      const next = { ...prev, xp: (prev.xp || 0) + amount };
      save(next);
      return next;
    });
  }, []);

  const completeLesson = useCallback((id: string, xp: number) => {
    setState(prev => {
      if (prev.completed[id]) return prev;
      const next = {
        ...prev,
        xp: (prev.xp || 0) + xp,
        completed: { ...prev.completed, [id]: true },
      };
      save(next);
      return next;
    });
  }, []);

  const getLevel = useCallback((xp: number) => {
    let lvl = XP_LEVELS[0];
    for (const l of XP_LEVELS) { if (xp >= l.minXp) lvl = l; else break; }
    return lvl;
  }, []);

  const reset = useCallback(() => {
    const fresh = { ...DEFAULT_PROGRESS };
    setState(fresh);
    save(fresh);
  }, []);

  return { state, update, addXP, completeLesson, getLevel, reset, hydrated };
}
