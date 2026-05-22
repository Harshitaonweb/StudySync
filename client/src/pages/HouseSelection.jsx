import { useState } from 'react';
import { useHouse, HOUSES } from '../context/HouseContext';
import { useAuth } from '../context/AuthContext';
import HogwartsCastle from '../components/HogwartsCastle';
import { playSorting } from '../utils/sounds';

const LORE = {
  gryffindor: {
    quote: '"Daring, nerve, and chivalry set Gryffindors apart."',
    desc: 'The house of the brave. Scarlet and gold burn like fire — for those who charge headfirst into the unknown.',
    emoji: ['⚔️','🔥','🏆'],
  },
  slytherin: {
    quote: '"Those cunning folk use any means to achieve their ends."',
    desc: 'The house of ambition. Emerald and silver gleam in the dark — for those who know what they want and how to get it.',
    emoji: ['🐍','💎','🌙'],
  },
  ravenclaw: {
    quote: '"Wit beyond measure is man\'s greatest treasure."',
    desc: 'The house of wisdom. Blue and bronze shimmer like starlight — for those who seek knowledge above all else.',
    emoji: ['📚','🦅','⭐'],
  },
  hufflepuff: {
    quote: '"I\'ll teach the lot and treat them just the same."',
    desc: 'The house of loyalty. Yellow and black shine like sunlight — for those whose dedication never wavers.',
    emoji: ['🌻','🦡','💛'],
  },
};

export default function HouseSelection() {
  const { setHouse, HOUSES } = useHouse();
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const confirm = () => {
    if (!selected) return;
    setConfirming(true);
    playSorting();
    setTimeout(() => setHouse(selected), 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#04020a',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Crimson Text', serif",
    }}>
      {/* Starfield */}
      {[...Array(40)].map((_, i) => (        <div key={i} style={{
          position: 'absolute',
          width: i % 5 === 0 ? 2 : 1,
          height: i % 5 === 0 ? 2 : 1,
          borderRadius: '50%',
          background: i % 7 === 0 ? 'rgba(201,168,76,0.8)' : 'rgba(255,255,255,0.4)',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
      ))}

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px var(--h-glow)} 50%{box-shadow:0 0 50px var(--h-glow), 0 0 80px var(--h-glow2)} }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(80,40,160,0.08) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 56, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>🏰</div>
        <h1 style={{
          fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 900,
          background: 'linear-gradient(135deg, #c9a84c 0%, #ffd700 50%, #c9a84c 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '0.12em', marginBottom: 14,
          filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.5))',
        }}>The Sorting Ceremony</h1>
        <p style={{
          fontSize: 17, color: 'rgba(200,180,255,0.6)',
          fontStyle: 'italic', maxWidth: 500, lineHeight: 1.7, margin: '0 auto',
        }}>
          Welcome, <strong style={{ color: 'rgba(201,168,76,0.9)', fontStyle: 'normal' }}>{user?.name?.split(' ')[0]}</strong>.
          The Sorting Hat awaits. Choose the house that calls to your soul.
        </p>
      </div>

      {/* House cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20, maxWidth: 780, width: '100%',
        position: 'relative', zIndex: 1,
      }}>
        {Object.entries(HOUSES).map(([key, h]) => {
          const lore = LORE[key];
          const isSelected = selected === key;

          return (
            <div
              key={key}
              onClick={() => setSelected(key)}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${h.bg2} 0%, ${h.bg3} 50%, ${h.bg4} 100%)`
                  : `linear-gradient(135deg, ${h.bg} 0%, ${h.bg2} 100%)`,
                border: `1px solid ${isSelected ? h.primary : h.border}`,
                borderRadius: 10,
                padding: '24px 22px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isSelected ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
                boxShadow: isSelected
                  ? `0 0 0 1px ${h.primary}, 0 0 40px ${h.glow}, 0 0 80px ${h.glowAccent}, 0 16px 40px rgba(0,0,0,0.6)`
                  : '0 4px 20px rgba(0,0,0,0.4)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Top colour bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${h.primary}, ${h.accent}, ${h.primary})`,
                opacity: isSelected ? 1 : 0.4,
                transition: 'opacity 0.3s',
              }} />

              {/* Corner glow */}
              {isSelected && (
                <div style={{
                  position: 'absolute', top: -20, right: -20,
                  width: 100, height: 100, borderRadius: '50%',
                  background: `radial-gradient(circle, ${h.glowAccent} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
              )}

              {/* House header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 10,
                  background: `linear-gradient(135deg, ${h.bg4}, ${h.bg3})`,
                  border: `2px solid ${isSelected ? h.primary : h.border2}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                  boxShadow: isSelected ? `0 0 20px ${h.glow}, 0 0 40px ${h.glowAccent}` : 'none',
                  transition: 'all 0.3s',
                }}>{h.animal}</div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700,
                    color: isSelected ? h.accent2 : h.textPrimary,
                    letterSpacing: '0.06em',
                    textShadow: isSelected ? `0 0 15px ${h.glowAccent}` : 'none',
                    transition: 'all 0.3s',
                  }}>{h.name}</div>
                  <div style={{
                    fontSize: 12, color: h.textDim,
                    fontStyle: 'italic', marginTop: 3,
                    letterSpacing: '0.03em',
                  }}>{h.traits}</div>
                </div>

                {isSelected && (
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${h.primary}, ${h.secondary})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff', fontWeight: 700,
                    boxShadow: `0 0 12px ${h.glow}`,
                  }}>✓</div>
                )}
              </div>

              {/* Colour swatches */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                <div style={{ width: 28, height: 8, borderRadius: 4, background: h.primary, boxShadow: `0 0 8px ${h.glow}` }} />
                <div style={{ width: 28, height: 8, borderRadius: 4, background: h.accent, boxShadow: `0 0 8px ${h.glowAccent}` }} />
              </div>

              <p style={{
                fontSize: 14, color: h.textSecondary,
                lineHeight: 1.65, fontStyle: 'italic', marginBottom: 12,
              }}>{lore.desc}</p>

              <div style={{
                fontSize: 12, color: h.textDim,
                fontStyle: 'italic', borderLeft: `2px solid ${h.border2}`,
                paddingLeft: 10, lineHeight: 1.5,
              }}>{lore.quote}</div>

              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                {lore.emoji.map((e, i) => (
                  <span key={i} style={{
                    fontSize: 18,
                    opacity: isSelected ? 1 : 0.35,
                    transition: `opacity 0.3s ${i * 0.05}s`,
                    filter: isSelected ? `drop-shadow(0 0 6px ${h.glowAccent})` : 'none',
                  }}>{e}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm button */}
      <div style={{ marginTop: 36, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {selected ? (
          <button
            onClick={confirm}
            disabled={confirming}
            style={{
              background: `linear-gradient(135deg, ${HOUSES[selected].bg4}, ${HOUSES[selected].primary}, ${HOUSES[selected].secondary})`,
              border: `1px solid ${HOUSES[selected].primary}`,
              borderRadius: 6, padding: '14px 48px',
              fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 700,
              color: '#fff', cursor: confirming ? 'default' : 'pointer',
              letterSpacing: '0.08em',
              boxShadow: `0 0 30px ${HOUSES[selected].glow}, 0 0 60px ${HOUSES[selected].glowAccent}, 0 8px 24px rgba(0,0,0,0.5)`,
              transition: 'all 0.3s',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              opacity: confirming ? 0.7 : 1,
            }}
          >
            {confirming ? '✨ The Hat Has Spoken...' : `✦ Enter as ${HOUSES[selected].name} ✦`}
          </button>
        ) : (
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 13, color: 'rgba(201,168,76,0.3)', letterSpacing: '0.08em' }}>
            SELECT YOUR HOUSE TO CONTINUE
          </p>
        )}
        <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(180,160,220,0.3)', fontStyle: 'italic' }}>
          You may change your house anytime from the sidebar
        </p>
      </div>
      {/* Castle at bottom */}
      <HogwartsCastle />
    </div>
  );
}
