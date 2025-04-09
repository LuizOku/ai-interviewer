import React from "react";
import { ParticipantBox } from "@/components/ParticipantBox";

describe("ParticipantBox Component", () => {
  it("renders user type correctly", () => {
    const box = <ParticipantBox type="user" />;
    expect(box.props.type).toBe("user");
  });

  it("renders AI type correctly", () => {
    const box = <ParticipantBox type="ai" />;
    expect(box.props.type).toBe("ai");
  });

  it("shows connecting state", () => {
    const box = <ParticipantBox type="user" isConnecting={true} />;
    expect(box.props.isConnecting).toBe(true);
  });

  it("has correct default isConnecting value", () => {
    const box = <ParticipantBox type="user" />;
    expect(box.props.isConnecting).toBeUndefined();
  });
});
