import type { Project } from "../../types/cv";
import { TagList } from "../ui/Tag";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="cv__project">
      <h3 className="cv__project-name">{project.name}</h3>
      <p className="cv__project-description">{project.description}</p>
      <TagList tags={project.stack} />
    </div>
  );
}

export default ProjectCard;
