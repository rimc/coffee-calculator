# Coffee Calculator - Design Spec

**Date:** 2026-04-28
**Status:** Draft, pending implementation plan

## Purpose

A tiny, self-contained brewing companion that scales the four coffee recipes already documented in the Obsidian vault note `Notes & Reference/Coffee Recipes.md` (French press, pour over, Japanese-style iced, cold brew) and walks the user through each brew with a hands-off audio-cued timer. The point is hitting pour marks reliably while half-asleep, not arithmetic.

## Form factor

- **Single self-contained `coffee-calculator.html` file** - HTML, inline CSS, inline JS, no build step, no dependencies, no network calls. Lives at `Notes & Reference/attachments/coffee-calculator.html` in the Obsidian vault.
- **Dedicated Obsidian note** at `Notes & Reference/Coffee Calculator.md` containing only an `<iframe>` embed of the HTML file. This is what the user opens day-to-day inside Obsidian.
- **Cross-link from the recipes note**: `Coffee Recipes.md` gets a single line at the top - `> Tool: [[Coffee Calculator]]` - so the recipe reference and the calculator are one click apart.
- **Kitchen mode**: the same `.html` file can be opened directly in a phone or laptop browser ("Open with default app" from Obsidian, or bookmarked URL via local file path) so it works without Obsidian when the iPad is in the kitchen.

Mobile-first layout. The desktop case is just "the same layout, more whitespace."

## Functional scope (MVP)

1. **Recipe picker** - four pills: French press, Pour over, Iced, Cold brew. Tapping a pill loads that recipe's defaults.
2. **Coffee dose input** - one numeric input (in grams) with `-` / `+` step buttons. All other amounts derive from it.
3. **Live amounts panel** - water, bloom, pour milestones, grind setting, total brew time. Updates as the dose changes.
4. **Start brew** - flips the same screen into brewing state (Layout A from brainstorm). Step list visible with the current step highlighted; large tabular-numerals countdown at the bottom; current step's target ("Pour to 200 g") shown prominently.
5. **Audio cues** - short WebAudio chime at each step boundary. Generated programmatically so there are no asset files.
6. **Stop** - returns to setup state, resets the timer.
7. **Persistence** - last recipe + last dose stored in `localStorage` so the next session opens with the same setup.

### Out of scope for MVP

- Bidirectional inputs (edit water, dose updates). Single-knob (dose) only.
- Adding/editing recipes through UI. Recipe data is edited by hand in the JS object.
- Notifications API, vibration, wake lock - if any prove necessary in real use, add later.
- Authentication, sync, multi-device state. `localStorage` per browser is fine.
- Cup-count input or volumetric units. Grams only.

## Architecture

```
coffee-calculator.html
├── <head>: viewport meta, theme color, inline <style>
├── <body>
│   └── #app  (single root container; setup view and brew view swap content)
└── <script>
    ├── RECIPES         - source-of-truth recipe data (object literal)
    ├── state           - { recipeId, dose, mode: 'setup'|'brew', startedAt, currentStepIndex }
    ├── derive(recipe, dose) -> amounts object (water, bloom, milestones, etc.)
    ├── render()        - re-renders from state
    ├── brewLoop()      - requestAnimationFrame loop; computes elapsed from Date.now() - startedAt; advances currentStepIndex when elapsed crosses next step's `at`; chimes on advance
    ├── chime()         - WebAudio oscillator, ~200 ms beep
    ├── persist()/load() - localStorage read/write of { recipeId, dose }
    └── tests()          - dev assertions, runs only when location.search === '?test'
```

**Single source of truth:** every UI value comes from `state` + `RECIPES[state.recipeId]` + `derive(...)`. No DOM-as-state.

**Time accuracy:** elapsed time is `Date.now() - startedAt`, never an incremented counter, so backgrounded tabs don't drift.

## Data shape

```js
const RECIPES = {
  pourOver: {
    id: "pourOver",
    name: "Pour over",
    defaultDose: 20,            // grams of coffee
    ratio: 16.65,               // total water = dose * ratio
    grind: "Medium-fine",
    notes: "Rinse/preheat dripper. Hotter water for lighter roast.",
    steps: [
      { at: 0,   label: "Bloom",    targetFn: d => `${Math.round(d*2)}-${Math.round(d*3)} g, swirl` },
      { at: 75,  label: "Pour 1",   targetFn: d => `Pour to ${Math.round(d*16.65*0.6)} g` },  // 60% of total water
      { at: 105, label: "Pour 2",   targetFn: d => `Pour to ${Math.round(d*16.65)} g` },
      { at: 180, label: "Drawdown", targetFn: () => "Stir, swirl, let it draw" },
    ],
  },
  frenchPress: {
    id: "frenchPress",
    name: "French press",
    defaultDose: 30,            // ~2 heaping tbsp
    ratio: 15.67,               // 470 / 30
    grind: "Coarse (4 clicks open)",
    notes: "Approx. 2 heaping tbsp at default dose.",
    steps: [
      { at: 0,   label: "Pour water", targetFn: d => `Add ${Math.round(d*15.67)} g hot water` },
      { at: 240, label: "Stir / scoop", targetFn: () => "Stir, scoop crust" },
      { at: 540, label: "Press",       targetFn: () => "Plunge just past surface, pour" },
    ],
  },
  iced: {
    id: "iced",
    name: "Iced (Japanese)",
    defaultDose: 32.5,
    ratio: 9.23,                // hot water portion only: 300/32.5
    iceRatio: 6.15,             // ice portion: 200/32.5
    grind: "A bit finer than usual filter",
    steps: [
      { at: 0,   label: "Load ice & bloom", targetFn: d => `Ice ${Math.round(d*6.15)} g, bloom ${Math.round(d*2)}-${Math.round(d*3)} g` },
      { at: 45,  label: "Main pour",        targetFn: d => `Pour to ${Math.round(d*9.23)} g hot water` },
      { at: 165, label: "Stir + swirl",     targetFn: () => "One CW, one CCW, swirl decanter" },
    ],
  },
  coldBrew: {
    id: "coldBrew",
    name: "Cold brew",
    defaultDose: 80,
    ratio: 17.5,                // 1400 / 80
    grind: "Coarse",
    notes: "Steep 12-24 h in fridge, then filter. No live timer; calculator only.",
    steps: [],                  // empty steps array = no live brew mode for this recipe
  },
};
```

When `steps` is empty (cold brew), the Start button is hidden and only the calculator panel shows. This is by design: cold brew is a 12-24 hour passive steep, so a live timer adds no value.

The `notes` field on each recipe surfaces in the setup view as a small italic line below the amounts table when present. It is not shown during brew mode.

**Rinse / preheat steps from the recipe text** (e.g. "rinse dripper with boiling water" for pour over) are intentionally **pre-Start activities** - not steps in the timer. The timer's `at: 0` is the moment hot water hits coffee.

## UI states

### Setup view

```
[Recipe pills] French press | Pour over* | Iced | Cold brew
[Dose input]   - [ 20 g ] +
[Amounts table]
  Water (total)     333 g
  Bloom             40-60 g
  Pour 1 by 1:15    200 g
  Pour 2 by 1:45    333 g
  Grind             Medium-fine
  Total brew time   ~3:00
[Start brew]   <-- primary CTA, full-width, bottom of screen
```

### Brew view (same recipe selected)

```
Header:    Pour over - 1:32
Pills row: 20 g / 333 g  (compact summary)
Step list:
  ✓ 0:00   Bloom 40-60 g
  ▶ 1:15   Pour to 200 g       <-- highlighted (current)
    1:45   Pour to 333 g
    ~3:00  Drawdown
[Big timer]    1:32
[Target line]  Pour to 200 g
[Stop]         <-- secondary, full-width, bottom
```

The setup-and-brew layout share one screen (Layout A from brainstorm). The transition is content-only, not a route change.

## Visual

- **Palette**: cream `#fafaf7` background, roast brown `#6f4e37` accents, neutral text `#222`. Active pill / Start button use the brown.
- **Dark mode**: triggered by `prefers-color-scheme: dark`. Background `#2a2620`, fg `#f5f0e8`, accent `#d4a574`.
- **Type**: system font stack. Tabular numerals (`font-variant-numeric: tabular-nums`) on dose, all amounts, and the timer.
- **Touch targets**: minimum 44 px tall. `-` / `+` and pills generously padded.
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.

## Audio

- WebAudio API, `AudioContext` lazily created on first user gesture (the Start tap).
- Chime: short oscillator burst, ~200 ms, gentle envelope to avoid clicks. Two-tone for the final step (signals "done"), single tone otherwise.
- If `AudioContext` is unavailable (private mode quirks), the brew still runs, just silently. No error UI.

## Persistence

`localStorage['coffee-calc']` = `JSON.stringify({ recipeId, dose })`. Read on load, write on every dose / recipe change. Schema versioning is unnecessary at MVP scale; if the format ever changes, gracefully fall back to defaults on parse failure.

## Edge cases

- **Dose clamping**: `[5, 200]` grams. Buttons disabled at the boundary; manual entry outside the range snaps in.
- **Recipe with no steps** (cold brew): Start button hidden, brew view never reachable.
- **Tab backgrounded during brew**: timer uses `Date.now()` deltas; on `visibilitychange` resuming, render catches up. No drift.
- **Audio context blocked**: brew runs silently.
- **Start tapped twice**: idempotent; second tap is ignored while in brew mode.
- **Reload mid-brew**: state intentionally not persisted across reload for brew mode (only `{recipeId, dose}` persists). Returning to setup view on reload is the expected behavior.

## Testing

A `tests()` function gated behind `?test` in the URL. Runs in the page (no framework), prints results to a `<pre>` injected at the top.

Coverage:

- `derive(pourOver, 20)` - water 333, bloom range 40-60, pour 1 milestone 200, pour 2 milestone 333.
- `derive(frenchPress, 30)` - water 470.
- `derive(iced, 32.5)` - hot water 300, ice 200.
- `derive(coldBrew, 80)` - water 1400.
- Step advancement: simulating elapsed seconds against `pourOver.steps`, the current step index transitions correctly at each `at` boundary.
- Dose clamping: `+` at 200 stays 200; `-` at 5 stays 5.

Manual smoke test before merge: open the file in a phone browser, walk each recipe to completion, confirm chimes fire at each boundary.

## Open follow-ups (not MVP)

- Wake lock to prevent the screen sleeping during a brew.
- Vibration on chime as a backup audio cue.
- "Save as preset" so dose changes per recipe stick separately.
- Extra recipes (AeroPress, espresso) - additive; just add to `RECIPES`.

## Files touched

- **New**: `Notes & Reference/attachments/coffee-calculator.html` (in Obsidian vault)
- **New**: `Notes & Reference/Coffee Calculator.md` (single iframe to the HTML)
- **Edit**: `Notes & Reference/Coffee Recipes.md` (add `> Tool: [[Coffee Calculator]]` near the top)
- **Project repo** (this `coffee-calculator/` directory): hosts the source, README, and this spec. The canonical `coffee-calculator.html` is edited here and copied into the vault. At MVP scale the copy is a manual `cp` (or a one-line npm script `npm run sync`); no build step.
