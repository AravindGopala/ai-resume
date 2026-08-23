import { Language } from "../constants/i18n";

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  location: string;
  content: string;
  pdf: boolean;
  experience_letter?: string;
}

export interface SoftSkillEntry {
  name: string;
  url?: string;
  issuer: string;
}

export interface LanguageCertification {
  name: string;
  url: string;
}

export interface EducationEntry {
  title: string;
  institution: string;
  period: string;
  /** Extra lines under the degree, e.g. thesis title or lab affiliation. */
  details?: string[];
}

export interface AwardEntry {
  name: string;
  issuer: string;
  period: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
  certifications?: LanguageCertification[];
}

export interface SkillCategory {
  [key: string]: Skill[];
}

export type Certifications = {
  [name: string]: { issuer: string; period: string };
};

export interface Skill {
  name: string;
}

// Component Props
export interface SkillsProps {
  skillCategories: { [key: string]: Skill[] };
  currentLang: Language;
}

export interface ExperienceProps {
  experienceEntries: ExperienceEntry[];
  currentLang: Language;
}

export interface EducationProps {
  softSkills: SoftSkillEntry[];
  educationEntries: EducationEntry[];
  certifications: Certifications;
  awards: AwardEntry[];
  languages: LanguageEntry[];
  currentLang: Language;
}

export interface SummaryProps {
  content: string;
  currentLang: Language;
}

export interface HeaderProps {
  name: string;
  title: string;
  subtitle: string;
  calendlyUrl: string;
  location: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

export type ProfileData = {
  info: HeaderProps;
  education: EducationEntry[];
  certifications: Certifications;
  awards: AwardEntry[];
  languages: LanguageEntry[];
  softSkills: SoftSkillEntry[];
  skills: { [key: string]: Skill[] };
}