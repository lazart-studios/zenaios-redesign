import type { TeamMember } from "./types";

/**
 * Real founding team (from the live site).
 * LinkedIn links point to a name search until exact profile URLs are supplied
 * — keeps every link working (no dead links) per the brief.
 */
function li(name: string) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
    name + " ZenAiOS"
  )}`;
}

export const team: TeamMember[] = [
  {
    name: "George Haber",
    role: "Chief Executive Officer",
    initials: "GH",
    bio: "Sets the vision and takes ZenAiOS to institutions, partners and investors.",
    linkedin: li("George Haber"),
  },
  {
    name: "Vlad Iliescu",
    role: "Chief Technology Officer",
    initials: "VI",
    bio: "Leads the platform and the in-house AI infrastructure — from sovereign RAG to the 17 modules.",
    linkedin: li("Vlad Iliescu"),
  },
  {
    name: "Horea Timiș",
    role: "Chief Medical Officer",
    initials: "HT",
    bio: "Keeps every module grounded in real clinical practice and standards of care.",
    linkedin: li("Horea Timiș"),
  },
];

// NOTE FOR CLIENT: the vision line below is placeholder copy to be confirmed /
// replaced with the CEO's own words before launch.
export const visionQuote = {
  text: "Healthcare is complex. Our job is to make it run — one AI operating system, from the front desk to the boardroom.",
  attribution: "George Haber",
  role: "CEO, ZenAiOS",
};
