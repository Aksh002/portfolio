import type { ReactNode } from "react";

export type ThemeTag = "football" | "anime" | "music";

export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ProfileIntro = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  phone: string;
  shortBio: string;
  oldLongBio: string;
  longBio: string;
  professionalSummary: string;
  availability: string;
  email: string;
};

export type HighlightItem = {
  label: string;
  value: string;
};

export type InterestWorld = {
  key: ThemeTag;
  title: string;
  kicker: string;
  description: string;
  motifs: string[];
  uiTreatment: string;
};

export type SkillItem = {
  name: string;
  context: string;
};

export type SkillGroup = {
  category: string;
  items: SkillItem[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  tech: string[];
  outcomes: string[];
};

export type EducationItem = {
  institution: string;
  credential: string;
  period: string;
  notes: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  roles: string[];
  stack: string[];
  impact: string;
  links: ProjectLink[];
  featured: boolean;
  themeTag: ThemeTag;
  order: number;
};

export type Project = ProjectFrontmatter & {
  content: ReactNode;
};
