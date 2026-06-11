'use client';
import { useState, useMemo } from 'react';
import { PATHWAY_NODES } from '@/data/pathway-data';
import { GENE_DETAILS } from '@/data/gene-details';
import type { GeneNode } from '@/lib/types';
import { CANCER_ABBREVIATIONS } from '@/lib/constants';
import PathwayCanvas from '@/components/explorer/PathwayCanvas';
import MissionPanel from '@/components/explorer/MissionPanel';

const TYPE_COLORS: Record<string, string> = {
  oncogene: '#ef4444',
  suppressor: '#3b82f6',
  kinase: '#f59e0b',
  adapter: '#94a3b8',
  other: '#10b981',
};

const REGIONS = [
  { id: 'all', label: 'All' },
  { id: 'membrane', label: 'Receptors' },
  { id: 'ras_mapk', label: 'RAS/MAPK' },
  { id: 'pi3k_akt', label: 'PI3K/AKT' },
  { id: 'p53', label: 'p53' },
  { id: 'cell_cycle', label: 'Cell Cycle' },
  { id: 'wnt', label: 'Wnt/MYC' },
  { id: 'dna_repair', label: 'DNA Repair' },
];

function getRegion(node: GeneNode) {
  const { x, y } = node;
  if (y < 200) return 'membrane';
  if (x < 650 && y > 300 && y < 900) return 'ras_mapk';
  if (x > 950 && x < 1550 && y > 300 && y < 750) return 'pi3k_akt';
  if (x > 700 && x < 1200 && y > 750 && y < 1050) return 'p53';
  if (x < 550 && y > 900) return 'cell_cycle';
  if (x > 1150 && y > 850) return 'wnt';
  if (x > 1550) return 'dna_repair';
  return 'other';
}

export default function ExplorerPage() {
  const [selected, setSelected] = useState<GeneNode | null>(null);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [explored, setExplored] = useState(new Set<string>());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let nodes = PATHWAY_NODES;
    if (regionFilter !== 'all') nodes = nodes.filter(n => getRegion(n) === regionFilter);
    if (typeFilter !== 'all') nodes = nodes.filter(n => n.type === typeFilter);
    if (search) nodes = nodes.filter(n =>
      n.id.toLowerCase().includes(search.toLowerCase()) ||
      n.fullName.toLowerCase().includes(search.toLowerCase()) ||
      n.cancers.some(c => (CANCER_ABBREVIATIONS[c] || c).toLowerCase().includes(search.toLowerCase()))
    );
    return nodes;
  }, [regionFilter, typeFilter, search]);

  const filteredIds = useMemo(() => {
    if (regionFilter === 'all' && typeFilter === 'all' && !search) return null;
    return new Set(filtered.map(n => n.id));
  }, [filtered, regionFilter, typeFilter, search]);

  const handleSelect = (g: GeneNode | null) => {
    setSelected(g);
    if (g) setExplored(s => new Set([...s, g.id]));
  };

  return (
    <div className="explorer-root">
      {/* Floating top bar (search + filters) */}
      <div className="explorer-topbar">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search genes, cancers, drugs..."
          className="explorer-search"
        />
        <div className="explorer-filters">
          {REGIONS.map(r => (
            <button key={r.id} onClick={() => setRegionFilter(r.id)}
              className={'filter-chip' + (regionFilter === r.id ? ' active' : '')}>
              {r.label}
            </button>
          ))}
        </div>
        <div className="explorer-filters" style={{ marginTop: 4 }}>
          {(['all', 'oncogene', 'suppressor', 'kinase', 'adapter', 'other'] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={'filter-chip' + (typeFilter === t ? ' active-type' : '')}
              style={typeFilter === t ? { borderColor: TYPE_COLORS[t] || 'var(--accent)', color: TYPE_COLORS[t] || 'var(--accent)', background: (TYPE_COLORS[t] || '#00d4ff') + '18' } : {}}>
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: 4 }}>
          {explored.size > 0 && <span>🔭 {explored.size} explored{explored.size >= 10 && ' · 🏆 Explorer!'}</span>}
          {filteredIds && <span style={{ marginLeft: 8 }}>Showing {filtered.length} genes</span>}
        </div>
      </div>

      {/* Canvas map */}
      <PathwayCanvas onSelect={handleSelect} filteredIds={filteredIds} />

      {/* Gene detail panel */}
      {selected && (
        <div className="gene-panel">
          <GeneDetail gene={selected} onClose={() => setSelected(null)} />
        </div>
      )}

      {/* Mission panel */}
      <MissionPanel exploredGenes={explored} />
    </div>
  );
}

// ── Accordion helper ─────────────────────────────
function Accordion({ title, icon, color, children, defaultOpen = false }: {
  title: string; icon: string; color?: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const accent = color || 'var(--text3)';
  return (
    <div style={{ borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden', marginBottom: '0.55rem' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.62rem 0.85rem', background: open ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
          border: 'none', cursor: 'pointer', textAlign: 'left', gap: '0.5rem',
          transition: 'background 0.15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ fontSize: '0.85rem' }}>{icon}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: open ? accent : 'var(--text2)', textTransform: 'uppercase', letterSpacing: 1 }}>{title}</span>
        </div>
        <span style={{ color: 'var(--text3)', fontSize: '0.65rem', transform: open ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s', flexShrink: 0 }}>▼</span>
      </button>
      {open && (
        <div style={{ padding: '0.75rem 0.85rem', borderTop: '1px solid var(--border)', animation: 'fadeIn 0.18s ease' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── GeneDetail ────────────────────────────────────
function GeneDetail({ gene, onClose }: { gene: GeneNode; onClose: () => void }) {
  const col = TYPE_COLORS[gene.type] || '#94a3b8';
  const mutBar = Math.min(gene.mutRate, 70);
  const details = GENE_DETAILS[gene.id] ?? null;

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '1.1rem 1.1rem 2rem' }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", color: col, lineHeight: 1 }}>{gene.id}</h2>
          <div style={{ color: 'var(--text2)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{gene.fullName}</div>
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.45rem', flexWrap: 'wrap' }}>
            <span style={{ padding: '0.15rem 0.55rem', borderRadius: 5, background: col + '18', border: `1px solid ${col}33`, fontSize: '0.68rem', color: col, fontWeight: 700, textTransform: 'capitalize' }}>{gene.type}</span>
            {details?.genomicLocation && (
              <span style={{ padding: '0.15rem 0.55rem', borderRadius: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', fontSize: '0.68rem', color: 'var(--text3)' }}>{details.genomicLocation}</span>
            )}
            {details?.proteinClass && (
              <span style={{ padding: '0.15rem 0.55rem', borderRadius: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', fontSize: '0.65rem', color: 'var(--text3)', maxWidth: '100%' }}>{details.proteinClass}</span>
            )}
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', color: 'var(--text3)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '0.5rem' }}>
          ✕
        </button>
      </div>

      {/* ── Mutation rate bar ── */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.75rem 0.85rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Mutation rate in cancer</span>
          <span style={{ fontWeight: 900, color: col, fontSize: '1rem' }}>{gene.mutRate}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(mutBar / 70) * 100}%`, background: `linear-gradient(90deg,${col}66,${col})`, borderRadius: 3, transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {/* ── Overview (always open) ── */}
      <Accordion title="Overview" icon="🔍" color={col} defaultOpen>
        <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '0.84rem', margin: 0 }}>{gene.desc}</p>
      </Accordion>

      {/* ── How it works ── */}
      {details?.mechanism && (
        <Accordion title="How it works" icon="⚙️" color="#00d4ff">
          <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '0.83rem', margin: 0 }}>{details.mechanism}</p>
        </Accordion>
      )}

      {/* ── Did you know ── */}
      {details?.funFact && (
        <Accordion title="Did you know?" icon="💡" color="#f59e0b">
          <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '0.83rem', margin: 0 }}>{details.funFact}</p>
        </Accordion>
      )}

      {/* ── Cancer prevalence ── */}
      {(details?.prevalence ?? gene.cancers.length > 0) && (
        <Accordion title="Cancer prevalence" icon="📊" color="#ef4444">
          {details?.prevalence ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {details.prevalence.map(p => (
                <div key={p.cancer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text2)', flex: 1 }}>{p.cancer}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f87171', flexShrink: 0, fontFamily: "'Space Grotesk',sans-serif" }}>{p.pct}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {gene.cancers.map(c => (
                <span key={c} style={{ padding: '0.18rem 0.5rem', borderRadius: 5, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.72rem', color: '#f87171' }}>
                  {CANCER_ABBREVIATIONS[c] || c}
                </span>
              ))}
            </div>
          )}
        </Accordion>
      )}

      {/* ── Approved therapies ── */}
      {gene.drugs.length > 0 && (
        <Accordion title="Approved therapies" icon="💊" color="#10b981">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {gene.drugs.map(d => (
              <div key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.82rem' }}>
                <span style={{ color: '#10b981', fontSize: '0.7rem', flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ color: 'var(--text)' }}>{d}</span>
              </div>
            ))}
          </div>
        </Accordion>
      )}

      {/* ── Signal flow ── */}
      {details && (details.upstream.length > 0 || details.downstream.length > 0) && (
        <Accordion title="Signal flow" icon="🔗" color="#7c3aed">
          {details.upstream.length > 0 && (
            <>
              <div style={{ fontSize: '0.62rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.35rem' }}>⬆ Upstream activators</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.65rem' }}>
                {details.upstream.map(u => (
                  <div key={u} style={{ fontSize: '0.79rem', color: 'var(--text2)', paddingLeft: '0.5rem', borderLeft: '2px solid rgba(167,139,250,0.3)' }}>{u}</div>
                ))}
              </div>
            </>
          )}
          {details.downstream.length > 0 && (
            <>
              <div style={{ fontSize: '0.62rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.35rem' }}>⬇ Downstream effects</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {details.downstream.map(d => (
                  <div key={d} style={{ fontSize: '0.79rem', color: 'var(--text2)', paddingLeft: '0.5rem', borderLeft: '2px solid rgba(167,139,250,0.3)' }}>{d}</div>
                ))}
              </div>
            </>
          )}
        </Accordion>
      )}

      {/* ── Resistance mechanisms ── */}
      {details?.resistanceMechanisms && details.resistanceMechanisms.length > 0 && (
        <Accordion title="Resistance mechanisms" icon="🛡️" color="#f43f5e">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {details.resistanceMechanisms.map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.79rem', color: 'var(--text2)' }}>
                <span style={{ color: '#f87171', flexShrink: 0, marginTop: 1 }}>⚠</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </Accordion>
      )}

      {/* ── Notable trials ── */}
      {details?.notableTrials && details.notableTrials.length > 0 && (
        <Accordion title="Notable clinical trials" icon="🏥" color="#00d4ff">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {details.notableTrials.map(t => (
              <div key={t} style={{ fontSize: '0.79rem', color: 'var(--text2)', display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>▸</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </Accordion>
      )}

      {/* ── Clinical use ── */}
      {details?.clinicalUse && (
        <Accordion title="Clinical testing & use" icon="🩺" color="#10b981">
          <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '0.83rem', margin: 0 }}>{details.clinicalUse}</p>
        </Accordion>
      )}

      {/* ── Biomarker note ── */}
      {details?.biomarkerNote && (
        <Accordion title="Biomarker note" icon="🧪" color="#f59e0b">
          <p style={{ color: 'var(--text2)', lineHeight: 1.65, fontSize: '0.82rem', margin: 0 }}>{details.biomarkerNote}</p>
        </Accordion>
      )}
    </div>
  );
}
