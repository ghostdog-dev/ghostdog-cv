import { Link, useLocation } from "react-router-dom";
import "../../styles/layout/header.css";

const API_URL = import.meta.env.VITE_API_URL || "";
const PDF_URL = API_URL ? `${API_URL}/pdf` : "/cv.pdf";

interface NavItem {
  path: string;
  label: string;
  icon: string;
  external?: boolean;
  href?: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "Hub", icon: "~" },
  { path: "/cv", label: "CV", icon: "#" },
  { path: "/chat", label: "Agent", icon: ">" },
  { path: "/api", label: "API", icon: "/" },
  { path: "/cli", label: "CLI", icon: "$" },
  { path: "/pdf", label: "PDF", icon: "↓", external: true, href: PDF_URL },
];

function Header() {
  const { pathname } = useLocation();

  return (
    <>
      <header className="header">
        <a className="header__skip-link" href="#main-content">
          Aller au contenu
        </a>
        <div className="header__inner">
          <Link to="/" className="header__logo">
            <span className="header__logo-symbol">&gt;_</span>
            <span className="header__logo-text">GhostDog</span>
          </Link>
          <nav className="header__nav-desktop" aria-label="Navigation principale">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.path}
                  href={item.href}
                  className="header__link"
                  download="GhostDog-CV.pdf"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`header__link${pathname === item.path ? " header__link--active" : ""}`}
                  aria-current={pathname === item.path ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Navigation principale">
        <div className="mobile-nav__inner">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.path}
                href={item.href}
                className="mobile-nav__item"
                download="GhostDog-CV.pdf"
              >
                <span className="mobile-nav__icon">{item.icon}</span>
                <span className="mobile-nav__label">{item.label}</span>
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav__item${pathname === item.path ? " mobile-nav__item--active" : ""}`}
                aria-current={pathname === item.path ? "page" : undefined}
              >
                <span className="mobile-nav__icon">{item.icon}</span>
                <span className="mobile-nav__label">{item.label}</span>
              </Link>
            ),
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
