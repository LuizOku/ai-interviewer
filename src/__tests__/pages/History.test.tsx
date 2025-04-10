import { createRoot, Root } from "react-dom/client";
import HistoryPage from "@/app/history/page";
import { Interview } from "@/models/interview";

// Mock fetch
global.fetch = jest.fn();

describe("History Page", () => {
  const mockInterviews: Interview[] = [
    {
      _id: "1",
      createdAt: "2024-03-20T10:00:00Z",
      updatedAt: "2024-03-20T10:00:00Z",
      audioId: "audio1",
      audioUrl: "http://example.com/audio1.mp3",
      filename: "interview1.mp3",
    },
    {
      _id: "2",
      createdAt: "2024-03-21T11:00:00Z",
      updatedAt: "2024-03-21T11:00:00Z",
      audioId: "audio2",
      audioUrl: "http://example.com/audio2.mp3",
      filename: "interview2.mp3",
    },
  ];

  let container: HTMLElement;
  let root: Root;

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === "/api/interviews") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockInterviews),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
    document.body.removeChild(container);
    container.remove();
  });

  const waitForRender = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  };

  it("renders interview history", async () => {
    root.render(<HistoryPage />);
    await waitForRender();

    expect(container.textContent).toContain("Interview History");
    expect(container.textContent).toContain("Interview on");
  });

  it("handles delete action", async () => {
    root.render(<HistoryPage />);
    await waitForRender();

    const deleteButton = container.querySelector("button");
    if (deleteButton) {
      deleteButton.click();
      await waitForRender();
    }

    expect(global.fetch).toHaveBeenCalledWith("/api/interviews/1", {
      method: "DELETE",
    });
  });

  it("shows empty state when no interviews", async () => {
    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === "/api/interviews") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });
    root.render(<HistoryPage />);
    await waitForRender();

    expect(container.textContent).toContain("No interviews found");
  });
});
