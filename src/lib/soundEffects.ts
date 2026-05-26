// Generate soft melodic sound effects using Web Audio API

const getCtx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

export const playReveal = () => {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const notes = [392, 523, 659, 880];
    notes.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      o.connect(g); g.connect(ctx.destination);
      const t = now + i * 0.06;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.09, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      o.start(t); o.stop(t + 0.5);
    });
  } catch {}
};

export const playSwipe = () => {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(660, now);
    o.frequency.exponentialRampToValueAtTime(220, now + 0.18);
    o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.06, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    o.start(now); o.stop(now + 0.22);
  } catch {}
};

export const playReaction = (kind: 'like' | 'fire' | 'skip' | 'wild') => {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const map: Record<string, number[]> = {
      like: [523, 784],
      fire: [392, 587, 784],
      skip: [440, 330],
      wild: [330, 494, 740],
    };
    map[kind].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      o.connect(g); g.connect(ctx.destination);
      const t = now + i * 0.05;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.08, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.start(t); o.stop(t + 0.3);
    });
  } catch {}
};

export const playClickSound = (type: 'block' | 'modal' = 'block') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    if (type === 'block') {
      // Warm chime for block selection
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioContext.destination);

      osc1.frequency.setValueAtTime(587, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(440, now + 0.12); // A4

      osc2.frequency.setValueAtTime(880, now); // A5 harmonic
      osc2.frequency.exponentialRampToValueAtTime(660, now + 0.12);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.15);
      osc2.stop(now + 0.15);
    } else if (type === 'modal') {
      // Gentle two-note descending chime for modal
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.frequency.setValueAtTime(784, now); // G5
      osc.frequency.setValueAtTime(659, now + 0.08); // E5

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    // Silently fail if audio context isn't available
    console.debug('Audio context unavailable');
  }
};
