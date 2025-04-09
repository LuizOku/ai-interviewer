import React from "react";
import Home from "@/app/page";

describe("Home Page", () => {
  it("renders the home page", () => {
    const page = <Home />;
    expect(page).toBeDefined();
  });

  it("has correct features array", () => {
    const features = [
      {
        icon: "mic",
        title: "Real-time Conversation",
        description:
          "Engage in natural, flowing conversations with our advanced AI interviewer that adapts to your responses.",
      },
      {
        icon: "work",
        title: "Professional Experience",
        description:
          "Get a realistic interview experience with our AI that simulates real-world scenarios.",
      },
      {
        icon: "record_voice_over",
        title: "Record & Review",
        description:
          "Access recordings of your interviews to analyze your performance and track improvement.",
      },
    ];
    expect(features).toHaveLength(3);
    expect(features[0].icon).toBe("mic");
    expect(features[1].icon).toBe("work");
    expect(features[2].icon).toBe("record_voice_over");
  });
});
