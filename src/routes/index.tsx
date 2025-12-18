import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate();

  const roomIdInputRef = useRef<HTMLInputElement>(null);

  const createRoom = () => {
    const roomId = crypto.randomUUID();
    navigate({
      to: "/rooms/$roomId",
      params: { roomId },
      search: { h: true },
    });
  };

  const joinRoom = () => {
    const roomId = roomIdInputRef.current?.value;
    if (!roomId) {
      return;
    }
    navigate({
      to: "/rooms/$roomId",
      params: { roomId },
      search: { h: false },
    });
  };

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col gap-3 items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <div className="flex gap-5 items-center">
          <div className="ml-auto">
            <input
              ref={roomIdInputRef}
              type="text"
              className="border-2 border-white rounded-lg p-3"
              placeholder="Room ID"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div
            className="rounded-2xl bg-blue-500 p-5 cursor-pointer"
            onClick={createRoom}
          >
            Create room
          </div>
          <div
            className="rounded-2xl bg-blue-500 p-5 cursor-pointer"
            onClick={joinRoom}
          >
            Join room
          </div>
        </div>
      </header>
    </div>
  );
}
