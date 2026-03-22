import type { Experience } from "../../types/cv";
import { TagList } from "../ui/Tag";

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="cv-card">
      <div className="cv-card__top">
        <div className="cv-card__meta">
          <span className="cv-card__period">{experience.period}</span>
          <span className="cv-card__dot">·</span>
          <span className="cv-card__company">{experience.company}</span>
        </div>
        <h3 className="cv-card__title">{experience.title}</h3>
        {experience.context && (
          <span className="cv-card__context">{experience.context}</span>
        )}
      </div>
      <p className="cv-card__desc">{experience.description}</p>
      {experience.highlights && experience.highlights.length > 0 && (
        <ul className="cv-card__highlights">
          {experience.highlights.map((h, i) => (
            <li key={i} className="cv-card__highlight">{h}</li>
          ))}
        </ul>
      )}
      <TagList tags={experience.tags} />
    </div>
  );
}

export default ExperienceCard;
