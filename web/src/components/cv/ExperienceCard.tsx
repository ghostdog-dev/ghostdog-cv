import type { Experience } from "../../types/cv";
import { TagList } from "../ui/Tag";

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="cv__entry">
      <div className="cv__entry-header">
        <h3 className="cv__entry-title">{experience.title}</h3>
        <span className="cv__entry-period">{experience.period}</span>
      </div>
      <p className="cv__entry-company">{experience.company}</p>
      <p className="cv__entry-description">{experience.description}</p>
      <TagList tags={experience.tags} />
    </div>
  );
}

export default ExperienceCard;
