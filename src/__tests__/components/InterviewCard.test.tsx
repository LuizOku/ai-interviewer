import React from "react";
import { InterviewCard } from "@/components/InterviewCard";

describe("InterviewCard Component", () => {
  const mockInterview = {
    id: "1",
    date: "2024-04-09T12:00:00Z",
    audioUrl: "https://example.com/audio.mp3",
  };

  const mockOnDelete = jest.fn();

  it("renders with correct props", () => {
    const card = (
      <InterviewCard interview={mockInterview} onDelete={mockOnDelete} />
    );
    expect(card.props.interview).toBe(mockInterview);
    expect(card.props.onDelete).toBe(mockOnDelete);
  });

  it("handles delete action", () => {
    const card = (
      <InterviewCard interview={mockInterview} onDelete={mockOnDelete} />
    );
    card.props.onDelete(mockInterview.id);
    expect(mockOnDelete).toHaveBeenCalledWith(mockInterview.id);
  });

  it("renders with audio URL", () => {
    const card = (
      <InterviewCard interview={mockInterview} onDelete={mockOnDelete} />
    );
    expect(card.props.interview.audioUrl).toBe(mockInterview.audioUrl);
  });
});
