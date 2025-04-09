import React from "react";
import { render, act, RenderResult } from "@testing-library/react";
import HistoryPage from "@/app/history/page";

// Mock fetch
global.fetch = jest.fn();

const mockInterview = {
  id: "1",
  title: "Test Interview",
  date: "2024-03-20",
  audioUrl: "https://example.com/audio.mp3",
};

describe("History Page", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  it("renders the history page", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    let container;
    await act(async () => {
      container = render(<HistoryPage />).container;
    });
    expect(container).toBeInTheDocument();
  });

  it("handles delete action", async () => {
    // Mock initial data load
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockInterview]),
    });

    // Mock delete response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    let result: RenderResult | undefined;
    await act(async () => {
      result = render(<HistoryPage />);
    });

    if (!result) {
      throw new Error("Failed to render HistoryPage");
    }

    const deleteButton = result.getByText("Delete");

    await act(async () => {
      deleteButton.click();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/interviews", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: mockInterview.id }),
    });
  });
});
