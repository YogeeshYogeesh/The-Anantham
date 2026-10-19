# The Legend of Anantam — Enhanced Update

## Run the project
1. Extract the ZIP into a folder.
2. Open `index.html` in a modern browser, or deploy the extracted folder to a static host such as Vercel.
3. The optional 3D view uses Three.js from a CDN, so it needs an internet connection to load that library.

## Updates in this package
- Added `anantam-effects.js` as a separate script so the new sparkle effects do not need to be mixed into the main story logic.
- When the chapter counter changes, magical star particles spread across the page and fade away.
- Clicking buttons or links in the Anantam Codex section and its feature modal triggers a star burst.
- Effects do not block pointer input and respect the device's reduced-motion preference.
- Preserved the original story/game code and assets; only the new effects script, its CSS, and its script include were added for this request.
- Existing Navya 3D viewer continues to use front artwork and the included `navya-back-view.svg` as front/back reference textures, with drag rotation and transparent background.

## Important 3D model note
The included Navya 3D viewer is still a front/back textured presentation, not a fully sculpted and rigged character mesh. It can rotate to show the supplied front and back references, but the side profile is not a fully modeled body and the eyes are not independently rigged. A genuine full 3D character needs a sculpted/rigged mesh created in a 3D tool such as Blender, using the front and back images as references.

## Safe testing checklist
- Open the story and move between chapters; confirm the chapter sparkle burst appears.
- Scroll to The Anantam Codex and click its cards/buttons; confirm stars appear and controls still work.
- Open Navya's 3D view, rotate it with pointer drag, and check the back reference.
- Test desktop and mobile. If reduced motion is enabled on the device, the sparkle animation is intentionally disabled.


## Latest requested adjustments
- Navya's optional front/back textured viewer now targets one full automatic rotation about every 10 seconds, using elapsed time so the pace is not tied to the screen refresh rate. Drag rotation remains available.
- Added one small ambient sparkle every second at a newly randomized position across the visible viewport. Existing larger bursts on chapter changes and Codex/modal interactions remain in place.
- Navya's artwork remains included in the ZIP (`navya-reference.jpeg`, `navya.jpeg`, `navya.png`, and other character assets).
