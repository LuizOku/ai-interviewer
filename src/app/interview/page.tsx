"use client";

import { useInterview } from "@/hooks/useInterview";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { ParticipantBox } from "@/components/ParticipantBox";
import { CompletionMessage } from "@/components/CompletionMessage";

export default function InterviewPage() {
  const router = useRouter();
  const {
    started,
    completed,
    audioUrl,
    isSaving,
    completeInterview,
    saveInterview,
    setInterviewAudio,
    restartInterview,
  } = useInterview();
  const { connectionState } = useWebRTC(started, setInterviewAudio);
  const isConnecting =
    connectionState === "new" || connectionState === "connecting";

  return (
    <div className="min-h-screen bg-[#202124] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-orange-500/20 blur-xl" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-orange-500/10 blur-xl" />

      <div className="relative">
        <Header
          started={started}
          completed={completed}
          onFinish={completeInterview}
          onBackHome={() => router.push("/")}
        />

        <div className="flex h-[calc(100vh-4rem)]">
          <div className="flex-1 p-4 sm:p-8 flex items-center justify-center">
            {!completed ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full max-w-5xl">
                <ParticipantBox type="user" isConnecting={isConnecting} />
                <ParticipantBox type="ai" isConnecting={isConnecting} />
              </div>
            ) : (
              <CompletionMessage
                audioUrl={audioUrl}
                onRestart={restartInterview}
                onHome={() => router.push("/")}
                onSave={() => saveInterview(() => router.push("/history"))}
                isSaving={isSaving}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
