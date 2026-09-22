import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles/app.css", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

assert.match(css, /\.home-viewport\s+\.top-banner-img\s*\{[^}]*object-fit:\s*contain/i,
  "the homepage hero must preserve the complete approved artwork on narrow screens");
assert.doesNotMatch(css, /\.home-viewport\s+\.top-banner-img\s*\{[^}]*object-fit:\s*cover/i,
  "the homepage hero must not crop the right-side bird on phones");
assert.match(html, /class=["']primary-card["']/i,
  "the public homepage must use the approved textured primary card");
assert.match(html, /class=["']card-deck["'][\s\S]*class=["']mini-card front["']/i,
  "the public homepage must include the approved stacked card composition");
assert.match(html, /WHAT SHALL WE DO TODAY\?/i,
  "the public homepage must use the approved lightweight English heading");
assert.doesNotMatch(html, /TODAY, LET'S PICK|当前优先功能/i,
  "the public homepage must not retain the removed eyebrow copy");
assert.match(html, /抽一张卡，让干饭不再纠结/i,
  "the public homepage must use the approved meal description");
assert.match(css, /--earth-subtitle-x:\s*3px[\s\S]*--earth-subtitle-y:\s*2px[\s\S]*--earth-subtitle-opacity:\s*0\.5/i,
  "the public homepage must keep the approved Earth Online subtitle position and opacity");
assert.match(css, /font-family:\s*["']GenJyuuGothic["']/i,
  "the public homepage must use the approved GenJyuuGothic family with fallback");
assert.doesNotMatch(html, /class=["']dev-controls["']|class=["']dev-shell["']/i,
  "the public homepage must not ship the local development controls");
assert.match(css, /html:has\(body\[data-view=["']home["']\]\)\s*\{[^}]*overflow-y:\s*auto/i,
  "the home document must use native page scrolling");
assert.match(css, /body\[data-view=["']home["']\]\s*\{[^}]*overflow-y:\s*auto/i,
  "the home body must allow native scrolling after the splash transition");
assert.match(css, /\.home-viewport\s*\{[^}]*position:\s*relative[^}]*overflow-y:\s*visible/i,
  "the homepage must not create a nested fixed scroll container");
assert.match(css, /\.floating-tabbar\s*\{[^}]*position:\s*relative[^}]*inset:\s*auto[^}]*bottom:\s*auto/i,
  "the bottom navigation must return to the homepage content flow");
assert.match(css, /\.floating-tabbar\s*\{[^}]*margin:\s*18px\s+0\s+0/i,
  "the bottom navigation must sit below the secondary cards with a clear gap");
assert.match(css, /\.home-viewport\s*\{[^}]*padding-bottom:\s*calc\(18px\s*\+\s*env\(safe-area-inset-bottom\)\)/i,
  "the homepage must keep only a small bottom safe-area padding when navigation is in flow");
assert.match(css, /\.floating-tabbar\s*\{[^}]*padding:\s*4px/i,
  "the bottom navigation must use a more compact outer height");
assert.match(css, /\.tab\s*\{[^}]*min-height:\s*44px/i,
  "the bottom navigation tabs must use a more compact height");

console.log("PASS: public homepage hero preserves the complete artwork");
