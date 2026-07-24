import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CatalogCardRoute =
  | { to: "/docs/web-services/$slug"; params: { slug: string } }
  | { to: "/docs/automations/$slug"; params: { slug: string } }
  | { to: "/tools/$slug"; params: { slug: string } };

export function CatalogCard({
  title,
  description,
  to,
  params,
}: {
  title: string;
  description: string;
} & CatalogCardRoute) {
  return (
    <Link to={to} params={params} className="group block h-full">
      <Card className="h-full border-line transition hover:border-signal/50 hover:shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base leading-snug group-hover:text-signal transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate line-clamp-3">{description}</p>
          <ArrowRight className="mt-3 h-4 w-4 text-signal opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardContent>
      </Card>
    </Link>
  );
}
