export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  response: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}
