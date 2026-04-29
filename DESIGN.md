---
name: Coffee Calculator
description: A self-contained brewing companion that scales four recipes and chimes through each pour
colors:
  roast-brown: "#6f4e37"
  crema: "#d4a574"
  burnt-brick: "#a85a3c"
  ember: "#c87a5a"
  paper-cream: "#fafaf7"
  oat-foam: "#f3eee2"
  oat-foam-deep: "#ebe6dc"
  parchment-line: "#e8e2d4"
  dark-roast: "#2a2620"
  cocoa-husk: "#36302a"
  cocoa-husk-deep: "#423b33"
  cocoa-line: "#4a4239"
  ink: "#222222"
  steamed-milk: "#f5f0e8"
  ash: "#777777"
  oat-mist: "#bba88a"
  fog: "#aaaaaa"
  oat-shadow: "#8a7e6e"
  white-ceramic: "#ffffff"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "tabular-nums"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  step: "10px"
  control: "12px"
  card: "14px"
  pill: "22px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "18px"
  xxl: "24px"
components:
  pill:
    backgroundColor: "{colors.oat-foam-deep}"
    textColor: "{colors.ash}"
    rounded: "{rounded.pill}"
    padding: "10px 14px"
    height: "44px"
  pill-active:
    backgroundColor: "{colors.roast-brown}"
    textColor: "{colors.white-ceramic}"
    rounded: "{rounded.pill}"
    padding: "10px 14px"
    height: "44px"
  dose-stepper-button:
    backgroundColor: "{colors.oat-foam-deep}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    width: "44px"
    height: "44px"
  card:
    backgroundColor: "{colors.oat-foam}"
    rounded: "{rounded.card}"
    padding: "14px 18px"
  step-row-current:
    backgroundColor: "{colors.roast-brown}"
    textColor: "{colors.white-ceramic}"
    rounded: "{rounded.step}"
    padding: "10px 12px"
  button-primary:
    backgroundColor: "{colors.roast-brown}"
    textColor: "{colors.white-ceramic}"
    rounded: "{rounded.card}"
    padding: "16px"
  button-secondary:
    backgroundColor: "{colors.burnt-brick}"
    textColor: "{colors.white-ceramic}"
    rounded: "{rounded.card}"
    padding: "16px"
---

# Design System: Coffee Calculator

## 1. Overview

**Creative North Star: "The Ceramic Mug"**

The interface should feel like a hand-shaped object you reach for first thing in the morning: warm, matte, a little weighty, used a hundred times. Not gallery-clean and not lab-precise. The palette is roasted-bean and unbleached paper. The typography is a system stack with tabular numerals so the dose, the timer, and the pour milestones all sit on a steady grid even when the digits change. The shapes are softly rounded, the touch targets are forgiving, and the only motion is a 3% press-down on tap so a wet thumb feels acknowledged.

The system is mobile-first and explicitly anti-density. The whole brewing flow lives in a single 480px column so a phone propped against a kettle shows everything at once and a desktop window just gets more whitespace. Nothing scrolls horizontally, no panel slides in, no modal appears, no tooltip explains. If a glance from across the counter while pouring water can't catch what's happening, the design has failed.

It rejects the SEO-recipe-blog shape (sticky banners, hero photos, ad rails) and the pro-barista lab shape (black canvas, neon green readouts, dense overlays) in equal measure. The kitchen is the context, not a dashboard.

**Key Characteristics:**

- One column, one screen, one knob (the dose).
- Cream and roast-brown light, cocoa and crema dark - the same warmth either way.
- Tabular numerals everywhere a number lives.
- Tactile feedback (`scale(0.97)` on `:active`) instead of decorative animation.
- Audio is the primary timing cue; the visible timer is reassurance.

## 2. Colors: The Roasted-Bean Palette

The whole system is unbleached paper warmed by roasted bean. Every neutral is tinted toward the brown axis - there is no `#fff` and no `#000`. The light theme is "cream notebook on a wood counter." The dark theme is "espresso in a matte cup, lit by an under-cabinet bulb." Both share the same warm hue family and the same trust in restraint.

### Primary

- **Roast Brown** (`#6f4e37`): The single load-bearing accent in light mode. Drives the Start button, the active recipe pill, the current step's highlight, the dose number. It is the color of "right now, this matters." It appears on roughly 10-15% of any visible surface.
- **Crema** (`#d4a574`): The dark-mode counterpart to Roast Brown - the same load on the same elements, but now reading like the foam on a fresh shot rather than the bean itself. Warmer, lighter, never neon.

### Secondary

- **Burnt Brick** (`#a85a3c`): The Stop button only. Reserved for "this ends now" - a single secondary action. Never used decoratively. In dark mode this becomes **Ember** (`#c87a5a`) - the same role, lifted for legibility against the cocoa surfaces.

### Neutral

- **Paper Cream** (`#fafaf7`): Light-mode page background. The unbleached-paper baseline everything else sits on.
- **Oat Foam** (`#f3eee2`): Light-mode card and panel surface. The next tonal step inward - amounts table, dose row, step list.
- **Oat Foam Deep** (`#ebe6dc`): Light-mode inactive-pill and stepper-button background. A third tonal step for elements that want to read as "tappable but resting."
- **Parchment Line** (`#e8e2d4`): Light-mode hairline divider in the amounts table.
- **Dark Roast** (`#2a2620`): Dark-mode page background. Never `#000` - always tinted brown.
- **Cocoa Husk** (`#36302a`): Dark-mode card and panel surface.
- **Cocoa Husk Deep** (`#423b33`): Dark-mode inactive-pill and stepper-button background.
- **Cocoa Line** (`#4a4239`): Dark-mode hairline divider.
- **Ink** (`#222`): Light-mode body text.
- **Steamed Milk** (`#f5f0e8`): Dark-mode body text.
- **Ash** (`#777`): Light-mode muted text - amount keys, step times, recipe notes.
- **Oat Mist** (`#bba88a`): Dark-mode muted text.
- **Fog** (`#aaa`): Light-mode dim text - completed-step rows, the small "g" suffix.
- **Oat Shadow** (`#8a7e6e`): Dark-mode dim text.
- **White Ceramic** (`#ffffff`): Used only as foreground on Roast Brown and Burnt Brick - never as a surface.

### Named Rules

**The One-Brown Rule.** There is exactly one accent. In light mode it is Roast Brown; in dark mode it is Crema. The Start button, the active pill, the current step, the dose number, the timer - they all wear the same color so the eye can find "what matters now" without thinking. Adding a second accent is a system-level change, not a screen-level decision.

**The No-Bleached-White Rule.** Never use `#ffffff` as a surface. White Ceramic is reserved for foreground text on Roast Brown and Burnt Brick, where its purity reads as intentional. On any background larger than a button, use Paper Cream.

**The Theme-Mirror Rule.** Light and dark mode are the same design with reversed tonal direction - same warmth, same hierarchy, same component shapes. Tokens are paired (Roast Brown ↔ Crema, Paper Cream ↔ Dark Roast, Oat Foam ↔ Cocoa Husk). Don't ship a feature with one mode polished and the other dim.

## 3. Typography

**Display Font:** System sans (`-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`)
**Body Font:** Same system sans
**Label/Mono Font:** `ui-monospace, SFMono-Regular, Menlo, monospace` - used only inside the `?test` debug panel.

**Character:** A single system stack across the whole interface. Picking the OS's own UI face is the right move for a tool that opens equally as an Obsidian iframe, a phone bookmark, and a local-file desktop tab - the platform's text feels native everywhere. The design earns its character through hierarchy and rhythm, not through a brand typeface.

### Hierarchy

- **Display** (700, 64px, line-height 1, tabular-nums): The brew-mode timer. The single largest type element on the screen, and the only place weight 700 appears.
- **Headline** (600, 32px, line-height 1, tabular-nums): The dose number on the setup screen. Same rhythm as the timer but smaller, so the two states feel like one continuous hierarchy.
- **Title** (600, 15px): The recipe name in the brew-mode header. The amount values in the amounts table.
- **Body** (400, 14px, line-height ~1.4): Step labels, recipe notes (italicized), amount-row keys, default text everywhere else.
- **Label** (400, 11px, letter-spacing 0.08em, uppercase, color Fog/Oat-Shadow): Section labels above each control group ("Recipe", "Coffee dose").

### Named Rules

**The Tabular-Numerals Rule.** `font-variant-numeric: tabular-nums` is set on the body globally, not per element. Every digit - the dose, the amounts, the timer, the step times, the elapsed time in the header - sits on the same fixed grid. A timer that jitters when seconds tick is unacceptable.

**The Italic-For-Notes Rule.** Italic is used exactly once: the recipe-notes line under the amounts table ("Rinse/preheat dripper. Hotter water for lighter roast."). Italic = "context, not instruction."

**The No-Caps-Headlines Rule.** The 0.08em letter-spaced uppercase treatment is reserved for tiny section labels (11px). Never apply it to anything bigger than that - a 16px uppercase headline is the SaaS-marketing fingerprint this system rejects.

## 4. Elevation

The system is **flat with tonal layering**. Depth comes from a four-step warm neutral ramp (background → surface → surface-2 → border), not from shadows. A pill resting on a card on a page reads as three nested tones, each ~5% darker than the last - no shadow, no border on the card. This carries the "ceramic mug, well-thumbed object" feel: matte, not glossy.

The single exception is the bottom-anchored CTA (Start brew, Stop) which carries a low, diffuse shadow so the button reads as the one "object you can lift" on the screen. This is the only elevation the system uses.

### Shadow Vocabulary

- **CTA-lift** (`box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)`): Applied only to `.btn-primary` and `.btn-secondary`. Low opacity, two-stop, ambient. Never increased on hover (this is a touch-first interface).

### Named Rules

**The Tonal-Layering Rule.** Depth is conveyed by the four-step warm-neutral ramp, not by shadows. To raise a surface, step it inward by one tone (page → card → control). Don't reach for `box-shadow`.

**The One-Lift Rule.** Only the bottom-anchored primary CTA carries the `CTA-lift` shadow. If a future component wants elevation, the question to answer first is "should this become the new bottom CTA?" - almost always the answer is no.

## 5. Components

### Recipe Pills

- **Shape:** 22px radius - fully rounded at the 44px touch height (`{rounded.pill}`).
- **Inactive:** Oat Foam Deep background, Ash text, transparent 1.5px border, padding `10px 14px`. Reads as "tappable but quiet."
- **Active (`aria-pressed="true"`):** Roast Brown background, White Ceramic text, Roast Brown 1.5px border. The selected recipe is the loudest thing in the row.
- **Press feedback:** `transform: scale(0.97)` on `:active`. 0.15s transition on the color/border swap.
- **Compact variant (`.summary-pills .pill`):** Used in brew mode to show "20 g / 333 g" - same pill but min-height 28px, padding `5px 10px`, font 12px, always Roast Brown background.

### Dose Stepper

- **Shape:** 14px radius card (`{rounded.card}`) wrapping a 32px Roast Brown number on the left and two 44×44 Oat Foam Deep stepper buttons on the right.
- **Number treatment:** Roast Brown, weight 600, with a smaller (14px, weight 400, Ash) "g" suffix tucked beside it.
- **Stepper buttons:** 12px radius (`{rounded.control}`), 44×44, 20px `−` and `+` glyphs at weight 600. Disabled at the 5 g / 200 g clamp boundaries (35% opacity, no press feedback).
- **The Single-Knob Doctrine.** This is the only input on the calculator. Adding bidirectional inputs (edit-water, edit-ratio) is an explicit non-feature. If a number changes on the screen, it is downstream of the dose.

### Amounts Table

- **Shape:** 14px radius Oat Foam card, padding `6px 16px`. No header row.
- **Row:** flex space-between, baseline-aligned, padded `11px 0`, divided by a 1px Parchment Line bottom border (omitted on the last row).
- **Key:** body weight, Ash. **Value:** weight 600, Ink (or Steamed Milk in dark).
- **Recipe notes line:** sits *below* the amounts card, not inside. 13px italic Ash, padded `0 4px`.

### Step List & Step Row

- **Shape:** 14px radius Oat Foam card containing one row per step, gap 4px, padding 10px.
- **Row:** 56px / 1fr grid columns - left is the step time in tabular-nums Ash, right is the step label and target string. 10px radius (`{rounded.step}`), padding `10px 12px`, body type.
- **States:**
  - Default (upcoming): Ink text, Ash time.
  - `.done`: Fog text (entire row dims). 0.2s transition on background and color.
  - `.current`: Roast Brown background, White Ceramic text, time still tabular-nums but at 85% opacity. This is the loudest element in brew mode after the timer.

### Big Timer

- **Shape:** Centered block, padding `8px 0 4px` - no card, no background, no border. Lives directly on the page surface so the timer reads as "the moment," not "a widget."
- **Number:** Display type (700, 64px, tabular-nums, Roast Brown).
- **Target line:** 14px Ash below the timer, with the current step's target wrapped in a `<strong>` (Ink) - e.g. "Pour 2: Pour to **333 g**". Min-height 1em so the layout doesn't jump when the line is empty between states.

### Buttons

- **Primary (Start brew):** Roast Brown background, White Ceramic text, 14px radius, 16px padding, font 15px / weight 600, full-width, anchored to the bottom of the column via `margin-top: auto`. Carries the CTA-lift shadow.
- **Secondary (Stop):** Same shape and position as primary, but Burnt Brick background. The color difference is the entire signal - Stop reads as "warm warning" without screaming.
- **Press feedback:** `transform: scale(0.99)` on `:active`. Subtler than pills/steppers because the CTA is the most committed gesture on the screen and the shadow already reads as "object you can press."

### Header (brew mode)

- Single row, baseline-aligned: recipe name on the left in Title type, elapsed time on the right in body type tabular-nums Ash. Both sit directly on the page surface - no card, no divider. This is the lightest weight element on the screen because the brew is the subject, not the chrome.

### Named Rules

**The Tactile-And-Forgiving Rule.** Every interactive element is at least 44px tall, has generous padding, and presses down 1-3% on `:active`. Damp fingers, sleepy thumbs. If a target is below 44px or has no press feedback, it has not earned its place in this interface.

**The No-Hover-States Rule.** The interface targets touch as the primary input. Hover treatments are not used - color/state changes happen on `:active` (mouse-down, finger-down) so a glance at the desktop version reads identically to the phone.

## 6. Do's and Don'ts

### Do

- **Do** keep the entire brewing flow in a single 480px column. The setup view and the brew view share one screen; the transition is content-only, not a route.
- **Do** use `font-variant-numeric: tabular-nums` on every numeric element. The dose, the amounts, the timer, the step times - all share one digit grid.
- **Do** ship light and dark mode together. Dark mode is mirrored from light, not bolted on. If you change a token in one, change its pair in the other in the same commit.
- **Do** rely on tonal layering (page → card → control → border) for depth. Each step is roughly 5% darker than the previous one.
- **Do** anchor the primary CTA at the bottom of the column with `margin-top: auto`. The Start/Stop button is the single committed action on the screen and should always sit under the thumb.
- **Do** use a `transform: scale(0.97)` press feedback on touch targets. It costs nothing, it survives reduced-motion, and it answers the wet finger.
- **Do** treat the audio chime as the primary cue. The visible timer is reassurance; the ear leads, the eye follows.

### Don't

- **Don't** introduce a second accent color. Roast Brown is the only "this matters" color in light mode; Crema is the only one in dark. A second accent is a system-level change.
- **Don't** use `#ffffff` or `#000000` anywhere as a surface. White Ceramic is foreground-only; Dark Roast (`#2a2620`) is as black as this system gets.
- **Don't** add gradients, gradient text, or `background-clip: text`. The palette is matte. Glossy is the wrong shape.
- **Don't** apply glassmorphism, backdrop-filter blurs, or translucent layers. The surfaces are tonal-layered ceramic, not stacked frosted glass.
- **Don't** add side-stripe borders (`border-left` greater than 1px as a colored accent on a card or list item). If a row needs emphasis, swap its background to Roast Brown - that's what the `.current` step does.
- **Don't** style this like a recipe blog. No hero photos, no sticky CTAs, no "made it!" buttons, no scrolling content rail, no monetization furniture. The whole tool is one screen on a phone.
- **Don't** style this like pro-barista hardware. No black canvas, no neon green readouts, no hexagonal data overlays, no "engineering for caffeine" aesthetic. This is a kitchen, not a lab bench.
- **Don't** add streak counters, progress rings, achievement toasts, or any gamification surface. The brew loop is exactly the place where this creep would happen - keep it sterile.
- **Don't** add hover treatments. Touch is the primary input; mouse hover is not part of this design's vocabulary.
- **Don't** introduce a modal, drawer, or tooltip. If something needs explaining, it doesn't belong on the screen.
- **Don't** convert any `at: 0` rinse/preheat into a timer step. The timer's zero is the moment hot water hits coffee - pre-brew rituals are pre-Start activities.
- **Don't** use uppercase letter-spacing on anything bigger than 11px. The label treatment is reserved for tiny section heads only.
- **Don't** use em dashes anywhere in the UI copy or in this file. Hyphens, commas, colons, parentheses - never `-` or `--`.
