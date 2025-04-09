import React from "react";
import { render } from "@testing-library/react";
import { CompletionMessage } from "@/components/CompletionMessage";

describe("CompletionMessage Component", () => {
  const mockProps = {
    audioUrl: "https://example.com/audio.mp3",
    onRestart: jest.fn(),
    onHome: jest.fn(),
    onSave: jest.fn(),
    isSaving: false,
  };

  it("renders with correct props", () => {
    const { getByText } = render(<CompletionMessage {...mockProps} />);
    expect(getByText("Interview Complete!")).toBeInTheDocument();
    expect(getByText("Save Interview")).toBeInTheDocument();
    expect(getByText("Retry")).toBeInTheDocument();
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("handles restart action", () => {
    const { getByText } = render(<CompletionMessage {...mockProps} />);
    getByText("Retry").click();
    expect(mockProps.onRestart).toHaveBeenCalledTimes(1);
  });

  it("handles home action", () => {
    const { getByText } = render(<CompletionMessage {...mockProps} />);
    getByText("Home").click();
    expect(mockProps.onHome).toHaveBeenCalledTimes(1);
  });

  it("handles save action", () => {
    const { getByText } = render(<CompletionMessage {...mockProps} />);
    getByText("Save Interview").click();
    expect(mockProps.onSave).toHaveBeenCalledTimes(1);
  });

  it("has correct default isSaving value", () => {
    const { getByText } = render(
      <CompletionMessage
        audioUrl={mockProps.audioUrl}
        onRestart={mockProps.onRestart}
        onHome={mockProps.onHome}
        onSave={mockProps.onSave}
      />
    );
    const saveButton = getByText("Save Interview");
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).not.toBeDisabled();
  });
});
