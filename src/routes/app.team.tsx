import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import type { SubRole } from "@/lib/api-types";
import { toast } from "sonner";
import { UserPlus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/app/team")({
  component: TeamPage,
});

interface Member {
  id: string;
  email: string;
  name: string | null;
  orgRole: string;
  subRole: SubRole | null;
  status: string;
  kycStatus: string;
}
interface Invitation {
  id: string;
  email: string;
  subRole: SubRole;
  status: string;
  expiresAt: string;
}

const SUBROLE_LABEL: Record<SubRole, string> = {
  DEV: "Desarrollo",
  CONTABILIDAD: "Contabilidad",
  ADMINISTRACION: "Administración",
};

function TeamPage() {
  const { hasPermission } = useAuth();
  const qc = useQueryClient();
  const canWrite = hasPermission("team:write");

  const [email, setEmail] = useState("");
  const [subRole, setSubRole] = useState<SubRole>("DEV");

  const members = useQuery({
    queryKey: ["members"],
    queryFn: () => api.get<{ members: Member[] }>("/api/team/members"),
  });
  const invitations = useQuery({
    queryKey: ["invitations"],
    queryFn: () => api.get<{ invitations: Invitation[] }>("/api/team/invitations"),
  });

  const invite = useMutation({
    mutationFn: () => api.post("/api/team/invitations", { email, subRole }),
    onSuccess: () => {
      setEmail("");
      qc.invalidateQueries({ queryKey: ["invitations"] });
      toast.success("Invitación enviada");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateRole = useMutation({
    mutationFn: (v: { id: string; subRole: SubRole }) =>
      api.patch(`/api/team/members/${v.id}`, { subRole: v.subRole }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["members"] });
      toast.success("Rol actualizado");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.del(`/api/team/members/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["members"] });
      toast.success("Miembro eliminado");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Equipo</h1>
        <p className="text-slate text-sm">Invitá colaboradores y asigná permisos por sub-rol.</p>
      </div>

      {canWrite && (
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display">Invitar colaborador</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3 md:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input id="invite-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="colaborador@empresa.com" />
              </div>
              <div className="space-y-2">
                <Label>Sub-rol</Label>
                <Select value={subRole} onValueChange={(v) => setSubRole(v as SubRole)}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEV">Desarrollo</SelectItem>
                    <SelectItem value="CONTABILIDAD">Contabilidad</SelectItem>
                    <SelectItem value="ADMINISTRACION">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => invite.mutate()} disabled={invite.isPending || !email}>
                <UserPlus className="h-4 w-4 mr-2" /> Invitar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display">Miembros</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {members.data?.members.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0">
              <div className="min-w-0">
                <div className="font-medium truncate">{m.name ?? m.email}</div>
                <div className="text-xs text-slate font-mono truncate">{m.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{m.orgRole}</Badge>
                {m.orgRole === "OWNER" ? (
                  <span className="text-xs text-slate">Propietario</span>
                ) : canWrite ? (
                  <>
                    <Select
                      value={m.subRole ?? "DEV"}
                      onValueChange={(v) => updateRole.mutate({ id: m.id, subRole: v as SubRole })}
                    >
                      <SelectTrigger className="w-40 h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DEV">Desarrollo</SelectItem>
                        <SelectItem value="CONTABILIDAD">Contabilidad</SelectItem>
                        <SelectItem value="ADMINISTRACION">Administración</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="icon" variant="ghost" onClick={() => remove.mutate(m.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <span className="text-xs">{m.subRole ? SUBROLE_LABEL[m.subRole] : "—"}</span>
                )}
              </div>
            </div>
          ))}
          {members.data?.members.length === 0 && (
            <p className="text-slate text-sm">Sin miembros todavía.</p>
          )}
        </CardContent>
      </Card>

      {(invitations.data?.invitations.length ?? 0) > 0 && (
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display">Invitaciones pendientes</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {invitations.data?.invitations
              .filter((i) => i.status === "PENDING")
              .map((i) => (
                <div key={i.id} className="flex items-center justify-between text-sm border-b border-line pb-2 last:border-0">
                  <span className="font-mono">{i.email}</span>
                  <Badge variant="outline">{SUBROLE_LABEL[i.subRole]}</Badge>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
