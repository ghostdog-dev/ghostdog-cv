import "../../styles/components/chat-bubble.css";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}

function ChatBubble({ role, content, loading }: ChatBubbleProps) {
  return (
    <div className={`chat-bubble chat-bubble--${role}${loading ? " chat-bubble--loading" : ""}`}>
      <span className="chat-bubble__author">
        {role === "user" ? "vous" : ">_ ghostdog"}
      </span>
      <p className="chat-bubble__content">
        {loading ? (
          <>
            <span className="chat-bubble__dot" />
            <span className="chat-bubble__dot" />
            <span className="chat-bubble__dot" />
          </>
        ) : (
          content
        )}
      </p>
    </div>
  );
}

export default ChatBubble;
