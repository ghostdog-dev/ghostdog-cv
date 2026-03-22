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
        {/* ── Hero header ── */}
        <section className="cv-hero">
          <div className="cv-hero__avatar-ring">
            <img
              className="cv-hero__photo"
              src="/profile-bw.jpg"
              alt="Arthur Seguret"
            />
          </div>
          <div className="cv-hero__body">
            <div className="cv-hero__title-row">
              <h1 className="cv-hero__alias">{cv.meta.alias}</h1>
              <a className="cv-hero__pdf" href={pdfUrl} download="GhostDog-CV.pdf">
                .pdf
              </a>
            </div>
            <p className="cv-hero__realname">{cv.meta.name}</p>
            <p className="cv-hero__role">{cv.meta.title}</p>
            <div className="cv-hero__badges">
              <span className="cv-hero__badge">{cv.meta.location}</span>
              <span className="cv-hero__badge">{cv.meta.age} ans</span>
              {cv.meta.permis && (
                <span className="cv-hero__badge">{cv.meta.permis}</span>
              )}
            </div>
            {cv.meta.availability && (
              <div className="cv-hero__availability">
                <span className="cv-hero__availability-dot" />
                {cv.meta.availability}
              </div>
            )}
            <div className="cv-hero__links">
              <a href={`mailto:${cv.meta.contact.email}`}>{cv.meta.contact.email}</a>
              <a href={cv.meta.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={cv.meta.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>

        {/* ── Bio ── */}
        {cv.meta.bio && (
          <p className="cv-bio">{cv.meta.bio}</p>
        )}

        {/* ── Soft Skills ── */}
        {cv.soft_skills && cv.soft_skills.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section__heading">
              <span className="cv-section__icon">~</span> Savoir-etre
            </h2>
            <div className="cv-soft-skills">
              {cv.soft_skills.map((skill) => (
                <div key={skill.name} className="cv-soft-skill">
                  <span className="cv-soft-skill__name">{skill.name}</span>
                  <span className="cv-soft-skill__desc">{skill.description}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Skills ── */}
        <section className="cv-section">
          <h2 className="cv-section__heading">
            <span className="cv-section__icon">~</span> Competences
          </h2>
          <div className="cv-skills">
            {Object.entries(cv.skills).map(([category, skills]) => {
              if (category === "legacy_tech" && (!skills || skills.length === 0)) {
                return (
                  <div key={category} className="cv-skill-group">
                    <h3 className="cv-skill-group__title">legacy tech</h3>
                    <p className="cv-skill-group__empty">—</p>
                  </div>
                );
              }
              if (!skills || skills.length === 0) return null;
              return <SkillGroup key={category} category={category} skills={skills} />;
            })}
          </div>
        </section>

        {/* ── Experience ── */}
        {cv.experience.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section__heading">
              <span className="cv-section__icon">~</span> Experience
            </h2>
            <div className="cv-timeline">
              {cv.experience.map((exp) => (
                <ExperienceCard key={`${exp.company}-${exp.title}`} experience={exp} />
              ))}
            </div>
          </section>
        )}

        {/* ── Projets ── */}
        {cv.projects.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section__heading">
              <span className="cv-section__icon">~</span> Projets
            </h2>
            <div className="cv-grid">
              {cv.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* ── Formation ── */}
        {cv.education.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section__heading">
              <span className="cv-section__icon">~</span> Formation
            </h2>
            <div className="cv-timeline">
              {cv.education.map((edu) => (
                <EducationCard key={`${edu.school}-${edu.degree}`} education={edu} />
              ))}
            </div>
          </section>
        )}

        {/* ── Langues & Intérêts ── */}
        {(cv.languages.length > 0 || cv.interests.length > 0) && (
          <section className="cv-section cv-section--compact">
            <div className="cv-extras">
              {cv.languages.length > 0 && (
                <div className="cv-extras__group">
                  <h3 className="cv-extras__label">Langues</h3>
                  <div className="cv-extras__pills">
                    {cv.languages.map((lang) => (
                      <span key={lang.name} className="cv-pill cv-pill--ghost">
                        {lang.name} <span className="cv-pill__sub">{lang.level}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {cv.interests.length > 0 && (
                <div className="cv-extras__group">
                  <h3 className="cv-extras__label">Centres d'interet</h3>
                  <div className="cv-extras__pills">
                    {cv.interests.map((interest) => (
                      <span key={interest} className="cv-pill cv-pill--ghost">{interest}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}

export default CvView;
