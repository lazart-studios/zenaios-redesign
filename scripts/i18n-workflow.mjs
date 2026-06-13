export const meta = {
  name: 'retranslate-catalog',
  description: 'Re-translate the i18n catalog into RO/HU/DE/FR with a native copy-editor polish pass',
  phases: [
    { title: 'Translate', detail: 'Sonnet: faithful first-pass translation per chunk', model: 'sonnet' },
    { title: 'Edit', detail: 'Opus: native copywriter naturalizes each chunk' },
  ],
}

const BASE = "/Users/vlad/MVPs/zenAIos Redesign";

const CHUNKS = {
  chrome: ["meta", "nav", "footer", "common", "status", "languageSwitcher", "notFound"],
  marketing: ["hero", "proof", "threeDomains", "audiences", "flagship", "capabilities", "outcomes", "team", "cta"],
  pages: ["platformPage", "categoryPage", "modulePage", "aboutPage", "deploymentsPage", "demoPage", "contactPage", "resourcesPage", "form"],
  data: ["categories", "deploymentsData", "teamData", "outcomesData", "visuals"],
  modules: ["modules"],
  legal: ["legal"],
};

const LANGS = [
  {
    code: 'ro', name: 'Romanian', plural: 'one / few / other',
    register: 'Professional & neutral. Prefer impersonal constructions; where you must address the reader directly, use the polite/formal register (dumneavoastră — e.g. "rezervați", "descoperiți", "instituției dumneavoastră"). NEVER the casual "tu". Read like premium Romanian B2B health-tech copy.',
  },
  { code: 'hu', name: 'Hungarian', plural: 'one / other', register: 'Formal (magázás / Ön). Professional B2B register addressing hospital & government decision-makers.' },
  { code: 'de', name: 'German', plural: 'one / other', register: 'Formal (Sie). Professional B2B register addressing hospital & government decision-makers.' },
  { code: 'fr', name: 'French', plural: 'one / other', register: 'Formal (vous). Professional B2B register addressing hospital & government decision-makers.' },
];

const RULES = `STRUCTURE — CRITICAL (the build breaks otherwise):
- The output MUST have exactly the same JSON keys, nesting, and array lengths & order as the source. Translate VALUES only — never keys.
- Preserve every ICU placeholder verbatim: {count} {name} {domain} {location} {email} {phone} {date} {category} {module} {url} {year}. Never translate or rename them; reposition within the sentence only as grammar requires.
- Preserve every rich-text tag verbatim and balanced: <b></b> <strong></strong> <contact></contact> <email></email> <phone></phone>. Translate the text BETWEEN tags; never translate, drop, or reorder a tag pair's name.
- Preserve any %s tokens exactly.
- Output strictly valid JSON parseable by JSON.parse (double quotes, proper escaping, no trailing commas, no comments).`;

const GLOSSARY = `DO NOT TRANSLATE (keep verbatim): brand & product names — ZenAiOS, ZEN_RAG, "Hospital OS", "LLM Compare"; tech & standards — RAG, ICD-10, DRG, FOCG, CNAS, DSP, CME, Azure Speech, llama.cpp, FAISS, Manchester (triage system); place & organisation proper nouns — Oradea, "Spitalul Județean de Urgență Oradea", "Primăria Oradea"; people — George Haber, Vlad Iliescu, Horea Timiș. Keep role acronyms (CEO, CTO, CMO, CIO), version tokens (v1, v2…), medical codes, numbers and percentages unchanged. The COUNTRY name may take its natural local form (Rumänien / Roumanie / Románia / România); the city "Oradea" never changes.`;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ok: { type: 'boolean' },
    wrote: { type: 'string', description: 'absolute path written' },
    leaves: { type: 'number', description: 'count of translated string values' },
    notes: { type: 'string', description: 'short note on choices / changes' },
  },
  required: ['ok', 'wrote'],
};

function translatePrompt(lang, chunk) {
  const enPath = `${BASE}/scripts/tmp-i18n/en/${chunk}.json`;
  const draftPath = `${BASE}/scripts/tmp-i18n/draft/${lang.code}.${chunk}.json`;
  return `You are a professional ${lang.name} translator and marketing copywriter for ZenAiOS — an AI operating system for hospitals, built in Oradea, Romania (a premium B2B health-tech brand).

TASK
1. Read the English i18n source JSON at: ${enPath}
2. Translate every STRING VALUE into ${lang.name}.
3. WRITE the translated object as pretty-printed JSON (2-space indent) to: ${draftPath}

REGISTER: ${lang.register}

This is marketing & product-UI copy. Translate for MEANING and NATURALNESS — never word-for-word. It must read like it was originally written by a native ${lang.name} copywriter: confident, clear, idiomatic, concise. Avoid calques and English word order.

${RULES}

ICU PLURALS: for any value shaped like "{x, plural, ...}", keep the "{x, plural, ...}" wrapper and every "#" marker, translate the words inside each category, and use the correct ${lang.name} plural categories: ${lang.plural}. (Add or drop categories as the language requires — this is the ONLY place the structure may legitimately change.)

${GLOSSARY}

OUTPUT: Write ONLY the JSON object to ${draftPath} (identical keys & shape to the source). Then return ok:true, wrote:"${draftPath}", leaves:<number of string values you translated>, and a short note.`;
}

function editPrompt(lang, chunk, prev) {
  const enPath = `${BASE}/scripts/tmp-i18n/en/${chunk}.json`;
  const draftPath = `${BASE}/scripts/tmp-i18n/draft/${lang.code}.${chunk}.json`;
  const outPath = `${BASE}/scripts/tmp-i18n/out/${lang.code}.${chunk}.json`;
  return `You are a senior ${lang.name} copy editor and native speaker reviewing a first-pass translation for ZenAiOS, an AI operating system for hospitals (premium B2B health-tech brand).

READ BOTH:
  • English source:            ${enPath}
  • Draft ${lang.name} translation:  ${draftPath}

GOAL: make the ${lang.name} read like NATIVE, polished marketing copy — not a translation. Rewrite aggressively to fix:
  • literal / word-for-word phrasing and English word order (anything that "sounds translated")
  • awkward collocations, calques, clumsy compounds, mistranslations of idioms
  • redundancy (e.g. an English "+9 more" must become the natural local form, not a doubled phrase)
  • wrong or inconsistent terminology — keep product/domain terms consistent across the whole file
  • register slips — hold this register throughout: ${lang.register}
Preserve the EXACT meaning of the English. Keep the marketing punch and brevity; do not pad or add sentences.

${RULES}

ICU PLURALS: keep the "{x, plural, ...}" wrapper, the "#" markers, and correct ${lang.name} categories (${lang.plural}).

${GLOSSARY}

OUTPUT: Write the corrected, FINAL JSON (identical keys & shape to the source) to: ${outPath}
Then return ok:true, wrote:"${outPath}", leaves:<count>, and a short note on what you changed.
(First-pass note for context: ${prev && prev.notes ? JSON.stringify(prev.notes).slice(0, 300) : 'n/a'}.)`;
}

const items = [];
for (const lang of LANGS) for (const chunk of Object.keys(CHUNKS)) items.push({ lang, chunk });

log(`Re-translating ${Object.keys(CHUNKS).length} chunks × ${LANGS.length} languages = ${items.length} translate→edit chains.`);

const results = await pipeline(
  items,
  (item) =>
    agent(translatePrompt(item.lang, item.chunk), {
      label: `tr:${item.lang.code}:${item.chunk}`,
      phase: 'Translate',
      model: 'sonnet',
      schema: SCHEMA,
    }),
  (prev, item) =>
    agent(editPrompt(item.lang, item.chunk, prev), {
      label: `ed:${item.lang.code}:${item.chunk}`,
      phase: 'Edit',
      schema: SCHEMA,
    }),
);

const byLang = {};
for (let i = 0; i < items.length; i++) {
  const code = items[i].lang.code;
  (byLang[code] ??= { ok: 0, fail: 0, fails: [] });
  const r = results[i];
  if (r && r.ok) byLang[code].ok++;
  else {
    byLang[code].fail++;
    byLang[code].fails.push(items[i].chunk);
  }
}

log('Edit pass complete: ' + Object.entries(byLang).map(([k, v]) => `${k} ${v.ok}/${v.ok + v.fail}`).join('   '));

return {
  total: items.length,
  ok: results.filter((r) => r && r.ok).length,
  byLang,
};
