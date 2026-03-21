import "../../styles/layout/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__text">
          <span className="footer__symbol">&gt;_</span> GhostDog — Arthur Seguret
        </p>
        <div className="footer__links">
          <a
            href="https://github.com/Laseguue"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (nouvel onglet)"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/arthur-seguret-052bb5288/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (nouvel onglet)"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
