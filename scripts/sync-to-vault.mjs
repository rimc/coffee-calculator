#!/usr/bin/env node
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const src = resolve(repoRoot, "index.html");

const VAULT_PATH = process.env.OBSIDIAN_VAULT_PATH
  || "C:/Users/chris/Obsidian Vault";
const dst = resolve(VAULT_PATH, "Notes & Reference/attachments/coffee-calculator.html");

if (!existsSync(src)) {
  console.error("source missing:", src);
  process.exit(1);
}
mkdirSync(dirname(dst), { recursive: true });
copyFileSync(src, dst);
console.log("synced ->", dst);
