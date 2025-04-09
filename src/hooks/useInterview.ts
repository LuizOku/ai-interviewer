import { useState, useCallback, useEffect } from "react";

export interface Message {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export function useInterview() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Auto-start the interview when the hook is initialized
  useEffect(() => {
    // Only start if not already started and not completed
    if (!started && !completed) {
      setStarted(true);
    }
  }, []); // Empty dependency array to run only once on mount

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const finishInterview = useCallback(() => {
    setCompleted(true);
    setStarted(false);
  }, []);

  const setInterviewAudio = useCallback((url: string) => {
    setAudioUrl(url);
  }, []);

  const restartInterview = useCallback(() => {
    setMessages([]);
    setAudioUrl(null);
    setCompleted(false);
    setStarted(true);
  }, []);

  return {
    started,
    completed,
    messages,
    audioUrl,
    addMessage,
    finishInterview,
    setInterviewAudio,
    restartInterview,
  };
}
