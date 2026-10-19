// ================================================
// THE LEGEND OF ANANTAM
// Complete JavaScript
// ================================================

const scenes = [
    {
        chapter: 'THE AWAKENING',
        eyebrow: 'PROLOGUE · THE FIRST LIGHT',
        title: 'A world called <em>Anantam</em>',
        text: 'Long ago, an ancient energy named Anantam protected peace and balance throughout the world. Its light connected every living thing.',
        navya: 'Welcome, traveller. I am Navya. Stay with me, and I will show you the world that shaped my destiny.',
        caption: 'AN ANCIENT ENERGY GUARDS THE WORLD',
        img: 'navya-reference.jpeg',
        mood: 'Curious and ready for the journey',
        expr: 'normal',
        time: 9000
    },
    {
        chapter: 'THE CHOSEN ONE',
        eyebrow: 'CHAPTER I · MEET YOUR GUIDE',
        title: 'I am <em>Navya</em>',
        text: 'I wear a royal blue gown, a crown lit by purple gems, and carry a star wand. But my greatest strength is the courage to follow the light, even when the path is unknown.',
        navya: 'That is me: blue gown, sparkling crown, curly hair, and my little star wand. The magic is lovely, but the journey ahead will ask much more of me.',
        caption: 'THE CHOSEN KEEPER',
        img: 'navya-reference.jpeg',
        mood: 'Warm, confident, and hopeful',
        expr: 'normal',
        time: 10000
    },
    {
        chapter: 'THE PROPHECY',
        eyebrow: 'CHAPTER II · A SHADOW RISES',
        title: 'Peace is in <em>danger</em>',
        text: 'A growing threat named Vritra endangers the balance of Anantam. To protect the world, the ancient Neelamani must be found and joined with the Sword of Anantam.',
        navya: 'The light is fading. Vritra threatens everything Anantam protects. I cannot let fear decide what happens to our world.',
        caption: 'A DARKNESS APPROACHES',
        img: 'vritra.png',
        mood: 'Angry, alert, and determined',
        expr: 'angry',
        time: 10000
    },
    {
        chapter: 'NANDHAN',
        eyebrow: 'CHAPTER III · THE SWORD BEARER',
        title: 'The hero named <em>Nandhan</em>',
        text: 'Nandhan is the only one who can wield the Sword of Anantam. When the time comes to face Vritra, his courage and the ancient sword may be the world’s last hope.',
        navya: 'N-Nandhan? He is the only one who can wield the Sword of Anantam. I trust his courage... and maybe I am blushing a little. Please do not tell him!',
        caption: 'THE ONLY ONE WHO CAN WIELD THE SWORD',
        img: 'nandhan.png',
        mood: 'Shy, blushing, and hopeful',
        expr: 'blush',
        time: 10000
    },
    {
        chapter: 'THE NEELAMANI QUEST',
        eyebrow: 'CHAPTER IV · THREE RELICS',
        title: 'Find the <em>three relics</em>',
        text: 'A map points the way forward. Navya must find the Lotus, the Diamond, and the Key. Together, these relics will open the Gate of Anantam and lead the quest toward its next mystery.',
        navya: 'The map has three signs: the Lotus, the Diamond, and the Key. Each one brings us closer to the Gate. Will you follow the clues with me?',
        caption: 'LOTUS · DIAMOND · KEY',
        img: 'navya-praying.png',
        mood: 'Focused and determined',
        expr: 'normal',
        time: 11000
    },
    {
        chapter: 'THE GATE',
        eyebrow: 'CHAPTER V · THE JOURNEY BEGINS',
        title: 'The legend is <em>not finished</em>',
        text: 'The Neelamani must unite with the Sword of Anantam before Nandhan can face Vritra. The Gate waits beyond the relics. Our adventure has only begun.',
        navya: 'You have heard the beginning, traveller. Keep your eyes open. Anantam has secrets, and one of them may be hiding in plain sight.',
        caption: 'EVERY SECRET LEAVES A TRACE',
        img: 'navya-determined.png',
        mood: 'Brave, excited, and watchful',
        expr: 'normal',
        time: 11000
    },
    {
        chapter: 'THE RELICS AWAKEN',
        eyebrow: 'CHAPTER VI · THREE PROMISES',
        title: 'A little light in every <em>relic</em>',
        text: 'The Lotus, Diamond, and Key are more than objects on an old map. Each carries a different promise: compassion, clarity, and the courage to open a new path. As the relics draw closer together, faint lines of light begin to connect them, as though Anantam itself is remembering an ancient song. Navya studies the map carefully, knowing that haste could hide a clue that patience would reveal.',
        navya: 'Oh! Look at them sparkle! The Lotus reminds us to be kind, the Diamond helps us see clearly, and the Key says we can be brave even when a door is new. Let’s keep them safe, okay?',
        caption: 'THREE RELICS · THREE PROMISES',
        img: 'navya-praying.png',
        mood: 'Delighted, thoughtful, and hopeful',
        expr: 'blush',
        time: 13000
    },
    {
        chapter: 'THE GATE OF ANANTAM',
        eyebrow: 'CHAPTER VII · A DOOR OF STARS',
        title: 'The gate remembers its <em>keepers</em>',
        text: 'When the three relics are brought together, their symbols form a pattern that matches the markings around the Gate of Anantam. The stone does not move at once. First, a soft hum rises beneath the ground; then tiny lights appear along the carvings, one after another. The gate seems to be asking for more than strength. It asks its visitors to remember why the world deserves to be protected. Beyond it lies the next part of the journey, and the answer cannot be rushed.',
        navya: 'It’s opening… slowly! I think the gate wants us to remember what we’re protecting: every little light, every friend, every dream. Stay close, traveller. We’ll take the next step together.',
        caption: 'THE GATE GLOWS WITH OLD MAGIC',
        img: 'navya-determined.png',
        mood: 'Amazed, brave, and gentle',
        expr: 'normal',
        time: 14000
    },
    {
        chapter: 'THE FORGING OF ANANTAM',
        eyebrow: 'CHAPTER VIII · THE TWO RELICS BECOME ONE',
        title: 'When <em>three plus two</em> become one',
        text: 'At the heart of the ancient gate, Neelamani awakens with a brilliant blue pulse. The Sword of Anantham answers from across the chamber. Their runes shine in harmony, and the two relics rise into the air. Blue cosmic threads spiral between them as their ancient powers recognise one another. The light grows brighter until the relics merge in a single flash, forging a new weapon: the Celestial Sword of Anantam.',
        navya: 'Look, traveller! Neelamani and the Sword of Anantham are joining their powers. This is no ordinary weapon—it carries the strength of both relics. When Nandhan receives it, he may finally have the power to stand against Vritra!',
        caption: 'NEELAMANI + THE SWORD OF ANANTHAM — THE CELESTIAL SWORD IS FORGED',
        img: 'forged-anantam-sword.png',
        mood: 'Astonished, hopeful, and filled with ancient wonder',
        expr: 'normal',
        time: 18000,
        fusion: true
    },
    {
        chapter: 'A NEW BEGINNING',
        eyebrow: 'CHAPTER VIII · THE STORY CONTINUES',
        title: 'The first page of what comes <em>next</em>',
        text: 'The path beyond the gate is quiet, filled with floating motes of light and the sound of leaves moving in a breeze no one can feel. Navya knows that Vritra’s threat has not vanished, and Nandhan’s part in the prophecy is still ahead. Yet the journey has changed them: every clue has taught patience, every companion has offered a reason to hope, and every small act of courage has made the darkness feel less enormous. This is not the end of the legend. It is the page where the next chapter begins.',
        navya: 'We haven’t finished our adventure—not even close! There are more secrets to understand, more friends to meet, and so many tiny wonders waiting for us. Thank you for turning the page with me. Shall we keep exploring?',
        caption: 'THE NEXT CHAPTER WAITS',
        img: 'navya-loving.png',
        mood: 'Sweet, excited, and full of wonder',
        expr: 'blush',
        time: 15000
    }
];


/* ==========================================
   👑 ANANTAM: REMEMBER THE VISITOR
   ========================================== */

const ANANTAM_NAME_KEY = "anantamVisitorNameV1";
const ANANTAM_VISITED_KEY = "anantamHasVisitedV1";

let visitorName = "";
let isReturningVisitor = false;

try {
    visitorName = (localStorage.getItem(ANANTAM_NAME_KEY) || localStorage.getItem("anantamVisitorName") || "").trim();
    isReturningVisitor = !!visitorName || localStorage.getItem(ANANTAM_VISITED_KEY) === "true";
    if (visitorName && !localStorage.getItem(ANANTAM_NAME_KEY)) {
        localStorage.setItem(ANANTAM_NAME_KEY, visitorName);
    }
} catch (error) {
    console.warn("Visitor memory is unavailable in this browser.");
}

function updateVisitorNameDisplay() {
    const display = document.getElementById("visitorNameDisplay");

    if (display) {
        display.textContent = visitorName ? `👑 ${visitorName}` : "👑 Your adventure awaits";
    }
}

function personalizeVisitorText(text) {
    if (typeof text !== "string") return text;

    return text.replace(/\btraveller\b/gi, () => visitorName || "friend");
}

function saveVisitorName(name) {
    visitorName = name.trim().replace(/\s+/g, " ").slice(0, 24);
    if (!visitorName) return;

    try {
        localStorage.setItem(ANANTAM_NAME_KEY, visitorName);
        localStorage.setItem("anantamVisitorName", visitorName); // compatibility with older site features
        localStorage.setItem(ANANTAM_VISITED_KEY, "true");
        localStorage.setItem("anantamVisitCount", String((Number(localStorage.getItem("anantamVisitCount")) || 0) + 1));
    } catch (error) {
        console.warn("Could not save the visitor name.");
    }

    document.body.classList.remove("name-gate");
    updateVisitorNameDisplay();
}

function getNavyaWelcomeMessage() {
    if (isReturningVisitor) {
        return `You're back, ${visitorName}! 💙 I’m so happy to see you again. Ready for another adventure?`;
    }

    return `Welcome, ${visitorName || "friend"}! ✨ A magical adventure awaits you!`;
}

/* Connect to your EXISTING name-entry form. */
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("navyaNameInput");
    const submit = document.getElementById("navyaNameButton");
    const welcome = document.getElementById("navyaWelcome");
    const greeting = document.getElementById("navyaGreeting");
    const message = document.getElementById("navyaMessage");
    const nameForm = document.getElementById("navyaNameForm");
    const changeButton = document.getElementById("navyaChangeName");

    updateVisitorNameDisplay();

    if (isReturningVisitor && visitorName) {
        document.body.classList.remove("name-gate");
        if (greeting) greeting.textContent = `👑 Welcome back, ${visitorName}!`;
        if (message) message.textContent = getNavyaWelcomeMessage();
        if (input) input.value = visitorName;
        if (nameForm) nameForm.hidden = true;
        if (changeButton) changeButton.hidden = false;
    }

    if (submit && input) {
        submit.addEventListener("click", () => {
            const name = input.value.trim();

            if (!name) {
                input.focus();
                input.placeholder = "Please enter your nickname ✨";
                return;
            }

            saveVisitorName(name);
            isReturningVisitor = false;

            if (greeting) greeting.textContent = `👑 Welcome, ${visitorName}!`;
            if (message) message.textContent = getNavyaWelcomeMessage();
            if (nameForm) nameForm.hidden = true;
            if (changeButton) changeButton.hidden = false;

            isReturningVisitor = true;
        });

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") submit.click();
        });
    }

    if (changeButton && input) {
        changeButton.addEventListener("click", () => {
            if (nameForm) nameForm.hidden = false;
            if (input) {
                input.value = visitorName;
                input.focus();
            }
        });
    }
});

let current = 0;
let paused = false;
let timer = null;
let sound = false;

const typingTimers = new WeakMap();

const $ = id => document.getElementById(id);


// ================================================
// STORY TEXT ANIMATION
// ================================================

function typeText(element, text, speed = 24) {
    const oldTimer = typingTimers.get(element);

    if (oldTimer) {
        clearTimeout(oldTimer);
    }

    element.textContent = '';

    let i = 0;

    function typeNext() {
        if (i >= text.length) return;

        element.textContent += text.charAt(i++);

        const t = setTimeout(typeNext, speed);
        typingTimers.set(element, t);
    }

    typeNext();
}


// ================================================
// NAVYA'S VOICE
// ================================================

function chooseNavyaVoice() {
    if (!('speechSynthesis' in window)) return null;

    const voices = speechSynthesis.getVoices();

    return voices.find(v =>
        /samantha|aria|jenny|zira|libby|sonia|eva|tessa|joanna|karen|moira|fiona|google uk english female/i.test(v.name) &&
        /^en(-|$)/i.test(v.lang)
    ) ||
    voices.find(v => /^en(-|$)/i.test(v.lang)) ||
    voices[0] ||
    null;
}

function speak(text) {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = chooseNavyaVoice();
    utterance.rate = 0.93;
    utterance.pitch = 1.62;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
}


// ================================================
// SHOW STORY SCENES
// ================================================

function showScene(index) {
    current = (index + scenes.length) % scenes.length;
    recordSceneProgress(current);
    const storySide = document.querySelector('.story-side');
    if (storySide) {
        storySide.classList.remove('cinematic-arrival');
        void storySide.offsetWidth;
        storySide.classList.add('cinematic-arrival');
        setTimeout(() => storySide.classList.remove('cinematic-arrival'), 950);
    }

    const s = scenes[current];

    $('chapterNo').textContent =
        String(current + 1).padStart(2, '0');

    $('chapterName').textContent = s.chapter;

    // The magical egg hunt appears only in the final chapter.
    const eggHunt = $('finalEggHunt');
    if (eggHunt) {
        eggHunt.hidden = current !== scenes.length - 1;
        if (current === scenes.length - 1) {
            refreshMagicEggs();
        }
    }

    $('eyebrow').textContent = s.eyebrow;
    $('title').innerHTML = s.title;

   typeText(
    $("storyText"),
    personalizeVisitorText(s.text),
    22
);

typeText(
    $("navyaLine"),
    personalizeVisitorText(s.navya),
    27
);

updateVisitorNameDisplay();
    $('navyaMood').textContent = s.mood;
    $('artCaption').textContent = s.caption;

    $('sceneCounter').textContent =
        `SCENE ${current + 1} OF ${scenes.length}`;

    $('progress').style.width =
        `${((current + 1) / scenes.length) * 100}%`;

    const navya = $('navya');

    if (s.expr === 'blush') {
        navya.src = 'navya-loving.png';

        navya.parentElement.classList.add('blush');
        navya.parentElement.classList.remove('angry');

    } else if (s.expr === 'angry') {
        navya.src = 'navya-determined.png';

        navya.parentElement.classList.add('angry');
        navya.parentElement.classList.remove('blush');

    } else {
        navya.src = 'navya-reference.jpeg';

        navya.parentElement.classList.remove('blush', 'angry');
    }

    const featured = $('featured');
    const fusionStage = $('fusionStage');
    const artFrame = featured ? featured.closest('.art-frame') : null;
    const isFusionScene = !!s.fusion;

    if (fusionStage) {
        fusionStage.hidden = !isFusionScene;
        fusionStage.classList.remove('fusion-play');
        if (artFrame) artFrame.classList.toggle('is-fusion-scene', isFusionScene);
        if (isFusionScene) {
            // Re-trigger the sequence each time visitors enter Scene 9.
            void fusionStage.offsetWidth;
            requestAnimationFrame(() => fusionStage.classList.add('fusion-play'));
        }
    }
    if (featured) {
        featured.classList.toggle('fusion-featured-hidden', isFusionScene);
        featured.classList.add('fade');
        setTimeout(() => {
            featured.src = s.img;
            featured.alt = s.caption;
            featured.classList.remove('fade');
        }, 260);
    }

    if (sound) {
        speak(s.navya);
    }

    clearTimeout(timer);

    // Keep the final chapter open so visitors have time to discover the eggs.
    if (!paused && current < scenes.length - 1) {
        timer = setTimeout(() => {
            showScene(current + 1);
        }, s.time);
    }

    // Tell the cinema/quest layers which scene is now showing.
    document.dispatchEvent(new CustomEvent('anantam:scene', { detail: { index: current, scene: s } }));
}


// ================================================
// STORY CONTROLS
// ================================================

$('nextBtn').addEventListener('click', () => {
    showScene(current + 1);
});

$('pauseBtn').addEventListener('click', () => {
    paused = !paused;

    $('pauseBtn').textContent =
        paused ? '▶ Resume story' : 'Ⅱ Pause story';

    if (paused) {
        clearTimeout(timer);

        if ('speechSynthesis' in window) {
            speechSynthesis.pause();
        }
    } else {
        if ('speechSynthesis' in window) {
            speechSynthesis.resume();
        }

        showScene(current);
    }
});

$('soundBtn').addEventListener('click', () => {
    sound = !sound;

    $('soundBtn').textContent =
        sound ? '🔊 Narration on' : '🔊 Narration off';

    if (sound) {
        speak(scenes[current].navya);
    } else if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
});


// ================================================
// NAVYA'S EYE MOVEMENT
// ================================================

(() => {
    const wrap = document.querySelector('.character-wrap');
    if (!wrap) return;
    const portrait = document.getElementById('navya');
    const pupils = wrap.querySelectorAll('.eye i');
    let raf = 0;
    let targetX = 0, targetY = 0;
    function resetPose() { targetX = 0; targetY = 0; applyPose(); }
    function applyPose() {
        raf = 0;
        if (portrait && !wrap.classList.contains('model-mode')) {
            portrait.style.setProperty('--navya-shift-x', `${targetX * 5}px`);
            portrait.style.setProperty('--navya-shift-y', `${targetY * 3}px`);
            portrait.style.setProperty('--navya-lean', `${targetX * 1.15}deg`);
        }
        pupils.forEach(p => { p.style.transform = `translate(${targetX * 2.8}px, ${targetY * 2.2}px)`; });
    }
    wrap.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch' || wrap.classList.contains('model-mode')) return;
        const r = wrap.getBoundingClientRect();
        targetX = Math.max(-1, Math.min(1, ((e.clientX - r.left) / Math.max(1, r.width) - .5) * 2));
        targetY = Math.max(-1, Math.min(1, ((e.clientY - r.top) / Math.max(1, r.height) - .5) * 2));
        if (!raf) raf = requestAnimationFrame(applyPose);
    }, { passive: true });
    wrap.addEventListener('pointerleave', resetPose, { passive: true });
})();


// ================================================
// DAY AND NIGHT MODE
// ================================================

$('moodBtn').addEventListener('click', () => {
    document.body.classList.toggle('day-mode');

    const day = document.body.classList.contains('day-mode');

    $('moodBtn').textContent =
        day ? '☀️ Day mode' : '🌙 Night mode';

    $('navyaMood').textContent = day
        ? 'Bright, cheerful, and hopeful'
        : scenes[current].mood;
});


// ================================================
// FLASHLIGHT EFFECT
// ================================================

function moveLight(e) {
    const x = e.clientX;
    const y = e.clientY;

    if (x != null && y != null) {
        document.documentElement.style.setProperty(
            '--light-x',
            x + 'px'
        );

        document.documentElement.style.setProperty(
            '--light-y',
            y + 'px'
        );
    }
}

document.addEventListener('pointermove', moveLight);

$('flashBtn').addEventListener('click', () => {
    document.body.classList.toggle('flashlight-on');

    const on = document.body.classList.contains('flashlight-on');

    $('flashBtn').textContent =
        on ? '🔦 Light on' : '🔦 Light off';
});


// ================================================
// REAL BACKGROUND MUSIC
// IMPORTANT:
// Place a valid file named magical-theme.mp3
// in the same folder as index.html.
// This replaces the old electronic synth sound.
// ================================================

let backgroundAudio = null;

function setupBackgroundMusic() {
    const musicButton = $('musicBtn');

    if (!musicButton) return;

    // Create a real audio player.
    backgroundAudio = new Audio('magical-theme.mp3');

    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.25;
    backgroundAudio.preload = 'auto';

    musicButton.textContent = '🎵 Play magical music';

    backgroundAudio.addEventListener('error', () => {
        musicButton.textContent = '⚠️ Music file not found';

        console.error(
            'Could not load magical-theme.mp3. ' +
            'Make sure the file exists beside index.html.'
        );
    });

    musicButton.addEventListener('click', async () => {
        if (!backgroundAudio) return;

        if (backgroundAudio.paused) {
            try {
                await backgroundAudio.play();

                musicButton.textContent = '⏸️ Pause magical music';

            } catch (error) {
                console.error('Music playback failed:', error);

                musicButton.textContent = '⚠️ Cannot play music';

                alert(
                    'Music could not start. Check that ' +
                    'magical-theme.mp3 exists in your website folder ' +
                    'and is a valid audio file.'
                );
            }
        } else {
            backgroundAudio.pause();

            musicButton.textContent = '🎵 Play magical music';
        }
    });

    backgroundAudio.addEventListener('play', () => {
        musicButton.textContent = '⏸️ Pause magical music';
    });

    backgroundAudio.addEventListener('pause', () => {
        musicButton.textContent = '🎵 Play magical music';
    });
}


// ================================================
// SECRET EASTER EGG
// ================================================

let secretTimer;

const rune = document.querySelector('.rune');

if (rune) {
    rune.addEventListener('pointerenter', () => {
        secretTimer = setTimeout(() => {
            const secret = $('secret');

            secret.textContent =
                '✧ Navya whispers: “The brightest magic is hidden ' +
                'where the story begins.” You found the first secret ' +
                'of Anantam.';

            secret.classList.add('show');

            if (current === 5) {
                $('navyaMood').textContent =
                    'Surprised that you found the secret!';
            }
        }, 1800);
    });

    rune.addEventListener('pointerleave', () => {
        clearTimeout(secretTimer);
    });

    rune.addEventListener('click', () => {
        $('secret').textContent =
            '✧ Navya whispers: “The brightest magic is hidden ' +
            'where the story begins.” You found the first secret ' +
            'of Anantam.';

        $('secret').classList.add('show');
    });
}


// ================================================
// MODAL SYSTEM
// ================================================

const modal = $('featureModal');
const modalBody = $('modalBody');

function openModal(title, eyebrow, html) {
    $('modalTitle').textContent = title;
    $('modalEyebrow').textContent = eyebrow;

    modalBody.innerHTML = html;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    if (typeof stopGame === 'function') {
        stopGame();
    }
}

$('closeModal').addEventListener('click', closeModal);

modal.addEventListener('click', e => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
});


// ================================================
// FINAL CHAPTER: THREE MAGICAL EGG REWARDS
// ================================================

const magicalEggs = {
    saviour: {
        title: 'Saviour of Magical Objects',
        symbol: '🏆',
        heading: 'THE ANANTAM COUNCIL HAS CHOSEN YOU!',
        message: 'You have been chosen as the Saviour of Magical Objects. Ancient objects have awakened, and their magic is calling to you. Your journey is no longer that of an ordinary visitor.'
    },
    keeper: {
        title: 'Keeper of Forgotten Secrets',
        symbol: '🔮',
        heading: 'A SECRET HAS RECOGNISED YOU',
        message: 'You found what even the ancient guardians forgot. Not every truth is written in a book, and not every secret wishes to be found. You are now the Keeper of Forgotten Secrets.'
    },
    guardian: {
        title: 'Eternal Guardian of Anantam',
        symbol: '👑',
        heading: 'THE FINAL SEAL HAS BEEN BROKEN!',
        message: 'The ancient magic recognises you. Your curiosity has carried you farther than most will ever travel. You are now the Eternal Guardian of Anantam.'
    }
};

const eggStorageKey = 'anantamMagicalEggsV1';

function readFoundEggs() {
    try {
        const value = JSON.parse(localStorage.getItem(eggStorageKey) || '[]');
        return Array.isArray(value) ? value.filter(id => Object.prototype.hasOwnProperty.call(magicalEggs, id)) : [];
    } catch (error) {
        return [];
    }
}

let foundMagicalEggs = readFoundEggs();

function saveFoundEggs() {
    try {
        localStorage.setItem(eggStorageKey, JSON.stringify(foundMagicalEggs));
    } catch (error) {
        // The egg hunt still works for this visit if browser storage is unavailable.
    }
}

function refreshMagicEggs() {
    const count = foundMagicalEggs.length;
    document.querySelectorAll('[data-magic-egg]').forEach(button => {
        const id = button.dataset.magicEgg;
        const found = foundMagicalEggs.includes(id);
        button.classList.toggle('is-found', found);
        button.setAttribute('aria-pressed', String(found));
        const status = button.querySelector('[data-egg-status="' + id + '"]');
        if (status) status.textContent = found ? '✦ Discovered!' : 'Undiscovered';
    });

    const status = $('eggCollectionStatus');
    if (status) {
        status.textContent = count === 3
            ? '✧ ALL 3 EGGS FOUND — THE LEGEND REMEMBERS YOU ✧'
            : count + ' of 3 magical eggs discovered';
    }
}

function discoverMagicalEgg(id) {
    const egg = magicalEggs[id];
    if (!egg) return;

    const isNew = !foundMagicalEggs.includes(id);
    if (isNew) {
        foundMagicalEggs.push(id);
        saveFoundEggs();
        refreshMagicEggs();
    }

    const allFound = foundMagicalEggs.length === 3;
    const title = allFound
        ? 'The Eternal Guardian of Anantam'
        : egg.title;

    const heading = allFound
        ? '✧ YOU HAVE FOUND ALL THREE MAGICAL EGGS ✧'
        : egg.heading;

    const message = allFound
        ? 'The three hidden treasures have awakened. The Anantam Council honours you as the Eternal Guardian of Anantam. Your curiosity has become part of this world’s legend.'
        : egg.message;

    openModal(
        title,
        isNew ? 'MAGICAL REWARD UNLOCKED' : 'YOUR DISCOVERED REWARD',
        '<div class="egg-reward">' +
            '<div class="egg-reward-symbol" aria-hidden="true">' + (allFound ? '👑' : egg.symbol) + '</div>' +
            '<h3>' + heading + '</h3>' +
            '<p>' + message + '</p>' +
            '<div class="egg-reward-badge">✦ ' + title + ' ✦</div>' +
            (allFound ? '<p class="egg-reward-finale">All three secrets are yours. Thank you for exploring Anantam!</p>' : '') +
        '</div>'
    );
}

document.querySelectorAll('[data-magic-egg]').forEach(button => {
    button.addEventListener('click', () => {
        // Keep this interaction available only in the final story chapter.
        if (current !== scenes.length - 1) return;
        discoverMagicalEgg(button.dataset.magicEgg);
    });
});


// ================================================
// DREAM DELIVERY MAP AND RELICS
// ================================================

const relics = [
    {
        id: 'lotus',
        icon: '🌸',
        name: 'Lotus',
        clue: 'A flower hidden in the Moonlit Garden.'
    },
    {
        id: 'diamond',
        icon: '💎',
        name: 'Diamond',
        clue: 'A crystal guarded by the Singing Caves.'
    },
    {
        id: 'key',
        icon: '🗝️',
        name: 'Key',
        clue: 'An ancient key resting in the Forgotten Tower.'
    }
];

function getRelics() {
    try {
        return JSON.parse(
            localStorage.getItem('anantamRelics') || '[]'
        );
    } catch (e) {
        return [];
    }
}

function saveRelics(items) {
    localStorage.setItem('anantamRelics', JSON.stringify(items));
}

function renderDreamMap() {
    const found = getRelics();

    const stops = relics.map(r => `
        <div class="map-stop ${found.includes(r.id) ? 'relic-found' : ''}">
            <b>${found.includes(r.id) ? '✅' : r.icon}</b>
            ${r.name}
            <small>${found.includes(r.id) ? 'FOUND' : 'NOT FOUND'}</small>
        </div>
    `).join('');

    const gateOpen = relics.every(r => found.includes(r.id));

    openModal(
        'Dream Delivery Map',
        'THE QUEST OF ANANTAM',
        `
        <p class="body-copy">
            Help Navya collect all three relics by winning the mini-game.
            Every victory discovers a relic.
        </p>

        <div class="map-path"></div>

        <div class="map-list">
            ${stops}

            <div class="map-stop ${gateOpen ? 'relic-found' : ''}">
                <b>${gateOpen ? '✨' : '🚪'}</b>
                Gate
                <small>${gateOpen ? 'UNLOCKED' : 'LOCKED'}</small>
            </div>

            <div class="map-stop ${gateOpen ? 'relic-found' : ''}">
                <b>🔵</b>
                Neelamani
                <small>${gateOpen ? 'PATH REVEALED' : 'AHEAD'}</small>
            </div>
        </div>

        <h3 style="font:500 18px Cinzel,serif;color:var(--gold);margin:24px 0 10px">Explore the Realm</h3>
        <p style="color:#c8b9e8;font-size:11px;line-height:1.7">Choose a location to read its clue. Some paths unlock as you collect relics or solve secrets.</p>
        <div class="adventure-location-grid">
            <button class="adventure-location" data-location="garden"><span>🌙</span><strong>Moonlit Garden</strong><small>OPEN · A quiet flower watches the moon.</small></button>
            <button class="adventure-location" data-location="caves" ${found.includes('lotus') ? '' : 'disabled'}><span>🎶</span><strong>Singing Caves</strong><small>${found.includes('lotus') ? 'UNLOCKED · A crystal hums in the dark.' : 'LOCKED · Find the Lotus first.'}</small></button>
            <button class="adventure-location" data-location="tower" ${found.includes('diamond') ? '' : 'disabled'}><span>🏰</span><strong>Forgotten Tower</strong><small>${found.includes('diamond') ? 'UNLOCKED · An old keyhole waits.' : 'LOCKED · Find the Diamond first.'}</small></button>
            <button class="adventure-location" data-location="gate" ${gateOpen ? '' : 'disabled'}><span>🚪</span><strong>Gate of Anantam</strong><small>${gateOpen ? 'UNLOCKED · Three relics awaken the gate.' : 'LOCKED · Collect the Lotus, Diamond and Key.'}</small></button>
            <button class="adventure-location" data-location="shrine" ${(safeRead('anantamRuneSolvedV1', false) || foundMagicalEggs.length === 3) ? '' : 'disabled'}><span>🔐</span><strong>Hidden Rune Shrine</strong><small>${(safeRead('anantamRuneSolvedV1', false) || foundMagicalEggs.length === 3) ? 'UNLOCKED · The rune remembers your name.' : 'HIDDEN · Solve the Forbidden Mystery or find all eggs.'}</small></button>
        </div>

        <p style="color:#c8b9e8;line-height:1.7;margin-top:18px">
            ${found.length}/3 relics found.
            ${
                gateOpen
                    ? 'You found all three relics! The Gate of Anantam opens.'
                    : 'Win Catch the Dreams to discover the next relic.'
            }
        </p>

        <button id="mapPlayGame" class="primary" style="margin-top:10px">
            🎮 ${gateOpen ? 'Play again' : 'Find the next relic'}
        </button>
        `
    );

    $('mapPlayGame').addEventListener('click', startDreamGame);

    const locationDetails = {
        garden: ['Moonlit Garden', '🌙', 'Silver petals open only when someone approaches with a patient heart. The Lotus is said to rest where moonlight touches the oldest pool.'],
        caves: ['Singing Caves', '🎶', 'The walls hum with a crystal song. Listen for the clearest note; it points toward the Diamond.'],
        tower: ['Forgotten Tower', '🏰', 'Dust covers the tower stairs, but the lock is untouched. The Key may be close enough to hear turning in the wind.'],
        gate: ['Gate of Anantam', '🚪', 'The Lotus, Diamond and Key glow together. The Gate recognises your effort and reveals a path toward the Neelamani.'],
        shrine: ['Hidden Rune Shrine', '🔐', 'A hidden shrine glimmers beyond the ordinary map. Its rune speaks of light, memory, and the secrets that curiosity can uncover.']
    };
    document.querySelectorAll('[data-location]').forEach(button => button.addEventListener('click', () => {
        if (button.disabled) return;
        const place = locationDetails[button.dataset.location];
        openModal(place[0], 'A DISCOVERED PLACE IN ANANTAM', `<div class="location-reveal"><div>${place[1]}</div><p>${place[2]}</p><span>✧ CLUE ADDED TO YOUR JOURNEY ✧</span></div><button id="returnAdventureMap" class="secondary">← Return to the map</button>`);
        $('returnAdventureMap').addEventListener('click', renderDreamMap);
    }));
}

$('mapBtn').addEventListener('click', renderDreamMap);


// ================================================
// INTERACTIVE STORYBOOK
// ================================================

const bookPages = [
    { title: 'Page I · The First Light', text: 'Long ago, the energy of Anantam connected every living thing. It moved through forests, rivers, stars, and the hearts of people, helping the world remain in balance. The light was not owned by one person; it was a promise shared by all who cared for the world.' },
    { title: 'Page II · Meet Navya', text: 'Navya wears a royal blue gown, a crown lit by violet gems, and carries a little star wand. Her magic is beautiful, but her most important strength is her willingness to keep going when she feels uncertain. She hopes to protect the light without losing the kindness that makes it worth protecting.' },
    { title: 'Page III · A Shadow Named Vritra', text: 'A shadow called Vritra threatens the balance of Anantam. The danger is serious, but fear alone cannot solve it. The prophecy points toward the ancient Neelamani and the Sword of Anantam, suggesting that the world will need both wisdom and courage.' },
    { title: 'Page IV · Nandhan and the Sword', text: 'Nandhan is the only one able to wield the Sword of Anantam. His role is important, but no hero should have to carry a whole world alone. Navya trusts his courage and hopes that their different strengths will help them face what is coming.' },
    { title: 'Page V · The Map of Three Relics', text: 'The map shows three signs: the Lotus, the Diamond, and the Key. Each relic is a clue and a promise. The Lotus stands for compassion, the Diamond for clear sight, and the Key for courage to open a path. Finding them means paying attention to the world instead of rushing past its small details.' },
    { title: 'Page VI · The Neelamani Quest', text: 'The quest is not simply a race to gather treasures. Every step asks Navya and her companions to be patient, brave, and thoughtful. The Neelamani must be found, and the relics help lead the way toward the Gate of Anantam. Even a quiet clue may matter.' },
    { title: 'Page VII · The Gate Remembers', text: 'When the three relics are brought together, their symbols echo the markings around the ancient gate. The stone answers with a gentle hum and tiny lights. It seems to ask its visitors to remember why they came: not for glory alone, but to protect the world and the people who call it home.' },
    { title: 'Page VIII · A World Full of Little Wonders', text: 'Anantam is made of more than prophecies and battles. It is also the soft rustle of leaves, a friend’s reassuring words, a light in a window, and the courage to try again. These little wonders help Navya remember what she is fighting for when the road feels difficult.' },
    { title: 'Page IX · The Story Continues', text: 'Beyond the gate, the path glows with drifting motes of light. Vritra’s threat has not vanished, and Nandhan’s part in the prophecy is still ahead. But the journey has taught its travellers that hope grows through kindness, curiosity, and courage. This is not the end of the legend—it is the beginning of the next page.' },
    { title: 'Page X · A Wish for the Traveller', text: 'Dear traveller, may you carry a little of Anantam’s light with you. Be curious when a mystery appears, gentle when someone needs help, and brave enough to take one small step at a time. The world of this story keeps growing whenever someone chooses to explore it with an open heart.' },
    { title: 'Page XI · The Whispering Grove', text: 'Beyond the Gate, Navya discovers a grove where the leaves hold tiny echoes of forgotten promises. The trees do not reveal the future; they remind visitors of the kind things they have already done. Navya listens quietly, learning that protecting Anantam means noticing small needs as carefully as great dangers. A silver trail appears between the roots, pointing toward a place where the Neelamani may answer one question—but only if the question is asked with honesty.' },
    { title: 'Page XII · The Star-Wand Promise', text: 'That evening, Navya rests beneath a sky full of violet stars. Her wand glimmers, not because every wish can instantly come true, but because hope can help people choose their next brave step. She makes a promise to use her magic thoughtfully, to ask for help when a problem is too large, and to keep listening to the people she hopes to protect. Somewhere beyond the grove, Vritra’s shadow still moves. The next part of the legend will ask for courage, patience, friendship, and a clear heart.' }
];

let bookIndex = 0;

function renderBook() {
    const page = $('bookPage');

    if (!page) return;

    const p = bookPages[bookIndex];

    page.innerHTML = `
        <h3 style="font-size:22px;font-weight:bold;margin-bottom:12px">
            ${p.title}
        </h3>

        <p>${p.text}</p>
    `;

    $('bookCount').textContent =
        'Page ' + (bookIndex + 1) + ' of ' + bookPages.length;

    $('bookPrev').disabled = bookIndex === 0;

    $('bookNext').disabled =
        bookIndex === bookPages.length - 1;
}

$('bookBtn').addEventListener('click', () => {
    openModal(
        'The Storybook',
        'TURN THE PAGES',
        `
        <div id="bookPage" class="book-page"></div>

        <div class="book-actions">
            <button id="bookPrev" class="secondary">
                ← Previous
            </button>

            <span id="bookCount"
                style="align-self:center;color:#d4c8ef">
            </span>

            <button id="bookNext" class="primary">
                Next →
            </button>
        </div>
        `
    );

    bookIndex = 0;

    renderBook();

    $('bookPrev').addEventListener('click', () => {
        if (bookIndex > 0) {
            bookIndex--;
            renderBook();
        }
    });

    $('bookNext').addEventListener('click', () => {
        if (bookIndex < bookPages.length - 1) {
            bookIndex++;
            renderBook();
        }
    });
});


// ================================================
// CATCH THE DREAMS MINI-GAME
// Catch 3 dreams to win immediately.
// ================================================

let gameScore = 0;
let gameTime = 60;
let gameInterval = null;
let spawnInterval = null;
let gameActive = false;

function stopGame() {
    clearInterval(gameInterval);
    clearInterval(spawnInterval);

    gameInterval = null;
    spawnInterval = null;
    gameActive = false;
}

function spawnDream() {
    const area = $('dreamGame');

    if (!area || !gameActive || gameTime <= 0) {
        return;
    }

    const target = document.createElement('button');

    target.type = 'button';
    target.className = 'dream-target';

    target.textContent = ['✨', '🌟', '💜', '🔮'][
        Math.floor(Math.random() * 4)
    ];

    target.setAttribute('aria-label', 'Catch dream orb');

    target.style.left = (4 + Math.random() * 84) + '%';
    target.style.top = (8 + Math.random() * 72) + '%';

    target.addEventListener('click', () => {
        if (!target.isConnected || !gameActive) {
            return;
        }

        gameScore++;

        const score = $('gameScore');

        if (score) {
            score.textContent = gameScore;
        }

        target.remove();

        // WIN IMMEDIATELY WHEN THE THIRD DREAM IS CAUGHT.
        if (gameScore >= 3) {
            completeDreamWin();
        }
    });

    area.appendChild(target);

    setTimeout(() => {
        target.remove();
    }, 2300);
}

function completeDreamWin() {
    if (!gameActive) return;

    stopGame();

    document.querySelectorAll('.dream-target').forEach(el => {
        el.remove();
    });

    const result = $('gameResult');

    if (!result) return;

    const found = getRelics();

    const next = relics.find(r => !found.includes(r.id));

    if (next) {
        found.push(next.id);

        saveRelics(found);

        result.innerHTML = `
            🏆 <strong>YOU WIN!</strong> 🎉
            <br>
            Navya found the <strong>${next.icon} ${next.name}</strong>!
            <br>
            <span>${next.clue}</span>
            <br>
            ${
                found.length === 3
                    ? '✨ All three relics are collected. The Gate of Anantam is unlocked!'
                    : 'Play again to discover the next relic.'
            }
        `;
    } else {
        result.innerHTML = `
            🏆 <strong>YOU WIN!</strong> 🎉
            <br>
            Navya has already found the Lotus, Diamond, and Key.
            The Gate of Anantam is unlocked!
        `;
    }

    result.style.color = '#ffe6a6';

    $('navyaMood').textContent =
        found.length >= 3
            ? 'Joyful! All three relics have been found.'
            : 'Excited! You helped Navya find a relic.';
}

function startDreamGame() {
    stopGame();

    gameScore = 0;
    gameTime = 60;
    gameActive = true;

    openModal(
        'Catch the Dreams',
        'WIN TO HELP NAVYA FIND THE RELICS',
        `
        <div class="game-hud">
            <span>
                Dreams caught:
                <b id="gameScore">0</b> / 3 to win
            </span>

            <span>
                Time:
                <b id="gameTime">60</b>s
            </span>
        </div>

        <p style="color:#c8b9e8;margin:0 0 10px">
            Catch 3 glowing dreams before time runs out.
            Every victory discovers one relic for Navya!
        </p>

        <div id="dreamGame" class="dream-game"></div>

        <div class="game-actions">
            <button id="restartGame" class="primary">
                ↻ Play again
            </button>
        </div>

        <p id="gameResult"
            aria-live="polite"
            style="margin-top:12px;color:#f2d59a">
        </p>
        `
    );

    $('restartGame').addEventListener('click', startDreamGame);

    spawnDream();

    spawnInterval = setInterval(spawnDream, 450);

    gameInterval = setInterval(() => {
        if (!gameActive) return;

        gameTime--;

        const t = $('gameTime');

        if (t) {
            t.textContent = gameTime;
        }

        if (gameTime <= 0) {
            stopGame();

            document.querySelectorAll('.dream-target').forEach(el => {
                el.remove();
            });

            const result = $('gameResult');

            if (result) {
                result.textContent =
                    'Time is up! You caught ' + gameScore +
                    ' dreams. Catch 3 dreams to discover a relic.';

                result.style.color = '#f2d59a';
            }
        }
    }, 1000);
}

$('gameBtn').addEventListener('click', startDreamGame);


// ================================================
// INITIALISE WEBSITE
// ================================================

setupBackgroundMusic();

if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {
        chooseNavyaVoice();
    };
}

// Start the story.
showScene(0);

// ================================================
// THE ANANTAM CODEX — WORLD, INVENTORY, QUESTS,
// CHOICES, ACHIEVEMENTS AND OPTIONAL RUNE MYSTERY
// Additive systems: existing story and mini-game remain.
// ================================================

const codexKeys = {
    bestScene: 'anantamBestSceneV1',
    worldAwake: 'anantamWorldAwakeV1',
    choice: 'anantamNavyaChoiceV1',
    runeSolved: 'anantamRuneSolvedV1',
    achievements: 'anantamAchievementsV1'
};

function safeRead(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
        return fallback;
    }
}

function safeWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {
        // Keep features playable if browser storage is unavailable.
    }
}

function recordSceneProgress(index) {
    // This runs during the original story's initialisation, before the Codex
    // constants below are initialised, so keep this early hook storage-only.
    const oldBest = Number(safeRead('anantamBestSceneV1', 0)) || 0;
    if (index > oldBest) safeWrite('anantamBestSceneV1', index);
}

function getAchievements() {
    const value = safeRead(codexKeys.achievements, []);
    return Array.isArray(value) ? value : [];
}

function unlockAchievement(id) {
    const achievements = getAchievements();
    if (!achievements.includes(id)) {
        achievements.push(id);
        safeWrite(codexKeys.achievements, achievements);
    }
}

function checkAnantamAchievements() {
    const best = Number(safeRead(codexKeys.bestScene, 0)) || 0;
    if (best >= 1) unlockAchievement('first-step');
    if (best >= scenes.length - 1) unlockAchievement('story-witness');
    if (getRelics().length >= 3) unlockAchievement('relic-master');
    if (readFoundEggs().length >= 3) unlockAchievement('egg-guardian');
    if (safeRead(codexKeys.runeSolved, false)) unlockAchievement('rune-seeker');
}

// Ambient motes are decorative and can be disabled from Living World.
let worldAwake = safeRead(codexKeys.worldAwake, true) !== false;
let moteTimer = null;
function createMagicMote() {
    if (!worldAwake || document.hidden) return;
    const mote = document.createElement('span');
    mote.className = 'magic-mote';
    mote.setAttribute('aria-hidden', 'true');
    mote.style.left = (Math.random() * 100) + 'vw';
    mote.style.top = (65 + Math.random() * 40) + 'vh';
    mote.style.setProperty('--mote-duration', (9 + Math.random() * 9) + 's');
    mote.style.setProperty('--mote-drift', (-45 + Math.random() * 90) + 'px');
    document.body.appendChild(mote);
    setTimeout(() => mote.remove(), 19000);
}
function setWorldAwake(on) {
    worldAwake = Boolean(on);
    document.body.classList.toggle('world-awake', worldAwake);
    safeWrite(codexKeys.worldAwake, worldAwake);
    if (moteTimer) clearInterval(moteTimer);
    moteTimer = null;
    if (worldAwake) {
        for (let i = 0; i < 12; i++) setTimeout(createMagicMote, i * 220);
        moteTimer = setInterval(createMagicMote, 950);
        if ($('worldStatus')) $('worldStatus').textContent = '✧ The ancient magic is awake. Runes shimmer and motes drift through the air.';
    } else {
        document.querySelectorAll('.magic-mote').forEach(m => m.remove());
        if ($('worldStatus')) $('worldStatus').textContent = 'The world is calm. Turn the living magic back on whenever you wish.';
    }
}

function renderInventory() {
    checkAnantamAchievements();
    const foundRelics = getRelics();
    const foundEggs = readFoundEggs();
    const best = Number(safeRead(codexKeys.bestScene, 0)) || 0;
    const achievements = getAchievements();
    const relicCards = relics.map(r => `
        <div class="codex-item"><strong>${r.icon} ${r.name}</strong>
        <p>${foundRelics.includes(r.id) ? 'Collected and safely recorded in your inventory.' : 'Not collected yet. Win Catch the Dreams to discover it.'}</p>
        <span class="codex-tag">${foundRelics.includes(r.id) ? '✦ COLLECTED' : '◇ NOT FOUND'}</span></div>
    `).join('');
    const eggCards = Object.entries(magicalEggs).map(([id, egg]) => `
        <div class="codex-item"><strong>${egg.symbol} ${egg.title}</strong>
        <p>${foundEggs.includes(id) ? 'Reward unlocked and remembered by Anantam.' : 'A hidden reward waiting in the final chapter.'}</p>
        <span class="codex-tag">${foundEggs.includes(id) ? '✦ UNLOCKED' : '◇ HIDDEN'}</span></div>
    `).join('');
    const achievementNames = {
        'first-step': ['🌟 First Footstep', 'You began the legend.'],
        'story-witness': ['📖 Witness of the Legend', 'You reached the final story chapter.'],
        'relic-master': ['💎 Relic Master', 'You collected all three quest relics.'],
        'egg-guardian': ['🥚 Guardian of Eggs', 'You discovered all three magical eggs.'],
        'rune-seeker': ['🔐 Rune Seeker', 'You solved the optional Forbidden Mystery riddle.']
    };
    const achievementCards = Object.entries(achievementNames).map(([id, a]) => `
        <div class="codex-item"><strong>${a[0]}</strong><p>${a[1]}</p><span class="codex-tag">${achievements.includes(id) ? '✦ EARNED' : '◇ NOT YET EARNED'}</span></div>
    `).join('');
    openModal('Your Magical Inventory', 'THE CODEX REMEMBERS YOUR JOURNEY', `
        <p class="body-copy" style="min-height:0">Your discoveries are saved in this browser when storage is available. Nothing here resets your story.</p>
        <h3 style="color:var(--gold);font:500 18px Cinzel,serif;margin:22px 0 10px">Quest Relics · ${foundRelics.length}/3</h3>
        <div class="codex-grid">${relicCards}</div>
        <h3 style="color:var(--gold);font:500 18px Cinzel,serif;margin:22px 0 10px">Magical Egg Rewards · ${foundEggs.length}/3</h3>
        <div class="codex-grid">${eggCards}</div>
        <h3 style="color:var(--gold);font:500 18px Cinzel,serif;margin:22px 0 10px">Achievements · ${achievements.length}/5</h3>
        <div class="codex-grid">${achievementCards}</div>
        <p style="color:#c9c0e1;font-size:11px;line-height:1.7">Story progress reached: chapter ${Math.min(best + 1, scenes.length)} of ${scenes.length}. Your choice: ${safeRead(codexKeys.choice, 'Not chosen yet')}.</p>
    `);
}

function renderQuestJournal() {
    checkAnantamAchievements();
    const foundRelics = getRelics();
    const foundEggs = readFoundEggs();
    const best = Number(safeRead(codexKeys.bestScene, 0)) || 0;
    const quests = [
        {done: best >= 1, icon: '🌟', title: 'Follow Navya into Anantam', detail: 'Begin the story and learn why the ancient light matters.'},
        {done: foundRelics.includes('lotus'), icon: '🌸', title: 'Find the Lotus', detail: 'Win Catch the Dreams to reveal the Moonlit Garden relic.'},
        {done: foundRelics.includes('diamond'), icon: '💎', title: 'Find the Diamond', detail: 'Keep playing to discover the crystal of the Singing Caves.'},
        {done: foundRelics.includes('key'), icon: '🗝️', title: 'Find the Key', detail: 'Discover the last relic and unlock the Gate of Anantam.'},
        {done: best >= scenes.length - 1, icon: '🚪', title: 'Reach the final chapter', detail: 'Keep the story going until the Gate chapter.'},
        {done: foundEggs.length === 3, icon: '🥚', title: 'Discover all three magical eggs', detail: 'The egg hunt appears in the final chapter.'},
        {done: Boolean(safeRead(codexKeys.runeSolved, false)), icon: '🔐', title: 'Solve the Forbidden Mystery', detail: 'Open the Codex mystery and solve its optional riddle.'}
    ];
    const rows = quests.map(q => `<div class="quest-row ${q.done ? 'done' : ''}"><span class="quest-mark">${q.done ? '✅' : q.icon}</span><div><strong>${q.title}</strong><p>${q.detail}</p><span class="codex-tag">${q.done ? 'QUEST COMPLETE' : 'QUEST IN PROGRESS'}</span></div></div>`).join('');
    openModal('Quest Journal', 'YOUR PATH THROUGH ANANTAM', `<p class="body-copy" style="min-height:0">Follow these optional goals at your own pace. You can still enjoy the original story without completing every quest.</p><div class="quest-list">${rows}</div><button id="questPlayGame" class="primary">🎮 Continue the relic quest</button>`);
    $('questPlayGame').addEventListener('click', startDreamGame);
}

function renderChoices() {
    const savedChoice = safeRead(codexKeys.choice, '');
    openModal('A Moment with Navya', 'YOUR CHOICE · YOUR LEGEND', `
        <p class="body-copy" style="min-height:0">A soft light flickers beside the path. Navya turns to you. “We can follow the strange glow, or stay on the safer trail. What do you think we should do?”</p>
        <div class="choice-options">
            <button type="button" data-navya-choice="glow">🔮 <strong>Follow the mysterious glow.</strong><br><span>Curiosity may reveal a hidden truth.</span></button>
            <button type="button" data-navya-choice="trail">🌿 <strong>Take the safer trail.</strong><br><span>Protect the group and gather clues carefully.</span></button>
            <button type="button" data-navya-choice="together">✨ <strong>Ask Navya to decide together.</strong><br><span>Trust and teamwork guide the journey.</span></button>
        </div>
        <div id="choiceResult" class="choice-result" aria-live="polite">${savedChoice ? 'Your remembered choice: ' + savedChoice + '. You can change it anytime.' : 'This optional scene adds a personal branch without changing the original story chapters.'}</div>
    `);
    document.querySelectorAll('[data-navya-choice]').forEach(button => button.addEventListener('click', () => {
        const replies = {
            glow: 'Navya raises her wand. “Then we follow the light—but we stay alert. Every mystery leaves a trace.”',
            trail: 'Navya nods. “A careful heart is a brave heart. We will gather clues before we step into the unknown.”',
            together: 'Navya smiles. “Together, then. Anantam is strongest when no one has to face the unknown alone.”'
        };
        const names = {glow: 'Follow the mysterious glow', trail: 'Take the safer trail', together: 'Decide together'};
        safeWrite(codexKeys.choice, names[button.dataset.navyaChoice]);
        const result = $('choiceResult');
        if (result) result.textContent = replies[button.dataset.navyaChoice];
        // Let the choice briefly shape Navya's live dialogue without rewriting
        // any canonical chapter text or affecting the original story timeline.
        $('navyaLine').textContent = replies[button.dataset.navyaChoice];
        $('navyaMood').textContent = 'She remembers the path you chose together';
        unlockAchievement('first-step');
    }));
}

function renderForbiddenMystery() {
    const solved = Boolean(safeRead(codexKeys.runeSolved, false));
    openModal('The Forbidden Mystery', 'AN OPTIONAL RUNE PUZZLE', `
        <p class="body-copy" style="min-height:0">The rune whispers a riddle. Solve it to earn the Rune Seeker achievement and reveal a doorway to the existing Forbidden Chapter.</p>
        <div class="codex-item" style="margin-top:16px"><strong>✧ The ancient riddle</strong><p>“I shine without a flame, guide without feet, and grow when shared. What am I?”</p></div>
        <form id="riddleForm" class="riddle-form"><input id="riddleAnswer" type="text" autocomplete="off" aria-label="Your answer to the rune riddle" placeholder="Whisper your answer…" required><button class="primary" type="submit">Unlock the rune</button></form>
        <p id="riddleFeedback" class="riddle-feedback" aria-live="polite">${solved ? '✦ The rune remembers you. The doorway is already unlocked.' : 'Hint: Navya carries a little of it in her star wand.'}</p>
        <div id="forbiddenDoorway" style="${solved ? '' : 'display:none'};margin-top:14px"><a class="primary" style="display:inline-block;text-decoration:none" href="forbidden-chapter.html">✧ Enter the Forbidden Chapter ↗</a></div>
    `);
    $('riddleForm').addEventListener('submit', event => {
        event.preventDefault();
        const answer = $('riddleAnswer').value.trim().toLowerCase().replace(/[^a-z]/g, '');
        if (['light', 'thelight'].includes(answer)) {
            safeWrite(codexKeys.runeSolved, true);
            unlockAchievement('rune-seeker');
            $('riddleFeedback').textContent = '✧ Correct. The rune glows brighter—the doorway has recognised you.';
            $('forbiddenDoorway').style.display = 'block';
        } else {
            $('riddleFeedback').textContent = 'The rune stays quiet. Think of what Navya follows when darkness rises.';
        }
    });
}

$('worldBtn').addEventListener('click', () => {
    setWorldAwake(!worldAwake);
    openModal('The Living World of Anantam', 'THE WORLD BREATHES WITH MAGIC', `
        <p class="body-copy" style="min-height:0">${worldAwake ? 'Tiny enchanted motes drift through the air, the background glow responds to the world, and the existing day/night and flashlight controls remain yours to use.' : 'The motes have settled and the extra magical glow is quiet. Your story, music, map, and game are unchanged.'}</p>
        <div class="codex-grid"><div class="codex-item"><strong>🌌 Ambient motes</strong><p>Slow, glowing particles float around the page.</p></div><div class="codex-item"><strong>☀️ Day and night</strong><p>Use the existing top-bar control to switch the atmosphere.</p></div><div class="codex-item"><strong>🔦 Magical light</strong><p>Your existing flashlight remains available.</p></div><div class="codex-item"><strong>🗝️ Hidden places</strong><p>Explore the Adventure Map and Forbidden Mystery for more discoveries.</p></div></div>
        <button id="worldToggleInModal" class="primary">${worldAwake ? '🌙 Calm the magical motes' : '✨ Awaken the living world'}</button>
    `);
    $('worldToggleInModal').addEventListener('click', () => {
        setWorldAwake(!worldAwake);
        closeModal();
    });
});
$('inventoryBtn').addEventListener('click', renderInventory);
$('questsBtn').addEventListener('click', renderQuestJournal);
$('choicesBtn').addEventListener('click', renderChoices);
$('mysteryBtn').addEventListener('click', renderForbiddenMystery);

// Start the ambient world according to the saved preference.
setWorldAwake(worldAwake);
checkAnantamAchievements();


// ================================================
// TIER 3: GUESTBOOK, STORY GUIDE CHAT, PRAYER & SPARKLE CURSOR
// ================================================
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function renderGuestbook() {
    let entries = safeRead('anantamDreamGuestbookV1', []);
    if (!Array.isArray(entries)) entries = [];
    const entryHTML = entries.slice().reverse().map(e => `<article class="dream-entry"><strong>${escapeHTML(e.name || 'A traveller')} <span>✦</span></strong><p>${escapeHTML(e.message)}</p><small>${escapeHTML(e.date || 'A wish from Anantam')}</small></article>`).join('');
    openModal('Dream Guestbook', 'LEAVE A LITTLE LIGHT', `
      <div class="feature-guide"><strong>💌 How to use the guestbook</strong><ol><li>Choose a nickname (you do not need to use your real name).</li><li>Write a kind message or a dream wish.</li><li>Press “Leave my message” to add it to this guestbook.</li></ol><p><strong>Privacy note:</strong> this version saves entries in this browser only. It is not a shared online guestbook because no server is connected.</p></div>
      <form id="dreamGuestForm" class="feature-form"><label for="dreamGuestName">Nickname (optional)</label><input id="dreamGuestName" maxlength="32" placeholder="A traveller of Anantam"><label for="dreamGuestMessage">Your message or dream wish</label><textarea id="dreamGuestMessage" maxlength="500" required placeholder="I wish for… or Dear Navya…"></textarea><button class="primary" type="submit">💌 Leave my message</button><p id="guestFeedback" aria-live="polite"></p></form>
      <h3 class="feature-subtitle">Messages on this device (${entries.length})</h3><div class="dream-entries">${entryHTML || '<p class="quiet-note">The guestbook is waiting for its first little note. You can be the first traveller!</p>'}</div>`);
    $('dreamGuestForm').addEventListener('submit', e => {
      e.preventDefault();
      const name = $('dreamGuestName').value.trim().slice(0,32) || 'A traveller';
      const message = $('dreamGuestMessage').value.trim();
      if (!message) return;
      const latest = safeRead('anantamDreamGuestbookV1', []);
      const next = Array.isArray(latest) ? latest : [];
      next.push({name, message:message.slice(0,500), date:new Date().toLocaleDateString()});
      safeWrite('anantamDreamGuestbookV1', next.slice(-50));
      renderGuestbook();
      const feedback = $('guestFeedback'); if (feedback) feedback.textContent = '✨ Your note is saved in this browser. Thank you for sharing a little light!';
    });
}
function navyaStoryAnswer(question) {
    const q = question.toLowerCase();
    const answers = [
      [/who is navya|about navya|navya look|what does navya wear/, 'I’m Navya! I wear a royal-blue gown with purple gems, a crown, and I carry a star wand. I want to protect Anantam with courage and kindness.'],
      [/vritra|villain|shadow|threat/, 'Vritra is the shadow threatening Anantam’s balance. The story says the danger is real, but the heroes will need wisdom and courage—not fear alone—to face it.'],
      [/nandhan|sword|who can wield/, 'Nandhan is the only one who can wield the Sword of Anantam. His courage is important, and the story hints that he and Navya must rely on their different strengths.'],
      [/neelamani|blue gem|ancient gem/, 'The Neelamani is an ancient treasure connected to the world’s balance and the prophecy. The quest is still unfolding, so the story has not revealed every detail yet.'],
      [/lotus|diamond|key|three relic/, 'The three relics are the Lotus, the Diamond, and the Key. In our storybook, the Lotus represents compassion, the Diamond clarity, and the Key the courage to open a new path.'],
      [/gate|door|what happens next|ending|finished|end of story/, 'The Gate has begun to open, but this is not the ending. The next pages lead into the Whispering Grove and the Star-Wand Promise, while Vritra’s threat remains unresolved.'],
      [/anantam|what is the world|ancient energy|magic/, 'Anantam is an ancient energy that connects living things and helps keep the world in balance. Its light is a promise shared by everyone who cares for the world.'],
      [/wish|prayer|granted/, 'In the story, Anantam can hear a heartfelt wish as a symbol of hope. I can’t promise real-world wishes will magically come true, but we can celebrate your wish and think about one small step toward it.'],
      [/story|storybook|chapter|page/, 'You can read the storybook using the 📖 Storybook button. It now includes twelve pages, from the First Light through the new Whispering Grove and Star-Wand Promise pages.'],
      [/why|how|explain|doubt|question/, 'I’ll do my best to explain what the story actually says. If a detail has not been revealed yet, I’ll tell you it’s still a mystery instead of making up a canon answer.']
    ];
    const match = answers.find(([pattern]) => pattern.some(re => re.test(q)));
    return match ? match[1] : 'That detail hasn’t been clearly explained in the story pages I know yet, and I don’t want to invent an answer and confuse the legend. Try asking about Navya, Vritra, Nandhan, the Sword, the Neelamani, the three relics, or the Gate.';
}
function renderNavyaChat() {
    const featureFaqs = [
      ["What can I do on this website?","Explore the story, open the storybook, discover secrets, try quests and mini-games, visit the map, and leave a message in the guestbook."],
      ["How do I read the storybook?","Open Storybook from the feature hub, then use the page controls to move through the story at your own pace."],
      ["How do I hear the story aloud?","Use the Narration control near the top of the page. Browser voices vary by device, so the exact voice may sound different."],
      ["How can I control sound or mute the background music?","Use the Sound & Fx  near the top of the page to adjust sound of Music and Effects and Also it will give Subtitles for dialogues ."],
      ["What does Night Mode do?","Use the day-and-night control to switch the website's atmosphere and explore the story in a different mood."],
      ["How does the magical flashlight work?","Turn on the Light control to activate the flashlight effect, then move your pointer around the page. Touch devices may show a simpler effect."],
      ["How do I open the Dream Map?","Choose Dream Map in the feature controls to see the map and the locations available in this version of the adventure."],
      ["What are quests for?","The Quest Journal explains your current tasks and discoveries. Open it to see the objectives provided by the game."],
      ["What is the Inventory?","Open Inventory to review the relics and rewards tracked by your adventure."],
      ["Where are the three magical eggs?","Explore the story and its hidden discoveries, especially the final chapter. Follow the clues presented on the page."],
      ["How do I find the Forbidden Chapter?","Look for the glowing rune in the story scene or follow the site's secret clues. The Forbidden Chapter page contains its own mystery."],
      ["How do I view Navya in 3D?","Choose “Meet Navya in 3D” beside her portrait. This view uses a transparent cut-out with a 3D presentation effect; it is not yet a fully sculpted, rigged character."],
      ["How do I play Catch the Dreams?","Open Catch the Dreams and follow the on-screen instructions. Collect three dream orbs before the timer runs out to complete the mini-game."],
      ["How do I leave a guestbook message?","Open Dream Guestbook, enter a message in the form, and submit it. Avoid including private or sensitive information."],
      ["What is Prayer to Anantam?","Write a wish in the prayer feature to create a small magical story moment. It cannot guarantee that real-world wishes will come true."],
      ["Can I use Anantam on a phone or tablet?","Yes, the page is designed to adapt to smaller screens. Some effects may be simplified to keep the experience responsive."],
      ["A feature isn't working. What should I try?","Refresh the page, use an up-to-date browser, and check your internet connection for features that load Three.js or other online resources. If it still fails, note which button you used."]
    ];
    const cards = featureFaqs.map((item, i) => `<details class="navya-faq-item"${i === 0 ? ' open' : ''}><summary>${i+1}. ${escapeHTML(item[0])}</summary><div class="navya-faq-answer"><p>${escapeHTML(item[1])}</p><button type="button" class="secondary faq-speak" data-answer="${escapeHTML(item[1])}">🔊 Listen to Navya</button></div></details>`).join('');
    openModal('Ask Navya', '17 QUICK ANSWERS ABOUT WEBSITE FEATURES', `<div class="feature-guide"><strong>Hi hi, explorer! 💙</strong><p>Choose a question below and I'll explain how to use the website. These are prepared answers, so no AI account or API key is needed.</p></div><div class="navya-feature-faq">${cards}</div>`);
    $('modalBody').querySelectorAll('.faq-speak').forEach(button => button.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) { button.textContent = 'Speech is not supported in this browser'; return; }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(button.dataset.answer || '');
      utterance.lang = 'en-US'; utterance.rate = 0.91; utterance.pitch = 1.28;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => /female|samantha|zira|aria|jenny|google uk english female/i.test(v.name));
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    }));
}
function renderPrayer() {
    openModal('A Prayer to Anantam', 'A QUIET PLACE FOR YOUR WISH', `<div class="prayer-intro">🙏 <p>Take a small breath, think of something meaningful, and write your wish below. In the story, this ritual is a way to hold hope close. It cannot guarantee real-world events, but your wish deserves kindness.</p></div><form id="prayerForm" class="feature-form"><label for="prayerWish">What would you like to wish for?</label><textarea id="prayerWish" maxlength="500" required placeholder="Dear Anantam, I wish for…"></textarea><button class="primary" type="submit">✨ Send my wish to Anantam</button></form><div id="prayerResult" class="prayer-result" hidden aria-live="polite"></div>`);
    $('prayerForm').addEventListener('submit', e => {
      e.preventDefault(); const wish = $('prayerWish').value.trim(); if (!wish) return;
      safeWrite('anantamPrayerWishesV1', [...(Array.isArray(safeRead('anantamPrayerWishesV1', [])) ? safeRead('anantamPrayerWishesV1', []) : []), {wish:wish.slice(0,500), date:new Date().toISOString()}].slice(-20));
      const result = $('prayerResult'); result.hidden = false; result.innerHTML = `<div class="wish-stars">✦ ✧ ✦</div><h3>Your wish has been heard in Anantam 💜</h3><p>${escapeHTML(wish)}</p><p>May hope stay beside you. If this wish is something you can work toward, may you find one small, kind step to begin.</p><small>This is a magical story moment, not a promise that real-world events will change.</small>`;
      $('prayerForm').hidden = true;
    });
}
$('guestbookBtn')?.addEventListener('click', renderGuestbook);
$('navyaChatBtn')?.addEventListener('click', renderNavyaChat);
$('prayerBtn')?.addEventListener('click', renderPrayer);
(function sparkleCursor() {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    let last = 0; const colors = ['#f7dcff','#c5a4ff','#ffe7a4','#9fe8ff'];
    document.addEventListener('pointermove', e => {
      const now = performance.now(); if (now - last < 35) return; last = now;
      const dot = document.createElement('span'); dot.className = 'cursor-sparkle'; dot.textContent = ['✦','✧','⋆','·'][Math.floor(Math.random()*4)];
      dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; dot.style.color = colors[Math.floor(Math.random()*colors.length)];
      $('sparkleCursor')?.appendChild(dot); setTimeout(() => dot.remove(), 850);
    });
})();


// Playful Chaos Mode: an optional decorative layer; it does not change story progress.
(() => {
  const button = document.getElementById('chaosModeBtn');
  if (!button) return;
  button.addEventListener('click', () => {
    const enabled = !document.body.classList.contains('chaos-mode');
    document.body.classList.toggle('chaos-mode', enabled);
    button.setAttribute('aria-pressed', String(enabled));
    button.textContent = enabled ? '🌀 Chaos Mode on · +5' : '✨ Chaos Mode +5';
    button.title = enabled ? 'Turn off playful Chaos Mode' : 'Turn on playful Chaos Mode';
    let status = document.getElementById('chaosStatus');
    if (!status) {
      status = document.createElement('div');
      status.id = 'chaosStatus';
      status.className = 'chaos-status';
      status.setAttribute('aria-live', 'polite');
      document.body.appendChild(status);
    }
    status.textContent = enabled ? '🌀 Chaos Mode awakened! +5 sparkle points for fun.' : '✨ Chaos Mode has settled down.';
    if (enabled) {
      try {
        const current = Number(sessionStorage.getItem('anantamChaosPoints') || 0);
        sessionStorage.setItem('anantamChaosPoints', String(Math.min(999, current + 5)));
      } catch (_) {}
    }
  });
})();
