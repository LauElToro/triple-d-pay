import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/plans")({
  beforeLoad: () => {
    throw redirect({ to: "/app/subscription" });
  },
});
