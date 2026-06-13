import { Hospital, Landmark } from "lucide-react";
import type { Deployment } from "./types";

export const deployments: Deployment[] = [
  {
    slug: "sjuo-oradea",
    name: "Spitalul Județean de Urgență Oradea",
    institution: "SJUO · Bihor County Emergency Hospital",
    kind: "Hospital",
    location: "Oradea, România",
    status: "active",
    summary:
      "The flagship deployment: a full integrated hospital system running in a county emergency hospital.",
    live: [
      "Electronic FOCG with ICD-10 & DRG coding",
      "AI-assisted epicrisis",
      "Real-time bed & department management",
      "ZenA assistant with voice support",
    ],
    icon: Hospital,
  },
  {
    slug: "oradea-city-hall",
    name: "Primăria Oradea",
    institution: "Oradea City Hall",
    kind: "Public institution",
    location: "Oradea, România",
    status: "active",
    summary:
      "A civic deployment proving ZenAiOS reaches beyond the hospital into public administration.",
    live: [
      "AI-generated reports & online services",
      "Interactive neighbourhood map",
      "ZenA civic assistant",
      "Multilingual citizen access",
    ],
    icon: Landmark,
  },
];

export function getDeployment(slug: string) {
  return deployments.find((d) => d.slug === slug);
}
