'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import { XP_LEVELS } from '@/lib/constants';

export default function Nav() {
  const pathname = usePathname();
  const { state, hydrated } = useProgress();

  const xp = state.xp || 0;
  let lvl = XP_LEVELS[0];
  for (const l of XP_LEVELS) { if (xp >= l.minXp) lvl = l; else break; }
  const nextLvl = XP_LEVELS[Math.min(lvl.level, XP_LEVELS.length - 1)];
  const pct = nextLvl.minXp > lvl.minXp
    ? Math.round(((xp - lvl.minXp) / (nextLvl.minXp - lvl.minXp)) * 100)
    : 100;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/learn', label: '📚 Learn' },
    { href: '/explorer', label: '🗺️ Explorer' },
    { href: '/crispr', label: '✂️ CRISPR Lab' },
  ];

  return (
    <nav style={{ background: 'rgba(10,10,15,0.95)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', height: 60 }}>
        <Link href="/" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: '1.1rem', textDecoration: 'none' }}>
          <span style={{ color: 'var(--accent)' }}>Gene</span><span style={{ color: 'var(--text)' }}>Lens</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent2)', marginLeft: 4, fontWeight: 700 }}>AI</span>
        </Link>

        <div className="nav-links" style={{ flex: 1 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '0.35rem 0.9rem', borderRadius: 8, fontSize: '0.88rem', textDecoration: 'none',
              color: pathname === l.href ? 'var(--accent)' : 'var(--text2)',
              background: pathname === l.href ? 'rgba(0,212,255,0.08)' : 'transparent',
              fontWeight: pathname === l.href ? 600 : 400,
              transition: 'all 0.15s',
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {hydrated && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: lvl.color, fontWeight: 700 }}>Lv {lvl.level} {lvl.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: lvl.color, borderRadius: 2, transition: 'width 0.5s ease' }} />
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>{xp} XP</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
