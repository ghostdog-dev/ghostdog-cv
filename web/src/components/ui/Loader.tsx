import "../../styles/components/loader.css";

interface LoaderProps {
  text?: string;
}

function Loader({ text = "Chargement..." }: LoaderProps) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

export default Loader;
