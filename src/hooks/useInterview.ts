import { useState } from "react";
import { questions } from "@/utils/questions";
import { speak } from "@/utils/speak";
import { useVoiceRecorder } from "./useVoiceRecorder";

export const useInterview = () => {
  const [step, setStep] = useState<number>(-1);
  const [responses, setResponses] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();

  const startInterview = async () => {
    setIsRunning(true);
    await speak("Welcome to the interview.");
    nextStep();
  };

  const nextStep = async () => {
    const next = step + 1;
    setStep(next);

    if (next < questions.length) {
      const q = questions[next];
      await speak(q);
      await startRecording();
    } else {
      await speak("Thank you for your time. The interview is now complete.");
      setIsRunning(false);
    }
  };

  const stopAndNext = async () => {
    if (isRecording) {
      const blob = await stopRecording();
      const audioURL = URL.createObjectURL(blob);
      setResponses((prev) => [...prev, audioURL]);
      nextStep();
    }
  };

  const resetInterview = () => {
    setStep(-1);
    setResponses([]);
    setIsRunning(false);
  };

  return {
    isRunning,
    isRecording,
    currentQuestion:
      step >= 0 && step < questions.length ? questions[step] : null,
    responses,
    startInterview,
    stopAndNext,
    resetInterview,
  };
};
