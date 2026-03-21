import type { Education } from "../../types/cv";

interface EducationCardProps {
  education: Education;
}

function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="cv__entry">
      <div className="cv__entry-header">
        <h3 className="cv__entry-title">{education.degree}</h3>
        <span className="cv__entry-period">{education.year}</span>
      </div>
      <p className="cv__entry-company">{education.school}</p>
      <p className="cv__entry-description">{education.description}</p>
    </div>
  );
}

export default EducationCard;
