/**
 * Web Audio API synthesizer for Birthday Melody & Sound Effects
 * Safe, zero-network-dependency, instant, romantic soundscapes.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingBgm: boolean = false;
  private bgmTimeoutId: number | null = null;
  private currentNoteIndex: number = 0;

  // Melodies for different songs
  private readonly melodies: Record<string, { note: number; dur: number; pause: number }[]> = {
    'hen-em-duoi-phao-hoa': [
      // Romantic ballad in F major / D minor
      { note: 349.23, dur: 0.5, pause: 0.1 }, // F4
      { note: 392.00, dur: 0.5, pause: 0.1 }, // G4
      { note: 440.00, dur: 0.8, pause: 0.2 }, // A4
      { note: 523.25, dur: 0.8, pause: 0.2 }, // C5
      { note: 440.00, dur: 0.6, pause: 0.15 }, // A4
      { note: 392.00, dur: 0.9, pause: 0.3 }, // G4
      { note: 329.63, dur: 0.5, pause: 0.1 }, // E4
      { note: 349.23, dur: 0.5, pause: 0.1 }, // F4
      { note: 392.00, dur: 0.8, pause: 0.2 }, // G4
      { note: 440.00, dur: 1.2, pause: 0.4 }, // A4
      { note: 293.66, dur: 0.6, pause: 0.15 }, // D4
      { note: 349.23, dur: 0.6, pause: 0.15 }, // F4
      { note: 392.00, dur: 0.8, pause: 0.2 }, // G4
      { note: 349.23, dur: 1.4, pause: 0.5 }, // F4
    ],
    'xuan-ha-thu-dong': [
      // Gentle 4-season waltz
      { note: 261.63, dur: 0.4, pause: 0.1 }, // C4
      { note: 329.63, dur: 0.4, pause: 0.1 }, // E4
      { note: 392.00, dur: 0.6, pause: 0.2 }, // G4
      { note: 440.00, dur: 0.6, pause: 0.2 }, // A4
      { note: 392.00, dur: 0.8, pause: 0.2 }, // G4
      { note: 329.63, dur: 0.5, pause: 0.1 }, // E4
      { note: 293.66, dur: 0.5, pause: 0.1 }, // D4
      { note: 349.23, dur: 0.6, pause: 0.15 }, // F4
      { note: 329.63, dur: 0.6, pause: 0.15 }, // E4
      { note: 261.63, dur: 1.2, pause: 0.4 }, // C4
    ],
    'day-toi-cach-yeu': [
      // Deep emotional piano chime
      { note: 220.00, dur: 0.6, pause: 0.15 }, // A3
      { note: 261.63, dur: 0.6, pause: 0.15 }, // C4
      { note: 329.63, dur: 0.8, pause: 0.2 }, // E4
      { note: 392.00, dur: 0.8, pause: 0.2 }, // G4
      { note: 349.23, dur: 0.6, pause: 0.15 }, // F4
      { note: 329.63, dur: 0.6, pause: 0.15 }, // E4
      { note: 293.66, dur: 1.2, pause: 0.3 }, // D4
      { note: 261.63, dur: 0.6, pause: 0.15 }, // C4
      { note: 329.63, dur: 0.6, pause: 0.15 }, // E4
      { note: 261.63, dur: 1.4, pause: 0.5 }, // C4
    ],
    'the-gioi-mat-di-nguoi-co-don': [
      // Indie romantic ballad
      { note: 261.63, dur: 0.5, pause: 0.1 }, // C4
      { note: 293.66, dur: 0.5, pause: 0.1 }, // D4
      { note: 329.63, dur: 0.7, pause: 0.2 }, // E4
      { note: 392.00, dur: 0.7, pause: 0.2 }, // G4
      { note: 523.25, dur: 0.9, pause: 0.25 }, // C5
      { note: 440.00, dur: 0.7, pause: 0.2 }, // A4
      { note: 392.00, dur: 1.3, pause: 0.4 }, // G4
    ],
    'bao-loi-con-chua-noi': [
      // Warm, affectionate, grateful melody
      { note: 261.63, dur: 0.6, pause: 0.2 }, // C4
      { note: 329.63, dur: 0.6, pause: 0.2 }, // E4
      { note: 392.00, dur: 0.8, pause: 0.2 }, // G4
      { note: 440.00, dur: 0.8, pause: 0.2 }, // A4
      { note: 392.00, dur: 0.7, pause: 0.2 }, // G4
      { note: 329.63, dur: 0.7, pause: 0.2 }, // E4
      { note: 293.66, dur: 0.8, pause: 0.2 }, // D4
      { note: 261.63, dur: 1.5, pause: 0.6 }, // C4
    ],
    'the-gioi-cua-anh': [
      // Sweet & dreamy melody
      { note: 329.63, dur: 0.5, pause: 0.1 }, // E4
      { note: 392.00, dur: 0.5, pause: 0.1 }, // G4
      { note: 440.00, dur: 0.7, pause: 0.15 }, // A4
      { note: 523.25, dur: 0.8, pause: 0.2 }, // C5
      { note: 440.00, dur: 0.6, pause: 0.15 }, // A4
      { note: 392.00, dur: 0.6, pause: 0.15 }, // G4
      { note: 349.23, dur: 0.8, pause: 0.2 }, // F4
      { note: 329.63, dur: 1.3, pause: 0.5 }, // E4
    ],
    'happy-birthday-acoustic': [
      { note: 261.63, dur: 0.35, pause: 0.1 }, // Hap-
      { note: 261.63, dur: 0.25, pause: 0.1 }, // py
      { note: 293.66, dur: 0.6, pause: 0.1 },  // Birth-
      { note: 261.63, dur: 0.6, pause: 0.1 },  // day
      { note: 349.23, dur: 0.6, pause: 0.1 },  // to
      { note: 329.63, dur: 1.0, pause: 0.3 },  // you~

      { note: 261.63, dur: 0.35, pause: 0.1 }, // Hap-
      { note: 261.63, dur: 0.25, pause: 0.1 }, // py
      { note: 293.66, dur: 0.6, pause: 0.1 },  // Birth-
      { note: 261.63, dur: 0.6, pause: 0.1 },  // day
      { note: 392.00, dur: 0.6, pause: 0.1 },  // to
      { note: 349.23, dur: 1.0, pause: 0.3 },  // you~

      { note: 261.63, dur: 0.35, pause: 0.1 }, // Hap-
      { note: 261.63, dur: 0.25, pause: 0.1 }, // py
      { note: 523.25, dur: 0.6, pause: 0.1 },  // Birth- (High C)
      { note: 440.00, dur: 0.6, pause: 0.1 },  // day
      { note: 349.23, dur: 0.6, pause: 0.1 },  // dear
      { note: 329.63, dur: 0.6, pause: 0.1 },  // beau-
      { note: 293.66, dur: 0.8, pause: 0.3 },  // ty~

      { note: 466.16, dur: 0.35, pause: 0.1 }, // Hap- (Bb4)
      { note: 466.16, dur: 0.25, pause: 0.1 }, // py
      { note: 440.00, dur: 0.6, pause: 0.1 },  // Birth-
      { note: 349.23, dur: 0.6, pause: 0.1 },  // day
      { note: 392.00, dur: 0.6, pause: 0.1 },  // to
      { note: 349.23, dur: 1.4, pause: 0.8 },  // you~~~
    ],
  };

  private activeSongId: string = 'hen-em-duoi-phao-hoa';

  private get melody(): { note: number; dur: number; pause: number }[] {
    return this.melodies[this.activeSongId] || this.melodies['hen-em-duoi-phao-hoa'] || this.melodies['happy-birthday-acoustic'];
  }

  public getActiveSongId(): string {
    return this.activeSongId;
  }

  public setActiveSongId(songId: string, onLyricProgress?: (progressSec: number) => void) {
    this.activeSongId = songId;
    this.currentNoteIndex = 0;
    if (this.isPlayingBgm) {
      if (this.bgmTimeoutId !== null) {
        clearTimeout(this.bgmTimeoutId);
        this.bgmTimeoutId = null;
      }
      this.playNextBgmNote(onLyricProgress);
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBgm();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Romantic music box tone with gentle sine + triangle harmonic and decay
  public playMusicBoxNote(freq: number, duration: number = 0.5, volume: number = 0.15) {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft sine & warm triangle
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now); // 1 octave above sparkle

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.4);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration + 0.5);
      osc2.stop(now + duration + 0.5);
    } catch {
      // Audio context may be waiting for user gesture
    }
  }

  // Play romantic chime sequence
  public playSparkleChime() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playMusicBoxNote(freq, 0.4, 0.1);
      }, idx * 70);
    });
  }

  // Gentle firework explosion sound
  public playFireworkBurst() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // White noise buffer for firework whoosh/crackle
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.4);

      // Low thump
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.2);

      oscGain.gain.setValueAtTime(0.2, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio might be waiting
    }
  }

  // Candle blowing sound
  public playBlowCandle() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.5);
    } catch {
      // ignore
    }
  }

  // Correct answer ding
  public playSuccessDing() {
    if (this.isMuted) return;
    this.playMusicBoxNote(523.25, 0.3, 0.15); // C5
    setTimeout(() => {
      this.playMusicBoxNote(659.25, 0.4, 0.15); // E5
    }, 120);
    setTimeout(() => {
      this.playMusicBoxNote(783.99, 0.6, 0.18); // G5
    }, 240);
  }

  // Start continuous Happy Birthday acoustic music box loop
  public startBgm(onLyricProgress?: (progressSec: number) => void) {
    if (this.isPlayingBgm) return;
    this.isPlayingBgm = true;
    this.currentNoteIndex = 0;
    this.playNextBgmNote(onLyricProgress);
  }

  private playNextBgmNote(onLyricProgress?: (progressSec: number) => void) {
    if (!this.isPlayingBgm) return;

    const noteObj = this.melody[this.currentNoteIndex];
    this.playMusicBoxNote(noteObj.note, noteObj.dur, 0.2);

    // Calculate approx time in seconds for lyrics tracking
    if (onLyricProgress) {
      const estimatedSec = (this.currentNoteIndex / this.melody.length) * 30;
      onLyricProgress(estimatedSec);
    }

    const totalDelay = (noteObj.dur + noteObj.pause) * 1000;
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

    this.bgmTimeoutId = window.setTimeout(() => {
      this.playNextBgmNote(onLyricProgress);
    }, totalDelay);
  }

  public stopBgm() {
    this.isPlayingBgm = false;
    if (this.bgmTimeoutId !== null) {
      clearTimeout(this.bgmTimeoutId);
      this.bgmTimeoutId = null;
    }
  }

  public toggleBgm(onLyricProgress?: (progressSec: number) => void): boolean {
    if (this.isPlayingBgm) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm(onLyricProgress);
      return true;
    }
  }

  public isBgmActive(): boolean {
    return this.isPlayingBgm;
  }
}

export const soundEngine = new SoundEngine();
