import { useState } from 'react';
import { useHouse, HOUSES } from '../context/HouseContext';
import { useAuth } from '../context/AuthContext';

const HOUSE_DETAILS = {
  gryffindor: {
    desc: '"Where dwell the brave at heart" — courage, determination, and chivalry define those who wear the scarlet and gold.',
    stars: ['⚔️', '🔥', '🦁'],
  },
  slytherin: {
    desc: '"Those cunning folk use any means to achieve their ends" — ambition, resourcefulness, and pure determination.',
    stars: ['🐍', '💎', '🌙'],
  },
  ravenclaw: {
    desc: '"Wit beyond measure is man\'s greatest treasure" — wisdom, creativity, and a thirst for knowledge.',
    stars: ['📚', '🦅', '⭐'],
  },
  hufflepuff: {
    desc: '"I\'ll teach the lot and treat them just the same" — loyalty, patience, and hard work above all.',
    stars: ['🌻', '🦡', '💛'],
  },
};

export default function HouseSelection() {
  const { setHouse, HOUSES } = useHouse();
  const { user } = useAuth();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const confirm = () => {
    if (selected) setHouse(selected);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080608',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Floating runes */}
      <div style={{
        position: 'absolute', top: '5%', left: 0, right: 0,
        textAlign: 'center', fontSize: 18,
        color: 'rgba(201,168,76,0.06)',
        letterSpacing: 60, pointerEvents: 'none',
        fontFamily: 'serif',
      }}>✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦</div>

      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏰</div>
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 28,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #c9a84c, #e8c96a, #c9a84c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.1em',
          marginBottom: 12,
        }}>The Sorting Ceremony</h1>
        <p style={{
          fontFamily: 'Crimson Text, serif',
          fontSize: 16,
          color: 'rgba(201,168,76,0.6)',
          fontStyle: 'italic',
          maxWidth: 480,
          lineHeight: 1.6,
        }}>
          Welcome, {user?.name?.split(' ')[0]}. The Sorting Hat senses great potential in you.
          Choose your house wisely — it shall colour your entire journey.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
        maxWidth: 720,
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        {Object.entries(HOUSES).map(([key, h]) => {
          const detail = HOUSE_DETAILS[key];
          const isSelected = selected === key;
          const isHovered = hovered === key;

          return (
            <div
              key={key}
              onClick={() => setSelected(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${h.bg2}, ${h.bg3})`
                  : isHovered ? h.bg3 : h.bg2,
                border: `1px solid ${isSelected ? h.primary : isHovered ? h.border2 : h.border}`,
                borderRadius: 8,
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.25s',
                transform: isSelected ? 'scale(1.02)' : isHovered ? 'translateY(-2px)' : 'none',
                boxShadow: isSelected
                  ? `0 0 40px ${h.glow}, 0 8px 32px rgba(0,0,0,0.5)`
                  : isHovered ? `0 8px 24px rgba(0,0,0,0.4)` : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top shimmer on selected */}
              {isSelected && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${h.primary}, transparent)`,
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${h.bg4}, ${h.bg3})`,
                  border: `1px solid ${h.border2}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                  boxShadow: isSelected ? `0 0 16px ${h.glow}` : 'none',
                  transition: 'box-shadow 0.25s',
                }}>
                  {h.animal}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: 16,
                    fontWeight: 700,
                    color: isSelected ? h.secondary : h.textPrimary,
                    letterSpacing: '0.06em',
                    transition: 'color 0.2s',
                  }}>{h.name}</div>
                  <div style={{
                    fontSize: 11,
                    color: h.textDim,
                    fontFamily: 'Crimson Text, serif',
                    fontStyle: 'italic',
                    marginTop: 2,
                  }}>{h.traits}</div>
                </div>
                {isSelected && (
                  <div style={{
                    marginLeft: 'auto',
                    width: 20, height: 20,
                    borderRadius: '50%',
                    background: h.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: '#fff',
                  }}>✓</div>
                )}
              </div>

              <p style={{
                fontFamily: 'Crimson Text, serif',
                fontSize: 13,
                color: h.textSecondary,
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}>{detail.desc}</p>

              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {detail.stars.map((s, i) => (
                  <span key={i} style={{ fontSize: 16, opacity: isSelected || isHovered ? 1 : 0.4, transition: 'opacity 0.2s' }}>{s}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div style={{ marginTop: 32, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <button
            onClick={confirm}
            style={{
              background: `linear-gradient(135deg, ${HOUSES[selected].bg4}, ${HOUSES[selected].primary})`,
              border: `1px solid ${HOUSES[selected].primary}`,
              borderRadius: 4,
              padding: '12px 40px',
              fontFamily: 'Cinzel, serif',
              fontSize: 14,
              fontWeight: 700,
              color: HOUSES[selected].textPrimary,
              cursor: 'pointer',
              letterSpacing: '0.08em',
              boxShadow: `0 0 24px ${HOUSES[selected].glow}`,
              transition: 'all 0.2s',
            }}
          >
            ✦ The Sorting Hat Chooses {HOUSES[selected].name} ✦
          </button>
          <p style={{
            marginTop: 12,
            fontFamily: 'Crimson Text, serif',
            fontSize: 13,
            color: 'rgba(201,168,76,0.4)',
            fontStyle: 'italic',
          }}>You can change your house later from settings</p>
        </div>
      )}
    </div>
  );
}
