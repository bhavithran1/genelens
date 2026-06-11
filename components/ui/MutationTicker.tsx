'use client';

const TICKS = [
  { mut: 'KRAS G12C',    cancer: 'Lung Adenocarcinoma', pct: '13%',  drug: 'Sotorasib',    col: '#ef4444' },
  { mut: 'TP53 R175H',   cancer: 'Breast Cancer',       pct: '8%',   drug: 'APR-246',      col: '#3b82f6' },
  { mut: 'BRAF V600E',   cancer: 'Melanoma',            pct: '50%',  drug: 'Vemurafenib',  col: '#ef4444' },
  { mut: 'EGFR L858R',   cancer: 'NSCLC',               pct: '12%',  drug: 'Osimertinib',  col: '#f59e0b' },
  { mut: 'PIK3CA H1047R',cancer: 'Breast Cancer',       pct: '35%',  drug: 'Alpelisib',    col: '#f59e0b' },
  { mut: 'IDH1 R132H',   cancer: 'Low-Grade Glioma',    pct: '80%',  drug: 'Ivosidenib',   col: '#ef4444' },
  { mut: 'BRCA1 del',    cancer: 'Ovarian Cancer',      pct: '15%',  drug: 'Olaparib',     col: '#f472b6' },
  { mut: 'APC frameshift',cancer:'Colorectal Cancer',   pct: '80%',  drug: 'Immune CPI',   col: '#3b82f6' },
  { mut: 'MYC amplif.',  cancer: 'Breast Cancer',       pct: '20%',  drug: 'BET inhibitor',col: '#ef4444' },
  { mut: 'ALK fusion',   cancer: 'NSCLC',               pct: '5%',   drug: 'Lorlatinib',   col: '#f59e0b' },
  { mut: 'RET M918T',    cancer: 'Medullary Thyroid',   pct: '95%',  drug: 'Selpercatinib',col: '#f59e0b' },
  { mut: 'VHL inact.',   cancer: 'Clear Cell RCC',      pct: '92%',  drug: 'Belzutifan',   col: '#3b82f6' },
  { mut: 'MLH1 loss',    cancer: 'Colorectal Cancer',   pct: '15%',  drug: 'Pembrolizumab',col: '#f472b6' },
  { mut: 'CDKN2A del',   cancer: 'Pancreatic Cancer',   pct: '90%',  drug: 'CDK4/6-i',     col: '#3b82f6' },
];

// Duplicate for seamless infinite scroll
const ITEMS = [...TICKS, ...TICKS];

export default function MutationTicker() {
  return (
    <div style={{ width: '100%', overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.015)', padding: '0.55rem 0' }}>
      <div className="ticker-track">
        {ITEMS.map((t, i) => (
          <span key={i} className="ticker-item">
            <span style={{ fontWeight: 700, color: t.col, fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem' }}>{t.mut}</span>
            <span style={{ color: 'var(--text3)', fontSize: '0.75rem', margin: '0 0.4rem' }}>in</span>
            <span style={{ color: 'var(--text2)', fontSize: '0.78rem' }}>{t.cancer}</span>
            <span style={{ color: 'var(--text3)', fontSize: '0.72rem', margin: '0 0.4rem' }}>·</span>
            <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>{t.drug}</span>
            <span style={{ color: 'var(--text3)', margin: '0 1.5rem 0 0.6rem', fontSize: '0.7rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
