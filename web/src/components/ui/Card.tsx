import { Link } from "react-router-dom";
import "../../styles/components/card.css";

interface CardProps {
  title: string;
  description: string;
  icon: string;
  to?: string;
  href?: string;
  download?: boolean;
}

function Card({ title, description, icon, to, href, download }: CardProps) {
  const content = (
    <>
      <span className="card__icon">{icon}</span>
      <h3 className="card__title">{title}</h3>
      <p className="card__description">{description}</p>
      <span className="card__arrow">-&gt;</span>
    </>
  );

  if (href) {
    return (
      <a
        className="card"
        href={href}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        download={download ? "GhostDog-CV.pdf" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className="card" to={to || "/"}>
      {content}
    </Link>
  );
}

export default Card;
