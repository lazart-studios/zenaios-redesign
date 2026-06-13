import fs from "node:fs";

// Partition of the 32 top-level namespaces into 6 coherent chunks.
export const CHUNKS = {
  chrome: ["meta", "nav", "footer", "common", "status", "languageSwitcher", "notFound"],
  marketing: ["hero", "proof", "threeDomains", "audiences", "flagship", "capabilities", "outcomes", "team", "cta"],
  pages: ["platformPage", "categoryPage", "modulePage", "aboutPage", "deploymentsPage", "demoPage", "contactPage", "resourcesPage", "form"],
  data: ["categories", "deploymentsData", "teamData", "outcomesData", "visuals"],
  modules: ["modules"],
  legal: ["legal"],
};

const en = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));

// Sanity: partition must cover every key exactly once.
const all = Object.values(CHUNKS).flat();
const enKeys = Object.keys(en);
const missing = enKeys.filter((k) => !all.includes(k));
const extra = all.filter((k) => !enKeys.includes(k));
const dupes = all.filter((k, i) => all.indexOf(k) !== i);
if (missing.length || extra.length || dupes.length) {
  console.error("PARTITION ERROR", { missing, extra, dupes });
  process.exit(1);
}

for (const d of ["scripts/tmp-i18n/en", "scripts/tmp-i18n/draft", "scripts/tmp-i18n/out"]) {
  fs.mkdirSync(d, { recursive: true });
}

for (const [chunk, keys] of Object.entries(CHUNKS)) {
  const subtree = {};
  for (const k of keys) subtree[k] = en[k];
  fs.writeFileSync(`scripts/tmp-i18n/en/${chunk}.json`, JSON.stringify(subtree, null, 2));
  const n = JSON.stringify(subtree).length;
  console.log(`en/${chunk}.json  (${keys.length} keys, ${n} chars)`);
}
console.log("split OK — 32 keys covered, no gaps/overlaps");
