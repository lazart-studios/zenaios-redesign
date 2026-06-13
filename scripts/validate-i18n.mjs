import fs from "node:fs";

const LOCALES = ["ro", "hu", "de", "fr"];
const base = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));

// Collect every leaf path + the string value (for placeholder/tag extraction).
function walk(node, path, out) {
  if (typeof node === "string") {
    out.set(path, node);
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`, out));
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) walk(node[k], path ? `${path}.${k}` : k, out);
  } else {
    out.set(path, node); // number/bool/null — record as-is
  }
}

// Extract ICU {placeholders}, <tags>, {#} plural markers, %s tokens.
function tokens(str) {
  if (typeof str !== "string") return { placeholders: [], tags: [], hasHash: false, percentS: 0 };
  // {name} but NOT plural keywords like {count, plural, ...} — capture the var name only
  const placeholders = [...str.matchAll(/\{(\w+)/g)].map((m) => m[1]).sort();
  const tags = [...str.matchAll(/<\/?(\w+)>/g)].map((m) => m[1]).sort();
  const hasHash = /(?:^|[^#])#(?:[^#]|$)/.test(str) && /plural|select/.test(str) ? str.includes("#") : str.includes("#");
  const percentS = (str.match(/%s/g) || []).length;
  return { placeholders, tags, hasHash: str.includes("#"), percentS };
}

const baseLeaves = new Map();
walk(base, "", baseLeaves);

let totalProblems = 0;
const report = {};

for (const loc of LOCALES) {
  const tr = JSON.parse(fs.readFileSync(`messages/${loc}.json`, "utf8"));
  const trLeaves = new Map();
  walk(tr, "", trLeaves);

  const missing = [];
  const extra = [];
  const placeholderMismatch = [];
  const tagMismatch = [];
  const hashMismatch = [];
  const percentMismatch = [];
  const emptyVals = [];

  for (const [path, val] of baseLeaves) {
    if (!trLeaves.has(path)) {
      missing.push(path);
      continue;
    }
    const tv = trLeaves.get(path);
    const a = tokens(val);
    const b = tokens(tv);
    if (JSON.stringify(a.placeholders) !== JSON.stringify(b.placeholders))
      placeholderMismatch.push(`${path}  EN[${a.placeholders}] != ${loc}[${b.placeholders}]`);
    if (JSON.stringify(a.tags) !== JSON.stringify(b.tags))
      tagMismatch.push(`${path}  EN<${a.tags}> != ${loc}<${b.tags}>`);
    if (a.hasHash !== b.hasHash) hashMismatch.push(`${path}  EN#=${a.hasHash} ${loc}#=${b.hasHash}`);
    if (a.percentS !== b.percentS) percentMismatch.push(`${path}  EN%s=${a.percentS} ${loc}%s=${b.percentS}`);
    if (typeof tv === "string" && tv.trim() === "" && typeof val === "string" && val.trim() !== "")
      emptyVals.push(path);
  }
  for (const path of trLeaves.keys()) if (!baseLeaves.has(path)) extra.push(path);

  const probs =
    missing.length +
    extra.length +
    placeholderMismatch.length +
    tagMismatch.length +
    hashMismatch.length +
    percentMismatch.length +
    emptyVals.length;
  totalProblems += probs;
  report[loc] = {
    leaves: trLeaves.size,
    missing,
    extra,
    placeholderMismatch,
    tagMismatch,
    hashMismatch,
    percentMismatch,
    emptyVals,
    probs,
  };
}

console.log(`EN leaf count: ${baseLeaves.size}\n`);
for (const loc of LOCALES) {
  const r = report[loc];
  console.log(`=== ${loc.toUpperCase()} === leaves=${r.leaves} problems=${r.probs}`);
  for (const [label, arr] of [
    ["MISSING keys", r.missing],
    ["EXTRA keys", r.extra],
    ["PLACEHOLDER mismatch", r.placeholderMismatch],
    ["TAG mismatch", r.tagMismatch],
    ["# (plural) mismatch", r.hashMismatch],
    ["%s mismatch", r.percentMismatch],
    ["EMPTY values", r.emptyVals],
  ]) {
    if (arr.length) {
      console.log(`  ${label} (${arr.length}):`);
      arr.slice(0, 25).forEach((x) => console.log(`    - ${x}`));
      if (arr.length > 25) console.log(`    ... +${arr.length - 25} more`);
    }
  }
  console.log("");
}
console.log(totalProblems === 0 ? "✅ ALL CLEAN" : `❌ ${totalProblems} total problems`);
process.exit(totalProblems === 0 ? 0 : 1);
