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
