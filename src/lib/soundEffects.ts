// Generate soft melodic sound effects using Web Audio API
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
