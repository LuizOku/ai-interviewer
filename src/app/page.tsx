"use client";

import { useInterview } from "@/hooks/useInterview";
import { questions } from "@/utils/questions";

export default function Home() {
  const {
    isRunning,
    isRecording,
    currentQuestion,
    responses,
    startInterview,
    stopAndNext,
    resetInterview,
  } = useInterview();

  const isComplete = !isRunning && responses.length === questions.length;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      {!isRunning && responses.length === 0 ? (
        <button
          onClick={startInterview}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Interview
        </button>
      ) : (
        <>
          {!isComplete && (
            <>
              <p className="text-2xl mb-4">Interview in progress…</p>
              {currentQuestion && (
                <div className="space-y-4">
                  <p className="italic text-xl">{currentQuestion}</p>
                  {isRecording ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-600">Recording...</p>
                    </div>
                  ) : null}
                </div>
              )}
              {isRecording && (
                <button
                  onClick={stopAndNext}
                  className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Stop Recording & Next Question
                </button>
              )}
            </>
          )}
          {isComplete && (
            <div className="space-y-4">
              <p className="text-2xl text-green-600">Interview Complete!</p>
              <button
                onClick={resetInterview}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Start New Interview
              </button>
            </div>
          )}
          <div className="mt-6">
            <h2 className="font-bold mb-2">Responses:</h2>
            <ul className="space-y-4">
              {responses.map((res, idx) => (
                <li key={idx} className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Q{idx + 1}: {questions[idx]}
                  </p>
                  <audio controls src={res} className="w-full max-w-md" />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}
