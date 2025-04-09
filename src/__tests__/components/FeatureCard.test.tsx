import React from "react";
import { render } from "@testing-library/react";
import { FeatureCard } from "@/components/FeatureCard";

describe("FeatureCard Component", () => {
  const mockProps = {
    icon: "mic",
    title: "Test Feature",
    description: "This is a test feature description",
  };

  it("renders with correct props", () => {
    const { getByText } = render(<FeatureCard {...mockProps} />);
    expect(getByText(mockProps.title)).toBeInTheDocument();
    expect(getByText(mockProps.description)).toBeInTheDocument();
  });

  it("has correct className", () => {
    const { container } = render(<FeatureCard {...mockProps} />);
    const card = container.firstChild;
    expect(card).toHaveClass("bg-gray-800/50");
    expect(card).toHaveClass("backdrop-blur-sm");
    expect(card).toHaveClass("rounded-2xl");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("border-gray-700");
  });
});
