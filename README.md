# Coffee Calculator

A single-file HTML brewing companion that scales the four coffee recipes
from the Obsidian vault note `Notes & Reference/Coffee Recipes.md` and
walks you through each brew with audio-cued timed steps. Mobile-first.

**Live:** https://rimc.github.io/coffee-calculator/

Design context lives at `PRODUCT.md` (strategy) and `DESIGN.md` (visual
system). The original brainstorming spec is in the Obsidian vault at
`Projects/Coffee Calculator/Coffee Calculator Design Spec.md`.

## Files

- `index.html` - the canonical source; everything is inline (CSS + JS), no build step, no dependencies, no network calls at runtime.
- `.nojekyll` - tells GitHub Pages to skip Jekyll processing and serve the file as-is.
- `package.json` - hosts the `sync` and `test` scripts.

## Usage

### Run locally

```bash
# Just open the file in a browser
start index.html      # Windows
open  index.html      # macOS
xdg-open index.html   # Linux
```

### Run the test suite

Append `?test` to the URL:

```
file:///.../index.html?test
```

A pass/fail summary is injected at the top of the page. Or run the
headless logic tests:

```bash
npm test
```

### Deploy

The hosted copy is served by GitHub Pages straight from `main`. To
publish a change:

```bash
git push
```

Pages rebuilds in 30-90 seconds. The stable URL is
`https://rimc.github.io/coffee-calculator/`.

### Sync to Obsidian vault (offline backup)

A copy lives at `<vault>/Notes & Reference/attachments/coffee-calculator.html`
as an offline fallback. The Obsidian note points at the hosted URL,
but the local copy stays in sync so the file is available without
network:

```bash
npm run sync
```

## Editing recipes

Recipes live in the `RECIPES` object near the top of the `<script>` block
inside `index.html`. Each recipe has:

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
