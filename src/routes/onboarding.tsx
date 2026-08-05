import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/set-api/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import type { SessionUser } from "@/lib/api-types";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";

function postOnboardingPath(user: { systemRole: string; kycStatus: string }): "/kyc" | "/app" {
  if (user.systemRole === "SUPERADMIN") return "/app";
  if (user.kycStatus === "NOT_STARTED" || user.kycStatus === "PENDING") return "/kyc";
  return "/app";
}

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Conocete · Set-Api" }] }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const { user, hydrated, refreshMe, activeOrg } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [source, setSource] = useState("direct");
  const [heardAbout, setHeardAbout] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [clientType, setClientType] = useState("standard");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  useEffect(() => {
    if (!hydrated || !user) return;
    if (user.systemRole === "SUPERADMIN") {
      navigate({ to: "/app" });
      return;
    }
    if (activeOrg?.onboardingCompletedAt || user.onboardingSkippedAt) {
      navigate({ to: postOnboardingPath(user) });
    }
  }, [hydrated, user, activeOrg, navigate]);

  const finish = async (skip: boolean) => {
    setSaving(true);
    try {
      if (skip) {
        await api.post("/api/onboarding", { skip: true });
      } else {
        await api.post("/api/onboarding", {
          source,
          heardAbout: heardAbout || undefined,
          intendedUse: intendedUse || undefined,
          companyRole: companyRole || undefined,
          companySize: companySize || undefined,
          clientType,
        });
      }
      await refreshMe();
      const me = await api.get<{ user: SessionUser }>("/api/me");
      navigate({ to: postOnboardingPath(me.user) });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("onboarding.error"));
    } finally {
      setSaving(false);
    }
  };

  if (!hydrated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate font-mono text-sm">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6"><LogoMark /></header>
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <Card className="w-full max-w-lg border-line">
          <CardHeader>
            <CardTitle className="font-display text-2xl">{t("onboarding.title")}</CardTitle>
            <p className="text-sm text-slate">{t("onboarding.subtitle")}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label={t("onboarding.source")}>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">{t("onboarding.sourceDirect")}</SelectItem>
                  <SelectItem value="referral">{t("onboarding.sourceReferral")}</SelectItem>
                  <SelectItem value="google">{t("onboarding.sourceGoogle")}</SelectItem>
                  <SelectItem value="linkedin">{t("onboarding.sourceLinkedin")}</SelectItem>
                  <SelectItem value="partner">{t("onboarding.sourcePartner")}</SelectItem>
                  <SelectItem value="ads">{t("onboarding.sourceAds")}</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label={t("onboarding.heardAbout")}>
              <Select value={heardAbout} onValueChange={setHeardAbout}>
                <SelectTrigger><SelectValue placeholder={t("onboarding.optional")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="colleague">{t("onboarding.heardColleague")}</SelectItem>
                  <SelectItem value="search">{t("onboarding.heardSearch")}</SelectItem>
                  <SelectItem value="social">{t("onboarding.heardSocial")}</SelectItem>
                  <SelectItem value="event">{t("onboarding.heardEvent")}</SelectItem>
                  <SelectItem value="other">{t("onboarding.heardOther")}</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label={t("onboarding.intendedUse")}>
              <Select value={intendedUse} onValueChange={setIntendedUse}>
                <SelectTrigger><SelectValue placeholder={t("onboarding.optional")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="facturacion_masiva">{t("onboarding.useMass")}</SelectItem>
                  <SelectItem value="ecommerce">{t("onboarding.useEcommerce")}</SelectItem>
                  <SelectItem value="erp">{t("onboarding.useErp")}</SelectItem>
                  <SelectItem value="agency">{t("onboarding.useAgency")}</SelectItem>
                  <SelectItem value="testing">{t("onboarding.useTesting")}</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label={t("onboarding.companyRole")}>
              <Select value={companyRole} onValueChange={setCompanyRole}>
                <SelectTrigger><SelectValue placeholder={t("onboarding.optional")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">{t("onboarding.roleDev")}</SelectItem>
                  <SelectItem value="cto">{t("onboarding.roleCto")}</SelectItem>
                  <SelectItem value="finance">{t("onboarding.roleFinance")}</SelectItem>
                  <SelectItem value="ops">{t("onboarding.roleOps")}</SelectItem>
                  <SelectItem value="founder">{t("onboarding.roleFounder")}</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label={t("onboarding.companySize")}>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger><SelectValue placeholder={t("onboarding.optional")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2-10">2–10</SelectItem>
                  <SelectItem value="11-50">11–50</SelectItem>
                  <SelectItem value="51-200">51–200</SelectItem>
                  <SelectItem value="200+">200+</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label={t("onboarding.clientType")}>
              <Select value={clientType} onValueChange={setClientType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">{t("onboarding.typeStandard")}</SelectItem>
                  <SelectItem value="saas">{t("onboarding.typeSaas")}</SelectItem>
                  <SelectItem value="agency">{t("onboarding.typeAgency")}</SelectItem>
                  <SelectItem value="enterprise">{t("onboarding.typeEnterprise")}</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button className="flex-1" onClick={() => finish(false)} disabled={saving}>
                {t("onboarding.continue")}
              </Button>
              <Button className="flex-1" variant="outline" onClick={() => finish(true)} disabled={saving}>
                {t("onboarding.skip")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
