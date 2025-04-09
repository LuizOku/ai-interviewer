import { useState, useCallback, useEffect } from "react";
import { Message } from "@/models/message";
import { Interview } from "@/models/interview";

export function useInterview() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Auto-start the interview when the hook is initialized
  useEffect(() => {
    if (!started && !completed) {
      setStarted(true);
      setStartTime(Date.now());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const finishInterview = useCallback(async () => {
    setCompleted(true);
    setStarted(false);

    // Calculate duration
    const duration = startTime
      ? Math.floor((Date.now() - startTime) / 1000)
      : 0;

    // Create interview object
    const interview: Interview = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      messages,
      audioUrl,
      duration,
    };

    // Save interview
    try {
      await fetch("/api/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interview),
      });
    } catch (error) {
      console.error("Failed to save interview:", error);
    }
  }, [messages, audioUrl, startTime]);

  const setInterviewAudio = useCallback((url: string) => {
    setAudioUrl(url);
  }, []);

  const restartInterview = useCallback(() => {
    setMessages([]);
    setAudioUrl(null);
    setCompleted(false);
    setStarted(true);
    setStartTime(Date.now());
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
