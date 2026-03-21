import PageLayout from "../components/layout/PageLayout";
import "../styles/pages/clidoc.css";

const REPO_URL = "https://github.com/Laseguue/ghostdog-cv";

function CliDoc() {
  return (
    <PageLayout>
      <div className="clidoc">
        <section className="clidoc__header">
          <h1 className="clidoc__title">CLI</h1>
          <p className="clidoc__subtitle">
            Consultez le CV de GhostDog directement dans votre terminal
          </p>
        </section>

        <section className="clidoc__section">
          <h2 className="clidoc__section-title">
            <span className="clidoc__prefix">#</span> Installation
          </h2>
          <pre className="clidoc__code-block">
{`$ pip install git+${REPO_URL}.git`}
          </pre>
        </section>

        <section className="clidoc__section">
          <h2 className="clidoc__section-title">
            <span className="clidoc__prefix">#</span> Utilisation
          </h2>
          <div className="clidoc__commands">
            <div className="clidoc__command">
              <code className="clidoc__cmd">ghostdog-cv</code>
              <span className="clidoc__desc">Affiche le CV complet</span>
            </div>
            <div className="clidoc__command">
              <code className="clidoc__cmd">ghostdog-cv skills</code>
              <span className="clidoc__desc">Competences</span>
            </div>
            <div className="clidoc__command">
              <code className="clidoc__cmd">ghostdog-cv experience</code>
              <span className="clidoc__desc">Experiences professionnelles</span>
            </div>
            <div className="clidoc__command">
              <code className="clidoc__cmd">ghostdog-cv projects</code>
              <span className="clidoc__desc">Projets</span>
            </div>
            <div className="clidoc__command">
              <code className="clidoc__cmd">ghostdog-cv chat</code>
              <span className="clidoc__desc">Discuter avec l'agent IA</span>
            </div>
          </div>
        </section>

        <section className="clidoc__section">
          <h2 className="clidoc__section-title">
            <span className="clidoc__prefix">#</span> Apercu
          </h2>
          <pre className="clidoc__code-block clidoc__code-block--terminal">
{`$ ghostdog-cv

  >_ GhostDog — Arthur Seguret
  Developpeur Concepteur Logiciel Fullstack
  Python · JavaScript · TypeScript

  # Competences
  ┌──────────────┬─────────┐
  │ Python       │ expert  │
  │ FastAPI      │ expert  │
  │ Django       │ avance  │
  │ React        │ junior  │
  └──────────────┴─────────┘

  # Experience
  Everping — 2024-2026
  Microservices & Automatisation ...`}
          </pre>
        </section>

        <section className="clidoc__section">
          <h2 className="clidoc__section-title">
            <span className="clidoc__prefix">#</span> Code source
          </h2>
          <a
            className="clidoc__repo-link"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {REPO_URL} -&gt;
          </a>
        </section>
      </div>
    </PageLayout>
  );
}

export default CliDoc;
