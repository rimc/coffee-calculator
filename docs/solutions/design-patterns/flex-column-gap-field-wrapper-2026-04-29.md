---
title: Flex column rhythm with .field wrapper for mixed-tightness pairings
date: 2026-04-29
category: design-patterns
module: frontend
problem_type: design_pattern
component: tooling
severity: low
applies_when:
  - "A vertical stack of sections needs uniform outer spacing"
  - "Some sections contain tightly-coupled label+control pairs that must stay close"
  - "A bottom CTA needs to push to the end of the container via margin-top: auto"
  - "Per-element margin-bottom rules are accumulating and drifting out of sync"
tags:
  - flexbox
  - layout
  - spacing
  - css
  - responsive
---

# Flex column rhythm with .field wrapper for mixed-tightness pairings

## Context

The coffee-calculator is a single-file mobile layout (`index.html`, 480px max-width column). The root `#app` was a flex column with `gap: 16px`, but its only direct children were `.setup` and `.brew` wrappers, so the app-level gap never reached the actual sections inside.

Inside `.setup`, sections sat flush against each other: recipe pills touched the "Coffee dose" label, the dose stepper touched the amounts table, recipe notes were squeezed between amounts and the Start brew button. The first attempted fix was a chain of `margin-bottom` selectors that had to grow every time a new section type appeared. A `margin-top: auto` on the bottom CTA was in the CSS but inert, because `.setup` was block layout.

The user circled missing gaps in two rounds of screenshots and asked for consistent spacing. The third iteration ([commit 50fc813](https://github.com/rimc/coffee-calculator/commit/50fc813)) landed a durable structural fix.

## Guidance

Make the section container itself a flex column carrying the outer rhythm. Use a small `.field` wrapper for any label-control pair that needs tighter inner spacing.

```css
.setup, .brew {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1; /* lets margin-top: auto push the CTA to the bottom */
}

.field { /* block layout - tight inner spacing lives here */ }
.field .label { margin-bottom: 6px; }

.btn-primary { margin-top: auto; } /* anchors to column bottom */
```

```html
<div class="setup">
  <div class="field">
    <div class="label">Recipe</div>
    <div class="pills">...</div>
  </div>
  <div class="field">
    <div class="label">Coffee dose</div>
    <div class="dose">...</div>
  </div>
  <div class="amounts">...</div>
  <div class="recipe-notes">...</div>
  <button class="btn-primary">Start brew</button>
</div>
```

Two rhythms, cleanly separated: the flex `gap` enforces uniform 16px between sections; the `.field` block context preserves the 6px label-to-control coupling without leaking.

## Why This Matters

The margin-bottom approach scales with section count. Every new section type adds a selector to the rule list, and forgetting one creates a one-off spacing bug. The flex-gap approach is invariant: adding a new direct child of `.setup` automatically gets the section rhythm, no CSS change needed.

The `.field` wrapper also makes label-control coupling explicit in the markup. A reader sees `<div class="field"><div class="label">...</div><control/></div>` and immediately knows those two elements belong together. The relationship isn't buried in a sibling selector.

Side benefit: `margin-top: auto` on a bottom CTA only works inside a flex column with `flex: 1` on that column. Switching `.setup` to flex activates the anchor-to-bottom behavior for free, so the Start brew button sits at the bottom of short screens instead of floating mid-column.

## When to Apply

- Flex-column page or panel layouts where direct children are the "sections"
- Mixed-tightness pairings: tight inner (label + control), uniform outer (section + section)
- "Pin the primary action to the bottom of the column" requirement
- Single-file or low-ceremony codebases where you want spacing rules to not grow with section count

Skip it when sections genuinely have varied spacing (e.g., a heading needs 32px above, a footnote 8px). Flex `gap` is uniform by definition. In that case, fall back to per-section margin or `:has()` rules.

## Examples

Before:

```css
#app { display: flex; flex-direction: column; gap: 16px; }
.setup { /* block layout - app gap doesn't reach inside */ }
.setup > .pills,
.setup > .dose,
.setup > .amounts,
.setup > .recipe-notes { margin-bottom: 16px; }
.label { margin-bottom: 6px; }
.btn-primary { margin-top: auto; } /* inert - parent is block */
```

```html
<div class="setup">
  <div class="label">Recipe</div>
  <div class="pills">...</div>
  <div class="label">Coffee dose</div>
  <div class="dose">...</div>
  <div class="amounts">...</div>
  <div class="recipe-notes">...</div>
  <button class="btn-primary">Start brew</button>
</div>
```

After:

```css
.setup, .brew {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}
.field .label { margin-bottom: 6px; }
.btn-primary { margin-top: auto; } /* now active */
```

```html
<div class="setup">
  <div class="field">
    <div class="label">Recipe</div>
    <div class="pills">...</div>
  </div>
  <div class="field">
    <div class="label">Coffee dose</div>
    <div class="dose">...</div>
  </div>
  <div class="amounts">...</div>
  <div class="recipe-notes">...</div>
  <button class="btn-primary">Start brew</button>
</div>
```

The CSS shrinks (no growing list of section selectors), the markup gains a clear label-control grouping, and the bottom CTA anchors itself without extra rules.

## Related

- Source commit: https://github.com/rimc/coffee-calculator/commit/50fc813
- Project repo: https://github.com/rimc/coffee-calculator
- Live: https://rimc.github.io/coffee-calculator/
