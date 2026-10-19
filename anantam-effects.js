/* Anantam magical effects — separate from the main story logic */
(() => {
  'use strict';
  if (window.__anantamMagicEffectsInstalled) return;
  window.__anantamMagicEffectsInstalled = true;

  const reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let layer;

  function getLayer() {
    if (layer && layer.isConnected) return layer;
    layer = document.createElement('div');
    layer.className = 'anantam-spark-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    return layer;
  }

  function burst(x, y, amount = 34, spread = 1) {
    if (reducedMotion) return;
    const host = getLayer();
    const colors = ['#fff3b0', '#8feaff', '#d9a7ff', '#ffffff', '#ffd166'];
    const safeX = Number.isFinite(x) ? x : window.innerWidth / 2;
    const safeY = Number.isFinite(y) ? y : window.innerHeight / 2;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {
      const star = document.createElement('span');
      const angle = (Math.PI * 2 * i / amount) + (Math.random() - .5) * .32;
      const distance = (90 + Math.random() * Math.min(window.innerWidth, window.innerHeight) * .36) * spread;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      star.className = 'anantam-spark';
      star.textContent = Math.random() > .72 ? '✦' : '✧';
      star.style.left = `${safeX}px`;
      star.style.top = `${safeY}px`;
      star.style.setProperty('--dx', `${dx}px`);
      star.style.setProperty('--dy', `${dy}px`);
      star.style.setProperty('--spin', `${Math.round(Math.random() * 260 - 130)}deg`);
      star.style.setProperty('--duration', `${850 + Math.random() * 800}ms`);
      star.style.setProperty('--delay', `${Math.random() * 180}ms`);
      star.style.setProperty('--spark-color', colors[Math.floor(Math.random() * colors.length)]);
      star.style.setProperty('--spark-size', `${10 + Math.random() * 15}px`);
      frag.appendChild(star);
    }
    host.appendChild(frag);
    window.setTimeout(() => {
      if (host.isConnected) host.querySelectorAll('.anantam-spark').forEach(node => {
        if (node.getAnimations().every(animation => animation.playState === 'finished')) node.remove();
      });
    }, 2200);
  }

  // Ambient magic: exactly one small sparkle each second at a fresh random
  // position anywhere in the visible page, rather than repeating one fixed spot.
  function ambientSparkle() {
    if (reducedMotion || document.hidden) return;
    const host = getLayer();
    const colors = ['#fff3b0', '#8feaff', '#d9a7ff', '#ffffff', '#ffd166'];
    const star = document.createElement('span');
    star.className = 'anantam-spark';
    star.textContent = Math.random() > .72 ? '✦' : '✧';
    star.style.left = `${Math.random() * Math.max(1, window.innerWidth)}px`;
    star.style.top = `${Math.random() * Math.max(1, window.innerHeight)}px`;
    star.style.setProperty('--dx', `${Math.round((Math.random() - .5) * 70)}px`);
    star.style.setProperty('--dy', `${Math.round((Math.random() - .5) * 70)}px`);
    star.style.setProperty('--spin', `${Math.round(Math.random() * 180 - 90)}deg`);
    star.style.setProperty('--duration', '1200ms');
    star.style.setProperty('--delay', '0ms');
    star.style.setProperty('--spark-color', colors[Math.floor(Math.random() * colors.length)]);
    star.style.setProperty('--spark-size', `${12 + Math.random() * 9}px`);
    host.appendChild(star);
    window.setTimeout(() => star.remove(), 1400);
  }
  window.setInterval(ambientSparkle, 1000);

  // A chapter/scene update changes the chapter counter; one burst per actual change.
  const chapter = document.getElementById('chapterNo');
  if (chapter) {
    let lastChapter = chapter.textContent.trim();
    const observer = new MutationObserver(() => {
      const next = chapter.textContent.trim();
      if (next && next !== lastChapter) {
        lastChapter = next;
        burst(window.innerWidth * .5, window.innerHeight * .48, 64, 1.05);
      }
    });
    observer.observe(chapter, { childList: true, characterData: true, subtree: true });
  }

  // Codex cards and buttons get a small, local-origin burst that spreads across the page.
  document.addEventListener('click', event => {
    const button = event.target.closest('.anantam-hub button, .anantam-hub a, #featureModal button, #featureModal a');
    if (!button || button.disabled) return;
    const rect = button.getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 42, .9);
  }, true);

  // Optional API for other project sections without coupling to script.js.
  window.AnantamMagicEffects = Object.freeze({
    burstAt(x, y) { burst(x, y, 42, 1); },
    chapterBurst() { burst(window.innerWidth / 2, window.innerHeight / 2, 64, 1.05); }
  });
})();
