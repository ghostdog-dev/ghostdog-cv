import type { ReactNode } from "react";
import "../../styles/layout/page-layout.css";

interface PageLayoutProps {
  children: ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return <div className="page">{children}</div>;
}

export default PageLayout;
