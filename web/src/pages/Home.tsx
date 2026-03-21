import Card from "../components/ui/Card";
import PageLayout from "../components/layout/PageLayout";
import "../styles/pages/home.css";

const API_URL = import.meta.env.VITE_API_URL || "";
const PDF_URL = API_URL ? `${API_URL}/pdf` : "/cv.pdf";

function Home() {
  return (
    <PageLayout>
      <div className="home">
        <section className="home__hero">
          <p className="home__prefix">$&gt; whoami</p>
          <h1 className="home__title">GhostDog</h1>
          <p className="home__subtitle">
            Developpeur Python — Microservices, Automatisation, IA
          </p>
        </section>

        <section className="home__grid">
          <Card
            icon="{ }"
            title="CV Web"
            description="Version interactive et visuelle du CV"
            to="/cv"
          />
          <Card
            icon="/*/"
            title="API REST"
            description="Endpoints JSON, Swagger, exemples"
            to="/api"
          />
          <Card
            icon="$_"
            title="CLI"
            description="pip install depuis GitHub, affichage terminal"
            to="/cli"
          />
          <Card
            icon="pdf"
            title="PDF"
            description="Format classique, telechargement direct"
            href={PDF_URL}
            download
          />
          <Card
            icon="[>]"
            title="Agent IA"
            description="Discutez avec GhostDog, posez vos questions"
            to="/chat"
          />
        </section>
      </div>
    </PageLayout>
  );
}

export default Home;
