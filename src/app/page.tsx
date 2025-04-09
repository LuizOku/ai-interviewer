"use client";

import { useInterview } from "@/hooks/useInterview";
import { useWebRTC } from "@/hooks/useWebRTC";

export default function Home() {
  const { started, messages, addMessage, startInterview } = useInterview();
  useWebRTC(started, addMessage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">AI Interviewer</h1>
      <button onClick={startInterview} disabled={started}>
        {started ? "Interview in Progress" : "Start Interview"}
      </button>
      <div className="mt-6 space-y-2">
        {messages.map((m, i) => (
          <p key={i} className="bg-gray-100 p-2 rounded text-black">
            {m?.content[0]?.text || "[Audio Response]"}
          </p>
        ))}
      </div>
    </div>
  );
}
