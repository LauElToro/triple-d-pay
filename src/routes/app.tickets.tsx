import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/app/tickets")({
  component: TicketsPage,
});

interface TicketRow {
  id: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  updatedAt: string;
}
interface TicketDetail {
  ticket: { id: string; subject: string; status: string; priority: string; category: string };
  messages: { id: string; body: string; isStaff: boolean; author: string; createdAt: string }[];
}

const statusStyle: Record<string, string> = {
  open: "bg-signal/15 text-signal border-signal/30",
  pending: "bg-mist text-ink border-line",
  resolved: "bg-signal/15 text-signal border-signal/30",
  closed: "bg-mist text-slate border-line",
};

function TicketsPage() {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("medium");
  const [body, setBody] = useState("");
  const [reply, setReply] = useState("");

  const list = useQuery({
    queryKey: ["tickets"],
    queryFn: () => api.get<{ tickets: TicketRow[] }>("/api/tickets"),
  });

  const detail = useQuery({
    queryKey: ["ticket", selected],
    queryFn: () => api.get<TicketDetail>(`/api/tickets/${selected}`),
    enabled: !!selected,
  });

  const create = useMutation({
    mutationFn: () => api.post<{ ticket: { id: string } }>("/api/tickets", { subject, priority, body, category: "general" }),
    onSuccess: (res) => {
      setSubject(""); setBody("");
      qc.invalidateQueries({ queryKey: ["tickets"] });
      setSelected(res.ticket.id);
      toast.success("Ticket creado");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const sendReply = useMutation({
    mutationFn: () => api.patch(`/api/tickets/${selected}`, { message: reply }),
    onSuccess: () => {
      setReply("");
      qc.invalidateQueries({ queryKey: ["ticket", selected] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Soporte</h1>
        <p className="text-slate text-sm">Reportá problemas y seguí el estado de tus tickets.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display">Nuevo ticket</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Prioridad</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Descripción</Label>
              <Textarea id="body" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
            </div>
            <Button onClick={() => create.mutate()} disabled={create.isPending || !subject || !body}>
              Crear ticket
            </Button>
          </CardContent>
        </Card>

        <Card className="border-line">
          <CardHeader><CardTitle className="font-display">Tus tickets</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {list.data?.tickets.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`w-full text-left border rounded-md p-3 transition ${selected === t.id ? "border-signal bg-signal/5" : "border-line"}`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="font-medium truncate">{t.subject}</span>
                  <Badge variant="outline" className={statusStyle[t.status]}>{t.status}</Badge>
                </div>
                <div className="text-xs text-slate mt-1">{t.priority} · {new Date(t.updatedAt).toLocaleDateString("es-AR")}</div>
              </button>
            ))}
            {list.data?.tickets.length === 0 && <p className="text-slate text-sm">Sin tickets.</p>}
          </CardContent>
        </Card>
      </div>

      {selected && detail.data && (
        <Card className="border-line">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">{detail.data.ticket.subject}</CardTitle>
            <Badge variant="outline" className={statusStyle[detail.data.ticket.status]}>
              {detail.data.ticket.status}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {detail.data.messages.map((m) => (
                <div key={m.id} className={`rounded-md p-3 text-sm ${m.isStaff ? "bg-signal/5 border border-signal/20" : "bg-mist border border-line"}`}>
                  <div className="text-xs text-slate font-mono mb-1">
                    {m.isStaff ? "Soporte" : m.author} · {new Date(m.createdAt).toLocaleString("es-AR")}
                  </div>
                  {m.body}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Escribí una respuesta…" />
              <Button onClick={() => sendReply.mutate()} disabled={sendReply.isPending || !reply}>Enviar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
