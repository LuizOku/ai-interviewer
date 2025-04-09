import { useState, useCallback, useEffect } from "react";
import { Interview } from "@/models/interview";

export function useInterview() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-start the interview when the hook is initialized
  useEffect(() => {
    if (!started && !completed) {
      setStarted(true);
    }
  }, [completed, started]);

  const completeInterview = useCallback(() => {
    setCompleted(true);
    setStarted(false);
  }, []);

  const saveInterview = useCallback(
    async (onSaved?: () => void) => {
      if (!audioUrl) {
        console.warn("Cannot save interview: audioUrl is not available");
        return;
      }

      setIsSaving(true);
      try {
        // Create interview object
        const interview: Interview = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          audioUrl,
        };

        // Save interview
        await fetch("/api/interviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interview),
        });

        // Call the onSaved callback if provided
        onSaved?.();
      } catch (error) {
        console.error("Failed to save interview:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [audioUrl]
  );

  const setInterviewAudio = useCallback((url: string) => {
    setAudioUrl(url);
  }, []);

  const restartInterview = useCallback(() => {
    setAudioUrl(null);
    setCompleted(false);
    setStarted(true);
  }, []);

  return {
    started,
    completed,
    audioUrl,
    isSaving,
    completeInterview,
    saveInterview,
    setInterviewAudio,
    restartInterview,
  };
}
