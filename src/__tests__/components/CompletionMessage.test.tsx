import React from "react";
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
    const message = <CompletionMessage {...mockProps} />;
    expect(message.props.audioUrl).toBe(mockProps.audioUrl);
    expect(message.props.onRestart).toBe(mockProps.onRestart);
    expect(message.props.onHome).toBe(mockProps.onHome);
    expect(message.props.onSave).toBe(mockProps.onSave);
    expect(message.props.isSaving).toBe(mockProps.isSaving);
  });

  it("handles restart action", () => {
    const message = <CompletionMessage {...mockProps} />;
    message.props.onRestart();
    expect(mockProps.onRestart).toHaveBeenCalledTimes(1);
  });

  it("handles home action", () => {
    const message = <CompletionMessage {...mockProps} />;
    message.props.onHome();
    expect(mockProps.onHome).toHaveBeenCalledTimes(1);
  });

  it("handles save action", () => {
    const message = <CompletionMessage {...mockProps} />;
    message.props.onSave();
    expect(mockProps.onSave).toHaveBeenCalledTimes(1);
  });

  it("has correct default isSaving value", () => {
    const { isSaving, ...propsWithoutSaving } = mockProps;
    const message = <CompletionMessage {...propsWithoutSaving} />;
    expect(message.props.isSaving).toBeUndefined();
  });
});
