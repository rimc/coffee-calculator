# Coffee Calculator

A single-file HTML brewing companion that scales the four coffee recipes
from the Obsidian vault note `Notes & Reference/Coffee Recipes.md` and
walks you through each brew with audio-cued timed steps. Mobile-first.

**Live:** https://coffee-calc-fawn.vercel.app/

Design context lives at `PRODUCT.md` (strategy) and `DESIGN.md` (visual
system). The original brainstorming spec is in the Obsidian vault at
`Projects/Coffee Calculator/Coffee Calculator Design Spec.md`.

## Files

- `coffee-calculator.html` - the canonical source; everything is inline (CSS + JS), no build step, no dependencies, no network calls at runtime.
- `vercel.json` - rewrite so `/` serves the calculator on Vercel.
- `package.json` - hosts `sync`, `test`, and `deploy` scripts.

## Usage

### Run locally

```bash
# Just open the file in a browser
start coffee-calculator.html      # Windows
open  coffee-calculator.html      # macOS
xdg-open coffee-calculator.html   # Linux
```

### Run the test suite

Append `?test` to the URL:

```
file:///.../coffee-calculator.html?test
```

A pass/fail summary is injected at the top of the page.

### Deploy to Vercel

The Obsidian iframe and the "Open in browser" link in
`Notes & Reference/Coffee Calculator.md` both point at the hosted URL.
After editing the calculator locally, deploy:

```bash
npm run deploy
```

This runs `vercel --prod --yes`. The stable production alias
(`coffee-calc-fawn.vercel.app`) gets re-pointed to the new build.

### Sync to Obsidian vault (offline backup)

A copy lives at `<vault>/Notes & Reference/attachments/coffee-calculator.html`
as an offline fallback. The Obsidian note no longer references it,
but it stays in sync so the file is available without network:

```bash
npm run sync
```

## Editing recipes

Recipes live in the `RECIPES` object near the top of the `<script>` block
inside `coffee-calculator.html`. Each recipe has:

- `defaultDose` (g)
- `ratio` (water = dose * ratio)
- `grind`
- `notes` (rendered under the amounts table on the setup screen)
- `steps[]` - each step has `at` (seconds), `label`, `targetFn(dose) -> string`

To add a new recipe:

1. Add an entry to `RECIPES`.
2. Add its id to `RECIPE_ORDER`.
3. Extend `derive()` and the amounts-table block in `renderSetup()` if its
   summary fields differ from existing recipes.
4. Reload, walk through the brew, confirm the chimes fire at each `at`.

## Adding tests

The `runTests()` function uses a tiny inline `eq(label, actual, expected)`
helper. Just append more `eq(...)` calls and reload with `?test`.
