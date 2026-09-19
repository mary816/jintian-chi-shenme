import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles/app.css", import.meta.url), "utf8");

assert.match(html, /class=["']splash-copy["']/i,
  "the public page must use the approved splash title group");
assert.match(html, /assets\/splash\/todayni-logo-olive\.png/i,
  "the public splash must use the approved todayni title image");
assert.match(html, /class=["']splash-enter["']/i,
  "the public splash must include the approved enter cue");
assert.doesNotMatch(html, /class=["']orb\s+orb--top["']/i,
  "the public splash must not retain the prior illustrated splash background");
assert.match(css, /\.splash\s*\{[^}]*--splash-title-y:\s*29%/i,
  "the public splash must use the approved title position");
assert.match(css, /\.splash\s*\{[^}]*--splash-overlay-opacity:\s*\.98/i,
  "the public splash must use the approved overlay opacity");
assert.match(css, /\.splash\s*\{[^}]*background:\s*#FBF8F1;[^}]*background:\s*radial-gradient\(circle at 50% 43%,\s*rgba\(255,\s*255,\s*255,\s*\.72\)/i,
  "the public splash must retain a legacy-safe cream fallback and rgba gradient");
assert.doesNotMatch(css, /\.splash\s*\{[^}]*rgb\(255 255 255\s*\//i,
  "the public splash must avoid unsupported space-separated rgb alpha syntax");
assert.match(css, /\.splash\s*\{[^}]*--splash-enter-y:\s*94%/i,
  "the public splash must use the approved enter position");
assert.match(css, /\.splash\s*\{[^}]*--splash-enter-size:\s*11px/i,
  "the public splash must use the approved enter size");
assert.match(css, /body\[data-view=["']splash["']\]\s+\.home-viewport\s*\{[^}]*opacity:\s*1/i,
  "the homepage must remain subtly visible underneath the splash");

console.log("PASS: public splash uses the approved tuned overlay");
