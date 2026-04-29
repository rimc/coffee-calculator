# Product

## Register

product

## Users

A single user (the maker), brewing coffee at home. The primary scene is half-asleep in the kitchen, phone propped against a kettle or sitting on the counter, hands wet, glasses possibly across the room. The job to be done is *hit pour marks reliably across four recipes (pour over, French press, Japanese-style iced, cold brew) without doing arithmetic and without missing audio cues.* Secondary scene: opening the same file from inside the Obsidian vault as an `<iframe>` embed for reference, with the recipe note one click away.

## Product Purpose

A single self-contained `coffee-calculator.html` (HTML + inline CSS + inline JS, no build step, no dependencies, no network) that scales the four canonical recipes from one knob (coffee dose in grams) and walks the brew with a chime-cued timer. Success is "from cold start to first pour in under five seconds, with no thinking." It exists because doing dose math at 6am is exactly the friction that kills good brewing habits, and existing apps either bundle this into a paid product or wrap it in social-app cruft.

## Brand Personality

Warm, unhurried, plainspoken. Ceramic-mug feel rather than gallery-clean. The voice on screen is short and direct (`Pour to 200 g`, not `It's time to pour your second pour!`). Confidence shows through restraint, not flourish: the interface should feel like a tool that has been used a hundred times, not one that wants to impress on the first open.

## Anti-references

- **Recipe-blog / ad-heavy.** Half Baked Harvest, pre-redesign NYT Cooking, generic SEO recipe sites: long scrolling content, hero photos, sticky banners, monetization noise. The calculator is the opposite shape - one screen, no scrolling on a phone, nothing to dismiss.
- **Pro-barista / aggressive.** Acaia, Decent Espresso, "engineering for caffeine" tooling: black backgrounds, neon green readouts, dense data overlays, gauges, hex-grid dashboards. This tool is for a kitchen, not a lab bench.
- **Gamified habit apps.** Streak counters, animated progress rings, achievement toasts. Implicitly out - listed for completeness because the timer + brew loop are exactly the surface where this creep would happen.

## Design Principles

1. **Hands-off, eyes-on.** The user is pouring water, not poking the screen. Type scale, contrast, and the timer's prominence serve glance-ability from across the counter. Density is the wrong direction; readability at arm's length is the right one.
2. **No friction at 6am.** Defaults are correct, controls are big and forgiving, nothing requires precision while half-asleep. The dose `+`/`-` buttons are 44px because tired thumbs deserve forgiveness, and the picked recipe persists across sessions because the user almost always wants the same one.
3. **Quiet utility, not entertainment.** No streaks, no celebrations, no rewards, no upsells, no marketing surfaces. Open, brew, close. Anything that resembles "engagement" belongs in a different product.
4. **Audio carries the timer; the eyes are spare.** Chimes are the primary boundary cue. The visible timer is reassurance, not spectacle - it should be legible without commanding the screen, because attention belongs on the kettle.
5. **The kitchen is the context.** Wet hands, dim light, phone-on-counter, ambient noise. Design for that scene, not for "viewing this on a Macbook in good light." Touch targets, contrast, and audio defaults all flow from this.
