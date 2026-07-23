import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/usage")({
  beforeLoad: () => {
    throw redirect({ to: "/app/requests" });
  },
});
