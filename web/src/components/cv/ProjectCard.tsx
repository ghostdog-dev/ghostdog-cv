import type { Project } from "../../types/cv";
import { TagList } from "../ui/Tag";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const inner = (
    <div className="cv-minicard">
      <h3 className="cv-minicard__name">{project.name}</h3>
      <p className="cv-minicard__desc">{project.description}</p>
      <TagList tags={project.stack} />
    </div>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="cv-minicard-link">
        {inner}
      </a>
    );
  }

  return inner;
}

export default ProjectCard;
