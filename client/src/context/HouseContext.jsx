import { createContext, useContext, useState, useEffect } from 'react';

const HOUSES = {
  gryffindor: {
    name: 'Gryffindor',
    animal: '🦁',
    traits: 'Bravery, Nerve, Chivalry',
    primary: '#c0392b',
    secondary: '#e74c3c',
    accent: '#f1c40f',
    accent2: '#f39c12',
    bg: '#0d0705',
    bg2: '#150a08',
    bg3: '#1e0f0b',
    bg4: '#2a1510',
    border: '#3d1a12',
    border2: '#6b2d1e',
    glow: 'rgba(192,57,43,0.15)',
    textPrimary: '#f5d5c8',
    textSecondary: '#c4896e',
    textDim: '#7a4030',
    gradient: 'linear-gradient(135deg, #8b0000, #c0392b, #f1c40f)',
    gradientBg: 'radial-gradient(ellipse at 20% 50%, rgba(192,57,43,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(241,196,15,0.06) 0%, transparent 60%)',
  },
  slytherin: {
    name: 'Slytherin',
    animal: '🐍',
    traits: 'Ambition, Cunning, Leadership',
    primary: '#1a6b3a',
    secondary: '#27ae60',
    accent: '#c0c0c0',
    accent2: '#e8e8e8',
    bg: '#050d07',
    bg2: '#0a1510',
    bg3: '#0f1e16',
    bg4: '#152a1e',
    border: '#1a3d28',
    border2: '#2d6b45',
    glow: 'rgba(26,107,58,0.15)',
    textPrimary: '#c8f0d5',
    textSecondary: '#6eb88a',
    textDim: '#2d6b45',
    gradient: 'linear-gradient(135deg, #0d3d1e, #1a6b3a, #c0c0c0)',
    gradientBg: 'radial-gradient(ellipse at 20% 50%, rgba(26,107,58,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(192,192,192,0.04) 0%, transparent 60%)',
  },
  ravenclaw: {
    name: 'Ravenclaw',
    animal: '🦅',
    traits: 'Wisdom, Wit, Learning',
    primary: '#1a3a6b',
    secondary: '#2980b9',
    accent: '#c9a84c',
    accent2: '#e8c96a',
    bg: '#05070d',
    bg2: '#080d18',
    bg3: '#0d1525',
    bg4: '#121e33',
    border: '#1a2d4d',
    border2: '#2d4d80',
    glow: 'rgba(26,58,107,0.2)',
    textPrimary: '#c8d8f0',
    textSecondary: '#6e8eb8',
    textDim: '#2d4d80',
    gradient: 'linear-gradient(135deg, #0d1e3d, #1a3a6b, #c9a84c)',
    gradientBg: 'radial-gradient(ellipse at 20% 50%, rgba(26,58,107,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)',
  },
  hufflepuff: {
    name: 'Hufflepuff',
    animal: '🦡',
    traits: 'Loyalty, Patience, Hard Work',
    primary: '#c9a84c',
    secondary: '#e8c96a',
    accent: '#2c2c2c',
    accent2: '#4a4a4a',
    bg: '#0d0b05',
    bg2: '#151208',
    bg3: '#1e1a0d',
    bg4: '#2a2412',
    border: '#3d3318',
    border2: '#6b5a2d',
    glow: 'rgba(201,168,76,0.15)',
    textPrimary: '#f5ecc8',
    textSecondary: '#c4a86e',
    textDim: '#7a6030',
    gradient: 'linear-gradient(135deg, #5a4a00, #c9a84c, #2c2c2c)',
    gradientBg: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(44,44,44,0.08) 0%, transparent 60%)',
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

  const theme = house ? HOUSES[house] : HOUSES.ravenclaw;

  // Apply CSS variables dynamically
  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary2', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent2', theme.accent2);
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--bg2', theme.bg2);
    root.style.setProperty('--bg3', theme.bg3);
    root.style.setProperty('--bg4', theme.bg4);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--border2', theme.border2);
    root.style.setProperty('--glow', theme.glow);
    root.style.setProperty('--text', theme.textPrimary);
    root.style.setProperty('--text2', theme.textSecondary);
    root.style.setProperty('--text3', theme.textDim);
    root.style.setProperty('--gradient', theme.gradient);
    root.style.setProperty('--gradient-bg', theme.gradientBg);
  }, [house]);

  return (
    <HouseContext.Provider value={{ house, setHouse, clearHouse, theme, HOUSES }}>
      {children}
    </HouseContext.Provider>
  );
};

export const useHouse = () => useContext(HouseContext);
export { HOUSES };
