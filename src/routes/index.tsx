import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <div className="flex gap-5">
          <div
            className="rounded-2xl bg-blue-500 p-5 cursor-pointer"
            onClick={() =>
              navigate({
                to: "/rooms/$roomId",
                params: { roomId: "123" },
                search: { h: true },
              })
            }
          >
            Create room
          </div>
          <div
            className="rounded-2xl bg-blue-500 p-5 cursor-pointer"
            onClick={() => {
              navigate({
                to: "/rooms/$roomId",
                params: { roomId: "123" },
              });
            }}
          >
            Join room
          </div>
        </div>
      </header>
    </div>
  );
}
