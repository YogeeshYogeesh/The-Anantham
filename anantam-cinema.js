/* =====================================================================
   ANANTAM CINEMA LAYER
   Additive on top of script.js. It never rewrites your story data; it
   listens for scene changes ("anantam:scene") and directs:
     - the cinematic opening and skip control
     - Navya's living rig (5 real expression images, idle motion, glows)
     - the parallax world, atmospheres and particle canvas
     - the Awakening, Nandhan and Vritra sequences
     - line-by-line dialogue, subtitles, interactive magical objects
     - the sound panel (mute / music / effects volume)
   Everything is transform/opacity based and respects reduced motion.
   ===================================================================== */
(function () {
  'use strict';
  if (window.__anantamCinemaInit) return;
  window.__anantamCinemaInit = true;

  const $ = id => document.getElementById(id);
  const Au = () => window.AnantamAudio || { sfx() {}, setTheme() {}, startMusic() {}, isMusicPlaying: () => false, state: {}, onChange() {} };
  const Art = () => window.AnantamArt;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  const mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false, addEventListener() {} };
  let calm = mqReduce.matches || store.get('anantamCalmFx', false) === true;
  const small = () => window.innerWidth < 760;
  const rnd = (a, b) => a + Math.random() * (b - a);

  // ------------------------------------------------------------ config
  const EXPR = {
    curious:    { src: 'navya-curious.webp',    ar: 541 / 900, h: 1,    gems: [[36.5, 3.5, 'crown'], [33, 27.5, 'ear'], [58, 22.5, 'ear'], [90, 24, 'wand']] },
    praying:    { src: 'navya-praying.webp',    ar: 377 / 700, h: 0.99, gems: [[51, 4, 'crown'], [31, 32, 'ear'], [68, 31.5, 'ear']] },
    loving:     { src: 'navya-loving.webp',     ar: 362 / 700, h: 0.99, gems: [[50, 3.5, 'crown'], [32.3, 31, 'ear'], [69.6, 31, 'ear']] },
    frightened: { src: 'navya-frightened.webp', ar: 398 / 700, h: 0.99, gems: [[47, 4, 'crown'], [35.6, 33.5, 'ear']] },
    determined: { src: 'navya-determined.webp', ar: 412 / 700, h: 0.99, gems: [[54, 4.5, 'crown'], [39, 32, 'ear'], [72, 32.5, 'ear']] }
  };

  // Scene plan: atmosphere, music theme, Navya expression and stage content
  // for each chapter in script.js. Story text itself is untouched.
  const PLAN = [
    { mood: 'awaken', theme: 'opening',   expr: 'curious',    stage: 'orb',       halo: 'cyan',   objs: false },
    { mood: 'night',  theme: 'calm',      expr: 'curious',    stage: 'reference', halo: 'lav',    objs: false },
    { mood: 'vritra', theme: 'vritra',    expr: 'frightened', stage: 'vritra',    halo: 'red',    objs: true  },
    { mood: 'sunset', theme: 'nandhan',   expr: 'loving',     stage: 'nandhan',   halo: 'gold',   objs: true  },
    { mood: 'night',  theme: 'relic',     expr: 'determined', stage: 'relics',    halo: 'cyan',   objs: true  },
    { mood: 'dusk',   theme: 'calm',      expr: 'curious',    stage: 'gate',      halo: 'lav',    objs: true  },
    { mood: 'glow',   theme: 'relic',     expr: 'loving',     stage: 'relics',    halo: 'gold',   objs: false, linked: true },
    { mood: 'gold',   theme: 'gate',      expr: 'determined', stage: 'gate',      halo: 'gold',   objs: false, gateStir: true },
    { mood: 'dawn',   theme: 'dawn',      expr: 'loving',     stage: 'gate',      halo: 'gold',   objs: false, gateStir: true }
  ];

  const PALETTE = {
    awaken: ['#5ee7ff', '#9ff3ff', '#b79cff'], night: ['#7fe9ff', '#b79cff', '#dfe9ff'],
    vritra: ['#ff5a3c', '#ff9b5a', '#b25bff'], sunset: ['#ffe29a', '#ffc27a', '#bfe0ff'],
    dusk: ['#ffd6a0', '#b79cff', '#7fe9ff'], glow: ['#9ff3ff', '#f2d59a', '#e6d6ff'],
    gold: ['#fff0b8', '#f2d59a', '#9ff3ff'], dawn: ['#fff0d0', '#ffd6a0', '#cfe0ff'],
    realm: ['#9ff3ff', '#b79cff', '#f2d59a']
  };

  const OBJECTS = {
    neelamani: { name: 'The Neelamani', icon: 'neelamani', text: 'An ancient blue gem. It must be found and joined with the Sword of Anantam.' },
    sword:     { name: 'The Sword of Anantam', icon: 'sword', text: 'Only Nandhan can wield it.' },
    lotus:     { name: 'The Magical Lotus', icon: 'lotus', text: 'A relic of compassion. A flower hidden in the Moonlit Garden.' },
    diamond:   { name: 'The Magical Diamond', icon: 'diamond', text: 'A relic of clear sight. A crystal guarded by the Singing Caves.' },
    key:       { name: 'The Ancient Key', icon: 'key', text: 'A relic of courage to open a new path. It rests in the Forgotten Tower.' },
    gate:      { name: 'The Gate of Anantam', icon: 'gate', text: 'The Gate waits beyond the relics.' },
    anantam:   { name: 'The Energy of Anantam', icon: 'neelamani', text: 'An ancient energy that protects peace and balance throughout the world.' }
  };

  // ------------------------------------------------- sequence timers
  const seq = { timers: new Set(), classes: new Set() };
  function at(ms, fn) { const id = setTimeout(() => { seq.timers.delete(id); try { fn(); } catch (e) { console.error(e); } }, ms); seq.timers.add(id); return id; }
  function bodyClass(c, on) { document.body.classList.toggle(c, on); if (on) seq.classes.add(c); }
  function cancelSequence() {
    seq.timers.forEach(clearTimeout); seq.timers.clear();
    seq.classes.forEach(c => document.body.classList.remove(c)); seq.classes.clear();
    fx.setMode('ambient');
  }

  // ===================================================================
  //  PARTICLE CANVAS  (ambient motes, flow-to-orb, flee, bursts, waves)
  // ===================================================================
  const fx = (function () {
    const cv = document.createElement('canvas');
    cv.id = 'fxCanvas'; cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv);
    const g = cv.getContext('2d');
    let W = 0, H = 0, dpr = 1;
    const sprites = {}, parts = [], waves = [];
    let mode = 'ambient', target = { x: 0, y: 0 }, palette = PALETTE.night, last = 0, running = false;
    const mouse = { x: -999, y: -999 };
    const para = { tx: 0, ty: 0, x: 0, y: 0, layers: [] };

    function sprite(color) {
      if (sprites[color]) return sprites[color];
      const c = document.createElement('canvas'); c.width = c.height = 48;
      const x = c.getContext('2d'), gr = x.createRadialGradient(24, 24, 0, 24, 24, 24);
      gr.addColorStop(0, '#fff'); gr.addColorStop(0.25, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = gr; x.fillRect(0, 0, 48, 48);
      return (sprites[color] = c);
    }
    function maxCount() { return calm ? 18 : small() ? 46 : 100; }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make(x, y, o) {
      o = o || {};
      return {
        x: x, y: y, vx: o.vx != null ? o.vx : rnd(-8, 8), vy: o.vy != null ? o.vy : rnd(-16, -4),
        s: o.s || rnd(5, 14), col: o.col || palette[(Math.random() * palette.length) | 0],
        tw: Math.random() * 6.28, life: o.life || 0, max: o.max || 0, k: rnd(0.7, 1.4), burst: !!o.life
      };
    }
    function spawnAmbient(initial) {
      const x = rnd(0, W), y = initial ? rnd(0, H) : H + 10;
      parts.push(make(x, y));
    }
    function burst(x, y, n, o) {
      o = o || {}; n = calm ? Math.min(n, 8) : n;
      const cols = o.cols || palette;
      for (let i = 0; i < n && parts.length < 260; i++) {
        const a = Math.random() * 6.283, sp = rnd(30, o.speed || 190);
        parts.push(make(x, y, { vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: rnd(6, 16), col: cols[(Math.random() * cols.length) | 0], life: 1, max: rnd(0.7, 1.5) }));
      }
    }
    function wave(x, y, col, maxR, speed) {
      if (waves.length > 12) waves.shift();
      waves.push({ x: x, y: y, r: 8, max: maxR || Math.max(W, H) * 0.55, sp: speed || 380, col: col || '#8fe8ff' });
    }
    function setMode(m, t) { mode = m; if (t) target = t; }
    function setPalette(name) { palette = PALETTE[name] || PALETTE.night; parts.forEach(p => { if (!p.burst) p.col = palette[(Math.random() * palette.length) | 0]; }); }
    function setTarget(t) { target = t; }

    function frame(now) {
      if (!running) return;
      requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
      // parallax easing
      if (!calm) {
        para.x += (para.tx - para.x) * Math.min(1, dt * 3); para.y += (para.ty - para.y) * Math.min(1, dt * 3);
        for (let i = 0; i < para.layers.length; i++) {
          const L = para.layers[i], d = L.depth;
          L.el.style.transform = 'translate3d(' + (para.x * d).toFixed(2) + 'px,' + (para.y * d * 0.6).toFixed(2) + 'px,0)';
        }
      }
      g.clearRect(0, 0, W, H);
      g.globalCompositeOperation = 'lighter';
      const want = maxCount();
      let amb = 0; for (let i = 0; i < parts.length; i++) if (!parts[i].burst) amb++;
      if (amb < want && Math.random() < 0.5) spawnAmbient(parts.length < 5);
      const t = now / 1000;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        if (p.burst) { p.life -= dt / p.max; if (p.life <= 0) { parts.splice(i, 1); continue; } p.vx *= 0.985; p.vy *= 0.985; }
        // pointer interaction: motes gently drift away from the cursor
        if (!calm) {
          const mx = p.x - mouse.x, my = p.y - mouse.y, d2 = mx * mx + my * my;
          if (d2 < 14000 && d2 > 1) { const d = Math.sqrt(d2), f = (1 - d / 118) * 160 * dt; p.vx += (mx / d) * f * 3; p.vy += (my / d) * f * 3; }
        }
        if (mode === 'flow' && !p.burst) {
          const dx = target.x - p.x, dy = target.y - p.y, d = Math.hypot(dx, dy) || 1;
          p.vx += (dx / d * 220 - dy / d * 90 - p.vx) * dt * 1.6 * p.k; p.vy += (dy / d * 220 + dx / d * 90 - p.vy) * dt * 1.6 * p.k;
          if (d < 16) { p.x = rnd(0, W); p.y = rnd(0, H); p.vx = p.vy = 0; }
        } else if (mode === 'flee' && !p.burst) {
          const dx = p.x - target.x, dy = p.y - target.y, d = Math.hypot(dx, dy) || 1;
          p.vx += (dx / d * 170 - p.vx) * dt * 1.4; p.vy += (dy / d * 170 - p.vy) * dt * 1.4;
        } else if (!p.burst) {
          p.vx += (Math.sin(t * 0.6 + p.tw) * 7 - p.vx) * dt * 0.8;
          p.vy += ((-9 * p.k) - p.vy) * dt * 0.6;
        }
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (!p.burst && (p.x < -30 || p.x > W + 30 || p.y < -30 || p.y > H + 30)) {
          if (mode === 'ambient') { p.x = rnd(0, W); p.y = H + 12; p.vx = rnd(-8, 8); p.vy = rnd(-16, -4); }
          else { p.x = rnd(0, W); p.y = rnd(0, H); p.vx = p.vy = 0; }
          continue;
        }
        const tw = 0.55 + 0.45 * Math.sin(t * 1.7 + p.tw);
        g.globalAlpha = (p.burst ? Math.min(1, p.life * 1.4) : 0.8) * tw;
        const s = p.s * (p.burst ? 0.6 + p.life * 0.6 : 1);
        g.drawImage(sprite(p.col), p.x - s, p.y - s, s * 2, s * 2);
      }
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i]; w.r += w.sp * dt;
        const a = 1 - w.r / w.max; if (a <= 0) { waves.splice(i, 1); continue; }
        g.globalAlpha = a * 0.28; g.strokeStyle = w.col; g.lineWidth = 9; g.beginPath(); g.arc(w.x, w.y, w.r, 0, 6.283); g.stroke();
        g.globalAlpha = a * 0.9; g.lineWidth = 2; g.beginPath(); g.arc(w.x, w.y, w.r, 0, 6.283); g.stroke();
      }
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    }

    function start() { if (running) return; running = true; last = performance.now(); requestAnimationFrame(frame); }
    function stop() { running = false; }
    function bindLayers() {
      para.layers = Array.from(document.querySelectorAll('#worldBackdrop [data-depth]')).map(el => ({ el: el, depth: Number(el.dataset.depth) }));
    }
    window.addEventListener('resize', () => { resize(); });
    window.addEventListener('pointermove', e => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      para.tx = -(e.clientX / window.innerWidth - 0.5) * 2; para.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    window.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
    resize();
    return { start, stop, burst, wave, setMode, setPalette, setTarget, bindLayers, resize, get size() { return { W, H }; } };
  })();

  // ===================================================================
  //  WORLD BACKDROP (parallax layers, sky, mist, islands, flowers)
  // ===================================================================
  function buildWorld() {
    if (!Art() || $('worldBackdrop')) return;
    document.body.insertAdjacentHTML('afterbegin', Art().DEFS);
    const L = Art().worldLayers();
    const bd = document.createElement('div');
    bd.id = 'worldBackdrop'; bd.setAttribute('aria-hidden', 'true');
    bd.innerHTML =
      '<div class="wl wl-sky"><i class="stars-a"></i><i class="stars-b"></i></div>' +
      '<div class="wl wl-aurora"></div>' +
      '<div class="wl wl-clouds" data-depth="8"><i></i><i></i><i></i></div>' +
      '<div class="wl wl-far" data-depth="6">' + L.far + '</div>' +
      '<div class="wl wl-isles" data-depth="16">' + L.isles + '</div>' +
      '<div class="wl wl-mid" data-depth="12">' + L.mid + '</div>' +
      '<div class="wl wl-mist wl-mist-a" data-depth="20"></div>' +
      '<div class="wl wl-near" data-depth="26">' + L.near + '</div>' +
      '<div class="wl wl-mist wl-mist-b" data-depth="34"></div>' +
      '<div class="wl wl-react"></div>';
    document.body.insertBefore(bd, document.body.children[1] || null);
    fx.bindLayers();
  }

  // ===================================================================
  //  NAVYA RIG  (five real expression images, idle life, glows)
  // ===================================================================
  const rig = { el: null, poses: {}, current: null, wrap: null };
  function buildRig() {
    const wrap = document.querySelector('.character-wrap');
    if (!wrap || rig.el) return;
    rig.wrap = wrap;
    const el = document.createElement('div');
    el.className = 'navya-rig'; el.setAttribute('role', 'img'); el.setAttribute('aria-label', 'Navya, your guide through Anantam');
    Object.keys(EXPR).forEach(name => {
      const e = EXPR[name];
      const pose = document.createElement('div');
      pose.className = 'pose'; pose.dataset.expr = name;
      pose.innerHTML =
        '<div class="pose-fit" style="--ar:' + e.ar + ';--ph:' + (e.h * 100) + '%">' +
        '<img class="pose-bot" alt="" decoding="async" src="' + e.src + '">' +
        '<img class="pose-top" alt="" decoding="async" src="' + e.src + '">' +
        e.gems.map(gm => '<span class="gem gem-' + gm[2] + '" style="left:' + gm[0] + '%;top:' + gm[1] + '%"></span>').join('') +
        '</div>';
      el.appendChild(pose);
      rig.poses[name] = pose;
    });
    wrap.insertBefore(el, wrap.firstChild);
    wrap.classList.add('rig-ready');
    rig.el = el;
    // The legacy eye-overlay was a prototype that faked pupil movement on a flat
    // image. It is removed on purpose: only real expression images are used.
    wrap.querySelectorAll('.eye').forEach(n => n.remove());
  }

  function setExpression(name) {
    if (!rig.el || !EXPR[name]) name = 'curious';
    if (!rig.el) return;
    if (rig.current === name) return;
    const prev = rig.current && rig.poses[rig.current];
    const next = rig.poses[name];
    if (prev) { prev.classList.remove('active'); prev.classList.add('leaving'); setTimeout(() => prev.classList.remove('leaving'), 650); }
    next.classList.add('active');
    rig.current = name;
    rig.el.dataset.expr = name;
    const L = { curious: 'Curious and ready for the journey', praying: 'Praying quietly to Anantam', loving: 'Warm, shy and hopeful', frightened: 'Frightened, yet holding on', determined: 'Brave and determined' };
    rig.el.setAttribute('aria-label', 'Navya, ' + (L[name] || '').toLowerCase());
  }
  function react(kind) {
    if (!rig.el || calm) { return; }
    rig.el.classList.remove('react-magic', 'react-fear');
    void rig.el.offsetWidth;
    rig.el.classList.add(kind === 'fear' ? 'react-fear' : 'react-magic');
    const halo = document.querySelector('.halo'); if (halo) { halo.classList.remove('pulse'); void halo.offsetWidth; halo.classList.add('pulse'); }
    setTimeout(() => rig.el && rig.el.classList.remove('react-magic', 'react-fear'), 1200);
  }
  function setHalo(tone) { document.body.dataset.halo = tone || 'lav'; }

  // ===================================================================
  //  TYPING  (line-by-line, adaptive speed, click to finish)
  // ===================================================================
  const typers = new Set();
  function sentencesOf(t) { return (t.match(/[^.!?…]+(?:[.!?…]+["”’)]*)?\s*/g) || [t]).map(s => s.trim()).filter(Boolean); }

  function stopType(el) {
    typers.forEach(s => { if (s.el === el) { clearTimeout(s.timer); typers.delete(s); } });
  }
  function type(el, text, speed) {
    stopType(el);
    const list = sentencesOf(String(text));
    const sc = (typeof scenes !== 'undefined' && typeof current !== 'undefined') ? scenes[current] : null;
    const budget = sc ? sc.time * 0.62 : 9000;
    const per = Math.max(6, Math.min(speed || 24, budget / Math.max(1, text.length)));
    const block = el.id === 'navyaLine';
    el.textContent = ''; el.classList.add('typing');
    const spans = list.map((s, i) => {
      const sp = document.createElement('span'); sp.className = 'ln' + (block ? ' ln-block' : '');
      el.appendChild(sp); if (!block && i < list.length - 1) el.appendChild(document.createTextNode(' '));
      return sp;
    });
    const st = { el, timer: null, list, spans };
    typers.add(st);
    let si = 0, ci = 0;
    (function step() {
      if (si >= list.length) { done(); return; }
      if (ci === 0 && el.id === 'navyaLine') subtitle(list[si]);
      ci++;
      spans[si].textContent = list[si].slice(0, ci);
      if (ci >= list[si].length) { si++; ci = 0; st.timer = setTimeout(step, 300); }
      else st.timer = setTimeout(step, per);
    })();
    function done() { clearTimeout(st.timer); list.forEach((s, i) => { spans[i].textContent = s; }); el.classList.remove('typing'); typers.delete(st); }
    st.finish = done;
  }
  function finishTyping() {
    if (!typers.size) return false;
    Array.from(typers).forEach(s => s.finish());
    return true;
  }
  let subOn = store.get('anantamSubs', false) === true, subTimer = null;
  function subtitle(text) {
    const bar = $('subtitleBar'); if (!bar) return;
    if (!subOn) { bar.classList.remove('show'); return; }
    bar.textContent = '“' + text + '”'; bar.classList.add('show');
    clearTimeout(subTimer); subTimer = setTimeout(() => bar.classList.remove('show'), Math.max(2600, text.length * 70));
  }

  // ===================================================================
  //  STAGE  (right-hand world panel inside .scene-art)
  // ===================================================================
  let stage = null;
  function buildStage() {
    const art = $('sceneArt'); if (!art || stage) return;
    stage = { art };
    stage.bg = document.createElement('div'); stage.bg.className = 'stage-bg';
    stage.dyn = document.createElement('div'); stage.dyn.className = 'stage-dyn';
    stage.tip = document.createElement('div'); stage.tip.className = 'obj-tip'; stage.tip.setAttribute('role', 'status'); stage.tip.setAttribute('aria-live', 'polite');
    art.insertBefore(stage.bg, art.firstChild);
    art.appendChild(stage.dyn); art.appendChild(stage.tip);
    document.body.classList.add('cinema-on');
    // Fix: the secret rune previously used inline styles that pushed it into the layout.
    const rune = $('forbiddenRune'); if (rune) rune.removeAttribute('style');
  }
  function frame(src, ar, alt, cls, extra) {
    return '<div class="stage-frame ' + (cls || '') + '" style="--sar:' + ar + '"><img src="' + src + '" alt="' + alt + '" decoding="async">' + (extra || '') + '</div>';
  }
  function relicBtn(id, style) {
    const have = window.AnantamQuest && AnantamQuest.has(id);
    return '<button type="button" class="obj-btn tb-relic' + (have ? ' have' : '') + '" data-obj="' + id + '" style="' + style + '" aria-label="' + OBJECTS[id].name + '">' +
      Art().RELICS[id] + '<small>' + OBJECTS[id].name.replace('The ', '').replace('Magical ', '') + (have ? ' ✓' : '') + '</small></button>';
  }
  function objDock() {
    return '<div class="obj-dock">' +
      '<button type="button" class="obj-btn" data-obj="neelamani" aria-label="The Neelamani">' + Art().RELICS.neelamani + '<small>Neelamani</small></button>' +
      '<button type="button" class="obj-btn" data-obj="sword" aria-label="The Sword of Anantam">' + Art().RELICS.sword + '<small>Sword</small></button></div>';
  }
  function cta() {
    const n = window.AnantamQuest ? AnantamQuest.count() : 0;
    return '<button type="button" class="stage-cta" data-act="realm">🗺️ ' + (n >= 3 ? 'Visit the Gate of Anantam' : 'Begin the Relic Quest · ' + n + '/3') + '</button>';
  }

  let stageKey = '';
  function renderStage(plan, idx) {
    if (!stage) return;
    const A = Art(); let html = '', bg = null;
    switch (plan.stage) {
      case 'orb':
        html = '<div class="energy-orb" data-obj="anantam" role="button" tabindex="0" aria-label="The Energy of Anantam"><i class="orb-core"></i><i class="orb-ring r1"></i><i class="orb-ring r2"></i><i class="orb-ring r3"></i></div>';
        break;
      case 'reference':
        bg = 'navya-reference.jpeg';
        html = frame('navya-reference.jpeg', 1024 / 1536, 'Navya in the palace of Anantam', 'frame-ref'); break;
      case 'vritra':
        bg = 'vritra.webp';
        html = frame('vritra.webp', 1000 / 1067, 'Vritra, the darkness over Anantam', 'frame-vritra silhouette',
          '<i class="vr-eye" style="left:77.5%;top:23.2%"></i>') + A.cracks(); break;
      case 'nandhan':
        bg = 'nandhan.webp';
        html = frame('nandhan.webp', 1024 / 1536, 'Nandhan, the only one who can wield the Sword of Anantam', 'frame-nandhan') + '<i class="sun-sweep"></i>'; break;
      case 'relics':
        html = '<div class="tableau' + (plan.linked ? ' linked' : '') + '">' +
          (plan.linked ? '<svg class="tb-lines" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M24 62 L50 28 L76 62 Z" fill="none"/></svg>' : '') +
          relicBtn('lotus', 'left:24%;top:62%') + relicBtn('diamond', 'left:50%;top:30%') + relicBtn('key', 'left:76%;top:62%') + '</div>' + cta();
        break;
      case 'gate': {
        const n = window.AnantamQuest ? AnantamQuest.count() : 0;
        const state = (plan.gateStir && idx === 8 && n >= 3) ? 'open' : (plan.gateStir && n >= 3) ? 'opening' : plan.gateStir ? 'stir' : 'closed';
        html = '<div class="stage-gate" data-state="' + state + '"><button type="button" class="obj-btn gate-btn" data-obj="gate" aria-label="The Gate of Anantam">' + A.RELICS.gate + '</button>' +
          '<div class="gate-lights">' + [0, 1, 2].map(i => '<i class="' + (i < n ? 'on' : '') + '"></i>').join('') + '</div></div>' + cta();
        break;
      }
    }
    if (plan.objs) html += objDock();
    stage.dyn.innerHTML = html;
    stage.bg.style.backgroundImage = bg ? 'url("' + bg + '")' : '';
    stage.bg.classList.toggle('on', !!bg);
    stage.dyn.classList.remove('in'); void stage.dyn.offsetWidth; stage.dyn.classList.add('in');
    stage.art.dataset.stage = plan.stage;
    stage.tip.classList.remove('show');
    const orb = stage.dyn.querySelector('.energy-orb'); if (orb) orb.classList.add('idle');
    stageKey = plan.stage + ':' + idx;
  }

  // ---- interactive magical objects (hover glow, pulse, descriptions)
  let tipTimer = null;
  function showTip(key, pin) {
    const o = OBJECTS[key]; if (!o || !stage) return;
    stage.tip.innerHTML = '<strong>' + o.name + '</strong><span>' + o.text + '</span>';
    stage.tip.classList.add('show');
    clearTimeout(tipTimer);
    if (pin) tipTimer = setTimeout(() => stage.tip.classList.remove('show'), 4200);
  }
  function hideTip() { clearTimeout(tipTimer); tipTimer = setTimeout(() => stage && stage.tip.classList.remove('show'), 500); }
  function pulseAt(el, tone) {
    if (!el) return;
    const ring = document.createElement('i'); ring.className = 'pulse-ring'; el.appendChild(ring);
    ring.addEventListener('animationend', () => ring.remove());
    setTimeout(() => ring.remove(), 1400);
    const r = el.getBoundingClientRect();
    fx.burst(r.left + r.width / 2, r.top + r.height / 2, 16, { cols: tone === 'gold' ? ['#fff0b8', '#f2d59a', '#ffffff'] : undefined, speed: 160 });
    fx.wave(r.left + r.width / 2, r.top + r.height / 2, tone === 'gold' ? '#f2d59a' : '#8fe8ff', 200, 260);
    Au().sfx('pulse');
  }
  function bindStageEvents() {
    const art = $('sceneArt'); if (!art) return;
    art.addEventListener('pointerover', e => { const b = e.target.closest('[data-obj]'); if (b && art.contains(b)) { showTip(b.dataset.obj); if (e.pointerType === 'mouse') Au().sfx('hover'); } });
    art.addEventListener('pointerout', e => { const b = e.target.closest('[data-obj]'); if (b) hideTip(); });
    art.addEventListener('focusin', e => { const b = e.target.closest('[data-obj]'); if (b) showTip(b.dataset.obj); });
    art.addEventListener('click', e => {
      const act = e.target.closest('[data-act="realm"]');
      if (act) { if (window.AnantamQuest) AnantamQuest.openRealm(); return; }
      const b = e.target.closest('[data-obj]'); if (!b) return;
      const key = b.dataset.obj;
      pulseAt(b, (key === 'gate' || key === 'sword' || key === 'key') ? 'gold' : 'cyan');
      showTip(key, true);
      if (key === 'neelamani' || key === 'anantam') react('magic');
      if (key === 'gate' && window.AnantamQuest) setTimeout(() => AnantamQuest.openRealm('gate'), 650);
      if ((key === 'lotus' || key === 'diamond' || key === 'key') && window.AnantamQuest) {
        setTimeout(() => AnantamQuest.openRealm(AnantamQuest.locationOf(key)), 900);
      }
    });
    art.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('energy-orb')) { e.preventDefault(); e.target.click(); } });
  }

  // ===================================================================
  //  FLASH / SHAKE
  // ===================================================================
  function flash(color, peak, dur) {
    const f = $('fxFlash'); if (!f) return;
    f.style.background = color || '#dff8ff';
    const p = calm ? Math.min(peak || 0.55, 0.25) : Math.min(peak || 0.6, 0.65);
    if (f.animate) f.animate([{ opacity: 0 }, { opacity: p, offset: 0.18 }, { opacity: 0 }], { duration: dur || 900, easing: 'ease-out' });
  }
  function shake(ms, amp) {
    if (calm) return;
    const targets = [document.querySelector('main'), $('sceneArt')].filter(Boolean);
    const a = amp || 6, steps = 10, frames = [];
    for (let i = 0; i <= steps; i++) { const k = (1 - i / steps) * a; frames.push({ transform: 'translate(' + ((i % 2 ? -1 : 1) * k).toFixed(1) + 'px,' + ((i % 3 ? 1 : -1) * k * 0.6).toFixed(1) + 'px)' }); }
    targets.forEach(t => t.animate && t.animate(frames, { duration: ms || 520, easing: 'linear' }));
  }
  function orbCenter() {
    const o = stage && stage.dyn.querySelector('.energy-orb'); const r = (o || $('sceneArt')).getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  // ===================================================================
  //  SEQUENCES
  // ===================================================================
  const sequences = {
    0() { // THE AWAKENING OF ANANTAM -> Navya's prayer
      bodyClass('fx-dim', true);
      Au().sfx('awaken'); Au().setTheme('awakening');
      const orb = () => stage.dyn.querySelector('.energy-orb');
      at(500, () => { const o = orb(); if (o) o.classList.add('appear'); });
      at(1500, () => { fx.setMode('flow', orbCenter()); });
      [1700, 2200, 2700].forEach(t => at(t, () => { const c = orbCenter(); fx.wave(c.x, c.y, '#8fe8ff', 520, 300); }));
      at(2200, () => { const o = orb(); if (o) o.classList.add('charge'); });
      at(3100, () => { // the moment of awakening
        const c = orbCenter();
        flash('#e3fbff', 0.62, 1000); fx.setMode('ambient'); fx.burst(c.x, c.y, 60, { speed: 260, cols: ['#ffffff', '#8fe8ff', '#f2d59a', '#b79cff'] });
        [0, 160, 320].forEach(d => at(3100 + d + 1, () => fx.wave(c.x, c.y, d ? '#b79cff' : '#ffffff', Math.max(window.innerWidth, window.innerHeight) * 0.7, 520)));
        bodyClass('world-react', true);
        setExpression('praying'); react('magic');
        const o = orb(); if (o) o.classList.add('awake');
      });
      at(4300, () => { bodyClass('fx-dim', false); Au().setTheme('calm'); });
      at(6500, () => bodyClass('world-react', false));
    },
    2() { // VRITRA: DARKNESS ARRIVES
      bodyClass('fx-dark', true);
      const fr = () => stage.dyn.querySelector('.frame-vritra');
      at(250, () => { Au().sfx('vritra'); fx.setMode('flee', orbCenter()); });
      at(500, () => stage.dyn.classList.add('cracking'));
      at(1900, () => { const f = fr(); if (f) f.classList.add('seen'); });
      at(3300, () => { // the reveal
        const f = fr(); if (f) { f.classList.remove('silhouette'); f.classList.add('revealed'); }
        flash('#ff4060', 0.4, 700); shake(520, 7);
        setExpression('frightened'); react('fear');
        const c = orbCenter(); fx.wave(c.x, c.y, '#ff5a3c', 460, 420);
        Au().sfx('thunder');
      });
      at(5200, () => stage.dyn.classList.add('cracks-pulse'));
    },
    3() { // NANDHAN: GOLDEN-BLUE SUNSET
      bodyClass('warm', true);
      Au().sfx('nandhan');
      at(350, () => { const c = orbCenter(); fx.burst(c.x, c.y, 26, { cols: ['#fff0b8', '#f2d59a', '#bfe0ff'], speed: 120 }); });
      at(900, () => { setExpression('loving'); react('magic'); });
    },
    7() { // THE GATE REMEMBERS
      const n = window.AnantamQuest ? AnantamQuest.count() : 0;
      Au().sfx(n >= 3 ? 'gate' : 'chime');
      at(600, () => { const g = stage.dyn.querySelector('.stage-gate'); if (g && n >= 3) g.dataset.state = 'opening'; });
    }
  };

  // ===================================================================
  //  DIRECTOR (reacts to every scene change)
  // ===================================================================
  let lastIdx = -1, forceNext = true, started = false;
  function onScene(detail) {
    if (!started) return;                                  // intro still playing
    const idx = detail.index, plan = PLAN[idx] || PLAN[1];
    const refresh = idx === lastIdx && !forceNext;
    if (refresh) return;                                   // pause/resume re-render: keep sequences intact
    forceNext = false; lastIdx = idx;
    cancelSequence();
    stopSpeakingTip();
    document.body.dataset.mood = plan.mood;
    document.body.dataset.scene = String(idx);
    fx.setPalette(plan.mood);
    setHalo(plan.halo);
    Au().setTheme(plan.theme);
    setExpression(plan.expr);
    renderStage(plan, idx);
    // cinematic title cards
    ['title', 'eyebrow', 'artCaption'].forEach(id => { const el = $(id); if (el) { el.classList.remove('title-in'); void el.offsetWidth; el.classList.add('title-in'); } });
    const spk = $('speakerTag'); if (spk) spk.textContent = 'NAVYA';
    const sp = document.querySelector('.speech'); if (sp) sp.classList.toggle('menace', plan.mood === 'vritra');
    if (sequences[idx]) sequences[idx]();
    if (idx === 4 || idx === 6) at(1800, () => { if (window.AnantamQuest && AnantamQuest.count() < 3) toast('A new quest: find the Lotus, the Diamond and the Key.'); });
    document.dispatchEvent(new CustomEvent('anantam:director', { detail: { index: idx, plan: plan } }));
  }
  function stopSpeakingTip() { if (stage) stage.tip.classList.remove('show'); }
  document.addEventListener('anantam:scene', e => { try { onScene(e.detail); } catch (err) { console.error('[Anantam] scene error', err); } });

  // ===================================================================
  //  STORY HOLD (used when the player enters the Realm)
  // ===================================================================
  let holds = 0;
  function holdStory() {
    holds++;
    if (holds === 1) { try { clearTimeout(timer); } catch (e) {} }
  }
  function releaseStory() {
    holds = Math.max(0, holds - 1);
    if (holds === 0) {
      try {
        if (!paused && current < scenes.length - 1) { clearTimeout(timer); timer = setTimeout(() => showScene(current + 1), Math.max(6000, scenes[current].time * 0.6)); }
      } catch (e) {}
    }
  }

  // ===================================================================
  //  TOASTS
  // ===================================================================
  function toast(msg, tone) {
    let stack = $('toastStack');
    if (!stack) { stack = document.createElement('div'); stack.id = 'toastStack'; stack.setAttribute('aria-live', 'polite'); document.body.appendChild(stack); }
    const t = document.createElement('div'); t.className = 'toast' + (tone ? ' ' + tone : ''); t.textContent = msg;
    stack.appendChild(t);
    while (stack.children.length > 3) stack.firstChild.remove();
    setTimeout(() => t.classList.add('out'), 3600);
    setTimeout(() => t.remove(), 4200);
  }

  // ===================================================================
  //  SOUND PANEL + subtitles + calm effects
  // ===================================================================
  function buildSoundPanel() {
    const tools = document.querySelector('.top-tools'); if (!tools || $('soundPanelBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'soundPanelBtn'; btn.type = 'button'; btn.className = 'small-btn'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'soundPanel');
    btn.title = 'Sound, subtitles and effects'; btn.textContent = '🎚️ Sound & FX';
    tools.insertBefore(btn, tools.firstChild);
    const panel = document.createElement('div');
    panel.id = 'soundPanel'; panel.setAttribute('role', 'group'); panel.setAttribute('aria-label', 'Sound and effects'); panel.hidden = true;
    const S = Au().state;
    panel.innerHTML =
      '<button type="button" id="muteBtn" class="sp-mute"></button>' +
      '<label>Music volume <output id="musicOut"></output><input id="musicVol" type="range" min="0" max="100" step="1"></label>' +
      '<label>Effects volume <output id="sfxOut"></output><input id="sfxVol" type="range" min="0" max="100" step="1"></label>' +
      '<label class="sp-check"><input id="subsChk" type="checkbox"> Subtitles for Navya’s dialogue</label>' +
      '<label class="sp-check"><input id="calmChk" type="checkbox"> Calm effects (fewer particles, no screen shake)</label>' +
      '<button type="button" id="introAgain" class="sp-link">🎬 Replay the opening</button>';
    document.body.appendChild(panel);
    const paint = () => {
      const st = Au().state;
      $('muteBtn').textContent = st.muted ? '🔇 Sound is muted — tap to unmute' : '🔊 Sound is on — tap to mute';
      $('musicVol').value = Math.round((st.music != null ? st.music : 0.5) * 100); $('sfxVol').value = Math.round((st.sfx != null ? st.sfx : 0.7) * 100);
      $('musicOut').textContent = $('musicVol').value + '%'; $('sfxOut').textContent = $('sfxVol').value + '%';
      btn.textContent = st.muted ? '🔇 Sound & FX' : '🎚️ Sound & FX';
    };
    paint(); Au().onChange(paint);
    btn.addEventListener('click', () => { const open = panel.hidden; panel.hidden = !open; btn.setAttribute('aria-expanded', String(open)); if (open) positionPanel(); });
    function positionPanel() { const r = btn.getBoundingClientRect(); panel.style.top = (r.bottom + 8) + 'px'; panel.style.right = Math.max(10, window.innerWidth - r.right) + 'px'; }
    window.addEventListener('resize', () => { if (!panel.hidden) positionPanel(); });
    document.addEventListener('pointerdown', e => { if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { panel.hidden = true; btn.focus(); } });
    $('muteBtn').addEventListener('click', () => Au().setMuted && Au().setMuted(!Au().state.muted));
    $('musicVol').addEventListener('input', e => Au().setMusicVolume(e.target.value / 100));
    $('sfxVol').addEventListener('input', e => Au().setSfxVolume(e.target.value / 100));
    $('sfxVol').addEventListener('change', () => Au().sfx('chime'));
    const sc = $('subsChk'); sc.checked = subOn;
    sc.addEventListener('change', () => { subOn = sc.checked; store.set('anantamSubs', subOn); if (!subOn) $('subtitleBar').classList.remove('show'); else subtitle($('navyaLine').textContent || ''); });
    const cc = $('calmChk'); cc.checked = calm;
    cc.addEventListener('change', () => { calm = cc.checked || mqReduce.matches; store.set('anantamCalmFx', cc.checked); document.body.classList.toggle('calm-fx', calm); });
    $('introAgain').addEventListener('click', () => { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); playIntro(true); });
    const bar = document.createElement('div'); bar.id = 'subtitleBar'; bar.setAttribute('aria-live', 'polite'); document.body.appendChild(bar);
    document.body.classList.toggle('calm-fx', calm);
  }

  // ===================================================================
  //  CINEMATIC INTRO
  // ===================================================================
  const intro = { active: false, raf: 0, timers: [], t0: 0 };
  function introCanvas() {
    const cv = $('introCanvas'); if (!cv) return null;
    const g = cv.getContext('2d'); let W = 0, H = 0; const dots = [];
    function size() { const d = Math.min(window.devicePixelRatio || 1, 1.5); W = window.innerWidth; H = window.innerHeight; cv.width = W * d; cv.height = H * d; cv.style.width = W + 'px'; cv.style.height = H + 'px'; g.setTransform(d, 0, 0, d, 0, 0); }
    size(); window.addEventListener('resize', size);
    const cols = ['#9ff3ff', '#b79cff', '#ffffff', '#f2d59a'];
    const N = calm ? 24 : small() ? 46 : 84;
    for (let i = 0; i < N; i++) dots.push({ x: rnd(0, 1), y: rnd(0, 1), s: rnd(1.2, 3.4), v: rnd(0.002, 0.012), ph: rnd(0, 6.28), c: cols[i % cols.length], at: rnd(0.3, 3.2), hx: 0, hy: 0 });
    return function draw(t) { // t in seconds since intro start
      g.clearRect(0, 0, W, H); g.globalCompositeOperation = 'lighter';
      const lx = W / 2, ly = H * 0.3; // the logo
      dots.forEach(d => {
        if (t < d.at) return;
        const born = Math.min(1, (t - d.at) / 1.2);
        d.y -= d.v * 0.016; if (d.y < -0.05) d.y = 1.05;
        let x = d.x * W, y = d.y * H;
        if (t > 2.0 && t < 3.6) { const k = Math.sin(((t - 2.0) / 1.6) * Math.PI); x += (lx - x) * k * 0.82; y += (ly - y) * k * 0.82; }
        g.globalAlpha = born * (0.45 + 0.55 * Math.sin(t * 2 + d.ph)) * 0.9; g.fillStyle = d.c;
        g.beginPath(); g.arc(x, y, d.s, 0, 6.283); g.fill();
        g.globalAlpha *= 0.25; g.beginPath(); g.arc(x, y, d.s * 3.2, 0, 6.283); g.fill();
      });
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
    };
  }
  let introDraw = null;
  function playIntro(replay) {
    const el = $('intro'); if (!el) { endIntro(true); return; }
    if (replay) { cancelSequence(); document.body.classList.remove('started'); started = false; holdStory(); try { clearTimeout(timer); } catch (e) {} }
    el.hidden = false; el.classList.remove('leaving', 'play', 'ready'); void el.offsetWidth;
    document.body.classList.add('intro-on');
    document.body.dataset.mood = 'awaken'; fx.setPalette('awaken');
    intro.active = true; intro.timers.forEach(clearTimeout); intro.timers = [];
    const logo = el.querySelector('.il-title');
    if (logo && !logo.dataset.split) { logo.dataset.split = '1'; logo.innerHTML = 'ANANTAM'.split('').map((c, i) => '<span style="--i:' + i + '">' + c + '</span>').join(''); logo.setAttribute('aria-label', 'Anantam'); }
    if (!introDraw) introDraw = introCanvas();
    if (calm) { el.classList.add('play', 'ready', 'calm'); } else {
      el.classList.add('play'); el.classList.remove('calm');
      intro.timers.push(setTimeout(() => Au().sfx('chime'), 2400), setTimeout(() => Au().sfx('pulse'), 3700), setTimeout(() => el.classList.add('ready'), 6300));
    }
    intro.t0 = performance.now();
    cancelAnimationFrame(intro.raf);
    (function loop(now) { if (!intro.active) return; intro.raf = requestAnimationFrame(loop); if (introDraw) introDraw((now - intro.t0) / 1000); })(performance.now());
    const btn = $('beginBtn'); if (btn) setTimeout(() => btn.focus({ preventScroll: true }), calm ? 50 : 6600);
  }
  function endIntro(skipAnim) {
    const el = $('intro');
    intro.active = false; cancelAnimationFrame(intro.raf); intro.timers.forEach(clearTimeout); intro.timers = [];
    const go = () => {
      if (el) el.hidden = true;
      document.body.classList.remove('intro-on'); document.body.classList.add('started');
      started = true; forceNext = true;
      Au().sfx('discover'); Au().setTheme('calm');
      if (!Au().isMusicPlaying() && !(Au().state && Au().state.muted)) Au().startMusic();
      try { paused = false; const pb = $('pauseBtn'); if (pb) pb.textContent = 'Ⅱ Pause story'; } catch (e) {}
      holds = 0;
      showScene(0);
    };
    if (el && !skipAnim && !calm) { el.classList.add('leaving'); flash('#cfeeff', 0.5, 800); setTimeout(go, 650); } else go();
  }
  function bindIntro() {
    const b = $('beginBtn'), s = $('skipIntro');
    if (b) b.addEventListener('click', () => { Au().unlock && Au().unlock(); Au().sfx('collect'); endIntro(false); });
    if (s) s.addEventListener('click', () => { Au().unlock && Au().unlock(); endIntro(true); });
    document.addEventListener('keydown', e => {
      if (!intro.active) return;
      if (e.key === 'Escape') { e.preventDefault(); endIntro(true); }
    });
    // a click anywhere on the intro (not on a button) fast-forwards to the Begin button
    const el = $('intro');
    if (el) el.addEventListener('click', e => { if (e.target.closest('button')) return; if (!el.classList.contains('ready')) { el.classList.add('ready', 'fast'); } });
  }

  // ===================================================================
  //  MISC UI WIRING
  // ===================================================================
  function buildSpeakerTag() {
    const speech = document.querySelector('.speech'); if (!speech || $('speakerTag')) return;
    const tag = document.createElement('span'); tag.id = 'speakerTag'; tag.className = 'speaker-tag'; tag.textContent = 'NAVYA';
    speech.insertBefore(tag, speech.firstChild);
  }
  function bindTextSkip() {
    ['storyText', 'navyaLine'].forEach(id => { const el = $(id); if (el) { el.addEventListener('click', finishTyping); el.title = 'Click to reveal the whole line'; } });
    document.addEventListener('keydown', e => {
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      const modalOpen = $('featureModal') && $('featureModal').classList.contains('open');
      const realmOpen = document.body.classList.contains('realm-open');
      if (modalOpen || realmOpen || document.body.classList.contains('intro-on')) return;
      if (e.key === 'ArrowRight') { const nb = $('nextBtn'); if (nb) nb.click(); }
    });
  }

  function init() {
    buildWorld(); buildRig(); buildStage(); buildSpeakerTag(); buildSoundPanel(); bindStageEvents(); bindTextSkip(); bindIntro();
    if (!$('fxFlash')) { const f = document.createElement('div'); f.id = 'fxFlash'; f.setAttribute('aria-hidden', 'true'); document.body.appendChild(f); }
    setExpression('curious');
    fx.start();
    // Hold the story until the visitor presses BEGIN (script.js already began at scene 0).
    try { paused = true; clearTimeout(timer); } catch (e) {}
    holdStory();
    playIntro(false);
    mqReduce.addEventListener && mqReduce.addEventListener('change', () => { calm = mqReduce.matches || store.get('anantamCalmFx', false) === true; document.body.classList.toggle('calm-fx', calm); });
  }

  // Public API (used by script.js and anantam-quest.js)
  window.AnantamCinema = {
    expression: setExpression, react, type, finishTyping, holdStory, releaseStory, toast, flash, shake,
    fx, burst: fx.burst, wave: fx.wave, pulseAt, showTip, OBJECTS, EXPR, PLAN,
    setPalette: fx.setPalette, refreshStage() { const i = lastIdx; if (i >= 0) renderStage(PLAN[i], i); },
    get calm() { return calm; }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
