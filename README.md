# Coffee Calculator

A single-file HTML brewing companion that scales the four coffee recipes
from the Obsidian vault note `Notes & Reference/Coffee Recipes.md` and
walks you through each brew with audio-cued timed steps. Mobile-first.

Design spec lives in the Obsidian vault at
`Projects/Coffee Calculator/Coffee Calculator Design Spec.md`.

## Files

- `coffee-calculator.html` - the canonical source; everything is inline (CSS + JS), no build step, no dependencies, no network calls.
- `package.json` - just hosts the `sync` script.

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

### Sync to Obsidian vault

The Obsidian-facing copy lives at
`<vault>/Notes & Reference/attachments/coffee-calculator.html`.
After editing here, copy it over:

```bash
npm run sync
```

(Or `cp coffee-calculator.html "<vault>/Notes & Reference/attachments/"`.)

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
