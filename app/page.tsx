import Link from 'next/link';
import HeroCanvas from '@/components/ui/HeroCanvas';
import MutationTicker from '@/components/ui/MutationTicker';
import PathwayPreview from '@/components/ui/PathwayPreview';

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

const HOW_IT_WORKS = [
  {
    step: '01', icon: '🗺️', title: 'Explore the Genome Map',
    desc: 'Open the Genome Explorer. Pan and zoom a live pathway map of 40+ cancer genes — exactly like Google Maps, but for your DNA.',
    color: '#00d4ff',
  },
  {
    step: '02', icon: '🎯', title: 'Complete Guided Missions',
    desc: 'Follow progressive missions: find KRAS, trace the MAPK cascade, identify tumor suppressors. Each mission teaches real clinical concepts.',
    color: '#7c3aed',
  },
  {
    step: '03', icon: '✂️', title: 'Simulate CRISPR in the Lab',
    desc: 'Design a guide RNA, scan for the PAM site, cut the target DNA, and choose a repair pathway — all in a hands-on game.',
    color: '#10b981',
  },
];

const DATA_SOURCES = [
  { name: 'TCGA', desc: 'Mutation frequencies', url: '#' },
  { name: 'COSMIC', desc: 'Clinical variants', url: '#' },
  { name: 'ClinVar', desc: 'Pathogenicity data', url: '#' },
  { name: 'FDA', desc: 'Approved drug labels', url: '#' },
];

export default function Home() {
  return (
    <div>
      {/* Hero with particle DNA */}
      <section className="hero-section">
        <HeroCanvas />
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

      {/* Live mutation ticker */}
      <MutationTicker />

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

      {/* Interactive MAPK pathway preview */}
      <PathwayPreview />

      {/* How It Works */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>How It Works</span>
          </div>
          <h2 className="section-title" style={{ marginBottom: '3.5rem' }}>From zero to genome explorer in 3 steps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '2rem' }}>
            {HOW_IT_WORKS.map((h, i) => (
              <div key={h.step} style={{ position: 'relative' }}>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div style={{ display: 'none', position: 'absolute', top: 28, right: -20, fontSize: '1.2rem', color: 'var(--text3)', zIndex: 1 }} className="how-arrow">›</div>
                )}
                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.75rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: '0.7rem', color: h.color, opacity: 0.7, letterSpacing: 2 }}>{h.step}</span>
                    <span style={{ fontSize: '1.75rem' }}>{h.icon}</span>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: "'Space Grotesk',sans-serif", marginBottom: '0.75rem', color: h.color }}>{h.title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: '0.86rem', lineHeight: 1.65 }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/explorer" className="btn-primary">Begin your first mission →</Link>
          </div>
        </div>
      </section>

      {/* Data provenance */}
      <section style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1.75rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, flexShrink: 0 }}>Data sourced from</span>
            {DATA_SOURCES.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontWeight: 900, fontSize: '0.88rem', fontFamily: "'Space Grotesk',sans-serif", color: 'var(--text)' }}>{d.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>· {d.desc}</span>
              </div>
            ))}
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
