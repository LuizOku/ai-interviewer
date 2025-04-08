"use client";

import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Interview
        </button>
      ) : (
        <p className="text-xl">Interview in progress… (coming next)</p>
      )}
    </main>
  );
}
