// Generate soft click sound effects using Web Audio API
export const playClickSound = (type: 'block' | 'modal' = 'block') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    if (type === 'block') {
      // Soft click for block selection
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.1);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'modal') {
      // Softer, more melodic sound for modal close
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    // Silently fail if audio context isn't available
    console.debug('Audio context unavailable');
  }
};
