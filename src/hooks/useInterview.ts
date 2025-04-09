import { useState, useCallback } from "react";

export interface Message {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export function useInterview() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const startInterview = () => setStarted(true);

  return {
    started,
    messages,
    addMessage,
    startInterview,
  };
}
