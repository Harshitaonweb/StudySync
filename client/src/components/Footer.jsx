export default function Footer() {
  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      right: 24,
      zIndex: 50,
      pointerEvents: 'none',
      fontFamily: 'Cinzel Decorative, Cinzel, serif',
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--accent2)',
      textShadow: '0 0 12px var(--glow-accent), 0 0 24px var(--glow)',
      opacity: 0.75,
    }}>
      ✦ Harshita
    </div>
  );
}
