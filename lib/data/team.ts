import type { TeamMember } from "./types";

/**
 * Real founding team — headshots and LinkedIn profiles are taken from the live
 * site (www.zenaios.com). Photos are stored locally in /public/team.
 */
export const team: TeamMember[] = [
  {
    name: "George Haber",
    role: "Chief Executive Officer",
    initials: "GH",
    photo: "/team/george-haber.png",
    bio: "Sets the vision and takes ZenAiOS to institutions, partners and investors.",
    linkedin: "https://www.linkedin.com/in/georgehaber/",
  },
  {
    name: "Vlad Iliescu",
    role: "Chief Technology Officer",
    initials: "VI",
    photo: "/team/vlad-iliescu.webp",
    bio: "Leads the platform and the in-house AI infrastructure — from sovereign RAG to the 17 modules.",
    linkedin: "https://www.linkedin.com/in/vladiliescu/",
  },
  {
    name: "Horea Timiș",
    role: "Chief Medical Officer",
    initials: "HT",
    photo: "/team/horea-timis.webp",
    bio: "Keeps every module grounded in real clinical practice and standards of care.",
    linkedin: "https://www.linkedin.com/in/timis-horea-146372bb/",
  },
];

// NOTE FOR CLIENT: the vision line below is placeholder copy to be confirmed /
// replaced with the CEO's own words before launch.
export const visionQuote = {
  text: "Healthcare is complex. Our job is to make it run — one AI operating system, from the front desk to the boardroom.",
  attribution: "George Haber",
  role: "CEO, ZenAiOS",
};
