import { createFileRoute, useParams } from "@tanstack/react-router";
import Peer from "peerjs";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/rooms/$roomId")({
  component: RouteComponent,
});

function RouteComponent() {
  const roomId = useParams({
    from: "/rooms/$roomId",
    select: (params) => params.roomId,
  });
  const params = new URLSearchParams(window.location.search);
  const isHost = params.get("h") === "true";

  const peerId = isHost ? roomId : crypto.randomUUID();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer(peerId);

    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    if (isHost) {
      prepareRoom(peer);
    } else {
      joinRoom(peer);
    }

    return () => {
      peer.disconnect();
      peer.destroy();
    };
  }, [roomId, isHost, peerId]);

  async function prepareRoom(peer: Peer) {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    console.log("Host ready, waiting for calls...");

    peer.on("call", (call) => {
      console.log("Received call from:", call.peer);
      call.answer(mediaStream);
    });
  }

  async function joinRoom(peer: Peer) {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      // video: { frameRate: 60 },
      audio: true,
    });

    peer.on("open", () => {
      console.log("Guest calling host:", roomId);

      const call = peer.call(roomId, mediaStream);

      call.on("stream", (stream) => {
        console.log("Received stream from host:", stream);
        if (videoRef.current) {
          console.log("Setting video stream");
          videoRef.current.srcObject = stream;
          console.log(videoRef.current.srcObject);
        }
        const audio = document.getElementById("audio") as HTMLAudioElement;
        audio.srcObject = stream;
        audio.play();
      });

      call.on("error", (err) => {
        console.error("Call error:", err);
      });
    });
  }

  return (
    <div className="w-full h-screen justify-center items-center flex flex-col gap-4">
      <div className="text-2xl font-bold">
        This is room {roomId}. You are a {isHost ? "host" : "guest"}.
      </div>
      <div className="text-sm">Your peer ID: {peerId}</div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-w-4xl border-2 border-gray-300 rounded"
      />

      <audio id="audio" autoPlay playsInline></audio>
    </div>
  );
}
