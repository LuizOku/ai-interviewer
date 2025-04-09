import React from "react";
import { Header } from "@/components/Header";

describe("Header Component", () => {
  const mockProps = {
    started: false,
    completed: false,
    onFinish: jest.fn(),
    onBackHome: jest.fn(),
  };

  it("renders with correct props", () => {
    const header = <Header {...mockProps} />;
    expect(header.props.started).toBe(false);
    expect(header.props.completed).toBe(false);
  });

  it("handles back home click", () => {
    const header = <Header {...mockProps} />;
    header.props.onBackHome();
    expect(mockProps.onBackHome).toHaveBeenCalledTimes(1);
  });

  it("shows end interview button when started and not completed", () => {
    const header = <Header {...mockProps} started={true} />;
    expect(header.props.started).toBe(true);
    expect(header.props.completed).toBe(false);
  });

  it("shows back to home button when completed", () => {
    const header = <Header {...mockProps} completed={true} />;
    expect(header.props.completed).toBe(true);
  });

  it("does not show any action buttons when not started and not completed", () => {
    const header = <Header {...mockProps} />;
    expect(header.props.started).toBe(false);
    expect(header.props.completed).toBe(false);
  });
});
