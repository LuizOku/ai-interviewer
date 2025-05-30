import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

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
        toast.error("Please complete your interview before saving.");
        return;
      }

      setIsSaving(true);
      try {
        // Fetch the audio file from the URL
        const response = await fetch(audioUrl);
        const blob = await response.blob();

        // Create FormData to send the audio file
        const formData = new FormData();
        formData.append("audio", blob, "interview.mp3");

        // Save interview with audio file
        const saveResponse = await fetch("/api/interviews", {
          method: "POST",
          body: formData,
        });

        if (!saveResponse.ok) {
          throw new Error("Failed to save interview");
        }

        toast.success("Your interview has been saved successfully!");
        // Call the onSaved callback if provided
        onSaved?.();
      } catch (error) {
        console.error("Failed to save interview:", error);
        toast.error("We couldn't save your interview. Please try again.");
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
