import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles/app.css", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

assert.match(css, /\.home-viewport\s+\.top-banner-img\s*\{[^}]*object-fit:\s*contain/i,
  "the homepage hero must preserve the complete approved artwork on narrow screens");
assert.doesNotMatch(css, /\.home-viewport\s+\.top-banner-img\s*\{[^}]*object-fit:\s*cover/i,
  "the homepage hero must not crop the right-side bird on phones");
assert.match(html, /class=["']primary-card["']/i,
  "the public homepage must use the approved textured primary card");
assert.match(html, /<img[^>]*class=["']top-banner-img["'][^>]*src=["']assets\/home\/top-banner-860\.jpg["'][^>]*srcset=["'][^"']*top-banner-430\.jpg\s+430w[^"']*top-banner-860\.jpg\s+860w[^"']*["'][^>]*width=["']1536["'][^>]*height=["']1024["']/i,
  "the public homepage hero must offer a compressed responsive source without changing its intrinsic aspect ratio");
await Promise.all([
  "../assets/home/top-banner-430.jpg",
  "../assets/home/top-banner-860.jpg",
].map((path) => access(new URL(path, import.meta.url))));
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
assert.match(css, /\.floating-tabbar\s*\{[^}]*transform:\s*translate\(1px,\s*8px\)/i,
  "the public bottom navigation must use the approved overall position");
assert.match(css, /\.floating-tabbar\s+\.tab\s*\{[^}]*font-size:\s*11\.5px/i,
  "the public bottom navigation must use the approved text size");
assert.match(css, /\.floating-tabbar\s+\.tab\s+i\s*\{[^}]*width:\s*14px[^}]*transform:\s*translate\(0,\s*2px\)/i,
  "the public bottom navigation must use the approved icon size and vertical position");
assert.match(css, /\.floating-tabbar\s+\.tab\s*>\s*span\s*\{[^}]*transform:\s*translate\(0,\s*1px\)/i,
  "the public bottom navigation labels must use the approved vertical position");
assert.match(css, /body\[data-view=["']home["']\]\s*\{[^}]*touch-action:\s*pan-y/i,
  "the public homepage must explicitly allow vertical touch scrolling");
assert.doesNotMatch(css, /body\[data-view=["']home["']\]\s*\{[^}]*overscroll-behavior-y:\s*contain/i,
  "the public homepage must not constrain the body scroll boundary");
assert.match(css, /@media\s*\(max-width:\s*430px\)[\s\S]*\.home-viewport\s*\{[^}]*min-height:\s*calc\(100dvh\s*\+\s*48px\)/i,
  "the public phone homepage must keep a compact scroll runway");

console.log("PASS: public homepage hero preserves the complete artwork");
