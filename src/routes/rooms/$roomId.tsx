import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/rooms/$roomId")({
  component: RouteComponent,
});

function RouteComponent() {
  const roomId = useParams({
    from: "/rooms/$roomId",
    select: (params) => params.roomId,
  });

  const params = new URLSearchParams(window.location.search);
  const isHost = params.get("h") == "true";

  return (
    <div className="w-full h-screen justify-center items-center flex">
      <div className="text-2xl font-bold">
        This is room {roomId}. You are a {isHost ? "host" : "guest"}.
      </div>
    </div>
  );
}
