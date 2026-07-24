import type { TranslationDict } from "../types";
import { catalogEn } from "./catalog-en";

/** Plan A: UI in PT, catalog WS/automations/tools stay in EN via catalogEn spread. */
export const catalogPt: TranslationDict = {
  ...catalogEn,
  "nav.products": "Produtos",
  "nav.tools": "Ferramentas",
  "nav.pricing": "Preço",
  "nav.contact": "Contato",
  "nav.automations": "Automações",

  "footer.disclaimer":
    "Set-Api é um site comercial, sem relação com sites ou organismos oficiais.",
  "footer.products": "Produtos",
  "footer.resources": "Recursos",
  "footer.tools": "Ferramentas",
  "footer.integrations": "Integrações",

  "landing.connectTitle": "Conecte-se à ARCA hoje",
  "landing.connectDesc":
    "Evite a complexidade da ARCA. Com Set-Api você integra em minutos e foca no seu negócio.",
  "landing.ctaAutomations": "Usar automações",
  "landing.ctaWebServices": "Usar web services",
  "landing.statsTitle": "Volume da plataforma",
  "landing.statsSubtitle": "Atividade para operar com ARCA em escala.",
  "landing.statsRequests": "requests processadas",
  "landing.statsRequestsPeriod": "nos últimos 30 dias",
  "landing.statsCuits": "CUITs ativas",
  "landing.statsCuitsPeriod": "operando com Set-Api nos últimos 30 dias",
  "landing.facturaTitle": "Precisa de faturamento ponta a ponta?",
  "landing.facturaDesc":
    "Set-Api Factura resolve emissão, estados, PDFs, QR e webhooks para SaaS, ERPs e plataformas.",
  "landing.facturaCta": "Conhecer Set-Api Factura",
  "landing.facturaFeature0": "Emissão fiscal",
  "landing.facturaFeature1": "Estados e retentativas",
  "landing.facturaFeature2": "PDF + QR",
  "landing.facturaFeature3": "Webhooks",
  "landing.automationsTitle": "Automações disponíveis",
  "landing.automationsSubtitle": "Automatize o trabalho manual no portal ARCA.",
  "landing.wsTitle": "Web services disponíveis",
  "landing.wsSubtitle": "Integre todos os web services da ARCA de forma simples.",
  "landing.integrationsTitle": "Integrações",
  "landing.integrationsSubtitle": "SDKs e APIs REST para suas linguagens e plataformas.",
  "landing.viewAllDocs": "Ver documentação",
  "landing.whyTitle": "Por que Set-Api?",
  "landing.whyDocs": "Documentação",
  "landing.whyDocsDesc": "Documentação completa para integrar rápido e fácil.",
  "landing.whyAuth": "Autenticação",
  "landing.whyAuthDesc": "Cuidamos automaticamente da autenticação WSAA.",
  "landing.whyDevs": "Feito para developers",
  "landing.whyDevsDesc": "SDK + API Key, pronto para produção.",

  "docs.title": "Documentação",
  "docs.subtitle": "Guias, referência e exemplos para conectar com ARCA.",
  "docs.quickstart": "Início rápido",
  "docs.automations": "Automações",
  "docs.quickstartTitle": "Comece em minutos",
  "docs.quickstartDesc": "Instale o SDK, configure sua API Key e emita seu primeiro comprovante.",
  "docs.install": "Instalação",
  "docs.example": "Exemplo",
  "docs.comingSoonLang": "Em breve",
  "docs.backToDocs": "Voltar à docs",

  "pricing.title": "Preço",
  "pricing.subtitle": "Planos simples. Mude quando quiser no painel.",
  "pricing.cta": "Começar",

  "contact.title": "Contato",
  "contact.subtitle": "Dúvidas? Escreva para nós.",
  "contact.name": "Nome",
  "contact.message": "Mensagem",
  "contact.submit": "Enviar",
  "contact.comingSoon": "O envio estará disponível em breve. Obrigado pelo interesse.",

  "tools.title": "Ferramentas",
  "tools.subtitle": "Utilitários públicos para consultas e validações ARCA.",
  "tools.comingSoon": "Esta ferramenta estará disponível em breve.",
  "tools.requiresApi": "Requer API Key Set-Api para consultas ao vivo.",

  "product.platform.title": "Set-Api Platform",
  "product.platform.desc":
    "API REST + API Key para acessar web services e automações ARCA do seu stack.",
  "product.factura.title": "Set-Api Factura",
  "product.factura.desc":
    "Faturamento ponta a ponta: emissão, estados, PDF, QR e webhooks.",
};
