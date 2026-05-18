import { useHouse } from '../context/HouseContext';

export default function HouseBackground() {
  const { theme, house } = useHouse();
  if (!theme) return null;

  return (
    <>
      <style>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.05)} 66%{transform:translate(-20px,20px) scale(0.97)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,40px) scale(1.08)} 66%{transform:translate(30px,-20px) scale(0.95)} }
        @keyframes drift3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.03)} }
        @keyframes drift4 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }
        @keyframes flicker { 0%,100%{opacity:0.6} 50%{opacity:1} }
      `}</style>

      {/* Base gradient layer */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: theme.gradientBg,
        transition: 'background 1s ease',
      }} />

      {/* Large primary orb — top left */}
      <div style={{
        position: 'fixed', zIndex: 0, pointerEvents: 'none',
        top: '-15%', left: '-10%',
        width: '55vw', height: '55vw',
        borderRadius: '50%',
        background: `radial-gradient(circle at 40% 40%, ${theme.primary}55 0%, ${theme.primary}22 40%, transparent 70%)`,
        animation: 'drift1 14s ease-in-out infinite',
        filter: 'blur(40px)',
        transition: 'background 1s',
      }} />

      {/* Large accent orb — bottom right */}
      <div style={{
        position: 'fixed', zIndex: 0, pointerEvents: 'none',
        bottom: '-20%', right: '-15%',
        width: '60vw', height: '60vw',
        borderRadius: '50%',
        background: `radial-gradient(circle at 60% 60%, ${theme.accent}44 0%, ${theme.accent}18 40%, transparent 70%)`,
        animation: 'drift2 18s ease-in-out infinite',
        filter: 'blur(50px)',
        transition: 'background 1s',
      }} />

      {/* Mid orb — center */}
      <div style={{
        position: 'fixed', zIndex: 0, pointerEvents: 'none',
        top: '30%', left: '35%',
        width: '35vw', height: '35vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.secondary}30 0%, transparent 70%)`,
        animation: 'drift3 22s ease-in-out infinite',
        filter: 'blur(60px)',
        transition: 'background 1s',
      }} />

      {/* Small bright orb — top right */}
      <div style={{
        position: 'fixed', zIndex: 0, pointerEvents: 'none',
        top: '5%', right: '10%',
        width: '20vw', height: '20vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.accent2}50 0%, transparent 70%)`,
        animation: 'drift4 10s ease-in-out infinite',
        filter: 'blur(30px)',
        transition: 'background 1s',
      }} />

      {/* Noise texture overlay for depth */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px',
      }} />

      {/* House-specific decorative elements */}
      {house === 'gryffindor' && (
        /* Ember sparks */
        <>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'fixed', zIndex: 0, pointerEvents: 'none',
              width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#ffd700' : '#ff6600',
              top: `${10 + i * 11}%`,
              left: `${5 + i * 12}%`,
              boxShadow: `0 0 6px ${i % 2 === 0 ? '#ffd700' : '#ff6600'}`,
              animation: `flicker ${1.5 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }} />
          ))}
        </>
      )}

      {house === 'slytherin' && (
        /* Subtle green mist lines */
        <>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: 'fixed', zIndex: 0, pointerEvents: 'none',
              width: '100vw', height: 1,
              background: `linear-gradient(90deg, transparent, rgba(26,122,64,${0.05 + i * 0.02}), transparent)`,
              top: `${20 + i * 15}%`,
              animation: `drift3 ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }} />
          ))}
        </>
      )}

      {house === 'ravenclaw' && (
        /* Star points */
        <>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{
              position: 'fixed', zIndex: 0, pointerEvents: 'none',
              width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#daa520' : 'rgba(200,220,255,0.8)',
              top: `${Math.sin(i * 1.3) * 40 + 50}%`,
              left: `${(i * 8.5) % 100}%`,
              boxShadow: `0 0 4px ${i % 3 === 0 ? '#daa520' : 'rgba(200,220,255,0.8)'}`,
              animation: `flicker ${2 + i * 0.25}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }} />
          ))}
        </>
      )}

      {house === 'hufflepuff' && (
        /* Warm dust motes */
        <>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'fixed', zIndex: 0, pointerEvents: 'none',
              width: i % 2 === 0 ? 4 : 2, height: i % 2 === 0 ? 4 : 2,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(255,204,0,0.7)' : 'rgba(255,180,0,0.5)',
              top: `${15 + i * 10}%`,
              left: `${8 + i * 11}%`,
              boxShadow: `0 0 8px rgba(255,204,0,0.6)`,
              animation: `drift1 ${6 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
              filter: 'blur(1px)',
            }} />
          ))}
        </>
      )}
    </>
  );
}
