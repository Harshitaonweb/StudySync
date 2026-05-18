import { useHouse } from '../context/HouseContext';

export default function HouseBackground() {
  const { theme } = useHouse();
  if (!theme) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: theme.gradientBg,
      transition: 'background 0.8s ease',
    }}>
      {/* Animated corner glows */}
      <div style={{
        position: 'absolute', top: -100, left: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
        animation: 'bgFloat1 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, right: -100,
        width: 500, height: 500, borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.glowAccent} 0%, transparent 70%)`,
        animation: 'bgFloat2 10s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes bgFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,20px)} }
        @keyframes bgFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-30px)} }
      `}</style>
    </div>
  );
}
