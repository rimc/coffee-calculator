#!/usr/bin/env node
// Renders every home-screen / tab icon from one glyph: a V60-style pour-over
// dripper with a side handle and a falling drop, in Crema on Dark Roast, so the
// installed icon matches the app's dark theme (DESIGN.md palette).
//
// sharp is deliberately NOT a dependency of this repo. Install it outside the repo once:
//   npm i --prefix "$TEMP/coffee-icon-tools" sharp
//   node scripts/make-icons.mjs
// Or point SHARP_DIR at any folder whose node_modules contains sharp.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sharpDir = process.env.SHARP_DIR || join(tmpdir(), "coffee-icon-tools");
let sharp;
try {
  sharp = createRequire(join(sharpDir, "noop.js"))("sharp");
} catch {
  console.error(`sharp not found under ${sharpDir}\n  npm i --prefix "${sharpDir}" sharp`);
  process.exit(1);
}

const BG = "#2a2620";    // Dark Roast, dark-mode page background
const INK = "#d4a574";   // Crema, dark-mode accent

// Glyph on a 100-unit grid centered on (50,50). Shifted left 5 so the handle
// doesn't pull the visual center off to the right.
const GLYPH = `
  <g transform="translate(-5 0)">
    <path d="M74 30 H86 A 9 9 0 0 1 95 39 V41 A 9 9 0 0 1 86 50 H66" fill="none" stroke="${INK}"
          stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
    <g fill="${INK}">
      <rect x="8" y="10" width="84" height="11" rx="5.5"/>
      <path d="M16 21 H84 L62 64 H38 Z" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <rect x="28" y="64" width="44" height="9" rx="4.5"/>
      <path d="M50 78 C 50 78, 42 88, 42 92 A 8 8 0 0 0 58 92 C 58 88, 50 78, 50 78 Z"/>
    </g>
  </g>`;

// glyphScale = share of the canvas the glyph grid spans.
// Maskable icons keep the glyph inside the 80% safe zone, so they draw smaller.
function svg(size, glyphScale) {
  const g = size * glyphScale;
  const off = (size - g) / 2;
  const k = g / 100;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <g transform="translate(${off} ${off}) scale(${k})">${GLYPH}</g>
</svg>`;
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = [
  ["icons/favicon-32.png", 32, 0.8],
  ["icons/apple-touch-icon.png", 180, 0.66],
  ["icons/icon-192.png", 192, 0.72],
  ["icons/icon-512.png", 512, 0.72],
  ["icons/icon-192-maskable.png", 192, 0.56],
  ["icons/icon-512-maskable.png", 512, 0.56],
];

mkdirSync(join(repoRoot, "icons"), { recursive: true });
for (const [file, size, scale] of out) {
  await sharp(Buffer.from(svg(size, scale))).png().toFile(join(repoRoot, file));
  console.log(`${file} ${size}px`);
}
