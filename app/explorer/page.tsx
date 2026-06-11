'use client';
import { useState, useMemo } from 'react';
import { PATHWAY_NODES, PATHWAY_REGIONS } from '@/data/pathway-data';
import type { GeneNode } from '@/lib/types';
import { CANCER_ABBREVIATIONS } from '@/lib/constants';

const TYPE_COLORS: Record<string, string> = {
  oncogene: '#ef4444',
  suppressor: '#3b82f6',
  kinase: '#f59e0b',
  adapter: '#94a3b8',
  other: '#10b981',
};

const REGIONS = [
  { id: 'all', label: 'All Pathways' },
  { id: 'membrane', label: 'Receptors' },
  { id: 'ras_mapk', label: 'RAS/MAPK' },
  { id: 'pi3k_akt', label: 'PI3K/AKT' },
  { id: 'p53', label: 'p53/Apoptosis' },
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
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [clickedGenes, setClickedGenes] = useState(new Set<string>());
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    let nodes = PATHWAY_NODES;
    if (filter !== 'all') nodes = nodes.filter(n => getRegion(n) === filter);
    if (typeFilter !== 'all') nodes = nodes.filter(n => n.type === typeFilter);
    if (search) nodes = nodes.filter(n =>
      n.id.toLowerCase().includes(search.toLowerCase()) ||
      n.fullName.toLowerCase().includes(search.toLowerCase()) ||
      n.cancers.some(c => (CANCER_ABBREVIATIONS[c] || c).toLowerCase().includes(search.toLowerCase()))
    );
    return nodes;
  }, [filter, typeFilter, search]);

  const handleClick = (node: GeneNode) => {
    setSelected(node);
    setClickedGenes(s => new Set([...s, node.id]));
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
      {/* Left panel */}
      <div style={{ width: 280, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search genes, cancers..."
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 8, border: '1px solid var(--border2)', background: 'rgba(255,255,255,0.04)', color: 'var(--text)', fontSize: '0.85rem', outline: 'none', fontFamily: 'Inter,sans-serif' }}
          />
        </div>

        {/* Region filter */}
        <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Pathway</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {REGIONS.map(r => (
              <button key={r.id} onClick={() => setFilter(r.id)}
                style={{ padding: '0.25rem 0.6rem', borderRadius: 6, border: `1px solid ${filter === r.id ? 'var(--accent)' : 'var(--border)'}`, background: filter === r.id ? 'rgba(0,212,255,0.1)' : 'transparent', color: filter === r.id ? 'var(--accent)' : 'var(--text3)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type filter */}
        <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Gene Type</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {['all', 'oncogene', 'suppressor', 'kinase', 'adapter', 'other'].map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                style={{ padding: '0.25rem 0.6rem', borderRadius: 6, border: `1px solid ${typeFilter === t ? (TYPE_COLORS[t] || 'var(--accent)') : 'var(--border)'}`, background: typeFilter === t ? `${TYPE_COLORS[t] || 'var(--accent)'}15` : 'transparent', color: typeFilter === t ? (TYPE_COLORS[t] || 'var(--accent)') : 'var(--text3)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize' }}>
                {t === 'all' ? 'All Types' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Gene list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '0.25rem 0.5rem 0.5rem' }}>{filtered.length} genes</div>
          {filtered.map(node => (
            <button key={node.id} onClick={() => handleClick(node)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.55rem 0.65rem', borderRadius: 8, border: 'none', marginBottom: '0.2rem', cursor: 'pointer', textAlign: 'left',
                background: selected?.id === node.id ? 'rgba(0,212,255,0.08)' : clickedGenes.has(node.id) ? 'rgba(255,255,255,0.02)' : 'transparent',
                transition: 'all 0.15s',
              }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: TYPE_COLORS[node.type] || '#94a3b8', flexShrink: 0, opacity: node.mutRate > 10 ? 1 : 0.6 }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: selected?.id === node.id ? 'var(--accent)' : 'var(--text)', fontFamily: "'Space Grotesk',sans-serif" }}>{node.id}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>{node.type} · {node.mutRate}% mut</div>
              </div>
            </button>
          ))}
        </div>

        {/* XP counter */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--text3)' }}>
          🔭 {clickedGenes.size} genes explored
          {clickedGenes.size >= 10 && <span style={{ color: '#f59e0b', marginLeft: 8 }}>🏆 Explorer!</span>}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selected ? (
          <GeneDetail gene={selected} onClose={() => setSelected(null)} />
        ) : (
          <ExplorerWelcome nodes={PATHWAY_NODES} onSelect={handleClick} />
        )}
      </div>
    </div>
  );
}

function ExplorerWelcome({ nodes, onSelect }: { nodes: GeneNode[]; onSelect: (n: GeneNode) => void }) {
  const topGenes = [...nodes].sort((a, b) => b.mutRate - a.mutRate).slice(0, 8);

  return (
    <div style={{ padding: '2.5rem', overflowY: 'auto', flex: 1 }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.5rem' }}>
        🗺️ Genome Explorer
      </h2>
      <p style={{ color: 'var(--text2)', marginBottom: '2.5rem' }}>Click any gene in the sidebar or below to explore its function, cancer associations, and approved therapies.</p>

      {/* Pathway regions visual */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {PATHWAY_REGIONS.map(r => (
          <div key={r.id} style={{ background: 'var(--card)', border: `1px solid ${r.color}22`, borderRadius: 12, padding: '1rem', borderTop: `3px solid ${r.color}` }}>
            <div style={{ fontWeight: 700, color: r.color, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{r.label}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>
              {nodes.filter(n => getRegion(n) === r.id).length} genes
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1.1rem' }}>Most Frequently Mutated Genes</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        {topGenes.map(gene => (
          <button key={gene.id} onClick={() => onSelect(gene)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 0.9rem', borderRadius: 10, border: `1px solid ${TYPE_COLORS[gene.type]}33`, background: `${TYPE_COLORS[gene.type]}0a`, cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_COLORS[gene.type] }} />
            <span style={{ fontWeight: 700, color: TYPE_COLORS[gene.type], fontFamily: "'Space Grotesk',sans-serif" }}>{gene.id}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{gene.mutRate}%</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: 12, background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
        💡 <strong style={{ color: 'var(--accent)' }}>Legend:</strong>
        {' '}<span style={{ color: '#ef4444' }}>● Oncogene</span> · <span style={{ color: '#3b82f6' }}>● Tumor Suppressor</span> · <span style={{ color: '#f59e0b' }}>● Kinase</span> · <span style={{ color: '#94a3b8' }}>● Adapter</span> · <span style={{ color: '#10b981' }}>● Other</span>
      </div>
    </div>
  );
}

function GeneDetail({ gene, onClose }: { gene: GeneNode; onClose: () => void }) {
  const mutBar = Math.min(gene.mutRate, 70);

  return (
    <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '0.82rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        ← Back to Explorer
      </button>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: `${TYPE_COLORS[gene.type]}15`, border: `2px solid ${TYPE_COLORS[gene.type]}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, color: TYPE_COLORS[gene.type] }}>
          {gene.id.slice(0, 2)}
        </div>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", color: TYPE_COLORS[gene.type] }}>{gene.id}</h2>
          <div style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>{gene.fullName}</div>
          <div style={{ display: 'inline-block', marginTop: '0.4rem', padding: '0.2rem 0.7rem', borderRadius: 6, background: `${TYPE_COLORS[gene.type]}15`, border: `1px solid ${TYPE_COLORS[gene.type]}33`, fontSize: '0.72rem', color: TYPE_COLORS[gene.type], fontWeight: 700, textTransform: 'capitalize' }}>
            {gene.type}
          </div>
        </div>
      </div>

      {/* Mutation rate */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Mutation Rate in Cancer</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: TYPE_COLORS[gene.type] }}>{gene.mutRate}%</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(mutBar / 70) * 100}%`, background: TYPE_COLORS[gene.type], borderRadius: 4, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* Description */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Biology</div>
        <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '0.9rem' }}>{gene.desc}</p>
      </div>

      {/* Cancer types */}
      {gene.cancers.length > 0 && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Associated Cancers</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {gene.cancers.map(c => (
              <span key={c} style={{ padding: '0.25rem 0.6rem', borderRadius: 6, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.75rem', color: '#f87171' }}>
                {CANCER_ABBREVIATIONS[c] || c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Drugs */}
      {gene.drugs.length > 0 && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Approved / Investigational Therapies</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {gene.drugs.map(d => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#10b981', fontSize: '0.7rem' }}>💊</span>
                <span style={{ color: 'var(--text)' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
