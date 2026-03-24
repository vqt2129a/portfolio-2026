export const SECTIONS = ["home", "about", "experience", "project"] as const;

export type Section = (typeof SECTIONS)[number];

export const SECTION_LABELS: Record<Section, string> = {
  home: "Home",
  about: "About",
  experience: "Experience",
  project: "Projects"
};
