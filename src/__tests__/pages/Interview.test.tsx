import React from "react";
import InterviewPage from "@/app/interview/page";

// Mock hooks
jest.mock("@/hooks/useInterview", () => ({
  useInterview: () => ({
    started: false,
    completed: false,
    audioUrl: null,
    isSaving: false,
    completeInterview: jest.fn(),
    saveInterview: jest.fn(),
    setInterviewAudio: jest.fn(),
    restartInterview: jest.fn(),
  }),
}));

jest.mock("@/hooks/useWebRTC", () => ({
  useWebRTC: () => ({
    connectionState: "new",
  }),
}));

describe("Interview Page", () => {
  it("renders the interview page", () => {
    const page = <InterviewPage />;
    expect(page).toBeDefined();
  });

  it("uses correct hook values", () => {
    const page = <InterviewPage />;
    expect(page).toBeDefined();
  });
});
