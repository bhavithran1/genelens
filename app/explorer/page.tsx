'use client';
import { useState, useMemo } from 'react';
import { PATHWAY_NODES } from '@/data/pathway-data';
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

function GeneDetail({ gene, onClose }: { gene: GeneNode; onClose: () => void }) {
  const col = TYPE_COLORS[gene.type] || '#94a3b8';
  const mutBar = Math.min(gene.mutRate, 70);

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", color: col, lineHeight: 1 }}>{gene.id}</h2>
          <div style={{ color: 'var(--text2)', fontSize: '0.82rem', marginTop: '0.3rem' }}>{gene.fullName}</div>
          <span style={{ display: 'inline-block', marginTop: '0.4rem', padding: '0.18rem 0.65rem', borderRadius: 6, background: col + '18', border: `1px solid ${col}33`, fontSize: '0.7rem', color: col, fontWeight: 700, textTransform: 'capitalize' }}>{gene.type}</span>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border2)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: 'var(--text3)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          ✕
        </button>
      </div>

      {/* Mutation rate */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.85rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Mutation rate in cancer</span>
          <span style={{ fontWeight: 900, color: col, fontSize: '1rem' }}>{gene.mutRate}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(mutBar / 70) * 100}%`, background: `linear-gradient(90deg,${col}88,${col})`, borderRadius: 3, transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {/* Biology */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.85rem', marginBottom: '0.85rem' }}>
        <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Biology</div>
        <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '0.86rem' }}>{gene.desc}</p>
      </div>

      {/* Cancers */}
      {gene.cancers.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.85rem', marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Associated Cancers</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {gene.cancers.map(c => (
              <span key={c} style={{ padding: '0.2rem 0.55rem', borderRadius: 5, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.72rem', color: '#f87171' }}>
                {CANCER_ABBREVIATIONS[c] || c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Drugs */}
      {gene.drugs.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.85rem' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Therapies</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {gene.drugs.map(d => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem' }}>
                <span style={{ color: '#10b981', fontSize: '0.7rem', flexShrink: 0 }}>💊</span>
                <span style={{ color: 'var(--text)' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
