import type { Education } from "../../types/cv";

interface EducationCardProps {
  education: Education;
}

function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="cv-card">
      <div className="cv-card__top">
        <div className="cv-card__meta">
          <span className="cv-card__period">{education.year}</span>
          <span className="cv-card__dot">·</span>
          <span className="cv-card__company">{education.school}</span>
        </div>
        <h3 className="cv-card__title">{education.degree}</h3>
        {education.level && (
          <span className="cv-card__badge">{education.level}</span>
        )}
        {education.rncp && (
          <span className="cv-card__badge">RNCP {education.rncp}</span>
        )}
      </div>
      <p className="cv-card__desc">{education.description}</p>
    </div>
  );
}

export default EducationCard;
