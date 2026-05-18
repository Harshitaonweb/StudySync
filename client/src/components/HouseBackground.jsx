import { useHouse } from '../context/HouseContext';

// HP doodles as SVG paths — wand, lightning bolt, snitch, stars, owl, potion, glasses, broom
const DOODLES = [
  // Lightning bolt ⚡
  { id: 'bolt', svg: <svg viewBox="0 0 40 60" fill="none"><path d="M24 2L8 32h14L16 58l22-34H24L30 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>, size: 32 },
  // Wand ✨
  { id: 'wand', svg: <svg viewBox="0 0 80 20" fill="none"><line x1="4" y1="16" x2="70" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="72" cy="4" r="4" fill="currentColor" opacity="0.6"/><circle cx="10" cy="14" r="2" fill="currentColor" opacity="0.4"/></svg>, size: 60 },
  // Snitch
  { id: 'snitch', svg: <svg viewBox="0 0 60 40" fill="none"><circle cx="30" cy="20" r="8" stroke="currentColor" strokeWidth="2"/><path d="M4 20 Q15 8 22 20" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M56 20 Q45 8 38 20" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="30" cy="20" r="3" fill="currentColor" opacity="0.5"/></svg>, size: 50 },
  // Glasses
  { id: 'glasses', svg: <svg viewBox="0 0 70 30" fill="none"><circle cx="18" cy="15" r="12" stroke="currentColor" strokeWidth="2"/><circle cx="52" cy="15" r="12" stroke="currentColor" strokeWidth="2"/><path d="M30 15 L40 15" stroke="currentColor" strokeWidth="2"/><path d="M6 15 L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M64 15 L68 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, size: 55 },
  // Potion bottle
  { id: 'potion', svg: <svg viewBox="0 0 40 60" fill="none"><path d="M15 20 L10 40 Q10 55 20 55 Q30 55 30 40 L25 20z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><rect x="14" y="12" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><line x1="17" y1="12" x2="17" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="23" y1="12" x2="23" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="18" cy="38" r="3" fill="currentColor" opacity="0.4"/><circle cx="24" cy="44" r="2" fill="currentColor" opacity="0.3"/></svg>, size: 36 },
  // Owl
  { id: 'owl', svg: <svg viewBox="0 0 50 60" fill="none"><ellipse cx="25" cy="35" rx="16" ry="20" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="28" r="6" stroke="currentColor" strokeWidth="2"/><circle cx="32" cy="28" r="6" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="28" r="3" fill="currentColor" opacity="0.5"/><circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.5"/><path d="M22 34 L25 38 L28 34" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 20 Q5 10 15 8" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M40 20 Q45 10 35 8" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>, size: 44 },
  // Broomstick
  { id: 'broom', svg: <svg viewBox="0 0 100 40" fill="none"><line x1="10" y1="30" x2="80" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M80 10 Q95 5 90 20 Q85 30 75 25 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="82" y1="12" x2="88" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.6"/><line x1="85" y1="10" x2="89" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6"/></svg>, size: 70 },
  // Star
  { id: 'star', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M20 4 L23 16 L36 16 L26 24 L29 36 L20 28 L11 36 L14 24 L4 16 L17 16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>, size: 28 },
  // Sorting hat
  { id: 'hat', svg: <svg viewBox="0 0 60 60" fill="none"><path d="M30 5 Q20 20 15 35 L45 35 Q40 20 30 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M8 42 Q30 35 52 42 Q50 50 30 50 Q10 50 8 42Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M8 42 L4 38 Q6 36 8 38" stroke="currentColor" strokeWidth="1.5"/></svg>, size: 42 },
  // Deathly hallows symbol
  { id: 'hallows', svg: <svg viewBox="0 0 50 60" fill="none"><path d="M25 5 L45 50 L5 50 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><line x1="25" y1="5" x2="25" y2="50" stroke="currentColor" strokeWidth="1.5"/><circle cx="25" cy="35" r="10" stroke="currentColor" strokeWidth="1.5"/></svg>, size: 38 },
];

// Positions for doodles — spread across the screen
const POSITIONS = [
  { top: '5%',  left: '3%',   rotate: -15, opacity: 0.07 },
  { top: '8%',  right: '5%',  rotate: 20,  opacity: 0.06 },
  { top: '20%', left: '1%',   rotate: -5,  opacity: 0.05 },
  { top: '18%', right: '2%',  rotate: 10,  opacity: 0.07 },
  { top: '35%', left: '2%',   rotate: 25,  opacity: 0.06 },
  { top: '40%', right: '3%',  rotate: -20, opacity: 0.05 },
  { top: '55%', left: '1%',   rotate: 8,   opacity: 0.07 },
  { top: '60%', right: '2%',  rotate: -12, opacity: 0.06 },
  { top: '72%', left: '3%',   rotate: -30, opacity: 0.05 },
  { top: '75%', right: '4%',  rotate: 15,  opacity: 0.07 },
  { top: '88%', left: '2%',   rotate: 5,   opacity: 0.06 },
  { top: '85%', right: '3%',  rotate: -8,  opacity: 0.05 },
  // A few in the middle-ish areas (behind content but visible)
  { top: '12%', left: '12%',  rotate: 10,  opacity: 0.04 },
  { top: '50%', right: '12%', rotate: -15, opacity: 0.04 },
  { top: '80%', left: '10%',  rotate: 20,  opacity: 0.04 },
];

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
        @keyframes flicker { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes doodleDrift { 0%,100%{transform:translateY(0) rotate(var(--r))} 50%{transform:translateY(-12px) rotate(calc(var(--r) + 5deg))} }
      `}</style>

      {/* Base gradient */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', background: theme.gradientBg, transition:'background 1s ease' }} />

      {/* Large primary orb — top left */}
      <div style={{ position:'fixed', zIndex:0, pointerEvents:'none', top:'-15%', left:'-10%', width:'55vw', height:'55vw', borderRadius:'50%', background:`radial-gradient(circle at 40% 40%, ${theme.primary}33 0%, ${theme.primary}11 40%, transparent 70%)`, animation:'drift1 14s ease-in-out infinite', filter:'blur(60px)', transition:'background 1s' }} />

      {/* Large accent orb — bottom right */}
      <div style={{ position:'fixed', zIndex:0, pointerEvents:'none', bottom:'-20%', right:'-15%', width:'60vw', height:'60vw', borderRadius:'50%', background:`radial-gradient(circle at 60% 60%, ${theme.accent}22 0%, ${theme.accent}0a 40%, transparent 70%)`, animation:'drift2 18s ease-in-out infinite', filter:'blur(70px)', transition:'background 1s' }} />

      {/* Mid orb */}
      <div style={{ position:'fixed', zIndex:0, pointerEvents:'none', top:'30%', left:'35%', width:'35vw', height:'35vw', borderRadius:'50%', background:`radial-gradient(circle, ${theme.secondary}18 0%, transparent 70%)`, animation:'drift3 22s ease-in-out infinite', filter:'blur(80px)', transition:'background 1s' }} />

      {/* Small bright orb — top right */}
      <div style={{ position:'fixed', zIndex:0, pointerEvents:'none', top:'5%', right:'10%', width:'20vw', height:'20vw', borderRadius:'50%', background:`radial-gradient(circle, ${theme.accent2}28 0%, transparent 70%)`, animation:'drift4 10s ease-in-out infinite', filter:'blur(40px)', transition:'background 1s' }} />

      {/* ── HP DOODLES ── */}
      {POSITIONS.map((pos, i) => {
        const doodle = DOODLES[i % DOODLES.length];
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              zIndex: 0,
              pointerEvents: 'none',
              top: pos.top,
              left: pos.left,
              right: pos.right,
              width: doodle.size,
              height: doodle.size,
              color: theme.accent2,
              opacity: pos.opacity,
              '--r': `${pos.rotate}deg`,
              transform: `rotate(${pos.rotate}deg)`,
              animation: `doodleDrift ${8 + (i % 5) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
              transition: 'color 1s',
              filter: `drop-shadow(0 0 4px ${theme.accent})`,
            }}
          >
            {doodle.svg}
          </div>
        );
      })}

      {/* House-specific particles */}
      {house === 'gryffindor' && [...Array(8)].map((_, i) => (
        <div key={i} style={{ position:'fixed', zIndex:0, pointerEvents:'none', width: i%3===0?3:2, height: i%3===0?3:2, borderRadius:'50%', background: i%2===0?'#ffd700':'#ff6600', top:`${10+i*11}%`, left:`${5+i*12}%`, boxShadow:`0 0 6px ${i%2===0?'#ffd700':'#ff6600'}`, animation:`flicker ${1.5+i*0.3}s ease-in-out infinite`, animationDelay:`${i*0.4}s` }} />
      ))}
      {house === 'ravenclaw' && [...Array(12)].map((_, i) => (
        <div key={i} style={{ position:'fixed', zIndex:0, pointerEvents:'none', width: i%4===0?2:1, height: i%4===0?2:1, borderRadius:'50%', background: i%3===0?'#daa520':'rgba(200,220,255,0.8)', top:`${Math.sin(i*1.3)*40+50}%`, left:`${(i*8.5)%100}%`, boxShadow:`0 0 4px ${i%3===0?'#daa520':'rgba(200,220,255,0.8)'}`, animation:`flicker ${2+i*0.25}s ease-in-out infinite`, animationDelay:`${i*0.3}s` }} />
      ))}
      {house === 'hufflepuff' && [...Array(8)].map((_, i) => (
        <div key={i} style={{ position:'fixed', zIndex:0, pointerEvents:'none', width: i%2===0?4:2, height: i%2===0?4:2, borderRadius:'50%', background: i%2===0?'rgba(255,204,0,0.7)':'rgba(255,180,0,0.5)', top:`${15+i*10}%`, left:`${8+i*11}%`, boxShadow:'0 0 8px rgba(255,204,0,0.6)', animation:`drift1 ${6+i*1.5}s ease-in-out infinite`, animationDelay:`${i*0.6}s`, filter:'blur(1px)' }} />
      ))}
      {house === 'slytherin' && [...Array(5)].map((_, i) => (
        <div key={i} style={{ position:'fixed', zIndex:0, pointerEvents:'none', width:'100vw', height:1, background:`linear-gradient(90deg, transparent, rgba(26,122,64,${0.05+i*0.02}), transparent)`, top:`${20+i*15}%`, animation:`drift3 ${8+i*2}s ease-in-out infinite`, animationDelay:`${i*1.2}s` }} />
      ))}
    </>
  );
}
