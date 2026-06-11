import Link from 'next/link';
import ParticleDNA from '@/components/ui/ParticleDNA';

const features = [
  { icon: '🗺️', title: 'Genome Explorer', desc: 'Navigate 40+ cancer genes on an interactive pan/zoom pathway map. Click any gene for clinical context, drugs, and mutation rates.', href: '/explorer', color: '#00d4ff' },
  { icon: '🎮', title: 'Step-By-Step Learning', desc: '11 beginner lessons with hook stats, interactive mini-games, and knowledge checks. Master oncogenes, tumor suppressors, and more.', href: '/learn', color: '#7c3aed' },
  { icon: '✂️', title: 'CRISPR Lab', desc: 'Design guide RNAs, simulate Cas9 cutting, predict off-targets, and explore real therapies — all interactive.', href: '/crispr', color: '#10b981' },
  { icon: '🏆', title: 'XP & Achievements', desc: '10 levels from Gene Novice to Chief Oncologist. Earn badges, complete daily challenges, and review with flash cards.', href: '/learn', color: '#f59e0b' },
];

const stats = [
  { n: '40+', label: 'Cancer Genes' },
  { n: '11', label: 'Interactive Games' },
  { n: '3', label: 'Learning Paths' },
  { n: '100%', label: 'Free to Start' },
];

const pathways = [
  { icon: '🧬', title: 'RAS / MAPK', desc: 'KRAS, BRAF, MEK, ERK — the proliferation engine mutated in 30% of all cancers.' },
  { icon: '🛡️', title: 'PI3K / AKT / mTOR', desc: 'Survival and growth. PIK3CA is the most mutated kinase in breast cancer.' },
  { icon: '🔒', title: 'TP53 / Apoptosis', desc: 'Guardian of the genome. Mutated in >50% of all human cancers.' },
  { icon: '🔬', title: 'DNA Repair / BRCA', desc: 'BRCA1/2, PARP — synthetic lethality and immunotherapy targets.' },
];

export default function Home() {
  return (
    <div>
      {/* Hero with particle DNA */}
      <section className="hero-section">
        <ParticleDNA />
        <div className="hero-content">
          <div className="hero-badge">
            🧬 Now with CRISPR Lab + 11 Interactive Games
          </div>
          <h1 className="hero-title">
            Google Maps for<br />
            <span className="gradient-text">Cancer Genomics</span>
          </h1>
          <p className="hero-sub">
            Navigate the cancer genome like never before. Interactive lessons, pathway exploration, and hands-on CRISPR simulation — built for the next generation of oncologists.
          </p>
          <div className="hero-ctas">
            <Link href="/learn" className="btn-primary hero-cta-primary">
              🚀 Start Learning Free
            </Link>
            <Link href="/explorer" className="btn-ghost hero-cta-ghost">
              🗺️ Explore the Genome
            </Link>
          </div>
          <div className="stats-row">
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, color: 'var(--accent)', fontFamily: "'Space Grotesk',sans-serif" }}>{s.n}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-pad">
        <div className="container">
          <h2 className="section-title">Everything you need to master cancer genomics</h2>
          <div className="features-grid">
            {features.map(f => (
              <Link key={f.title} href={f.href} style={{ textDecoration: 'none' }}>
                <div className="feature-card" style={{ '--card-accent': f.color } as React.CSSProperties}>
                  <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem', color: f.color }}>{f.title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: '0.86rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '4rem 1.5rem' }}>
        <div className="container">
          <h2 className="section-title">Explore the key cancer pathways</h2>
          <p style={{ textAlign: 'center', color: 'var(--text2)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>40+ genes, 50+ connections, clinically annotated with approved drug targets</p>
          <div className="pathways-grid">
            {pathways.map(p => (
              <div key={p.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.5rem' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{p.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: '0.84rem', lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/explorer" className="btn-primary">Open Genome Explorer →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", marginBottom: '1rem' }}>
          Ready to explore the <span className="gradient-text">cancer genome?</span>
        </h2>
        <p style={{ color: 'var(--text2)', marginBottom: '2rem', fontSize: '1.05rem' }}>Start with a free lesson. No signup required.</p>
        <Link href="/learn" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2.2rem' }}>
          Start Learning Now — It&apos;s Free 🚀
        </Link>
      </section>
    </div>
  );
}
