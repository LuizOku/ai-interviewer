import { useEffect, useRef } from "react";
import { Message } from "./useInterview";

interface ResponseData {
  type: string;
  response: {
    output: Array<{
      content: Array<{
        type: string;
        text: string;
      }>;
    }>;
  };
}

export function useWebRTC(
  started: boolean,
  addMessage: (message: Message) => void
) {
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!started) return;

    async function initWebRTC() {
      const session = await fetch("/api/session").then((res) => res.json());
      const token = session.client_secret.value;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const audio = document.createElement("audio");
      audio.autoplay = true;
      pc.ontrack = (e) => (audio.srcObject = e.streams[0]);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      pc.addTrack(stream.getTracks()[0]);

      const dc = pc.createDataChannel("oai-events");
      dataChannelRef.current = dc;

      dc.onmessage = (e) => {
        const data: ResponseData = JSON.parse(e.data);
        console.log(data);
        if (data.type === "response.done") {
          console.log("response.done", data.response);
          addMessage(data.response.output[0]);
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdp = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        }
      ).then((r) => r.text());

      await pc.setRemoteDescription({ type: "answer", sdp });

      // Make AI start speaking immediately when connection is established
      dc.onopen = () => {
        dc.send(
          JSON.stringify({
            type: "response.create",
          })
        );
      };
    }

    initWebRTC();
  }, [addMessage, started]);

  return {
    dataChannelRef,
    pcRef,
  };
}
