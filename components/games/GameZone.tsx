'use client';
import BasePairingGame from './BasePairingGame';
import KRASGame from './KRASGame';
import TwoHitGame from './TwoHitGame';
import HallmarksGame from './HallmarksGame';
import CascadeGame from './CascadeGame';
import ImmunoGame from './ImmunoGame';
import MutationSpotterGame from './MutationSpotterGame';
import DrugMatchGame from './DrugMatchGame';
import PathwayOrderGame from './PathwayOrderGame';
import CancerProfilerGame from './CancerProfilerGame';
import CodonDecoderGame from './CodonDecoderGame';

const GAME_MAP: Record<string, React.ComponentType<{ onComplete: () => void }>> = {
  basePairing: BasePairingGame,
  krasToggle: KRASGame,
  twoHit: TwoHitGame,
  hallmarks: HallmarksGame,
  cascade: CascadeGame,
  immunoSim: ImmunoGame,
  mutSpotter: MutationSpotterGame,
  drugMatch: DrugMatchGame,
  pathwayOrder: PathwayOrderGame,
  cancerProfiler: CancerProfilerGame,
  codonDecoder: CodonDecoderGame,
};

interface Props {
  gameId: string;
  title: string;
  instructions: string;
  onComplete: () => void;
}

export default function GameZone({ gameId, title, instructions, onComplete }: Props) {
  const GameComponent = GAME_MAP[gameId];

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', background: 'rgba(0,212,255,0.03)' }}>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>{title}</div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>{instructions}</div>
      </div>
      <div style={{ padding: '1.25rem' }}>
        {GameComponent ? (
          <GameComponent onComplete={onComplete} />
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text3)' }}>
            Game not found: {gameId}
            <br />
            <button onClick={onComplete} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
