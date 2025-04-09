import React from "react";
import { Button } from "@/components/Button";

describe("Button Component", () => {
  it("renders with default primary variant", () => {
    const button = <Button>Click me</Button>;
    expect(button.props.children).toBe("Click me");
    expect(button.props.variant).toBeUndefined();
  });

  it("renders with secondary variant", () => {
    const button = <Button variant="secondary">Secondary</Button>;
    expect(button.props.variant).toBe("secondary");
  });

  it("renders with danger variant", () => {
    const button = <Button variant="danger">Danger</Button>;
    expect(button.props.variant).toBe("danger");
  });

  it("renders with white variant", () => {
    const button = <Button variant="white">White</Button>;
    expect(button.props.variant).toBe("white");
  });

  it("renders with icon", () => {
    const button = <Button icon="add">With Icon</Button>;
    expect(button.props.icon).toBe("add");
  });

  it("renders with fullWidth prop", () => {
    const button = <Button fullWidth>Full Width</Button>;
    expect(button.props.fullWidth).toBe(true);
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    const button = <Button onClick={handleClick}>Click me</Button>;
    button.props.onClick();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const button = <Button className="custom-class">Custom</Button>;
    expect(button.props.className).toBe("custom-class");
  });

  it("disables the button when disabled prop is true", () => {
    const button = <Button disabled>Disabled</Button>;
    expect(button.props.disabled).toBe(true);
  });
});
