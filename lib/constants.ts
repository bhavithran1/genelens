import type { Achievement, XPLevel } from './types';

export const XP_LEVELS: XPLevel[] = [
  { level: 1,  label: 'Gene Novice',       minXp: 0,    color: '#94a3b8' },
  { level: 2,  label: 'DNA Detective',     minXp: 200,  color: '#60a5fa' },
  { level: 3,  label: 'Mutation Scout',    minXp: 500,  color: '#34d399' },
  { level: 4,  label: 'Pathway Explorer',  minXp: 900,  color: '#a78bfa' },
  { level: 5,  label: 'Oncogene Analyst',  minXp: 1400, color: '#f59e0b' },
  { level: 6,  label: 'Genome Ranger',     minXp: 2000, color: '#f472b6' },
  { level: 7,  label: 'Cancer Biologist',  minXp: 2700, color: '#00d4ff' },
  { level: 8,  label: 'Precision Oncologist', minXp: 3500, color: '#ef4444' },
  { level: 9,  label: 'Genomics Expert',   minXp: 4500, color: '#7c3aed' },
  { level: 10, label: 'Chief Oncologist',  minXp: 6000, color: '#10b981' },
];

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first',     trigger: 'b0',  name: 'First Step!',       desc: 'Completed your first lesson',             icon: '🎯' },
  { id: 'dna',       trigger: 'b1',  name: 'DNA Decoded',       desc: 'Mastered the double helix',               icon: '🧬' },
  { id: 'protein',   trigger: 'b2',  name: 'Protein Pioneer',   desc: 'Understood the Central Dogma',            icon: '🔧' },
  { id: 'mutation',  trigger: 'b3',  name: 'Mutation Hunter',   desc: 'Can identify all mutation types',         icon: '⚡' },
  { id: 'onco',      trigger: 'b4',  name: 'Oncogene Expert',   desc: 'Understood oncogene activation',          icon: '🚀' },
  { id: 'brakes',    trigger: 'b5',  name: 'Genome Guardian',   desc: 'Learned the two-hit hypothesis',          icon: '🛡️' },
  { id: 'hallmarks', trigger: 'b6',  name: 'Hallmark Scholar',  desc: 'Mastered all 10 cancer hallmarks',        icon: '🎯' },
  { id: 'immuno',    trigger: 'b7',  name: 'Immuno Warrior',    desc: 'Learned immunotherapy mechanisms',        icon: '⚔️' },
  { id: 'clinical',  trigger: 'b8',  name: 'Clinical Reader',   desc: 'Can interpret a genomic mutation report', icon: '📋' },
  { id: 'therapy',   trigger: 'b9',  name: 'Drug Designer',     desc: 'Mastered targeted therapy principles',    icon: '💊' },
  { id: 'navigator', trigger: 'b10', name: 'Genome Navigator',  desc: 'Explored the full cancer genome',         icon: '🗺️' },
  { id: 'crispr',    trigger: 'c0',  name: 'CRISPR Pioneer',    desc: 'Completed the CRISPR lab',                icon: '✂️' },
  { id: 'explorer',  trigger: 'exp', name: 'Explorer Elite',    desc: 'Clicked 20+ genes in the explorer',      icon: '🔭' },
];

export const DEFAULT_PROGRESS = {
  xp: 0,
  streak: 1,
  currentPath: 'beginner',
  currentLesson: 0,
  completed: {} as Record<string, boolean>,
  dailyDone: '',
  dailyStreak: 0,
};

export const CANCER_ABBREVIATIONS: Record<string, string> = {
  luad: 'Lung Adenocarcinoma', brca: 'Breast Cancer', coad: 'Colorectal Cancer',
  gbm: 'Glioblastoma', skcm: 'Melanoma', paad: 'Pancreatic Cancer',
  ov: 'Ovarian Cancer', prad: 'Prostate Cancer', blca: 'Bladder Cancer',
  kirc: 'Kidney Clear Cell', ucec: 'Endometrial Cancer', aml: 'AML (Leukemia)',
  dlbc: 'Diffuse Large B-Cell Lymphoma', stad: 'Stomach Cancer', thca: 'Thyroid Cancer',
  cll: 'Chronic Lymphocytic Leukemia', cca: 'Cholangiocarcinoma', lusc: 'Lung Squamous Cell',
  hcc: 'Hepatocellular Carcinoma', sclc: 'Small Cell Lung Cancer', myeloma: 'Multiple Myeloma',
};
