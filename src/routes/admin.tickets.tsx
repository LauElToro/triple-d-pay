import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/tickets")({
  component: AdminTickets,
});

interface TicketRow {
  id: string;
  subject: string;
  status: string;
  priority: string;
  org?: string;
  author?: string;
  updatedAt: string;
}
interface TicketDetail {
  ticket: { id: string; subject: string; status: string; priority: string };
  messages: { id: string; body: string; isStaff: boolean; author: string; createdAt: string }[];
}

const statusStyle: Record<string, string> = {
  open: "bg-signal/15 text-signal border-signal/30",
  pending: "bg-mist text-ink border-line",
  resolved: "bg-signal/15 text-signal border-signal/30",
  closed: "bg-mist text-slate border-line",
};

const localeTag: Record<string, string> = {
  es: "es-AR",
  en: "en-US",
  pt: "pt-BR",
};

function AdminTickets() {
  const { t, locale } = useTranslation();
  const qc = useQueryClient();
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const list = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: () => api.get<{ tickets: TicketRow[] }>("/api/tickets"),
  });
  const detail = useQuery({
    queryKey: ["admin-ticket", selected],
    queryFn: () => api.get<TicketDetail>(`/api/tickets/${selected}`),
    enabled: !!selected,
  });

  const update = useMutation({
    mutationFn: (v: { status?: string; message?: string }) => api.patch(`/api/tickets/${selected}`, v),
    onSuccess: () => {
      setReply("");
      qc.invalidateQueries({ queryKey: ["admin-ticket", selected] });
      qc.invalidateQueries({ queryKey: ["admin-tickets"] });
      toast.success(t("admin.tickets.updated"));
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">{t("admin.tickets.title")}</h1>
        <p className="text-slate text-sm">{t("admin.tickets.subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display">{t("admin.tickets.queue")}</CardTitle></CardHeader>
          <CardContent className="space-y-2 max-h-[70vh] overflow-y-auto">
            {list.data?.tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelected(ticket.id)}
                className={`w-full text-left border rounded-md p-3 transition ${selected === ticket.id ? "border-signal bg-signal/5" : "border-line"}`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="font-medium truncate">{ticket.subject}</span>
                  <Badge variant="outline" className={statusStyle[ticket.status]}>{ticket.status}</Badge>
                </div>
                <div className="text-xs text-slate mt-1">
                  {ticket.org} · {ticket.author} · {ticket.priority}
                </div>
              </button>
            ))}
            {list.data?.tickets.length === 0 && (
              <p className="text-slate text-sm">{t("admin.tickets.empty")}</p>
            )}
          </CardContent>
        </Card>

        {selected && detail.data && (
          <Card className="border-line">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display truncate">{detail.data.ticket.subject}</CardTitle>
              <Select
                value={detail.data.ticket.status}
                onValueChange={(v) => update.mutate({ status: v })}
              >
                <SelectTrigger className="w-36 h-8"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">{t("admin.tickets.statusOpen")}</SelectItem>
                  <SelectItem value="pending">{t("admin.tickets.statusPending")}</SelectItem>
                  <SelectItem value="resolved">{t("admin.tickets.statusResolved")}</SelectItem>
                  <SelectItem value="closed">{t("admin.tickets.statusClosed")}</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {detail.data.messages.map((m) => (
                  <div key={m.id} className={`rounded-md p-3 text-sm ${m.isStaff ? "bg-signal/5 border border-signal/20" : "bg-mist border border-line"}`}>
                    <div className="text-xs text-slate font-mono mb-1">
                      {m.isStaff ? t("admin.tickets.staff") : m.author} ·{" "}
                      {new Date(m.createdAt).toLocaleString(localeTag[locale] ?? "es-AR")}
                    </div>
                    {m.body}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder={t("admin.tickets.replyPlaceholder")}
                />
                <Button onClick={() => update.mutate({ message: reply })} disabled={!reply}>
                  {t("admin.tickets.send")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
