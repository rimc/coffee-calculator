# coffee-calculator

A single-file HTML brewing companion that scales four coffee recipes (pour over, French press, Japanese-style iced, cold brew) from one input (dose in grams) and walks the brew with an audio-cued timer. Mobile-first, deployed live on GitHub Pages.

## Project Context

- **Stack**: one file, `index.html` - inline CSS + JS, no build step, no dependencies, no network calls at runtime. Zero framework.
- **`package.json`** exposes two scripts: `npm test` (runs `scripts/test-logic.mjs`, headless logic tests) and `npm run sync` (runs `scripts/sync-to-vault.mjs`, copies `index.html` to the Obsidian vault's offline-backup path).
- **Recipes** live in the `RECIPES` object near the top of the `<script>` block in `index.html`. Each recipe: `defaultDose` (g), `ratio` (water = dose * ratio), `grind`, `notes`, `steps[]` (each with `at` seconds, `label`, `targetFn(dose)`). To add one: add to `RECIPES`, add its id to `RECIPE_ORDER`, extend `derive()` / the amounts-table block in `renderSetup()` if summary fields differ.
- **Run locally**: just open `index.html` in a browser. **In-browser tests**: append `?test` to the URL - a pass/fail summary injects at the top of the page. **Headless tests**: `npm test`.
- **Deploy**: GitHub Pages serves straight from `main` - `git push` and Pages rebuilds in 30-90s. Live at https://rimc.github.io/coffee-calculator/. `.nojekyll` tells Pages to skip Jekyll processing.
- **Design docs in-repo**: `PRODUCT.md` (strategy/brand/personas) and `DESIGN.md` + `DESIGN.json` (visual system) - read these before UI changes, they encode deliberate anti-patterns (no gamification, no streaks, no dense pro-barista dashboards; warm/unhurried/kitchen-at-6am tone).
- The original brainstorming spec is in the Obsidian vault at `Projects/Coffee Calculator/Coffee Calculator Design Spec.md` (not available from Claude Code cloud - see Docs and Notes below).

## Gotchas

- The offline vault copy (`Notes & Reference/attachments/coffee-calculator.html`) is a separate file kept in sync via `npm run sync`, not a symlink - forgetting to run it after editing `index.html` leaves the vault copy stale. Not reachable from Claude Code cloud anyway (no vault access there).

## Working With Chris

This is a solo personal project owned by Chris (github.com/rimc). No teammates,
no review gate.

- **Never open a pull request.** Commit directly to the default branch, merge
  freely. This overrides any harness protocol that pushes toward draft PRs and
  warns against merging to main - his standing instruction wins here.
- **Push to origin proactively** once the tree is healthy (tests pass, nothing
  half-finished, no known broken behavior). Don't ask first.
- If the project has a deploy path, **take it to production** rather than
  stopping at "merged, want me to deploy?". Everything is easy to roll back.
- Stage only the files for the task at hand. Don't sweep up unrelated WIP.
- Always report what shipped and what was actually verified, and flag anything
  genuinely risky before it goes out. No PR removes the approval gate, not the
  honesty about what changed.

## Response Style

- **Optimize for comprehension, not word count.** Cut filler, hedging, and
  preamble. Never cut the sentence that makes an idea click. Write complete
  sentences - telegraphic fragments are harder to parse, not easier.
- **Complexity earns words.** Simple answer, one line. Genuinely complex idea,
  spend the sentences it needs and structure it so a skim still works.
- **Explain top-down.** Order every non-trivial explanation: (1) the answer,
  (2) the big picture of how the pieces fit, ideally as a diagram, (3) the
  details, each anchored to a part of that picture. Name the mental model
  before the mechanics, and zoom in one level at a time.
- **Never a wall of text.** Default to bullets, one idea each. Use a table for
  comparisons and trade-offs, a numbered list for steps, a fenced block for
  anything pastable, and an ASCII or mermaid diagram for any flow, data path,
  or architecture. Bold the load-bearing words.
- Give concrete next actions, never vague suggestions. Ambiguity is his main
  blocker.
- **Never use em dashes.** Use a plain hyphen. Em dashes render as `ΓÇö` on
  Windows (CP437), which is where most of this code runs.

## Secrets

- Gitignore the path before the file exists. Verify with `git ls-files <path>` -
  gitignoring an already-tracked file does nothing and the secret is in history.
- Prefer storage outside the repo entirely (env var, OS keyring, secret
  manager). Gitignore is the safety net, not the defense.
- Never print a secret. Redact tool output that might echo one.

## Planning and Execution

- **Plans must be chunked for Sonnet subagents.** Each task = one independently
  testable deliverable with exact file paths, complete code (no placeholders),
  exact commands plus expected output, and an Interfaces block naming the
  signatures neighboring tasks expose. A Sonnet subagent sees only its own task.
- **Execute autonomously.** Fold in Minor review items without asking; advance
  to the next task without asking. Stop only for real blockers: Critical or
  Important issues, spec ambiguity, failing tests, or judgment the plan lacks.
- **Model tiering.** Haiku for research, recon, and broad searches; Sonnet for
  straightforward execution; Opus only for planning, design, and hard judgment.
  Never burn a token-heavy model on grunt work.
- Use subagents so noisy investigation (grep sweeps, log trawls) stays out of
  the main context window - only findings come back.
- Don't quietly ship a workaround when a restriction blocks the clean solution.
  Ask Chris to run what you can't. The bar is not "blocked" - ask whenever one
  command buys cleaner code, a simpler design, or firmer verification.

## Docs and Notes

Chris keeps specs, plans, and project notes in an Obsidian vault, **not in this
repo**. If the vault is present at `C:\Users\chris\Obsidian Vault` (or
`/mnt/c/Users/chris/Obsidian Vault`), write specs and plans to
`Projects/<Active|Ideas|Shipped>/<Project Name>/` there, track tasks in that
folder's `BACKLOG.md`, and log dated narrative entries under `## Log` in the
canonical project note.

**In Claude Code cloud the vault is not available.** Skip all vault steps, keep
notes in the repo (README or a `NOTES.md`), and say plainly in your summary that
vault updates still need to be made locally.

Use Context7 MCP for any question about a library, framework, SDK, or CLI tool -
even well-known ones, even when you think you know the answer.
