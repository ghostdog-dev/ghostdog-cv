export interface CvData {
  meta: Meta;
  skills: Skills;
  soft_skills: SoftSkill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: Language[];
  interests: string[];
}

export interface Meta {
  name: string;
  alias: string;
  title: string;
  subtitle: string;
  age: number;
  location: string;
  availability: string;
  permis: string;
  bio: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export interface Skills {
  languages: Skill[];
  backend: Skill[];
  frontend: Skill[];
  databases: Skill[];
  infra: Skill[];
  ai: Skill[];
  tools: Skill[];
  legacy_tech: Skill[];
}

export interface Skill {
  name: string;
  level?: string;
  years?: number;
  details?: string;
}

export interface SoftSkill {
  name: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  context?: string;
  description: string;
  highlights?: string[];
  tags: string[];
}

export interface Project {
  name: string;
  stack: string[];
  description: string;
  url?: string;
}

export interface Education {
  school: string;
  degree: string;
  level?: string;
  rncp?: string;
  year: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
}
