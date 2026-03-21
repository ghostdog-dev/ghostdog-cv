import { useApi } from "../hooks/useApi";
import { cvApi } from "../api/cv";
import type { CvData } from "../types/cv";
import PageLayout from "../components/layout/PageLayout";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import SkillGroup from "../components/cv/SkillGroup";
import ExperienceCard from "../components/cv/ExperienceCard";
import ProjectCard from "../components/cv/ProjectCard";
import EducationCard from "../components/cv/EducationCard";
import "../styles/pages/cv.css";

function CvView() {
  const { data: cv, loading, error, reload } = useApi<CvData>(() => cvApi.getAll());

  if (loading && !cv) return <PageLayout><Loader text="Chargement du CV..." /></PageLayout>;
  if (error && !cv) return <PageLayout><ErrorMessage message={error} onRetry={reload} /></PageLayout>;
  if (!cv) return null;

  const pdfUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/pdf`
    : "/cv.pdf";

  return (
    <PageLayout>
      <div className="cv">
        <section className="cv__header">
          <div className="cv__header-top">
            <img
              className="cv__photo"
              src="/profile-bw.jpg"
              alt="Arthur Seguret"
            />
            <div className="cv__header-info">
              <div className="cv__header-row">
                <h1 className="cv__name">{cv.meta.alias}</h1>
                <a className="cv__download-btn" href={pdfUrl} download="GhostDog-CV.pdf">
                  PDF
                </a>
              </div>
              <p className="cv__real-name">{cv.meta.name}</p>
              <p className="cv__title">{cv.meta.title}</p>
              <div className="cv__contact">
                <a href={`mailto:${cv.meta.contact.email}`}>{cv.meta.contact.email}</a>
                <span className="cv__separator">|</span>
                <a href={cv.meta.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <span className="cv__separator">|</span>
                <a href={cv.meta.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

        <section className="cv__section">
          <h2 className="cv__section-title">
            <span className="cv__section-prefix">#</span> Competences
          </h2>
          <div className="cv__skills">
            {Object.entries(cv.skills).map(([category, skills]) => (
              <SkillGroup key={category} category={category} skills={skills} />
            ))}
          </div>
        </section>

        {cv.experience.length > 0 && (
          <section className="cv__section">
            <h2 className="cv__section-title">
              <span className="cv__section-prefix">#</span> Experience
            </h2>
            {cv.experience.map((exp) => (
              <ExperienceCard key={`${exp.company}-${exp.title}`} experience={exp} />
            ))}
          </section>
        )}

        {cv.projects.length > 0 && (
          <section className="cv__section">
            <h2 className="cv__section-title">
              <span className="cv__section-prefix">#</span> Projets
            </h2>
            <div className="cv__projects">
              {cv.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </section>
        )}

        {cv.education.length > 0 && (
          <section className="cv__section">
            <h2 className="cv__section-title">
              <span className="cv__section-prefix">#</span> Formation
            </h2>
            {cv.education.map((edu) => (
              <EducationCard key={`${edu.school}-${edu.degree}`} education={edu} />
            ))}
          </section>
        )}
      </div>
    </PageLayout>
  );
}

export default CvView;
