import "../../styles/components/error.css";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__retry" onClick={onRetry}>
          Reessayer
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
