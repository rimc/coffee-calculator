#!/usr/bin/env node
// Headless smoke test - extracts pure logic from coffee-calculator.html
// and runs the same assertions runTests() runs in the browser.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(__dirname, "..", "index.html"), "utf8");

// Extract the script body (between the only <script> tag).
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error("no <script> block found"); process.exit(2); }
const script = m[1];

// Strip browser-only sections so Node can eval the pure logic.
let trimmed = script
  .replace(/window\.addEventListener[\s\S]*$/, "")
  .replace(/document\.addEventListener[\s\S]*?\}\);\s*/g, "")
  // The renderTests call references `document.body`; we'll skip it.
  .replace(/if \(location\.search[\s\S]*?\}\s*$/, "");

// runTests() and render() both touch DOM. We only call runTests-equivalents below,
// so we just need RECIPES, derive, currentStepFor, clampDose. The whole script
// defines them at the top before any DOM access, so an eval will succeed if we
// also stub `localStorage` and `window`.

const sandbox = `
const localStorage = { getItem: () => null, setItem: () => {} };
const window = {};
const document = { addEventListener: () => {} };
`;

eval(sandbox + trimmed + `
globalThis._tests = { RECIPES, derive, currentStepFor, clampDose };
`);

const { RECIPES, derive, currentStepFor, clampDose } = globalThis._tests;

let pass = 0, fail = 0;
function eq(label, actual, expected) {
  const ok = (typeof actual === "number" && Math.abs(actual - expected) < 0.5)
          || actual === expected;
  if (ok) { pass++; console.log("PASS  " + label); }
  else    { fail++; console.error("FAIL  " + label + " (got " + actual + ", expected " + expected + ")"); }
}

const po = derive(RECIPES.pourOver, 20);
eq("pourOver(20).water === 333", Math.round(po.water), 333);
eq("pourOver(20).bloomLow === 40", po.bloomLow, 40);
eq("pourOver(20).bloomHigh === 60", po.bloomHigh, 60);
eq("pourOver(20).pour1 === 200", Math.round(po.pour1), 200);
eq("pourOver(20).pour2 === 333", Math.round(po.pour2), 333);

const fp = derive(RECIPES.frenchPress, 30);
eq("frenchPress(30).water === 470", Math.round(fp.water), 470);

const ic = derive(RECIPES.iced, 32.5);
eq("iced(32.5).hotWater === 300", Math.round(ic.hotWater), 300);
eq("iced(32.5).ice === 200", Math.round(ic.ice), 200);
eq("iced(32.5).water === 500", Math.round(ic.water), 500);

const cb = derive(RECIPES.coldBrew, 80);
eq("coldBrew(80).water === 1400", Math.round(cb.water), 1400);

const poSteps = RECIPES.pourOver.steps;
eq("currentStepFor(po, 0) === 0", currentStepFor(poSteps, 0), 0);
eq("currentStepFor(po, 44) === 0", currentStepFor(poSteps, 44), 0);
eq("currentStepFor(po, 45) === 1", currentStepFor(poSteps, 45), 1);
eq("currentStepFor(po, 75) === 2", currentStepFor(poSteps, 75), 2);
eq("currentStepFor(po, 105) === 3", currentStepFor(poSteps, 105), 3);

eq("clampDose(0) === 5", clampDose(0), 5);
eq("clampDose(300) === 200", clampDose(300), 200);
eq("clampDose(20) === 20", clampDose(20), 20);

// Step targetFn outputs at default dose
eq("po step 1 target", RECIPES.pourOver.steps[1].targetFn(20), "Pour to 200 g");
eq("po step 2 target", RECIPES.pourOver.steps[2].targetFn(20), "Pour to 333 g");
eq("fp step 0 target", RECIPES.frenchPress.steps[0].targetFn(30), "Add 470 g hot water");
eq("iced step 0 target", RECIPES.iced.steps[0].targetFn(32.5), "Ice 200 g, bloom 65-98 g");
eq("iced step 1 target", RECIPES.iced.steps[1].targetFn(32.5), "Pour to 300 g hot water");

console.log("\nTotal: " + pass + " pass, " + fail + " fail");
process.exit(fail === 0 ? 0 : 1);
