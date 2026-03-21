import { useState, useRef, useEffect } from "react";
import { chatApi } from "../api/chat";
import type { Message } from "../types/chat";
import PageLayout from "../components/layout/PageLayout";
import ChatBubble from "../components/ui/ChatBubble";
import "../styles/pages/chat.css";

const WELCOME: Message = {
  role: "assistant",
  content:
    "Salut ! Je suis GhostDog, developpeur Python. Posez-moi vos questions sur mon parcours, mes competences ou mes projets.",
};

function Chat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const history = [...messages, userMsg]
        .slice(1)
        .slice(-20)
        .map(({ role, content }) => ({ role, content }));

      const res = await chatApi.send({ message: userMsg.content, history });
      setMessages((prev) => [...prev, { role: "assistant", content: res.response }]);
    } catch {
      setError("Agent temporairement indisponible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="chat">
        <div className="chat__messages">
          {messages.map((msg, i) => (
            <ChatBubble key={`${i}-${msg.role}`} role={msg.role} content={msg.content} />
          ))}
          {loading && <ChatBubble role="assistant" content="" loading />}
          {error && (
            <div className="chat__error-container">
              <p className="chat__error">{error}</p>
              <button className="chat__error-dismiss" onClick={() => setError(null)}>
                Fermer
              </button>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form className="chat__form" onSubmit={handleSubmit} aria-label="Envoyer un message">
          <input
            className="chat__input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question..."
            aria-label="Votre message"
            disabled={loading}
          />
          <button className="chat__send" type="submit" disabled={loading || !input.trim()}>
            Envoyer
          </button>
        </form>
      </div>
    </PageLayout>
  );
}

export default Chat;
