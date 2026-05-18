import { createContext, useContext, useState, useEffect } from 'react';

export const HOUSES = {
  gryffindor: {
    name: 'Gryffindor',
    animal: '🦁',
    traits: 'Bravery · Nerve · Chivalry',
    primary: '#ae0001',
    secondary: '#d4000a',
    accent: '#eeba30',
    accent2: '#ffd700',
    bg: '#0e0500',
    bg2: '#1a0800',
    bg3: '#260d00',
    bg4: '#3d1500',
    border: '#5c1a00',
    border2: '#8b2500',
    glow: 'rgba(174,0,1,0.25)',
    glowAccent: 'rgba(238,186,48,0.2)',
    textPrimary: '#ffe8c0',
    textSecondary: '#d4956a',
    textDim: '#7a3a1a',
    gradient: 'linear-gradient(135deg, #ae0001 0%, #d4000a 40%, #eeba30 100%)',
    gradientBg: `
      radial-gradient(ellipse at 15% 50%, rgba(174,0,1,0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 20%, rgba(238,186,48,0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 90%, rgba(174,0,1,0.1) 0%, transparent 40%)
    `,
    particleColor: 'rgba(238,186,48,0.6)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(238,186,48,0.15), transparent)',
    cardGlow: '0 0 30px rgba(174,0,1,0.3), 0 0 60px rgba(238,186,48,0.1)',
  },
  slytherin: {
    name: 'Slytherin',
    animal: '🐍',
    traits: 'Ambition · Cunning · Leadership',
    primary: '#1a6b3a',
    secondary: '#0d5c2e',
    accent: '#aaaaaa',
    accent2: '#d4d4d4',
    bg: '#00080a',
    bg2: '#001510',
    bg3: '#002018',
    bg4: '#003020',
    border: '#004d30',
    border2: '#006b40',
    glow: 'rgba(26,107,58,0.25)',
    glowAccent: 'rgba(170,170,170,0.15)',
    textPrimary: '#c8f0d8',
    textSecondary: '#6ab88a',
    textDim: '#2d6b45',
    gradient: 'linear-gradient(135deg, #0d5c2e 0%, #1a6b3a 50%, #aaaaaa 100%)',
    gradientBg: `
      radial-gradient(ellipse at 15% 50%, rgba(26,107,58,0.2) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 20%, rgba(170,170,170,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 90%, rgba(13,92,46,0.15) 0%, transparent 40%)
    `,
    particleColor: 'rgba(170,170,170,0.5)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(170,170,170,0.1), transparent)',
    cardGlow: '0 0 30px rgba(26,107,58,0.3), 0 0 60px rgba(170,170,170,0.08)',
  },
  ravenclaw: {
    name: 'Ravenclaw',
    animal: '🦅',
    traits: 'Wisdom · Wit · Learning',
    primary: '#0e1a70',
    secondary: '#1a2fa0',
    accent: '#946b2d',
    accent2: '#c9a84c',
    bg: '#00020e',
    bg2: '#000518',
    bg3: '#000a28',
    bg4: '#001040',
    border: '#001a5c',
    border2: '#002880',
    glow: 'rgba(14,26,112,0.3)',
    glowAccent: 'rgba(148,107,45,0.2)',
    textPrimary: '#c8d8ff',
    textSecondary: '#6e8ed4',
    textDim: '#2d4d8a',
    gradient: 'linear-gradient(135deg, #0e1a70 0%, #1a2fa0 50%, #946b2d 100%)',
    gradientBg: `
      radial-gradient(ellipse at 15% 50%, rgba(14,26,112,0.25) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 20%, rgba(148,107,45,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 90%, rgba(26,47,160,0.15) 0%, transparent 40%)
    `,
    particleColor: 'rgba(148,107,45,0.6)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(148,107,45,0.15), transparent)',
    cardGlow: '0 0 30px rgba(14,26,112,0.4), 0 0 60px rgba(148,107,45,0.1)',
  },
  hufflepuff: {
    name: 'Hufflepuff',
    animal: '🦡',
    traits: 'Loyalty · Patience · Hard Work',
    primary: '#e8a800',
    secondary: '#ffcc00',
    accent: '#1a1a1a',
    accent2: '#3a3a3a',
    bg: '#0a0800',
    bg2: '#150f00',
    bg3: '#201800',
    bg4: '#302400',
    border: '#4a3800',
    border2: '#6b5200',
    glow: 'rgba(232,168,0,0.25)',
    glowAccent: 'rgba(26,26,26,0.3)',
    textPrimary: '#fff5c0',
    textSecondary: '#d4a840',
    textDim: '#7a6020',
    gradient: 'linear-gradient(135deg, #e8a800 0%, #ffcc00 50%, #1a1a1a 100%)',
    gradientBg: `
      radial-gradient(ellipse at 15% 50%, rgba(232,168,0,0.2) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 20%, rgba(255,204,0,0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 90%, rgba(232,168,0,0.12) 0%, transparent 40%)
    `,
    particleColor: 'rgba(255,204,0,0.6)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(255,204,0,0.2), transparent)',
    cardGlow: '0 0 30px rgba(232,168,0,0.3), 0 0 60px rgba(255,204,0,0.1)',
  },
};

const HouseContext = createContext(null);

export const HouseProvider = ({ children }) => {
  const [house, setHouseState] = useState(() => localStorage.getItem('ss_house') || null);

  const setHouse = (h) => {
    localStorage.setItem('ss_house', h);
    setHouseState(h);
  };

  const clearHouse = () => {
    localStorage.removeItem('ss_house');
    setHouseState(null);
  };

  const theme = house ? HOUSES[house] : null;

  useEffect(() => {
    if (!theme) return;
    const r = document.documentElement;
    r.style.setProperty('--primary',      theme.primary);
    r.style.setProperty('--primary2',     theme.secondary);
    r.style.setProperty('--accent',       theme.accent);
    r.style.setProperty('--accent2',      theme.accent2);
    r.style.setProperty('--bg',           theme.bg);
    r.style.setProperty('--bg2',          theme.bg2);
    r.style.setProperty('--bg3',          theme.bg3);
    r.style.setProperty('--bg4',          theme.bg4);
    r.style.setProperty('--border',       theme.border);
    r.style.setProperty('--border2',      theme.border2);
    r.style.setProperty('--glow',         theme.glow);
    r.style.setProperty('--glow-accent',  theme.glowAccent);
    r.style.setProperty('--text',         theme.textPrimary);
    r.style.setProperty('--text2',        theme.textSecondary);
    r.style.setProperty('--text3',        theme.textDim);
    r.style.setProperty('--gradient',     theme.gradient);
    r.style.setProperty('--shimmer',      theme.shimmer);
    r.style.setProperty('--card-glow',    theme.cardGlow);
  }, [house]);

  return (
    <HouseContext.Provider value={{ house, setHouse, clearHouse, theme, HOUSES }}>
      {children}
    </HouseContext.Provider>
  );
};

export const useHouse = () => useContext(HouseContext);
