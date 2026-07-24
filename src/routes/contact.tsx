import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicShell } from "@/components/set-api/public-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(t("contact.comingSoon"));
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <PublicShell>
      <div className="mx-auto max-w-lg px-6 py-16">
        <Card className="border-line">
          <CardHeader>
            <CardTitle className="font-display text-2xl">{t("contact.title")}</CardTitle>
            <p className="text-sm text-slate">{t("contact.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contact.name")}</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("common.email")}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.message")}</Label>
                <Textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">{t("contact.submit")}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PublicShell>
  );
}
