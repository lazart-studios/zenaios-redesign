import fs from "node:fs";
import { CHUNKS } from "./i18n-split.mjs";

const LOCALES = ["ro", "hu", "de", "fr"];
const en = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));

// Produce a node shaped EXACTLY like `base`, preferring a translated leaf when
// present and type-compatible, otherwise falling back to the English value.
// Guarantees the output's key set / array lengths match English regardless of
// any drift in an agent's output. Counts translated vs fallback leaves.
function reconcile(base, tr, stat, path) {
  if (typeof base === "string") {
    // A string translation — including a deliberately empty one (e.g. a headline
    // span the target language folds into another) — is honoured. Only a missing
    // or wrong-typed value falls back to English.
    if (typeof tr === "string") {
      stat.total++;
      if (tr === "") stat.empty++;
      else if (tr === base) stat.same++;
      else stat.translated++;
      return tr;
    }
    stat.total++;
    stat.fallback++;
    stat.fallbackPaths.push(path);
    return base;
  }
  if (Array.isArray(base)) {
    return base.map((v, i) =>
      reconcile(v, Array.isArray(tr) ? tr[i] : undefined, stat, `${path}[${i}]`)
    );
  }
  if (base && typeof base === "object") {
    const out = {};
    for (const k of Object.keys(base)) {
      out[k] = reconcile(base[k], tr && typeof tr === "object" ? tr[k] : undefined, stat, path ? `${path}.${k}` : k);
    }
    return out;
  }
  return base; // number / bool / null — keep English literal
}

let hadError = false;
for (const loc of LOCALES) {
  const stat = { total: 0, translated: 0, same: 0, empty: 0, fallback: 0, fallbackPaths: [] };
  const catalog = {};
  for (const [chunk, keys] of Object.entries(CHUNKS)) {
    const p = `scripts/tmp-i18n/out/${loc}.${chunk}.json`;
    let tr = {};
    try {
      tr = JSON.parse(fs.readFileSync(p, "utf8"));
    } catch (e) {
      console.error(`  ⚠ ${loc}/${chunk}: missing or invalid JSON (${e.message}) — English fallback`);
      hadError = true;
    }
    for (const k of keys) {
      catalog[k] = reconcile(en[k], tr[k], stat, k);
    }
  }
  fs.writeFileSync(`messages/${loc}.json`, JSON.stringify(catalog, null, 2) + "\n");
  const pct = ((stat.translated / stat.total) * 100).toFixed(1);
  console.log(
    `${loc}: ${stat.total} leaves | translated ${stat.translated} (${pct}%) | same-as-EN ${stat.same} | empty ${stat.empty} | fallback ${stat.fallback}`
  );
  if (stat.fallback) {
    console.log(`   fallback leaves: ${stat.fallbackPaths.slice(0, 15).join(", ")}${stat.fallbackPaths.length > 15 ? " …" : ""}`);
  }
}
process.exit(hadError ? 1 : 0);
