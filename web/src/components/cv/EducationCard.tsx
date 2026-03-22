import type { Education } from "../../types/cv";

interface EducationCardProps {
  education: Education;
}

function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="cv-card cv-card--education">
      <div className="cv-card__top">
        <div className="cv-card__meta">
          <span className="cv-card__period">{education.year}</span>
          <span className="cv-card__dot">&middot;</span>
          <span className="cv-card__company">{education.school}</span>
        </div>
        <h3 className="cv-card__degree">{education.degree}</h3>
        {education.us_equivalent && (
          <p className="cv-card__us-equivalent">
            <span className="cv-card__badge cv-card__badge--us">US</span>
            {education.us_equivalent}
          </p>
        )}
        <div className="cv-card__badges">
          {education.level && (
            <span className="cv-card__badge">{education.level}</span>
          )}
          {education.rncp && (
            <span className="cv-card__badge">RNCP {education.rncp}</span>
          )}
        </div>
      </div>
      <p className="cv-card__desc">{education.description}</p>
      {(education.diploma_image || education.us_diploma_image) && (
        <div className="cv-card__diplomas">
          {education.diploma_image && (
            <a
              className="cv-card__diploma-link"
              href={education.diploma_image}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le diplome
            </a>
          )}
          {education.us_diploma_image && (
            <a
              className="cv-card__diploma-link"
              href={education.us_diploma_image}
              target="_blank"
              rel="noopener noreferrer"
            >
              US Bachelor
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default EducationCard;
