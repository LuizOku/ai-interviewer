import React from "react";
import { AudioPlayer } from "@/components/AudioPlayer";

describe("AudioPlayer Component", () => {
  const mockAudioUrl = "https://example.com/audio.mp3";

  it("renders with correct audio URL", () => {
    const player = <AudioPlayer audioUrl={mockAudioUrl} />;
    expect(player.props.audioUrl).toBe(mockAudioUrl);
  });
});
