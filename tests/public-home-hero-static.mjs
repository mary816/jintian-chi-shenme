import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles/app.css", import.meta.url), "utf8");

assert.match(css, /\.home-viewport\s+\.top-banner-img\s*\{[^}]*object-fit:\s*contain/i,
  "the homepage hero must preserve the complete approved artwork on narrow screens");
assert.doesNotMatch(css, /\.home-viewport\s+\.top-banner-img\s*\{[^}]*object-fit:\s*cover/i,
  "the homepage hero must not crop the right-side bird on phones");

console.log("PASS: public homepage hero preserves the complete artwork");
