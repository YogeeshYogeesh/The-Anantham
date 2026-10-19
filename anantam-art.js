/* =====================================================================
   ANANTAM ART LIBRARY
   Procedural, dependency-free SVG artwork used by the cinematic world,
   the relic quest and the interactive magical objects. Everything is
   generated in code so no extra image files are needed.
   ===================================================================== */
(function () {
  'use strict';

  // ------------------------------------------------------ seeded random
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  // ---------------------------------------------------- shared gradients
  // One hidden sprite holds all gradients; icons reference them by id.
  const DEFS = `
  <svg id="anantamDefs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="g-glow-cyan"><stop offset="0" stop-color="#9ff3ff" stop-opacity=".95"/><stop offset=".45" stop-color="#4fb8ff" stop-opacity=".35"/><stop offset="1" stop-color="#2a5bd7" stop-opacity="0"/></radialGradient>
      <radialGradient id="g-glow-gold"><stop offset="0" stop-color="#fff0b8" stop-opacity=".95"/><stop offset=".45" stop-color="#f2d59a" stop-opacity=".35"/><stop offset="1" stop-color="#f2d59a" stop-opacity="0"/></radialGradient>
      <radialGradient id="g-glow-lav"><stop offset="0" stop-color="#e6d6ff" stop-opacity=".95"/><stop offset=".45" stop-color="#b79cff" stop-opacity=".35"/><stop offset="1" stop-color="#7a5bd6" stop-opacity="0"/></radialGradient>
      <linearGradient id="g-lotusP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2fb"/><stop offset=".55" stop-color="#ffb8e6"/><stop offset="1" stop-color="#c06ad8"/></linearGradient>
      <linearGradient id="g-lotusB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9d6ff"/><stop offset="1" stop-color="#8f5bd0"/></linearGradient>
      <linearGradient id="g-diamond" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e7fdff"/><stop offset=".45" stop-color="#7fe0ff"/><stop offset="1" stop-color="#3a7bff"/></linearGradient>
      <linearGradient id="g-diamond2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bff6ff"/><stop offset="1" stop-color="#4f8dff"/></linearGradient>
      <linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3c4"/><stop offset=".5" stop-color="#e8b95a"/><stop offset="1" stop-color="#a8741f"/></linearGradient>
      <radialGradient id="g-neel" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#b9ecff"/><stop offset=".4" stop-color="#2f7bff"/><stop offset="1" stop-color="#0b1f77"/></radialGradient>
      <linearGradient id="g-blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8fb4ff"/><stop offset=".5" stop-color="#f1f8ff"/><stop offset="1" stop-color="#5f86e8"/></linearGradient>
      <linearGradient id="g-stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b4a78"/><stop offset="1" stop-color="#1c1a3c"/></linearGradient>
      <clipPath id="gate-clip"><rect x="30" y="0" width="180" height="260"/></clipPath>
      <linearGradient id="g-portal" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".5" stop-color="#8fe8ff"/><stop offset="1" stop-color="#b79cff"/></linearGradient>
    </defs>
  </svg>`;

  // ------------------------------------------------------------- relics
  const lotus = `
  <svg viewBox="0 0 100 100" class="relic-svg" aria-hidden="true">
    <ellipse cx="50" cy="84" rx="32" ry="7" fill="#58e0ff" opacity=".35"/>
    <g fill="url(#g-lotusB)" opacity=".9">
      <path d="M50 80 C26 74 14 56 22 40 C38 46 48 62 50 80Z"/><path d="M50 80 C74 74 86 56 78 40 C62 46 52 62 50 80Z"/>
    </g>
    <g fill="url(#g-lotusP)" stroke="#fff" stroke-opacity=".55" stroke-width=".6">
      <path d="M50 80 C30 72 22 50 38 30 C50 44 52 62 50 80Z"/><path d="M50 80 C70 72 78 50 62 30 C50 44 48 62 50 80Z"/>
      <path d="M50 80 C34 66 36 40 50 16 C64 40 66 66 50 80Z"/>
    </g>
    <circle cx="50" cy="52" r="5" fill="url(#g-glow-gold)"/>
    <g fill="#ffe9a8"><circle cx="46" cy="58" r="1.3"/><circle cx="54" cy="58" r="1.3"/><circle cx="50" cy="63" r="1.3"/></g>
  </svg>`;

  const diamond = `
  <svg viewBox="0 0 100 100" class="relic-svg" aria-hidden="true">
    <polygon points="28,32 72,32 90,50 50,92 10,50" fill="url(#g-diamond)" stroke="#e9fdff" stroke-width="1.4" stroke-linejoin="round"/>
    <g fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="1"><path d="M10 50H90M28 32L38 50L50 92M72 32L62 50L50 92M38 50L50 32L62 50"/></g>
    <polygon points="38,50 50,32 62,50" fill="#ffffff" opacity=".35"/>
    <polygon points="28,32 38,50 10,50" fill="#bff6ff" opacity=".35"/>
    <g fill="#fff"><path d="M78 20l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" opacity=".9"/></g>
  </svg>`;

  const key = `
  <svg viewBox="0 0 100 100" class="relic-svg" aria-hidden="true">
    <g transform="rotate(-35 50 50)">
      <circle cx="26" cy="50" r="16" fill="none" stroke="url(#g-gold)" stroke-width="8"/>
      <circle cx="26" cy="50" r="5" fill="#8fe8ff" opacity=".85"/>
      <rect x="40" y="46.5" width="48" height="7" rx="3" fill="url(#g-gold)"/>
      <path d="M70 53.5v11h6v-11zM80 53.5v7h6v-7z" fill="url(#g-gold)"/>
      <path d="M44 48h40" stroke="#fff6cf" stroke-width="1.3" opacity=".8"/>
    </g>
  </svg>`;

  const neelamani = `
  <svg viewBox="0 0 100 100" class="relic-svg" aria-hidden="true">
    <circle cx="50" cy="50" r="46" fill="url(#g-glow-cyan)"/>
    <polygon points="50,12 78,30 82,58 50,90 18,58 22,30" fill="url(#g-neel)" stroke="#bfe9ff" stroke-width="1.2" stroke-linejoin="round"/>
    <g fill="none" stroke="#e9f9ff" stroke-opacity=".6" stroke-width=".9"><path d="M22 30L50 44L78 30M50 44V90M18 58L50 44L82 58M50 12V44"/></g>
    <polygon points="50,12 78,30 50,44 22,30" fill="#ffffff" opacity=".22"/>
  </svg>`;

  const sword = `
  <svg viewBox="0 0 60 140" class="relic-svg sword-svg" aria-hidden="true">
    <ellipse cx="30" cy="70" rx="28" ry="66" fill="url(#g-glow-cyan)" opacity=".55"/>
    <path d="M30 4 L38 20 V92 H22 V20Z" fill="url(#g-blade)" stroke="#e8f4ff" stroke-width="1"/>
    <path d="M30 14 V90" stroke="#4f7dff" stroke-width="2" opacity=".6"/>
    <g stroke="#6fe8ff" stroke-width="1.2" fill="none" opacity=".9"><path d="M26 30h8M26 42h8M26 54h8M26 66h8"/></g>
    <rect x="8" y="92" width="44" height="8" rx="4" fill="url(#g-gold)"/>
    <rect x="26" y="100" width="8" height="26" rx="3" fill="#2d2a68" stroke="#e8b95a" stroke-width="1"/>
    <circle cx="30" cy="132" r="6" fill="url(#g-gold)"/><circle cx="30" cy="132" r="2.5" fill="#6fe8ff"/>
  </svg>`;

  const gate = `
  <svg viewBox="0 0 240 260" class="gate-svg" aria-hidden="true">
    <ellipse cx="120" cy="150" rx="104" ry="118" fill="url(#g-glow-gold)" class="gate-halo" opacity="0"/>
    <path d="M52 252V110C52 62 82 30 120 30s68 32 68 80v142z" fill="url(#g-portal)" class="gate-portal" opacity="0"/>
    <g clip-path="url(#gate-clip)"><g class="gate-door gate-door-l"><path d="M52 252V110C52 62 82 30 120 30V252z" fill="url(#g-stone)" stroke="#8c86d0" stroke-width="1.5"/>
      <g stroke="#6fe8ff" stroke-opacity=".5" fill="none" class="gate-runes"><path d="M70 90h22M70 110h30M70 130h18M70 150h26"/></g></g>
    <g class="gate-door gate-door-r"><path d="M188 252V110C188 62 158 30 120 30V252z" fill="url(#g-stone)" stroke="#8c86d0" stroke-width="1.5"/>
      <g stroke="#6fe8ff" stroke-opacity=".5" fill="none" class="gate-runes"><path d="M170 90h-22M170 110h-30M170 130h-18M170 150h-26"/></g></g></g>
    <path d="M30 252V108C30 50 70 10 120 10s90 40 90 98v144h-22V110C188 62 158 30 120 30S52 62 52 110v142z" fill="url(#g-stone)" stroke="#a8a2e8" stroke-width="2"/>
    <g fill="#e8b95a"><path d="M120 4l5 9h-10z"/></g>
    <rect x="20" y="248" width="200" height="12" rx="3" fill="#15122e"/>
  </svg>`;

  const RELICS = { lotus, diamond, key, neelamani, sword, gate };

  // ---------------------------------------------------------- landscape
  function ridge(seed, w, baseY, amp, step, fillVar, extra) {
    const r = rng(seed);
    let y = baseY - amp * 0.5, d = `M0 ${baseY + 400}L0 ${y}`;
    for (let x = step; x <= w + step; x += step) {
      y += (r() - 0.5) * amp * 0.9;
      y = Math.max(baseY - amp, Math.min(baseY + amp * 0.2, y));
      d += `L${x} ${y.toFixed(1)}`;
    }
    d += `L${w} ${baseY + 400}Z`;
    return `<path d="${d}" style="fill:var(${fillVar})" ${extra || ''}/>`;
  }

  function castle(x, y, s, seed, litVar) {
    const r = rng(seed); let g = '';
    const towers = 4 + Math.floor(r() * 3);
    for (let i = 0; i < towers; i++) {
      const tx = (i - towers / 2) * 26 * s + r() * 8 * s, tw = (14 + r() * 10) * s, th = (48 + r() * 70) * s;
      g += `<rect x="${tx.toFixed(1)}" y="${(-th).toFixed(1)}" width="${tw.toFixed(1)}" height="${th.toFixed(1)}"/>`;
      g += `<polygon points="${(tx - 3 * s).toFixed(1)},${(-th).toFixed(1)} ${(tx + tw / 2).toFixed(1)},${(-th - 26 * s - r() * 22 * s).toFixed(1)} ${(tx + tw + 3 * s).toFixed(1)},${(-th).toFixed(1)}"/>`;
      if (r() > 0.4) g += `<rect x="${(tx + tw * 0.4).toFixed(1)}" y="${(-th * 0.7).toFixed(1)}" width="${(3 * s).toFixed(1)}" height="${(6 * s).toFixed(1)}" class="win" style="fill:var(${litVar || '--lit'})"/>`;
    }
    g += `<rect x="${(-towers * 13 * s).toFixed(1)}" y="${(-26 * s).toFixed(1)}" width="${(towers * 28 * s).toFixed(1)}" height="${(26 * s).toFixed(1)}"/>`;
    return `<g transform="translate(${x} ${y})">${g}</g>`;
  }

  function island(x, y, s, seed) {
    const r = rng(seed); let trees = '';
    for (let i = 0; i < 4; i++) trees += `<polygon points="${-40 + i * 22},0 ${-34 + i * 22},${-26 - r() * 18} ${-28 + i * 22},0"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})" class="isle">
      <ellipse cx="0" cy="30" rx="74" ry="10" fill="url(#g-glow-cyan)" opacity=".5"/>
      <path d="M-70 0 Q0 14 70 0 Q50 40 6 70 Q-10 40 -70 0Z" style="fill:var(--isle)"/>
      <g style="fill:var(--isle-top)">${trees}</g>
      <rect x="-3" y="-60" width="6" height="40" style="fill:var(--isle-top)"/><polygon points="-9,-60 0,-80 9,-60" style="fill:var(--isle-top)"/>
      <rect x="-1" y="-48" width="2.5" height="4" style="fill:var(--lit)"/>
    </g>`;
  }

  function flowers(seed, count, w, yMin, yMax) {
    const r = rng(seed); let out = '';
    const cols = ['#7fe9ff', '#b79cff', '#ff9bd9', '#f2d59a'];
    for (let i = 0; i < count; i++) {
      const x = r() * w, y = yMin + r() * (yMax - yMin), s = 0.6 + r() * 0.9, c = cols[Math.floor(r() * cols.length)];
      out += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})">
        <path d="M0 0V22" stroke="#1f6a58" stroke-width="1.6"/>
        <circle r="9" cy="-1" fill="${c}" opacity=".28"/><circle r="3.2" cy="-1" fill="${c}"/><circle r="1.2" cy="-1" fill="#fff"/></g>`;
    }
    return out;
  }

  // Full-page parallax world (viewBox 1600x900). Colours come from CSS vars.
  function worldLayers() {
    const far = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      ${ridge(11, 1600, 560, 90, 80, '--ridge-far')}
      ${castle(1240, 520, 1.15, 5, '--lit')}${castle(300, 560, 0.8, 9, '--lit')}
    </svg>`;
    const isles = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      ${island(250, 230, 1, 3)}${island(1340, 160, 0.72, 8)}${island(860, 120, 0.45, 12)}
    </svg>`;
    const mid = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      ${ridge(23, 1600, 650, 110, 70, '--ridge-mid')}
      ${castle(780, 640, 1.5, 21, '--lit')}
    </svg>`;
    const near = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M-40 760 C300 690 520 880 860 800 S1300 700 1700 800 V900 H-40Z" style="fill:var(--ridge-near)"/>
      <path class="river" d="M880 640 C820 720 980 760 760 820 S420 860 260 910" fill="none" stroke="url(#g-portal)" stroke-width="16" stroke-linecap="round" opacity=".5"/>
      <path class="river river-core" d="M880 640 C820 720 980 760 760 820 S420 860 260 910" fill="none" stroke="#dffaff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <g class="flower-a">${flowers(4, 26, 1600, 790, 880)}</g>
      <g class="flower-b">${flowers(7, 22, 1600, 800, 890)}</g>
    </svg>`;
    return { far, isles, mid, near };
  }

  // ---------------------------------------------------- quest locations
  // viewBox 800x450. Hotspots are real DOM buttons overlaid by quest.js.
  function sceneGarden() {
    const r = rng(77); let fl = '';
    fl += flowers(31, 60, 800, 330, 440);
    let stars = '';
    for (let i = 0; i < 40; i++) stars += `<circle cx="${(r() * 800) | 0}" cy="${(r() * 190) | 0}" r="${(0.5 + r() * 1.3).toFixed(1)}" fill="#fff" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`;
    return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="loc-svg" aria-hidden="true">
      <defs><linearGradient id="sk-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050a2e"/><stop offset=".7" stop-color="#2a2a7a"/><stop offset="1" stop-color="#4a3b94"/></linearGradient>
      <radialGradient id="pond-g"><stop offset="0" stop-color="#8fe8ff" stop-opacity=".9"/><stop offset="1" stop-color="#1d4ed8" stop-opacity=".6"/></radialGradient></defs>
      <rect width="800" height="450" fill="url(#sk-g)"/>${stars}
      <circle cx="640" cy="80" r="70" fill="url(#g-glow-lav)"/><circle cx="640" cy="80" r="30" fill="#fdf6ff"/><circle cx="630" cy="72" r="6" fill="#e6dcf7"/>
      ${ridge(5, 800, 250, 50, 50, '--g1').replace(/var\(--g1\)/, '#26225e')}
      ${castle(110, 260, 0.7, 2, '--lit').replace(/<g /, '<g fill="#1b1850" ')}
      <path d="M0 300 C200 270 400 340 800 290 V450 H0Z" fill="#15234f"/>
      <ellipse cx="400" cy="372" rx="230" ry="46" fill="url(#pond-g)"/><ellipse cx="400" cy="372" rx="230" ry="46" fill="none" stroke="#dffaff" stroke-opacity=".5"/>
      <g opacity=".9">${[[300, 366], [356, 384], [470, 362], [520, 382], [420, 392], [250, 384]].map(p => `<ellipse cx="${p[0]}" cy="${p[1]}" rx="22" ry="7" fill="#1c7a64" stroke="#7ff5c8" stroke-opacity=".6"/>`).join('')}</g>
      <path d="M0 420 C200 380 600 440 800 392 V450 H0Z" fill="#0c1738"/>
      ${fl}
      <g fill="#10143c"><path d="M690 330 q10 -90 30 -90 q20 0 26 90z"/><path d="M60 340 q8 -70 26 -70 q16 0 22 70z"/></g>
    </svg>`;
  }

  function sceneCaves() {
    const r = rng(19); let stal = '', crystals = '';
    for (let i = 0; i < 16; i++) { const x = i * 52 + r() * 20, h = 40 + r() * 90; stal += `<polygon points="${x},0 ${x + 30},0 ${x + 15},${h}"/>`; }
    for (let i = 0; i < 14; i++) { const x = 20 + r() * 760, h = 20 + r() * 50; crystals += `<polygon points="${x},450 ${x + 12},${450 - h} ${x + 24},450" fill="#4f6bff" opacity=".35"/>`; }
    return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="loc-svg" aria-hidden="true">
      <defs><radialGradient id="cave-g" cx=".5" cy=".6" r=".8"><stop offset="0" stop-color="#2b2a78"/><stop offset=".6" stop-color="#0f1040"/><stop offset="1" stop-color="#04051a"/></radialGradient></defs>
      <rect width="800" height="450" fill="url(#cave-g)"/>
      <g fill="#0a0b2b">${stal}</g>
      <path d="M0 360 C150 330 300 390 450 350 S700 340 800 370 V450 H0Z" fill="#0d0e36"/>
      ${crystals}
      <ellipse cx="400" cy="420" rx="280" ry="20" fill="url(#g-glow-cyan)" opacity=".25"/>
    </svg>`;
  }

  function sceneTower() {
    let bricks = '';
    const r = rng(41);
    for (let y = 0; y < 450; y += 30) for (let x = (y / 30 % 2) * 30 - 30; x < 800; x += 60) bricks += `<rect x="${x + 2}" y="${y + 2}" width="56" height="26" rx="2" fill="${r() > 0.5 ? '#26244f' : '#2d2b5d'}"/>`;
    return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="loc-svg" aria-hidden="true">
      <rect width="800" height="450" fill="#15142f"/>${bricks}
      <rect width="800" height="450" fill="#07061a" opacity=".55"/>
      <g><rect x="330" y="60" width="140" height="190" rx="70" fill="#0a1245" stroke="#6a65b8" stroke-width="6"/>
         <circle cx="400" cy="130" r="30" fill="#f6efff"/><circle cx="400" cy="130" r="64" fill="url(#g-glow-lav)" opacity=".8"/>
         <path d="M400 60V250M330 150H470" stroke="#6a65b8" stroke-width="5"/></g>
      <g fill="#0b0a22" stroke="#403c80" stroke-width="2"><path d="M0 450V380L140 380 140 420 280 420 280 450Z"/><path d="M520 450V410L660 410 660 380 800 380V450Z"/></g>
      <rect x="40" y="90" width="120" height="260" rx="4" fill="#1b1540" stroke="#4a3f93" stroke-width="3"/>
      ${[130, 190, 250, 310].map(y => `<path d="M40 ${y}H160" stroke="#4a3f93" stroke-width="3"/>`).join('')}
      <g stroke="#6a65b8" stroke-width="1" opacity=".5"><path d="M700 30l60 70M700 30l-10 90M700 30l70 20M700 30l-40 80"/></g>
    </svg>`;
  }

  function sceneGate() {
    let stars = '';
    const r = rng(55);
    for (let i = 0; i < 50; i++) stars += `<circle cx="${(r() * 800) | 0}" cy="${(r() * 260) | 0}" r="${(0.5 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(0.3 + r() * 0.7).toFixed(2)}"/>`;
    return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="loc-svg" aria-hidden="true">
      <defs><linearGradient id="gate-sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060a32"/><stop offset=".7" stop-color="#1c2a78"/><stop offset="1" stop-color="#3a2f86"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#gate-sk)"/>${stars}
      ${ridge(61, 800, 330, 60, 60, '--g1').replace(/var\(--g1\)/, '#1a1c58')}
      <path d="M0 380 C200 350 560 400 800 360 V450 H0Z" fill="#0f1544"/>
      <ellipse cx="400" cy="420" rx="300" ry="24" fill="url(#g-glow-cyan)" opacity=".25"/>
    </svg>`;
  }

  function sceneShrine() {
    return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="loc-svg" aria-hidden="true">
      <rect width="800" height="450" fill="#0a0626"/><circle cx="400" cy="250" r="200" fill="url(#g-glow-lav)" opacity=".5"/>
      <g stroke="#b79cff" stroke-opacity=".5" fill="none" stroke-width="2"><circle cx="400" cy="250" r="120"/><circle cx="400" cy="250" r="160"/><path d="M400 90V410M240 250H560"/></g>
      <path d="M0 400 C250 360 550 420 800 380 V450 H0Z" fill="#10082e"/>
    </svg>`;
  }

  const LOCATIONS = { garden: sceneGarden, caves: sceneCaves, tower: sceneTower, gate: sceneGate, shrine: sceneShrine };

  // ---------------------------------------------------- cracks (Vritra)
  function cracks() {
    const r = rng(9);
    function branch(x, y, ang, len, depth) {
      let d = `M${x.toFixed(0)} ${y.toFixed(0)}`, cx = x, cy = y, out = '';
      for (let i = 0; i < 5; i++) {
        ang += (r() - 0.5) * 0.9; cx += Math.cos(ang) * len / 5; cy += Math.sin(ang) * len / 5;
        d += `L${cx.toFixed(0)} ${cy.toFixed(0)}`;
        if (depth < 2 && r() > 0.55) out += branch(cx, cy, ang + (r() > 0.5 ? 0.9 : -0.9), len * 0.55, depth + 1);
      }
      return `<path pathLength="1" d="${d}"/>` + out;
    }
    let paths = '';
    [[400, 60, 1.0], [220, 40, 1.5], [600, 30, 1.7], [60, 200, 0.2], [740, 220, 2.9], [300, 440, -1.4], [520, 440, -1.7]].forEach(c => { paths += branch(c[0], c[1], c[2], 190, 0); });
    return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="crack-svg" aria-hidden="true"><g fill="none" stroke-linecap="round" stroke-linejoin="round">${paths}</g></svg>`;
  }

  window.AnantamArt = { DEFS, RELICS, LOCATIONS, worldLayers, cracks, rng };
})();
