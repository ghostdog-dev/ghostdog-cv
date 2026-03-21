import { api } from "./client";
import type { ChatRequest, ChatResponse } from "../types/chat";

export const chatApi = {
  send: (data: ChatRequest) => api.post<ChatResponse>("/chat", data),
};
