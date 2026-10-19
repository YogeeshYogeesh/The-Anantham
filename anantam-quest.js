/* =====================================================================
   ANANTAM RELIC QUEST
   A playable, explorable quest:
     Moonlit Garden  -> find the Magical Lotus
     Singing Caves   -> find the Magical Diamond (listen for the clearest note)
     Forgotten Tower -> light the lantern, find the Ancient Key
     Gate of Anantam -> place all three relics to open it
   Relics are NEVER collected automatically: the player must find and click
   each one. Progress is saved in the same localStorage key your site already
   used ("anantamRelics"), so earlier progress still counts.
   ===================================================================== */
(function () {
  'use strict';
  if (window.AnantamQuest) return;

  const $ = id => document.getElementById(id);
  const C = () => window.AnantamCinema || { toast() {}, burst() {}, wave() {}, flash() {}, react() {}, holdStory() {}, releaseStory() {}, OBJECTS: {}, fx: { setPalette() {} } };
  const Au = () => window.AnantamAudio || { sfx() {}, setTheme() {} };
  const Art = () => window.AnantamArt;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable: progress lasts for this visit */ } }
  };
  const memory = {};                                    // fallback if storage is blocked
  function read(k, d) { const v = store.get(k, undefined); return v === undefined ? (k in memory ? memory[k] : d) : v; }
  function write(k, v) { memory[k] = v; store.set(k, v); }
  const reduced = () => !!(window.AnantamCinema && AnantamCinema.calm);

  const RELIC_IDS = ['lotus', 'diamond', 'key'];
  const K = { relics: 'anantamRelics', placed: 'anantamGatePlacedV1', open: 'anantamGateOpenV1', hints: 'anantamDreamHintsV1', help: 'anantamRealmHelpV1' };

  // ------------------------------------------------------------ state
  function relics() { const v = read(K.relics, []); return Array.isArray(v) ? v.filter(x => RELIC_IDS.includes(x)) : []; }
  const has = id => relics().includes(id);
  const count = () => relics().length;
  const placed = () => { const v = read(K.placed, []); return Array.isArray(v) ? v.filter(x => RELIC_IDS.includes(x) && has(x)) : []; };
  const gateOpen = () => read(K.open, false) === true && placed().length === 3;
  const hints = () => Math.max(0, Number(read(K.hints, 0)) || 0);
  const runeSolved = () => read('anantamRuneSolvedV1', false) === true;
  const eggsFound = () => { const v = read('anantamMagicalEggsV1', []); return Array.isArray(v) ? v.length : 0; };

  const LOC = {
    garden: { name: 'Moonlit Garden', icon: '🌙', relic: 'lotus', blurb: 'Silver petals open only when someone approaches with a patient heart. The Lotus is said to rest where moonlight touches the oldest pool.', hint: 'Move your pointer slowly over the pond. The Lotus shimmers when you are close.' },
    caves:  { name: 'Singing Caves', icon: '🎶', relic: 'diamond', blurb: 'The walls hum with a crystal song. Listen for the clearest note; it points toward the Diamond.', hint: 'Click the crystals and listen. Only one rings pure and clear.' },
    tower:  { name: 'Forgotten Tower', icon: '🏰', relic: 'key', blurb: 'Dust covers the tower stairs, but the lock is untouched. The Key may be close enough to hear turning in the wind.', hint: 'It is dark here. Perhaps a light would help you see the stairs.' },
    gate:   { name: 'Gate of Anantam', icon: '🚪', relic: null, blurb: 'The Lotus, Diamond and Key glow together. The Gate recognises your effort and reveals a path toward the Neelamani.', hint: 'Touch each socket to place its relic. The gate opens only when all three are in place.' },
    shrine: { name: 'Hidden Rune Shrine', icon: '🔐', relic: null, blurb: 'A hidden shrine glimmers beyond the ordinary map. Its rune speaks of light, memory, and the secrets that curiosity can uncover.', hint: 'The rune remembers those who solved its riddle or found every egg.' }
  };
  const ORDER = ['garden', 'caves', 'tower', 'gate', 'shrine'];
  const locationOf = id => ({ lotus: 'garden', diamond: 'caves', key: 'tower' })[id] || 'garden';
  function unlocked(loc) {
    switch (loc) {
      case 'garden': return true;
      case 'caves': return has('lotus');
      case 'tower': return has('diamond');
      case 'gate': return true;
      case 'shrine': return runeSolved() || eggsFound() >= 3;
    }
    return false;
  }
  function lockReason(loc) {
    return { caves: 'Find the Lotus first.', tower: 'Find the Diamond first.', shrine: 'Solve the Forbidden Mystery or find all three eggs.' }[loc] || '';
  }
  function currentObjectiveLoc() {
    for (const id of RELIC_IDS) if (!has(id)) { const l = locationOf(id); if (unlocked(l)) return l; }
    return 'gate';
  }

  // hotspots: x,y = centre (% of scene); w = width (% of scene)
  const HOT = {
    garden: [
      { id: 'lotus', relic: 'lotus', x: 58.7, y: 78, w: 9, label: 'A faint silver shimmer on the water' },
      { id: 'pad1', x: 37.5, y: 81.3, w: 9, label: 'Lily pad', text: 'A sleepy frog opens one eye, then goes back to sleep.' },
      { id: 'pad2', x: 65, y: 85, w: 9, label: 'Lily pad', text: 'Only cool water and a drifting petal.' },
      { id: 'pad3', x: 44.5, y: 85.3, w: 9, label: 'Lily pad', text: 'A tiny fish darts away. Nothing hidden here.' },
      { id: 'moon', x: 80, y: 17.8, w: 13, label: 'The moon', text: 'The moon watches patiently. It seems to say: be gentle, be patient.' },
      { id: 'castle', x: 13.7, y: 54, w: 12, label: 'Distant castle', text: 'A far-off castle of Anantam, glowing softly in the night.' },
      { id: 'blooms', x: 25, y: 90, w: 12, label: 'Glowing flowers', text: 'These flowers sway gently. Nothing but fragrance here.' },
      { id: 'tree', x: 87.5, y: 68, w: 10, label: 'Old tree', text: 'An old tree hums quietly. A firefly hides among its leaves.' }
    ],
    caves: [
      { id: 'c1', x: 16, y: 66, w: 9, crystal: '#7b8bff', f: 262, label: 'Crystal', text: 'A dull, muffled hum. Not this one.' },
      { id: 'c2', x: 34, y: 77, w: 9, crystal: '#9a7bff', f: 294, label: 'Crystal', text: 'A low, cloudy note. Not this one.' },
      { id: 'c3', x: 52, y: 62, w: 9, crystal: '#6fa8ff', f: 330, label: 'Crystal', text: 'A soft, wavering tone. Not this one.' },
      { id: 'diamond', relic: 'diamond', x: 70, y: 75, w: 9, crystal: '#bff6ff', label: 'A crystal that rings clear' },
      { id: 'c5', x: 86, y: 60, w: 9, crystal: '#8c9bff', f: 392, label: 'Crystal', text: 'A hollow, flat sound. Not this one.' }
    ],
    tower: [
      { id: 'lantern', x: 86, y: 76, w: 9, lantern: true, label: 'Old lantern' },
      { id: 'shelf', x: 14, y: 46, w: 12, label: 'Bookshelf', text: 'Old books, thick with dust. The titles have faded away.' },
      { id: 'window', x: 50, y: 30, w: 15, label: 'Tall window', text: 'Moonlight spills through the window onto the stairs.' },
      { id: 'web', x: 91, y: 12, w: 9, label: 'Cobweb', text: 'A cobweb, undisturbed for many years.' },
      { id: 'key', relic: 'key', x: 23, y: 88, w: 8, hidden: true, label: 'A glint between the stairs' }
    ],
    shrine: [{ id: 'rune', x: 50, y: 52, w: 14, label: 'The rune', text: 'The rune glows. It remembers your name, and the secrets that curiosity can uncover.' }],
    gate: []
  };

  // ---------------------------------------------------------- the HUD
  function buildHud() {
    if ($('questHud')) return;
    const hud = document.createElement('aside');
    hud.id = 'questHud'; hud.setAttribute('aria-label', 'Relic quest progress');
    hud.innerHTML =
      '<div class="qh-title"><span>RELIC QUEST</span><b id="qhCount">0/3</b></div>' +
      '<div class="qh-slots">' + RELIC_IDS.map(id => '<button type="button" class="qh-slot" data-relic="' + id + '" data-obj="' + id + '" aria-label="' + C().OBJECTS[id].name + ' (not collected)">' + Art().RELICS[id] + '</button>').join('') + '</div>' +
      '<div class="qh-bar" role="progressbar" aria-valuemin="0" aria-valuemax="3" aria-valuenow="0"><i id="qhFill"></i></div>' +
      '<div class="qh-btns"><button type="button" id="qhRealm" class="qh-go">🗺️ Explore</button><button type="button" id="qhJournal" title="Quest journal" aria-label="Quest journal">📜</button><button type="button" id="qhPack" title="Inventory" aria-label="Inventory">🎒</button></div>' +
      '<div class="qh-tip" id="qhTip" role="status" aria-live="polite"></div>';
    document.body.appendChild(hud);
    $('qhRealm').addEventListener('click', () => openRealm());
    $('qhJournal').addEventListener('click', () => openRealm(null, 'journal'));
    $('qhPack').addEventListener('click', () => openRealm(null, 'pack'));
    hud.querySelectorAll('.qh-slot').forEach(b => {
      const show = () => { const id = b.dataset.relic, o = C().OBJECTS[id]; $('qhTip').innerHTML = '<strong>' + o.name + '</strong> ' + (has(id) ? '— in your pack.' : '— not found yet. ' + (LOC[locationOf(id)].name) + '.'); $('qhTip').classList.add('show'); };
      b.addEventListener('pointerenter', show); b.addEventListener('focus', show);
      b.addEventListener('pointerleave', () => $('qhTip').classList.remove('show')); b.addEventListener('blur', () => $('qhTip').classList.remove('show'));
      b.addEventListener('click', () => { show(); setTimeout(() => $('qhTip').classList.remove('show'), 3000); });
    });
    refreshHud();
  }
  function refreshHud(popId) {
    const n = count();
    if ($('qhCount')) $('qhCount').textContent = n + '/3';
    if ($('qhFill')) $('qhFill').style.width = (n / 3 * 100) + '%';
    const bar = document.querySelector('#questHud .qh-bar'); if (bar) bar.setAttribute('aria-valuenow', String(n));
    document.querySelectorAll('#questHud .qh-slot').forEach(b => {
      const id = b.dataset.relic, got = has(id);
      b.classList.toggle('got', got);
      b.setAttribute('aria-label', C().OBJECTS[id].name + (got ? ' (collected)' : ' (not collected)'));
      if (popId === id) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
    });
    const go = $('qhRealm'); if (go) go.textContent = n >= 3 ? (gateOpen() ? '🚪 Gate open' : '🚪 To the Gate') : '🗺️ Explore';
    document.body.classList.toggle('quest-done', n >= 3);
    if (window.AnantamCinema && AnantamCinema.refreshStage && document.body.classList.contains('started')) {
      const st = $('sceneArt'); if (st && /relics|gate/.test(st.dataset.stage || '')) AnantamCinema.refreshStage();
    }
  }

  // ------------------------------------------------------------ realm
  const R = { open: false, loc: null, opener: null, collecting: false, lit: false, visited: new Set(['garden']) };

  function buildRealm() {
    if ($('realm')) return;
    const el = document.createElement('div');
    el.id = 'realm'; el.className = 'realm'; el.hidden = true; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'realmTitle');
    el.innerHTML =
      '<div class="realm-top"><div class="realm-title"><small id="realmEyebrow">EXPLORE ANANTAM</small><h2 id="realmTitle"></h2></div>' +
      '<div class="realm-actions"><button type="button" id="rMap">🗺️ Map</button><button type="button" id="rJournal">📜 Journal</button><button type="button" id="rPack">🎒 Pack</button><button type="button" id="rClose" class="rclose">✕ Return to story</button></div></div>' +
      '<div class="realm-body"><div class="realm-scene-wrap" id="realmWrap"></div></div>' +
      '<div class="realm-foot"><p id="realmHint" aria-live="polite"></p><div id="realmNext"></div></div>' +
      '<div class="realm-veil" id="realmVeil"></div>' +
      '<div class="realm-panel" id="realmPanel" hidden></div>';
    document.body.appendChild(el);
    $('rClose').addEventListener('click', closeRealm);
    $('rMap').addEventListener('click', () => showPanel('map'));
    $('rJournal').addEventListener('click', () => showPanel('journal'));
    $('rPack').addEventListener('click', () => showPanel('pack'));
    el.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); if (!$('realmPanel').hidden) { hidePanel(); } else closeRealm(); }
      if (e.key === 'Tab') { // keep focus inside the realm
        const f = Array.from(el.querySelectorAll('button:not([disabled]):not([hidden]),a[href]')).filter(n => n.offsetParent !== null);
        if (!f.length) return; const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); } else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function say(text, tone) {
    const h = $('realmHint'); if (!h) return;
    h.textContent = text; h.className = tone || '';
  }

  function openRealm(loc, panel) {
    buildRealm();
    if (!R.open) {
      R.open = true; R.opener = document.activeElement;
      $('realm').hidden = false; document.body.classList.add('realm-open');
      C().holdStory();
      Au().setTheme(count() >= 3 ? 'gate' : 'relic');
      C().fx.setPalette('realm');
      Au().sfx('whoosh');
    }
    let target = loc;
    if (!target || !LOC[target]) target = currentObjectiveLoc();
    if (!unlocked(target)) target = currentObjectiveLoc();
    goTo(target, true);
    if (panel) showPanel(panel);
    else if (!read(K.help, false)) showHelp();
    setTimeout(() => { const c = $('rClose'); if (c && !$('realmPanel').offsetParent) c.focus({ preventScroll: true }); }, 60);
  }

  function closeRealm() {
    if (!R.open) return;
    R.open = false; hidePanel();
    $('realm').hidden = true; document.body.classList.remove('realm-open');
    C().releaseStory();
    const m = document.body.dataset.mood; C().fx.setPalette(m || 'night');
    try { const idx = Number(document.body.dataset.scene); const plan = AnantamCinema.PLAN[idx]; if (plan) Au().setTheme(plan.theme); } catch (e) { /* ignore */ }
    if (R.opener && R.opener.focus) { try { R.opener.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }

  function goTo(loc, instant) {
    const veil = $('realmVeil');
    const swap = () => { renderLocation(loc); if (veil) veil.classList.remove('on'); };
    if (instant || reduced() || !veil) { swap(); return; }
    veil.classList.add('on'); Au().sfx('whoosh'); setTimeout(swap, 280);
  }

  // ---------------------------------------------------- location view
  function hotspotHTML(h, loc) {
    const have = h.relic && has(h.relic);
    if (h.relic && have && loc !== 'gate') return '';     // already collected: it is gone from the scene
    const style = 'left:' + h.x + '%;top:' + h.y + '%;width:' + h.w + '%';
    const cls = 'hs' + (h.relic ? ' hs-relic' : ' hs-deco') + (h.hidden ? ' hs-hidden' : '') + (h.crystal ? ' hs-crystal' : '') + (h.lantern ? ' hs-lantern' : '');
    let icon = '';
    if (h.id === 'lotus') icon = '<span class="hs-art hs-bud">' + Art().RELICS.lotus + '</span>';
    else if (h.crystal) icon = '<span class="hs-art hs-cry" style="--cc:' + h.crystal + '"><svg viewBox="0 0 40 60"><polygon points="20,2 34,22 28,58 12,58 6,22" fill="var(--cc)" fill-opacity=".75" stroke="#e9fdff" stroke-width="1.5"/><polygon points="20,2 34,22 20,28 6,22" fill="#fff" fill-opacity=".35"/><path d="M20 28V58" stroke="#fff" stroke-opacity=".5"/></svg></span>';
    else if (h.lantern) icon = '<span class="hs-art hs-lan"><svg viewBox="0 0 40 60"><path d="M14 8h12M20 2v6" stroke="#caa64e" stroke-width="3" fill="none"/><rect x="9" y="8" width="22" height="36" rx="5" fill="#2a2150" stroke="#e8b95a" stroke-width="2.5"/><ellipse class="lan-flame" cx="20" cy="26" rx="5" ry="9" fill="#ffd27a"/><rect x="7" y="44" width="26" height="6" rx="2" fill="#caa64e"/></svg></span>';
    else if (h.id === 'key') icon = '<span class="hs-art hs-keyglint">' + Art().RELICS.key + '</span>';
    return '<button type="button" class="' + cls + '" style="' + style + '" data-hs="' + h.id + '" aria-label="' + h.label + '"' + (h.hidden && !R.lit ? ' tabindex="-1" aria-hidden="true"' : '') + '><i class="hs-glow"></i>' + icon + '<i class="hs-ring"></i></button>';
  }

  function ambientHTML(loc) {
    let out = '<div class="rs-ambient">';
    const n = loc === 'caves' ? 10 : 16;
    for (let i = 0; i < n; i++) out += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (30 + Math.random() * 65).toFixed(1) + '%;animation-delay:' + (-Math.random() * 8).toFixed(1) + 's;animation-duration:' + (6 + Math.random() * 7).toFixed(1) + 's"></i>';
    return out + '</div>';
  }

  function renderLocation(loc) {
    R.loc = loc; R.visited.add(loc);
    const L = LOC[loc]; if (!L) return;
    $('realmTitle').textContent = L.name;
    $('realmEyebrow').textContent = (L.icon + ' ') + (loc === 'gate' ? 'THE GATE · PLACE THE RELICS' : 'EXPLORE · ' + (L.relic ? 'FIND THE ' + C().OBJECTS[L.relic].name.replace('The ', '').toUpperCase() : 'DISCOVER'));
    let inner = Art().LOCATIONS[loc]() + ambientHTML(loc);
    if (loc === 'gate') inner += gateHTML();
    else inner += (HOT[loc] || []).map(h => hotspotHTML(h, loc)).join('');
    if (loc === 'tower' && R.lit) { /* lantern already lit this visit */ }
    $('realmWrap').innerHTML = '<div class="realm-scene loc-' + loc + (R.lit && loc === 'tower' ? ' lit' : '') + '" id="realmScene" data-loc="' + loc + '">' + inner + '</div>';
    const scene = $('realmScene');
    bindScene(scene, loc);
    // On narrow screens the scene is wider than the viewport: start centred and say it can be panned.
    const wrap = $('realmWrap');
    if (wrap) { wrap.scrollLeft = Math.max(0, (wrap.scrollWidth - wrap.clientWidth) / 2); wrap.classList.toggle('pannable', wrap.scrollWidth > wrap.clientWidth + 4); }
    // Dream whispers (earned in the mini-game) make the next relic shimmer brighter.
    if (L.relic && !has(L.relic) && hints() > 0) { scene.classList.add('whisper'); say('A dream whisper guides you: look for the brightest shimmer.', 'good'); }
    else say(L.hint);
    if (loc === 'gate') refreshGate(true);
    renderNext();
    document.dispatchEvent(new CustomEvent('anantam:realm', { detail: { loc } }));
  }

  function renderNext() {
    const box = $('realmNext'); if (!box) return;
    const n = count(); let html = '';
    if (R.loc === 'gate' && gateOpen()) html = '<button type="button" class="primary" data-go="close">Return to the story ✦</button>';
    else if (R.loc !== 'gate' && n >= 3) html = '<button type="button" class="primary" data-go="gate">Go to the Gate of Anantam ➜</button>';
    else if (R.loc !== 'gate') {
      const nx = currentObjectiveLoc();
      if (nx !== R.loc && unlocked(nx)) html = '<button type="button" class="primary" data-go="' + nx + '">Travel to the ' + LOC[nx].name + ' ➜</button>';
    }
    box.innerHTML = html;
    box.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => { const g = b.dataset.go; if (g === 'close') closeRealm(); else goTo(g); }));
  }

  // ------------------------------------------------- scene interaction
  function bindScene(scene, loc) {
    // proximity glow: the closer the pointer, the brighter the relic shimmers
    scene.addEventListener('pointermove', e => {
      scene.querySelectorAll('.hs-relic:not(.hs-hidden), .hs-relic.hs-hidden.on').forEach(el => {
        const r = el.getBoundingClientRect(), d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        el.style.setProperty('--near', Math.max(0, Math.min(1, 1 - d / 280)).toFixed(2));
      });
    });
    scene.addEventListener('pointerleave', () => scene.querySelectorAll('.hs-relic').forEach(el => el.style.setProperty('--near', '0')));
    scene.addEventListener('click', e => {
      const b = e.target.closest('[data-hs]'); if (!b || R.collecting) return;
      const h = (HOT[loc] || []).find(x => x.id === b.dataset.hs); if (!h) return;
      onHotspot(b, h, loc);
    });
    scene.querySelectorAll('.hs').forEach(b => {
      b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') Au().sfx('hover'); });
    });
    const gt = scene.querySelector('.rg'); if (gt) bindGate(scene);
  }

  function ripple(b) { const r = document.createElement('i'); r.className = 'hs-pulse'; b.appendChild(r); setTimeout(() => r.remove(), 900); }

  function onHotspot(b, h, loc) {
    const rc = b.getBoundingClientRect();
    if (h.relic) { discoverRelic(h.relic, b); return; }
    ripple(b);
    if (h.lantern) {
      if (R.lit) { say('The lantern burns steadily, its warm light filling the stairwell.'); Au().sfx('click'); return; }
      R.lit = true; $('realmScene').classList.add('lit'); Au().sfx('chime'); Au().sfx('pulse');
      C().burst(rc.left + rc.width / 2, rc.top + rc.height / 2, 22, { cols: ['#ffe9a8', '#ffd27a', '#ffffff'], speed: 150 });
      const key = $('realmScene').querySelector('[data-hs="key"]');
      if (key) { key.classList.add('on'); key.removeAttribute('aria-hidden'); key.tabIndex = 0; }
      say('The lantern flares to life. Something glints between the old stairs…', 'good');
      return;
    }
    if (h.crystal) {
      if (h.f) Au().sfx('crystalDull', h.f);
      b.classList.add('ping'); setTimeout(() => b.classList.remove('ping'), 600);
      say(h.text, '');
      return;
    }
    Au().sfx('click');
    C().burst(rc.left + rc.width / 2, rc.top + rc.height / 2, 8, { speed: 90 });
    if (loc === 'shrine') { say(h.text, 'good'); showShrineLink(); return; }
    say(h.text, '');
  }

  function showShrineLink() {
    const box = $('realmNext'); if (!box || box.querySelector('a')) return;
    box.insertAdjacentHTML('afterbegin', '<a class="primary" style="text-decoration:none;display:inline-block" href="forbidden-chapter.html">✧ Enter the Forbidden Chapter ↗</a>');
  }

  // ---------------------------------------------- relic discovery flow
  function discoverRelic(id, srcEl) {
    if (has(id) || R.collecting) return;
    if (id === 'key' && !R.lit) { say('It is too dark to see clearly.'); return; }
    R.collecting = true;
    const O = C().OBJECTS[id], scene = $('realmScene');
    const r = srcEl.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    scene.classList.add('discovering'); srcEl.classList.add('found');
    if (id === 'diamond') Au().sfx('crystal', 1319); else Au().sfx('discover');
    // discovery burst: light rays + waves
    const rays = document.createElement('div'); rays.className = 'discover-rays'; rays.style.left = cx + 'px'; rays.style.top = cy + 'px'; document.body.appendChild(rays);
    setTimeout(() => rays.remove(), 1700);
    C().burst(cx, cy, 34, { cols: ['#ffffff', '#f2d59a', '#8fe8ff'], speed: 240 });
    C().wave(cx, cy, '#f2d59a', 380, 360); setTimeout(() => C().wave(cx, cy, '#8fe8ff', 460, 420), 180);
    say('You found the ' + O.name.replace('The ', '') + '!', 'good');
    setTimeout(() => {
      flyRelic(id, srcEl, () => {
        const list = relics(); if (!list.includes(id)) list.push(id); write(K.relics, list);
        try { if (typeof checkAnantamAchievements === 'function') checkAnantamAchievements(); } catch (e) { /* ignore */ }
        const slot = document.querySelector('#questHud .qh-slot[data-relic="' + id + '"]');
        if (slot) { const sr = slot.getBoundingClientRect(); C().burst(sr.left + sr.width / 2, sr.top + sr.height / 2, 26, { cols: ['#fff0b8', '#9ff3ff', '#ffffff'], speed: 180 }); C().wave(sr.left + sr.width / 2, sr.top + sr.height / 2, '#f2d59a', 200, 260); }
        Au().sfx('collect');
        refreshHud(id);
        const n = count();
        C().toast('✦ ' + O.name + ' collected · ' + n + '/3', 'gold');
        C().react('magic');
        if (hints() > 0) write(K.hints, hints() - 1);
        scene.classList.remove('discovering', 'whisper');
        R.collecting = false;
        renderLocation(R.loc);                            // relic is gone from the scene; unlocks update
        say(n >= 3 ? 'All three relics are yours. The Gate of Anantam is calling.' : 'Well done. ' + nextHintText(id), 'good');
        if (n >= 3) C().toast('The Gate of Anantam can now be opened.', 'gold');
        else C().toast(nextUnlockToast(id));
      });
    }, reduced() ? 150 : 1000);
  }
  function nextHintText(id) { return { lotus: 'The Singing Caves are now open — open the Map or use the travel button.', diamond: 'The Forgotten Tower is now open.', key: '' }[id] || ''; }
  function nextUnlockToast(id) { return { lotus: 'New place unlocked: Singing Caves', diamond: 'New place unlocked: Forgotten Tower', key: '' }[id] || ''; }

  function flyRelic(id, srcEl, done) {
    const slot = document.querySelector('#questHud .qh-slot[data-relic="' + id + '"]');
    if (!slot || !srcEl.getBoundingClientRect) { done(); return; }
    const a = srcEl.getBoundingClientRect(), b = slot.getBoundingClientRect(), size = 92;
    const fly = document.createElement('div'); fly.className = 'flying-relic'; fly.innerHTML = Art().RELICS[id];
    fly.style.width = fly.style.height = size + 'px';
    fly.style.left = (a.left + a.width / 2 - size / 2) + 'px'; fly.style.top = (a.top + a.height / 2 - size / 2) + 'px';
    document.body.appendChild(fly);
    const dx = (b.left + b.width / 2) - (a.left + a.width / 2), dy = (b.top + b.height / 2) - (a.top + a.height / 2);
    if (!fly.animate || reduced()) { setTimeout(() => { fly.remove(); done(); }, 300); return; }
    Au().sfx('whoosh');
    const anim = fly.animate([
      { transform: 'translate(0,0) scale(.6) rotate(0deg)', opacity: 0 },
      { transform: 'translate(0,-40px) scale(1.5) rotate(0deg)', opacity: 1, offset: 0.25 },
      { transform: 'translate(' + (dx * 0.55) + 'px,' + (dy * 0.4 - 110) + 'px) scale(1.1) rotate(160deg)', opacity: 1, offset: 0.62 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.38) rotate(360deg)', opacity: 0.95 }
    ], { duration: 1250, easing: 'cubic-bezier(.45,.1,.3,1)', fill: 'forwards' });
    const trail = setInterval(() => { const q = fly.getBoundingClientRect(); C().burst(q.left + q.width / 2, q.top + q.height / 2, 2, { speed: 40, cols: ['#f2d59a', '#9ff3ff'] }); }, 70);
    anim.onfinish = () => { clearInterval(trail); fly.remove(); done(); };
    anim.oncancel = () => { clearInterval(trail); fly.remove(); done(); };
  }

  // ------------------------------------------------------- the gate
  function gateHTML() {
    return '<div class="rg" id="realmGate" data-state="closed">' + Art().RELICS.gate +
      '<button type="button" class="rg-neel" data-hs="neelamani" aria-label="The Neelamani" hidden>' + Art().RELICS.neelamani + '</button></div>' +
      '<div class="rg-sockets">' + RELIC_IDS.map(id => '<button type="button" class="rg-socket" data-socket="' + id + '" aria-label="' + C().OBJECTS[id].name + ' socket"><span class="sk-ring"></span><span class="sk-relic">' + Art().RELICS[id] + '</span></button>').join('') + '</div>';
  }
  function refreshGate(initial) {
    const g = $('realmGate'); if (!g) return;
    const p = placed();
    document.querySelectorAll('.rg-socket').forEach(s => {
      const id = s.dataset.socket, on = p.includes(id);
      s.classList.toggle('filled', on); s.classList.toggle('ready', !on && has(id));
      s.setAttribute('aria-label', C().OBJECTS[id].name + ' socket' + (on ? ' — placed' : has(id) ? ' — ready to place' : ' — you do not have this relic yet'));
    });
    g.dataset.runes = String(p.length);
    if (gateOpen()) { g.dataset.state = 'open'; const n = g.querySelector('.rg-neel'); if (n) n.hidden = false; }
    else g.dataset.state = 'closed';
    const sockets = document.querySelector('.rg-sockets'); if (sockets) sockets.classList.toggle('done', gateOpen());
    if (gateOpen() && initial) say('The Gate of Anantam stands open. A path of light leads toward the Neelamani.', 'good');
    else if (initial) say(count() >= 3 ? 'You carry all three relics. Touch each socket to place it.' : 'The gate is sealed. It needs the Lotus, the Diamond and the Key (' + count() + '/3 found).');
  }
  function bindGate(scene) {
    scene.addEventListener('click', e => {
      const neel = e.target.closest('[data-hs="neelamani"]');
      if (neel) { C().OBJECTS.neelamani && Au().sfx('pulse'); const r = neel.getBoundingClientRect(); C().burst(r.left + r.width / 2, r.top + r.height / 2, 24, { speed: 200 }); C().react('magic'); say('The Neelamani glows beyond the gate. It must be joined with the Sword of Anantam, and that part of the legend is still ahead.', 'good'); return; }
      const s = e.target.closest('[data-socket]'); if (!s) return;
      const id = s.dataset.socket;
      if (gateOpen()) { say('The gate is already open.'); return; }
      if (placed().includes(id)) { say('That relic is already in its socket.'); return; }
      if (!has(id)) { Au().sfx('denied'); s.classList.add('shake'); setTimeout(() => s.classList.remove('shake'), 500); say('You do not have the ' + C().OBJECTS[id].name.replace('The ', '') + ' yet. ' + LOC[locationOf(id)].name + '.', 'bad'); return; }
      // place the relic: the player's own action
      const list = placed(); list.push(id); write(K.placed, list);
      Au().sfx('socket'); const r = s.getBoundingClientRect(); C().burst(r.left + r.width / 2, r.top + r.height / 2, 20, { speed: 170, cols: ['#f2d59a', '#9ff3ff', '#ffffff'] });
      C().wave(r.left + r.width / 2, r.top + r.height / 2, '#f2d59a', 240, 300);
      refreshGate(false);
      if (placed().length === 3) setTimeout(openGate, 500); else say('The ' + C().OBJECTS[id].name.replace('The ', '') + ' settles into place. ' + (3 - placed().length) + ' to go.', 'good');
    });
  }
  function openGate() {
    write(K.open, true);
    const g = $('realmGate'); if (!g) return;
    Au().sfx('gate'); C().shake && C().shake(900, 5);
    g.dataset.state = 'opening';
    const c = g.getBoundingClientRect();
    [0, 400, 800].forEach((d, i) => setTimeout(() => C().wave(c.left + c.width / 2, c.top + c.height * 0.55, i === 1 ? '#8fe8ff' : '#f2d59a', 600, 380), d));
    setTimeout(() => C().flash('#fff3c8', 0.55, 1200), 1200);
    setTimeout(() => { g.dataset.state = 'open'; const n = g.querySelector('.rg-neel'); if (n) n.hidden = false; C().burst(c.left + c.width / 2, c.top + c.height * 0.5, 70, { speed: 280, cols: ['#fff0b8', '#9ff3ff', '#e6d6ff'] }); }, 1700);
    setTimeout(() => {
      refreshGate(false); refreshHud(); renderNext();
      say('The Gate of Anantam is open! A path of light leads toward the Neelamani.', 'good');
      C().toast('✦ The Gate of Anantam is open', 'gold'); C().react('magic');
      try { if (typeof unlockAchievement === 'function') unlockAchievement('relic-master'); } catch (e) { /* ignore */ }
    }, 2300);
  }

  // ----------------------------------------------------------- panels
  function hidePanel() { const p = $('realmPanel'); if (p) { p.hidden = true; p.innerHTML = ''; } const c = $('rClose'); if (c) c.focus({ preventScroll: true }); }
  function showPanel(kind) {
    const p = $('realmPanel'); if (!p) return;
    let body = '';
    if (kind === 'map') body = mapHTML();
    else if (kind === 'journal') body = journalHTML();
    else body = packHTML();
    p.innerHTML = '<div class="rp-card"><button type="button" class="rp-close" aria-label="Close panel">✕</button>' + body + '</div>';
    p.hidden = false;
    p.querySelector('.rp-close').addEventListener('click', hidePanel);
    p.addEventListener('click', e => { if (e.target === p) hidePanel(); }, { once: true });
    p.querySelectorAll('[data-travel]').forEach(b => b.addEventListener('click', () => {
      const loc = b.dataset.travel;
      if (!unlocked(loc)) { Au().sfx('denied'); say('Locked. ' + lockReason(loc), 'bad'); C().toast('Locked · ' + lockReason(loc)); return; }
      hidePanel(); goTo(loc);
    }));
    const f = p.querySelector('[data-travel]:not([disabled]), .rp-close'); if (f) f.focus({ preventScroll: true });
    Au().sfx('page');
  }

  function mapHTML() {
    const pos = { garden: [14, 66], caves: [34, 34], tower: [56, 62], gate: [78, 30], shrine: [90, 72] };
    const lines = '<svg class="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M14 66 Q24 40 34 34 T56 62 T78 30" fill="none"/><path d="M78 30 Q88 50 90 72" fill="none" class="dim"/></svg>';
    const nodes = ORDER.map(loc => {
      const L = LOC[loc], p = pos[loc], open = unlocked(loc), got = L.relic && has(L.relic);
      const sub = got ? 'RELIC FOUND' : open ? (loc === 'gate' ? (gateOpen() ? 'OPEN' : 'SEALED') : 'OPEN') : (loc === 'shrine' ? 'HIDDEN' : 'LOCKED');
      return '<button type="button" class="map-node' + (open ? '' : ' locked') + (got ? ' got' : '') + (R.loc === loc ? ' here' : '') + '" data-travel="' + loc + '" style="left:' + p[0] + '%;top:' + p[1] + '%" aria-label="' + L.name + ' — ' + sub.toLowerCase() + (open ? '' : '. ' + lockReason(loc)) + '">' +
        '<span class="mn-icon">' + (open ? (got ? '✅' : L.icon) : '🔒') + '</span><b>' + L.name + '</b><small>' + sub + '</small></button>';
    }).join('');
    return '<p class="rp-eyebrow">THE MAP OF ANANTAM</p><h3>Choose where to explore</h3><div class="map-board">' + lines + nodes + '</div><p class="rp-note">' + count() + '/3 relics found. ' + (count() >= 3 ? 'The Gate is waiting.' : 'Each new relic opens the next place.') + '</p>';
  }

  function journalHTML() {
    const n = count(), best = Number(read('anantamBestSceneV1', 0)) || 0;
    const steps = [
      { done: best >= 1, icon: '🌟', t: 'Follow Navya into Anantam', d: 'Begin the story and learn why the ancient light matters.' },
      { done: has('lotus'), icon: '🌸', t: 'Find the Magical Lotus', d: 'Search the pond of the Moonlit Garden. It shimmers when you are near.' },
      { done: has('diamond'), icon: '💎', t: 'Find the Magical Diamond', d: 'In the Singing Caves, click the crystals and listen for the clearest note.' },
      { done: has('key'), icon: '🗝️', t: 'Find the Ancient Key', d: 'In the Forgotten Tower, light the lantern and look between the stairs.' },
      { done: gateOpen(), icon: '🚪', t: 'Open the Gate of Anantam', d: 'Place all three relics in the gate’s sockets.' }
    ];
    const cur = steps.findIndex(s => !s.done);
    return '<p class="rp-eyebrow">QUEST JOURNAL</p><h3>' + n + ' of 3 relics found</h3><div class="rp-progress"><i style="width:' + (steps.filter(s => s.done).length / steps.length * 100) + '%"></i></div>' +
      '<ol class="rp-steps">' + steps.map((s, i) => '<li class="' + (s.done ? 'done' : i === cur ? 'now' : '') + '"><span>' + (s.done ? '✅' : s.icon) + '</span><div><strong>' + s.t + '</strong><p>' + s.d + '</p><em>' + (s.done ? 'COMPLETE' : i === cur ? 'CURRENT OBJECTIVE' : 'LATER') + '</em></div></li>').join('') + '</ol>';
  }

  function packHTML() {
    const O = C().OBJECTS;
    const cards = RELIC_IDS.map(id => '<div class="pack-card' + (has(id) ? ' got' : '') + '"><div class="pc-art">' + Art().RELICS[id] + '</div><strong>' + O[id].name + '</strong><p>' + (has(id) ? O[id].text : 'Not found yet. Look in the ' + LOC[locationOf(id)].name + '.') + '</p><em>' + (placed().includes(id) ? 'PLACED IN THE GATE' : has(id) ? 'IN YOUR PACK' : 'NOT FOUND') + '</em></div>').join('');
    return '<p class="rp-eyebrow">MAGICAL INVENTORY</p><h3>Your relics · ' + count() + '/3</h3><div class="pack-grid">' + cards + '</div><p class="rp-note">Dream whispers: <b>' + hints() + '</b> ' + (hints() ? '— they make the next relic shimmer brighter.' : '— win “Catch the dreams” to earn one.') + '</p>';
  }

  function showHelp() {
    const p = $('realmPanel'); if (!p) return;
    p.innerHTML = '<div class="rp-card help"><p class="rp-eyebrow">HOW TO PLAY</p><h3>Explore, listen, discover</h3><ul>' +
      '<li><b>Click or tap</b> things in the scene to look closer. Some are only scenery.</li>' +
      '<li><b>Move slowly.</b> A hidden relic shimmers brighter when your pointer is near.</li>' +
      '<li>Find the <b>Lotus</b>, the <b>Diamond</b> and the <b>Key</b>. Each one must be found and clicked by you.</li>' +
      '<li>Use the <b>Map</b> to travel. Place all three relics in the <b>Gate of Anantam</b> to open it.</li></ul>' +
      '<button type="button" class="primary" id="helpGo">Begin exploring ✦</button></div>';
    p.hidden = false;
    $('helpGo').addEventListener('click', () => { write(K.help, true); hidePanel(); });
    $('helpGo').focus({ preventScroll: true });
  }

  // ----------------------------------------- mini-game: dream whispers
  function grantHint() {
    const n = hints() + 1; write(K.hints, n);
    const loc = currentObjectiveLoc(), nextId = RELIC_IDS.find(id => !has(id));
    return { whispers: n, relic: nextId || null, location: loc, clue: nextId ? C().OBJECTS[nextId].text : '' };
  }

  // ------------------------------------------------------------- init
  function init() {
    buildHud(); buildRealm();
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && R.open && !$('realm').contains(document.activeElement)) closeRealm();
    });
    document.addEventListener('anantam:director', () => refreshHud());
  }

  window.AnantamQuest = { has, count, relics, locationOf, openRealm, closeRealm, grantHint, hints, gateOpen, refreshHud, isOpen: () => R.open, reset() { [K.relics, K.placed, K.open, K.hints].forEach(k => write(k, k === K.open ? false : [])); R.lit = false; refreshHud(); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
