import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import "../styles/pages/apidoc.css";

const API_URL = import.meta.env.VITE_API_URL || "https://api.ghostdog.dev";

const endpoints = [
  { method: "GET", path: "/cv", description: "CV complet en JSON" },
  { method: "GET", path: "/cv/meta", description: "Informations personnelles" },
  { method: "GET", path: "/cv/skills", description: "Competences" },
  { method: "GET", path: "/cv/experience", description: "Experiences" },
  { method: "GET", path: "/cv/projects", description: "Projets" },
  { method: "GET", path: "/cv/education", description: "Formation" },
  { method: "GET", path: "/cv/languages", description: "Langues" },
  { method: "GET", path: "/cv/interests", description: "Centres d'interet" },
  { method: "GET", path: "/pdf", description: "Telecharge le PDF" },
  { method: "POST", path: "/chat", description: "Discuter avec l'agent IA" },
];

function ApiDoc() {
  const [showSwagger, setShowSwagger] = useState(false);

  return (
    <PageLayout>
      <div className="apidoc">
        <section className="apidoc__header">
          <h1 className="apidoc__title">API REST</h1>
          <p className="apidoc__subtitle">
            Acces programmatique au CV de GhostDog
          </p>
        </section>

        <section className="apidoc__section">
          <h2 className="apidoc__section-title">
            <span className="apidoc__prefix">#</span> Base URL
          </h2>
          <code className="apidoc__code-block">{API_URL}</code>
        </section>

        <section className="apidoc__section">
          <h2 className="apidoc__section-title">
            <span className="apidoc__prefix">#</span> Endpoints
          </h2>
          <div className="apidoc__endpoints">
            {endpoints.map((ep) => (
              <div key={`${ep.method}-${ep.path}`} className="apidoc__endpoint">
                <span className={`apidoc__method apidoc__method--${ep.method.toLowerCase()}`}>
                  {ep.method}
                </span>
                <code className="apidoc__path">{ep.path}</code>
                <span className="apidoc__desc">{ep.description}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="apidoc__section">
          <h2 className="apidoc__section-title">
            <span className="apidoc__prefix">#</span> Exemple rapide
          </h2>
          <pre className="apidoc__code-block">
{`$ curl ${API_URL}/cv | jq .meta

{
  "name": "Arthur Seguret",
  "alias": "GhostDog",
  "title": "Developpeur Concepteur Logiciel Fullstack"
}`}
          </pre>
        </section>

        <section className="apidoc__section">
          <h2 className="apidoc__section-title">
            <span className="apidoc__prefix">#</span> Swagger UI
          </h2>
          {!showSwagger ? (
            <button className="apidoc__swagger-btn" onClick={() => setShowSwagger(true)}>
              Charger Swagger UI
            </button>
          ) : (
            <div className="apidoc__swagger-container">
              <iframe
                className="apidoc__swagger-iframe"
                src={`${API_URL}/docs`}
                title="Swagger UI — GhostDog CV API"
              />
              <a
                className="apidoc__swagger-link"
                href={`${API_URL}/docs`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouvrir en plein ecran -&gt;
              </a>
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
}

export default ApiDoc;
