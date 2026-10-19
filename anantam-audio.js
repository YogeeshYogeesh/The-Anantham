/* =====================================================================
   ANANTAM AUDIO ENGINE
   - Re-uses your existing magical-theme.mp3 as the main score.
   - Every other sound (awakening, Nandhan, Vritra thunder, relic chimes,
     gate) is SYNTHESISED with the Web Audio API, so no new audio files
     are required and everything works offline.
   - Nothing plays until the visitor interacts (browser autoplay rules).
   - Mute, music volume, effects volume and smooth scene-to-scene
     crossfades are provided.
   Optional: drop your own files into /audio and call
   AnantamAudio.registerFile('name', 'audio/file.mp3') to override a synth.
   ===================================================================== */
(function () {
  'use strict';

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  const state = {
    muted: store.get('anantamMuted', false) === true,
    music: clamp(Number(store.get('anantamMusicVol', 0.5)), 0, 1),
    sfx: clamp(Number(store.get('anantamSfxVol', 0.7)), 0, 1),
    theme: null,
    musicWanted: false
  };

  function clamp(n, a, b) { return Math.min(b, Math.max(a, isFinite(n) ? n : a)); }

  let ctx = null, master = null, sfxBus = null, padBus = null, noiseBuf = null;
  let mp3 = null, mp3Duck = 1, mp3Fade = null;
  const overrides = {};
  const listeners = [];

  // ---------------------------------------------------------------- context
  function ensureContext() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch (e) { return null; }
    master = ctx.createGain();
    master.gain.value = state.muted ? 0 : 1;
    master.connect(ctx.destination);
    sfxBus = ctx.createGain();
    sfxBus.gain.value = state.sfx;
    sfxBus.connect(master);
    padBus = ctx.createGain();
    padBus.gain.value = state.music * 0.5;
    padBus.connect(master);
    // 2 seconds of brown-ish noise reused for thunder, rumble and whooshes
    const len = ctx.sampleRate * 2;
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = (last * 3.5 + w * 0.25);
    }
    return ctx;
  }

  function unlock() {
    gestured = gestured || (window.event && /^(click|pointerdown|keydown|touchstart|pointerup)$/.test(window.event.type));
    const c = ensureContext();
    if (c && c.state === 'suspended') c.resume().catch(() => {});
    return c;
  }

  // ----------------------------------------------------------- low-level
  function env(g, t0, attack, hold, release, peak) {
    g.gain.cancelScheduledValues(t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + attack);
    g.gain.setValueAtTime(Math.max(0.0002, peak), t0 + attack + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + hold + release);
  }

  function tone(o) {
    const c = ctx; if (!c) return null;
    const t0 = c.currentTime + (o.delay || 0);
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.f, t0);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t0 + (o.glide || o.dur || 1));
    if (o.detune) osc.detune.value = o.detune;
    env(g, t0, o.attack || 0.01, o.hold || 0, o.release || o.dur || 0.6, o.vol || 0.2);
    let out = g;
    if (o.pan && c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = o.pan; g.connect(p); out = p; }
    osc.connect(g);
    out.connect(o.dest || sfxBus);
    osc.start(t0);
    osc.stop(t0 + (o.attack || 0.01) + (o.hold || 0) + (o.release || o.dur || 0.6) + 0.1);
    return osc;
  }

  function noise(o) {
    const c = ctx; if (!c) return;
    const t0 = c.currentTime + (o.delay || 0);
    const src = c.createBufferSource();
    src.buffer = noiseBuf; src.loop = true;
    const f = c.createBiquadFilter();
    f.type = o.filter || 'lowpass';
    f.frequency.setValueAtTime(o.f0 || 400, t0);
    if (o.f1) f.frequency.exponentialRampToValueAtTime(o.f1, t0 + (o.dur || 1));
    f.Q.value = o.q || 0.7;
    const g = c.createGain();
    env(g, t0, o.attack || 0.01, o.hold || 0, o.release || 0.6, o.vol || 0.3);
    src.connect(f); f.connect(g); g.connect(o.dest || sfxBus);
    src.start(t0, Math.random() * 1.2);
    src.stop(t0 + (o.attack || 0.01) + (o.hold || 0) + (o.release || 0.6) + 0.1);
  }

  const N = { // handy pitches (Hz)
    D3: 146.83, A3: 220, C4: 261.63, D4: 293.66, E4: 329.63, G4: 392, A4: 440, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5
  };

  // ------------------------------------------------------------- effects
  const sfxLib = {
    click() { tone({ f: 880, to: 660, dur: 0.12, release: 0.12, vol: 0.08, type: 'triangle' }); },
    hover() { tone({ f: 1320, dur: 0.18, release: 0.18, vol: 0.035 }); },
    denied() { tone({ f: 190, to: 130, dur: 0.35, release: 0.3, vol: 0.12, type: 'triangle' }); },
    pulse() {
      tone({ f: 330, to: 660, dur: 0.5, release: 0.5, vol: 0.12 });
      tone({ f: 990, dur: 0.7, release: 0.7, vol: 0.06, delay: 0.05 });
    },
    whoosh() { noise({ filter: 'bandpass', f0: 300, f1: 2400, dur: 0.7, attack: 0.15, release: 0.5, vol: 0.12, q: 1.2 }); },
    chime() {
      [N.E5, N.A5, N.E6].forEach((f, i) => tone({ f, delay: i * 0.11, dur: 1.4, release: 1.4, vol: 0.1 }));
    },
    discover() {
      [N.G4, N.C5, N.E5, N.G5].forEach((f, i) => tone({ f, delay: i * 0.12, dur: 1.2, release: 1.2, vol: 0.1, type: 'triangle' }));
      noise({ filter: 'highpass', f0: 5000, dur: 0.8, attack: 0.05, release: 0.8, vol: 0.03, delay: 0.1 });
    },
    collect() {
      [N.C5, N.E5, N.G5, N.C6, N.E6].forEach((f, i) => tone({ f, delay: i * 0.075, dur: 0.9, release: 0.9, vol: 0.09 }));
      tone({ f: 130.8, dur: 1.2, release: 1.2, vol: 0.1, type: 'triangle' });
      noise({ filter: 'highpass', f0: 6000, dur: 1, attack: 0.02, release: 0.9, vol: 0.035 });
    },
    crystalDull(freq) { tone({ f: freq || 262, dur: 0.5, release: 0.5, vol: 0.09, type: 'triangle' }); },
    crystal(freq) {
      const f = freq || N.A5;
      tone({ f, dur: 2, release: 2, vol: 0.1 });
      tone({ f: f * 2.01, dur: 1.4, release: 1.4, vol: 0.04 });
    },
    awaken() {
      // distant, rising swell -> flash boom
      tone({ f: 60, to: 180, glide: 3, dur: 3.6, attack: 2.4, release: 1.2, vol: 0.22, type: 'sawtooth' });
      tone({ f: 220, to: 880, glide: 3, dur: 3.4, attack: 2.6, release: 0.9, vol: 0.08 });
      noise({ filter: 'bandpass', f0: 200, f1: 3000, dur: 3, attack: 2.6, release: 0.6, vol: 0.18, q: 0.8 });
      tone({ f: 70, to: 34, glide: 2.2, delay: 3.1, dur: 2.4, attack: 0.02, release: 2.2, vol: 0.5 });
      [N.A4, N.E5, N.A5, N.E6].forEach((f, i) => tone({ f, delay: 3.1 + i * 0.05, dur: 3.2, release: 3.2, vol: 0.09 }));
      noise({ filter: 'highpass', f0: 3000, delay: 3.1, dur: 1.2, attack: 0.01, release: 1.2, vol: 0.12 });
    },
    nandhan() {
      [N.G4, N.D4 * 2 / 2, N.B4, N.D5, N.G5].forEach((f, i) => tone({ f, delay: i * 0.18, dur: 2.6, release: 2.6, attack: 0.05, vol: 0.075, type: 'triangle' }));
      tone({ f: 98, dur: 3, release: 3, attack: 0.3, vol: 0.1, type: 'sine' });
    },
    thunder() {
      noise({ filter: 'highpass', f0: 1800, dur: 0.18, attack: 0.005, release: 0.15, vol: 0.5 });
      noise({ filter: 'lowpass', f0: 420, f1: 60, dur: 3.2, attack: 0.04, hold: 0.25, release: 3, vol: 0.9, delay: 0.05 });
      tone({ f: 48, to: 30, dur: 2.5, release: 2.4, attack: 0.05, vol: 0.5, delay: 0.1 });
    },
    vritra() {
      sfxLib.thunder();
      tone({ f: 55, to: 41, dur: 4.5, attack: 0.8, release: 3.5, vol: 0.28, type: 'sawtooth', delay: 0.3 });
      tone({ f: 58.3, to: 44, dur: 4.5, attack: 0.8, release: 3.5, vol: 0.2, type: 'sawtooth', delay: 0.3 });
      tone({ f: 277, to: 233, dur: 3, attack: 0.5, release: 2.4, vol: 0.05, type: 'square', delay: 0.6 });
    },
    gate() {
      noise({ filter: 'lowpass', f0: 160, f1: 90, dur: 4.2, attack: 0.3, hold: 2.2, release: 1.6, vol: 0.8 });
      tone({ f: 55, dur: 5, attack: 0.5, release: 4, vol: 0.3, type: 'sine' });
      [N.D3, N.A3, N.D4, N.D4 * 1.26, N.A4, N.D5].forEach((f, i) => tone({ f, delay: 1.2 + i * 0.22, dur: 4.5, attack: 0.9, release: 3.5, vol: 0.07, type: 'triangle', detune: i % 2 ? 6 : -6 }));
      [N.E5, N.A5, N.C6, N.E6].forEach((f, i) => tone({ f, delay: 3 + i * 0.16, dur: 3, release: 3, vol: 0.06 }));
    },
    socket() { tone({ f: 196, to: 98, dur: 0.5, release: 0.5, vol: 0.2, type: 'triangle' }); tone({ f: N.E5, delay: 0.05, dur: 1.2, release: 1.2, vol: 0.07 }); },
    page() { noise({ filter: 'bandpass', f0: 1800, f1: 900, dur: 0.25, attack: 0.02, release: 0.2, vol: 0.06, q: 0.6 }); }
  };

  let gestured = false;
  function sfx(name, arg) {
    if (state.muted || !gestured) return;            // never before a user gesture
    if (overrides[name]) { playFile(overrides[name]); return; }
    const c = unlock(); if (!c || !sfxLib[name]) return;
    const run = () => { try { sfxLib[name](arg); } catch (e) { /* never let audio break the story */ } };
    if (c.state === 'running') run(); else c.resume().then(run).catch(() => {});
  }

  function playFile(url) {
    try { const a = new Audio(url); a.volume = state.sfx; a.play().catch(() => {}); } catch (e) { /* ignore */ }
  }

  // --------------------------------------------------------- scene themes
  const themes = {
    opening:   { notes: [110, 164.8, 261.6],           wave: 'sine',     cutoff: 700,  gain: 0.05, duck: 1 },
    calm:      { notes: [146.8, 220, 349.2, 440],      wave: 'sine',     cutoff: 900,  gain: 0.04, duck: 1 },
    awakening: { notes: [73.4, 110, 220, 329.6],       wave: 'triangle', cutoff: 1400, gain: 0.07, duck: 0.55 },
    nandhan:   { notes: [196, 246.9, 293.7, 392],      wave: 'triangle', cutoff: 1600, gain: 0.05, duck: 1 },
    vritra:    { notes: [55, 58.3, 77.8, 110],         wave: 'sawtooth', cutoff: 320,  gain: 0.07, duck: 0.2 },
    relic:     { notes: [196, 261.6, 329.6, 392, 523], wave: 'sine',     cutoff: 1800, gain: 0.04, duck: 0.9 },
    gate:      { notes: [146.8, 220, 293.7, 370, 440], wave: 'triangle', cutoff: 1500, gain: 0.06, duck: 0.8 },
    dawn:      { notes: [130.8, 196, 261.6, 329.6],    wave: 'sine',     cutoff: 1600, gain: 0.05, duck: 1 }
  };
  let pad = null;

  function setTheme(name) {
    if (!themes[name] || state.theme === name) return;
    state.theme = name;
    const th = themes[name];
    setDuck(th.duck);
    if (!ensureContext() || ctx.state === 'suspended') return; // synth pad starts after the first gesture
    startPad(th);
  }

  function startPad(th) {
    const c = ctx, t = c.currentTime;
    if (pad) { // fade the previous pad out smoothly
      const old = pad;
      old.gain.gain.cancelScheduledValues(t);
      old.gain.gain.setValueAtTime(old.gain.gain.value, t);
      old.gain.gain.linearRampToValueAtTime(0.0001, t + 2);
      setTimeout(() => { old.oscs.forEach(o => { try { o.stop(); } catch (e) {} }); try { old.gain.disconnect(); } catch (e) {} }, 2300);
    }
    const g = c.createGain(); g.gain.value = 0.0001;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = th.cutoff; f.Q.value = 0.6;
    const lfo = c.createOscillator(), lfoGain = c.createGain();
    lfo.frequency.value = 0.12 + Math.random() * 0.1; lfoGain.gain.value = th.cutoff * 0.25;
    lfo.connect(lfoGain); lfoGain.connect(f.frequency); lfo.start();
    const oscs = [lfo];
    th.notes.forEach((n, i) => {
      [-5, 5].forEach(det => {
        const o = c.createOscillator(); o.type = th.wave; o.frequency.value = n; o.detune.value = det + i;
        const og = c.createGain(); og.gain.value = 1 / (th.notes.length * 2);
        o.connect(og); og.connect(f); o.start(); oscs.push(o);
      });
    });
    f.connect(g); g.connect(padBus);
    g.gain.linearRampToValueAtTime(th.gain * 4, t + 2.2);
    pad = { gain: g, oscs };
  }

  function setDuck(target) {
    const from = mp3Duck, steps = 30; let i = 0;
    clearInterval(mp3Fade);
    mp3Fade = setInterval(() => {
      i++; mp3Duck = from + (target - from) * (i / steps); applyMp3Volume();
      if (i >= steps) clearInterval(mp3Fade);
    }, 60);
  }

  // ---------------------------------------------------------------- music
  function applyMp3Volume() {
    if (!mp3) return;
    mp3.volume = clamp(state.music * 0.6 * mp3Duck, 0, 1);
    mp3.muted = state.muted;
  }

  function ensureMp3() {
    if (mp3) return mp3;
    mp3 = new Audio('magical-theme.mp3');
    mp3.loop = true; mp3.preload = 'auto';
    mp3.addEventListener('error', () => {
      console.warn('[Anantam audio] magical-theme.mp3 could not be loaded. Place it beside index.html.');
      emit();
    });
    mp3.addEventListener('play', emit);
    mp3.addEventListener('pause', emit);
    applyMp3Volume();
    return mp3;
  }

  function startMusic() {
    state.musicWanted = true;
    unlock();
    const a = ensureMp3();
    a.volume = 0;
    const p = a.play();
    if (p && p.catch) p.catch(err => { console.warn('[Anantam audio] Music could not start:', err && err.message); });
    // gentle fade-in
    let i = 0; const target = state.music * 0.6 * mp3Duck;
    const iv = setInterval(() => { i++; a.volume = clamp(target * (i / 20), 0, 1); if (i >= 20) { clearInterval(iv); applyMp3Volume(); } }, 80);
    if (state.theme && ctx) { const th = themes[state.theme]; if (th && !pad) startPad(th); }
    emit();
  }

  function stopMusic() {
    state.musicWanted = false;
    if (mp3 && !mp3.paused) {
      let i = 0; const from = mp3.volume;
      const iv = setInterval(() => { i++; mp3.volume = clamp(from * (1 - i / 10), 0, 1); if (i >= 10) { clearInterval(iv); mp3.pause(); applyMp3Volume(); } }, 50);
    }
    emit();
  }

  function isMusicPlaying() { return !!(mp3 && !mp3.paused); }

  // ------------------------------------------------------------ controls
  function setMuted(m) {
    state.muted = !!m; store.set('anantamMuted', state.muted);
    if (master) master.gain.setTargetAtTime(state.muted ? 0 : 1, ctx.currentTime, 0.05);
    applyMp3Volume();
    if (state.muted && 'speechSynthesis' in window) { try { speechSynthesis.cancel(); } catch (e) {} }
    emit();
  }
  function setMusicVolume(v) {
    state.music = clamp(v, 0, 1); store.set('anantamMusicVol', state.music);
    if (padBus) padBus.gain.setTargetAtTime(state.music * 0.5, ctx.currentTime, 0.05);
    applyMp3Volume(); emit();
  }
  function setSfxVolume(v) {
    state.sfx = clamp(v, 0, 1); store.set('anantamSfxVol', state.sfx);
    if (sfxBus) sfxBus.gain.setTargetAtTime(state.sfx, ctx.currentTime, 0.05);
    emit();
  }

  function onChange(fn) { listeners.push(fn); }
  function emit() { listeners.forEach(fn => { try { fn(api); } catch (e) {} }); }

  // Browsers only allow audio after a gesture: unlock on the first one.
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
    window.addEventListener(ev, function once() {
      gestured = true; unlock();
      if (state.theme && ctx && !pad) startPad(themes[state.theme]);
      window.removeEventListener(ev, once);
    }, { passive: true }));

  // The legacy header button (#musicBtn) is handed over to this engine.
  function bindMusicButton(btn) {
    if (!btn) return;
    const paint = () => {
      btn.textContent = isMusicPlaying() ? '⏸️ Pause music' : '🎵 Play music';
      btn.setAttribute('aria-pressed', String(isMusicPlaying()));
    };
    btn.addEventListener('click', () => { if (isMusicPlaying()) stopMusic(); else startMusic(); });
    onChange(paint); paint();
  }

  const api = {
    state, unlock, sfx, setTheme, startMusic, stopMusic, isMusicPlaying,
    setMuted, setMusicVolume, setSfxVolume, onChange, bindMusicButton,
    get muted() { return state.muted; },
    registerFile(name, url) { overrides[name] = url; },
    themes: Object.keys(themes)
  };
  window.AnantamAudio = api;
})();
