import { Badge } from "@/components/ui/badge";

export function KeyStatusBadge({ status }: { status: "active" | "suspended" }) {
  if (status === "active") {
    return (
      <Badge className="bg-signal text-primary-foreground font-mono uppercase text-xs">
        Active
      </Badge>
    );
  }
  return (
    <Badge className="bg-seal text-destructive-foreground font-mono uppercase text-xs">
      Suspended
    </Badge>
  );
}
