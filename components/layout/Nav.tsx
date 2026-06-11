'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { XP_LEVELS } from '@/lib/constants';

export default function Nav() {
  const pathname = usePathname();
  const { state, hydrated } = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      <nav style={{ background: 'rgba(10,10,15,0.97)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem', display: 'flex', alignItems: 'center', height: 56 }}>
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: '1.1rem', textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ color: 'var(--accent)' }}>Gene</span><span style={{ color: 'var(--text)' }}>Lens</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent2)', marginLeft: 4, fontWeight: 700 }}>AI</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links" style={{ flex: 1, marginLeft: '1.5rem' }}>
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

          {/* XP bar — desktop */}
          {hydrated && (
            <div className="nav-xp" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.68rem', color: lvl.color, fontWeight: 700, whiteSpace: 'nowrap' }}>Lv {lvl.level} {lvl.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <div style={{ width: 72, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: lvl.color, borderRadius: 2, transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text3)' }}>{xp} XP</span>
                </div>
              </div>
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="nav-hamburger"
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.4rem', marginLeft: '0.5rem', display: 'none',
              flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? 'var(--accent)' : 'var(--text2)', borderRadius: 2, transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none', transition: 'all 0.2s' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? 'transparent' : 'var(--text2)', borderRadius: 2, transition: 'all 0.2s' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? 'var(--accent)' : 'var(--text2)', borderRadius: 2, transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none', transition: 'all 0.2s' }} />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
        }} onClick={() => setMenuOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', top: 56, right: 0, bottom: 0,
              width: 'min(300px, 85vw)',
              background: 'rgba(10,10,18,0.98)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column',
              padding: '1.5rem 1.25rem',
              animation: 'slideInRight 0.22s ease',
              gap: '0.4rem',
            }}
          >
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '0.85rem 1rem', borderRadius: 10, fontSize: '1rem', textDecoration: 'none',
                  color: pathname === l.href ? 'var(--accent)' : 'var(--text)',
                  background: pathname === l.href ? 'rgba(0,212,255,0.08)' : 'transparent',
                  fontWeight: pathname === l.href ? 700 : 400,
                  borderLeft: pathname === l.href ? '3px solid var(--accent)' : '3px solid transparent',
                  display: 'block', transition: 'all 0.15s',
                }}
              >
                {l.label}
              </Link>
            ))}

            {hydrated && (
              <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.72rem', color: lvl.color, fontWeight: 700, marginBottom: '0.4rem' }}>Level {lvl.level} — {lvl.label}</div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden', marginBottom: '0.35rem' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: lvl.color, borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{xp} XP · {100 - pct}% to next level</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
