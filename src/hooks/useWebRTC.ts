import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

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
  setInterviewAudio?: (url: string) => void
) {
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const isInitializedRef = useRef(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageBufferRef = useRef<string>("");
  const userStreamRef = useRef<MediaStream | null>(null);

  // Track connection state
  const [connectionState, setConnectionState] =
    useState<RTCPeerConnectionState>("new");

  useEffect(() => {
    // Cleanup function to properly close all connections and streams
    const cleanup = () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }

      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      if (dataChannelRef.current) {
        dataChannelRef.current.close();
        dataChannelRef.current = null;
      }

      if (userStreamRef.current) {
        userStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        userStreamRef.current = null;
      }

      isInitializedRef.current = false;
      messageBufferRef.current = "";
      setConnectionState("new");
    };

    async function initWebRTC() {
      try {
        const session = await fetch("/api/session").then((res) => res.json());
        const token = session.client_secret.value;

        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ],
        });
        pcRef.current = pc;

        pc.onconnectionstatechange = () => {
          const state = pc.connectionState;
          setConnectionState(state);

          if (state === "failed" || state === "disconnected") {
            cleanup();
            reconnectTimeoutRef.current = setTimeout(() => {
              if (started && !isInitializedRef.current) {
                initWebRTC();
              }
            }, 2000);
          }
        };

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        const destination = audioContext.createMediaStreamDestination();
        destinationRef.current = destination;

        const userStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        userStreamRef.current = userStream;

        const userSource = audioContext.createMediaStreamSource(userStream);
        userSource.connect(destination);
        pc.addTrack(userStream.getTracks()[0]);

        const audio = document.createElement("audio");
        audio.autoplay = true;

        pc.ontrack = (e) => {
          audio.srcObject = e.streams[0];
          const aiSource = audioContext.createMediaStreamSource(e.streams[0]);
          aiSource.connect(destination);
        };

        audioChunksRef.current = [];
        const mediaRecorder = new MediaRecorder(destination.stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/mpeg",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setInterviewAudio?.(audioUrl);
        };

        mediaRecorder.start();

        const dc = pc.createDataChannel("oai-events");
        dataChannelRef.current = dc;

        dc.onmessage = (e) => {
          try {
            const data: ResponseData = JSON.parse(e.data);

            if (data.type === "response.done") {
              messageBufferRef.current = "";
            }
          } catch (error) {
            console.error("Error processing message:", error);
            toast.error(
              "We're having trouble getting a response from the AI. Please try speaking again."
            );
          }
        };

        dc.onopen = () => {
          dc.send(
            JSON.stringify({
              type: "response.create",
            })
          );
        };

        dc.onclose = () => {};

        dc.onerror = (error) => {
          console.error("Data channel error:", error);
          toast.error(
            "We lost connection with the AI. Please try refreshing the page."
          );
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
      } catch (error) {
        console.error("Error initializing WebRTC:", error);
        toast.error(
          "We couldn't start the interview. Please check your microphone permissions and try again."
        );
        cleanup();
      }
    }

    if (started && !isInitializedRef.current) {
      isInitializedRef.current = true;
      initWebRTC();
    } else if (!started) {
      cleanup();
    }

    return cleanup;
  }, [started, setInterviewAudio]);

  return {
    dataChannelRef,
    pcRef,
    connectionState,
  };
}
