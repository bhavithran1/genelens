export type GeneType = 'kinase' | 'suppressor' | 'oncogene' | 'adapter' | 'other';

export interface GeneNode {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  type: GeneType;
  mutRate: number;
  fullName: string;
  cancers: string[];
  drugs: string[];
  desc: string;
}

export interface PathwayEdge {
  from: string;
  to: string;
  type: 'activation' | 'inhibition';
  label?: string;
  particleColor?: string;
  curve?: number;
  curveY?: number;
}

export interface PathwayRegion {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

export type StepType = 'hook' | 'learn' | 'game' | 'quiz';

export interface HookStep {
  type: 'hook';
  emoji: string;
  stat: string;
  label: string;
  sub: string;
  color: string;
}

export interface LearnStep { type: 'learn'; }

export interface GameStep {
  type: 'game';
  gameId: string;
  title: string;
  instructions: string;
}

export interface QuizStep { type: 'quiz'; }

export type Step = HookStep | LearnStep | GameStep | QuizStep;

export interface Quiz {
  q: string;
  opts: string[];
  correct: number;
  exp: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  duration: string;
  free: boolean;
  xp: number;
  section: string;
  content: string;
  quiz: Quiz;
  steps?: Step[];
}

export interface LearningPath {
  id: string;
  label: string;
  color: string;
  modules: Lesson[];
}

export interface Achievement {
  id: string;
  trigger: string;
  name: string;
  desc: string;
  icon: string;
}

export interface XPLevel {
  level: number;
  label: string;
  minXp: number;
  color: string;
}

export interface ProgressState {
  xp: number;
  streak: number;
  currentPath: string;
  currentLesson: number;
  completed: Record<string, boolean>;
  dailyDone: string;
  dailyStreak: number;
}
