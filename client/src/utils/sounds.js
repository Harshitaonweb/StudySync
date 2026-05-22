// Magical sound effects using Web Audio API — no external files needed

let ctx = null;

const getCtx = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
};

// Soft magical chime — for hover
export const playHover = () => {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ac.currentTime + 0.08);
    gain.gain.setValueAtTime(0.04, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.15);
  } catch {}
};

// Wand sparkle — for button clicks
export const playClick = () => {
  try {
    const ac = getCtx();
    // Layer 1 — bright sparkle
    const osc1 = ac.createOscillator();
    const gain1 = ac.createGain();
    osc1.connect(gain1);
    gain1.connect(ac.destination);
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1400, ac.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(600, ac.currentTime + 0.25);
    gain1.gain.setValueAtTime(0.12, ac.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.25);
    osc1.start(ac.currentTime);
    osc1.stop(ac.currentTime + 0.25);

    // Layer 2 — harmonic shimmer
    const osc2 = ac.createOscillator();
    const gain2 = ac.createGain();
    osc2.connect(gain2);
    gain2.connect(ac.destination);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(2100, ac.currentTime + 0.02);
    osc2.frequency.exponentialRampToValueAtTime(900, ac.currentTime + 0.2);
    gain2.gain.setValueAtTime(0.06, ac.currentTime + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
    osc2.start(ac.currentTime + 0.02);
    osc2.stop(ac.currentTime + 0.2);
  } catch {}
};

// Magical success — for form submits / saves
export const playSuccess = () => {
  try {
    const ac = getCtx();
    const notes = [523, 659, 784, 1047]; // C E G C — major chord arpeggio
    notes.forEach((freq, i) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'sine';
      const t = ac.currentTime + i * 0.08;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  } catch {}
};

// Dark spell — for delete / danger actions
export const playDanger = () => {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ac.currentTime + 0.3);
    gain.gain.setValueAtTime(0.08, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.3);
  } catch {}
};

// Sorting hat reveal — deep magical boom
export const playSorting = () => {
  try {
    const ac = getCtx();
    // Deep resonant tone
    const osc1 = ac.createOscillator();
    const gain1 = ac.createGain();
    osc1.connect(gain1);
    gain1.connect(ac.destination);
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, ac.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(220, ac.currentTime + 0.4);
    gain1.gain.setValueAtTime(0.15, ac.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.8);
    osc1.start(ac.currentTime);
    osc1.stop(ac.currentTime + 0.8);

    // Sparkle cascade
    [800, 1000, 1200, 1500, 1800].forEach((freq, i) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'sine';
      const t = ac.currentTime + 0.1 + i * 0.06;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  } catch {}
};
