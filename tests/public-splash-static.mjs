import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles/app.css", import.meta.url), "utf8");

assert.match(html, /class=["']splash-copy["']/i,
  "the public page must preserve the current splash title group");
assert.match(html, /assets\/splash\/todayni-logo-olive\.png/i,
  "the public splash must use the approved todayni title image");
assert.match(html, /class=["']splash-enter["']/i,
  "the public splash must preserve the current enter cue");
assert.doesNotMatch(html, /class=["']orb\s+orb--top["']/i,
  "the public splash must not roll the background back to the earlier illustrated version");
assert.match(css, /\.splash\s*\{[^}]*--splash-title-y:\s*29%/i,
  "the public splash must preserve the current title position");
assert.match(css, /\.splash\s*\{[^}]*--splash-title-x:\s*46%/i,
  "the public splash must preserve the approved horizontal title position");
assert.match(css, /\.splash-copy\s*\{[^}]*left:\s*var\(--splash-title-x\)/i,
  "the public splash title group must use the approved horizontal position");
assert.match(css, /\.splash\s*\{[^}]*--splash-title-scale:\s*1/i,
  "the public splash must preserve the current title scale");
assert.match(css, /\.splash-copy p\s*\{[^}]*font-weight:\s*300[^}]*letter-spacing:\s*\.38em/i,
  "the public splash must use the reference lightweight tagline treatment");
assert.match(css, /\.splash-copy p\s*\{[^}]*transform:\s*translate\(33px,\s*-6px\)/i,
  "the public splash must use the reference tagline offset without moving the title group");
assert.match(css, /\.splash\s*\{[^}]*--splash-enter-y:\s*94%/i,
  "the public splash must preserve the current enter position");
assert.match(css, /\.splash\s*\{[^}]*--splash-enter-size:\s*11px/i,
  "the public splash must preserve the current enter size");
assert.match(css, /body\[data-view=["']splash["']\]\s+\.home-viewport\s*\{[^}]*opacity:\s*1/i,
  "the homepage must remain subtly visible underneath the splash");

console.log("PASS: public splash preserves the current layout and uses the reference text treatment");
