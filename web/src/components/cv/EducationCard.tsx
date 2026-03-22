import { useState } from "react";
import type { Education } from "../../types/cv";

interface EducationCardProps {
  education: Education;
}

function EducationCard({ education }: EducationCardProps) {
  const [showImage, setShowImage] = useState<string | null>(null);

  return (
    <>
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
              <button
                className="cv-card__diploma-thumb"
                onClick={() => setShowImage(education.diploma_image!)}
                type="button"
              >
                <img src={education.diploma_image} alt={`Diplome ${education.degree}`} />
                <span className="cv-card__diploma-label">Voir le diplome</span>
              </button>
            )}
            {education.us_diploma_image && (
              <button
                className="cv-card__diploma-thumb"
                onClick={() => setShowImage(education.us_diploma_image!)}
                type="button"
              >
                <img src={education.us_diploma_image} alt="US Bachelor equivalent" />
                <span className="cv-card__diploma-label">US Bachelor</span>
              </button>
            )}
          </div>
        )}
      </div>

      {showImage && (
        <div className="cv-diploma-overlay" onClick={() => setShowImage(null)}>
          <div className="cv-diploma-overlay__content" onClick={(e) => e.stopPropagation()}>
            <img src={showImage} alt="Diplome" />
            <button
              className="cv-diploma-overlay__close"
              onClick={() => setShowImage(null)}
              type="button"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EducationCard;
