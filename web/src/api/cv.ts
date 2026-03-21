import { api } from "./client";
import type { CvData, Skills, Experience, Project } from "../types/cv";

export const cvApi = {
  getAll: () => api.get<CvData>("/cv"),
  getSkills: () => api.get<Skills>("/cv/skills"),
  getExperience: () => api.get<Experience[]>("/cv/experience"),
  getProjects: () => api.get<Project[]>("/cv/projects"),
};
