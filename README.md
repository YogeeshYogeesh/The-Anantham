# The Legend of Anantam — Feature Upgrade

## Run the website
1. Extract this ZIP.
2. Open `Anantam_Relic_Quest_Mini_Game/anantam_no_assets/index.html` in a modern browser (or open `index.html` inside the extracted `anantam_no_assets` folder).
3. The story starts automatically. Use Pause story / Skip ahead if desired.

## Added features
- Day/night theme toggle (`🌙 Night mode` / `☀️ Day mode`).
- Optional flashlight/nightlight cursor overlay.
- Magical background soundtrack from the included `magical-theme.mp3` file, with a play/pause control. Browser audio begins only after the visitor clicks the button.
- Dream Delivery map modal with Lotus, Diamond, Key, Gate and Neelamani.
- Interactive storybook with previous/next page controls.
- Mini-game: catch three dream orbs before the 60-second timer ends to earn a relic.
- Easter egg rune can now be clicked or activated with Enter/Space as well as hovered.
- Story text and Navya’s dialogue now type onto the screen letter by letter with a blinking magical caret.
- Optional narration prefers an available English feminine voice and uses a gentle, higher-pitched, youthful delivery. The exact voice depends on the browser/device; a true little-girl voice cannot be guaranteed by browser speech synthesis.
- Existing timed automatic story, Navya expression swaps, cursor-eye prototype, and responsive layout are retained.
- Scroll-driven storytelling is NOT used.

## Where to edit
- `index.html`: toolbar buttons, feature buttons, modal container and website structure.
- `style.css`: day theme, flashlight overlay, modal, map, storybook, game visuals and responsive styling.
- `script.js`: day/night behavior, audio, flashlight pointer tracking, map content, storybook pages, mini-game rules, Easter egg activation, existing story timing and expressions.
- ``: existing character images.

## Feature quick test
1. Click **Day mode** to switch the palette; click again to return.
2. Click **Play magical music** to start the soundtrack; click again to pause it.
3. Click **Light off** to enable the cursor flashlight; click again to disable.
4. Click **Adventure map** to open the relic route and location clues.
5. Click **Storybook** and test Previous / Next.
6. Click **Catch the dreams**, then tap/click the floating dream icons before the timer ends.
7. Click the small rune (✧) in the artwork to reveal the secret.
8. Use **Narration on** for browser-generated speech. Browsers may offer different voices.

## Important notes
- Navya is still based on supplied 2D images. The eye overlay is a visual prototype, not genuine eye rigging or a 3D model.
- The background music uses the included `magical-theme.mp3` audio file. Browser autoplay rules mean audio must be started by the visitor.
- The Adventure Map is a stylized interactive route; relics, egg discoveries and Codex progress are saved in browser local storage when available.
- The mini-game is a simple playable prototype, not a full game engine.
- Google Fonts may require internet access. The core website does not require a build step or package installation.


## Added: Final-chapter Three Magical Eggs
- The three animated eggs appear only when the story reaches its final chapter.
- Each egg opens a reward panel with a unique title: Saviour of Magical Objects, Keeper of Forgotten Secrets, and Eternal Guardian of Anantam.
- Discoveries are saved in browser local storage when available.
- Finding all three displays the ultimate Eternal Guardian reward.
- The final chapter stays on screen so visitors have time to discover the eggs; visitors can still use Skip ahead to continue.
- Existing CSS/JS and all original images/music are retained, with additive code for this feature.

## Added: Anantam Next Evolution
- **Living World:** optional glowing ambient motes and a soft magical atmosphere. The original day/night and flashlight controls remain available.
- **Interactive Adventure Map:** explore the Moonlit Garden, Singing Caves, Forgotten Tower, Gate of Anantam, and a hidden rune shrine. Locations unlock as relics and secrets are found.
- **Magical Inventory:** view collected Lotus/Diamond/Key relics, magical egg rewards, and achievements.
- **Quest Journal:** track story progress, relic collection, the three-egg hunt, and the optional rune mystery.
- **Forbidden Mystery:** solve the optional light riddle to reveal a doorway to the existing `forbidden-chapter.html`. The original rune link is preserved.
- **Cinematic Choice Moment:** choose how to respond with Navya. The choice is remembered and adds a personal scene without rewriting the original chapters.
- **Achievements and persistence:** Codex progress, choices, world ambience preference, riddle completion, and discoveries use local storage where available.
- All new systems are additive. Existing story scenes, character art, narration, music controls, flashlight, day/night mode, storybook, mini-game, and three magical eggs are retained.

## Next Evolution quick test
1. Open `index.html` and scroll below the original map/story/game buttons to **The Anantam Codex**.
2. Open **Living World** to toggle ambient motes on/off.
3. Open **Inventory** and **Quest Journal**; their counts should reflect any discoveries in this browser.
4. Open **Navya's Choice** and select one response; reopen it to see the remembered choice.
5. Open **Forbidden Mystery**, enter `light`, and use the revealed doorway to reach the existing Forbidden Chapter.
6. Open **Adventure Map**. The Moonlit Garden is open first; collect relics through Catch the Dreams to unlock additional locations.

Progress is stored in the current browser profile when local storage is enabled. Clearing browser site data or using a different browser/device may reset local progress.
