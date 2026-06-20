import type { TeamMember, TeamSkeleton, Translator } from "./types";

/**
 * Real founding team — headshots and LinkedIn profiles are taken from the live
 * site (www.zenaios.com). Photos are stored locally in /public/team. Names are
 * proper nouns and stay fixed; role + bio live under `teamData.*` in the catalog.
 */
export const teamSkeletons: TeamSkeleton[] = [
  {
    key: "george",
    name: "George Haber",
    initials: "GH",
    photo: "/team/george-haber.png",
    linkedin: "https://www.linkedin.com/in/georgehaber/",
  },
  {
    key: "vlad",
    name: "Vlad Iliescu",
    initials: "VI",
    photo: "/team/vlad-iliescu.webp",
    linkedin: "https://www.linkedin.com/in/vladiliescu/",
  },
  {
    key: "horea",
    name: "Horea Timiș",
    initials: "HT",
    photo: "/team/horea-timis.webp",
    linkedin: "https://www.linkedin.com/in/timis-horea-146372bb/",
  },
  {
    key: "doru",
    name: "Doru Torge",
    initials: "DT",
    photo: "/team/doru-torge.jpeg",
    linkedin: "https://www.linkedin.com/in/doru-torge-416b0664",
  },
  {
    key: "florina",
    name: "Florina-Olivia Buzdug",
    initials: "FB",
    photo: "/team/florina-buzdug.jpg",
    linkedin: "https://www.linkedin.com/in/florina-olivia-buzdug-ba925232b",
  },
  {
    key: "lazar",
    name: "Vlad Lazar",
    initials: "VL",
    photo: "/team/vlad-lazar.jpg",
    linkedin: "https://www.linkedin.com/in/vlad-lazar-220a30240",
  },
  {
    key: "loujaina",
    name: "Loujaina Shehade Karsifi",
    initials: "LS",
    photo: "/team/loujaina-shehade.jpg",
    linkedin: "https://www.linkedin.com/in/loujishehade15",
  },
  {
    key: "alin",
    name: "Alin Blidisel",
    initials: "AB",
    photo: null,
    linkedin: "https://www.linkedin.com/in/alin-blidisel-040a6819",
  },
  {
    key: "cosmin",
    name: "Cosmin Prata",
    initials: "CP",
    photo: "/team/cosmin-prata.jpg",
    linkedin: "https://www.linkedin.com/in/prata-cosmin-a1a853b9",
  },
  {
    key: "iulian",
    name: "Iulian Igaș",
    initials: "II",
    photo: null,
    linkedin: "https://www.linkedin.com/in/iulian-igas-373550148",
  },
];

/** `t` must be scoped to the `teamData` namespace. */
export function buildTeam(t: Translator): TeamMember[] {
  return teamSkeletons.map((m) => ({
    ...m,
    role: t(`${m.key}.role`),
    bio: t(`${m.key}.bio`),
  }));
}

// NOTE FOR CLIENT: the vision line is placeholder copy to be confirmed /
// replaced with the CEO's own words before launch. Attribution is a proper noun.
export function buildVision(t: Translator) {
  return {
    text: t("vision.text"),
    attribution: "George Haber",
    role: t("vision.role"),
  };
}
