import type { TranslationDict } from "../types";
import { catalogEn } from "./catalog-en";

/** Plan A: UI in PT, catalog WS/automations/tools stay in EN via catalogEn spread. */
export const catalogPt: TranslationDict = {
  ...catalogEn,
  "nav.products": "Produtos",
  "nav.tools": "Ferramentas",
  "nav.referrals": "Indicados",
  "nav.pricing": "Preço",
  "nav.contact": "Contato",
  "nav.terms": "Termos",
  "nav.privacy": "Privacidade",
  "nav.automations": "Automações",
  "nav.webServices": "Serviços web",

  "footer.disclaimer":
    "Set-Api é um site comercial, sem relação com sites ou organismos oficiais.",
  "footer.products": "Produtos",
  "footer.resources": "Recursos",
  "footer.tools": "Ferramentas",
  "footer.legal": "Legal",
  "footer.integrations": "Integrações",

  "landing.connectTitle": "Conecte-se à ARCA hoje",
  "landing.connectDesc":
    "Evite a complexidade da ARCA. Com Set-Api você integra em minutos e foca no seu negócio.",
  "landing.ctaAutomations": "Usar automações",
  "landing.ctaWebServices": "Usar serviços web",
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
  "landing.wsTitle": "Serviços web disponíveis",
  "landing.wsSubtitle": "Integre todos os web services da ARCA de forma simples.",
  "landing.integrationsTitle": "Integrações",
  "landing.integrationsSubtitle": "APIs REST para suas linguagens e plataformas.",
  "landing.partners.title": "Trabalhamos com",
  "landing.partners.subtitle": "Equipes que confiam no Set-Api para operar com a ARCA em produção.",
  "landing.pathsTitle": "Escolha como integrar",
  "landing.pathsSubtitle":
    "Dois produtos claros: a plataforma de API e WS, ou faturamento ponta a ponta pronto para o seu produto.",
  "landing.pathPlatformHeadline": "API REST para operar a ARCA",
  "landing.pathPlatformCta": "Ver Set-Api Platform",
  "landing.pathFacturaHeadline": "Faturamento ponta a ponta",
  "landing.pathFacturaCta": "Ver Set-Api Factura",
  "landing.viewAllDocs": "Ver documentação",
  "landing.whyTitle": "Por que Set-Api?",
  "landing.whyDocs": "Documentação",
  "landing.whyDocsDesc": "Documentação completa para integrar rápido e fácil.",
  "landing.whyAuth": "Autenticação",
  "landing.whyAuthDesc": "Cuidamos automaticamente da autenticação WSAA.",
  "landing.whyDevs": "Feito para developers",
  "landing.whyDevsDesc": "API REST + API Key, pronto para produção.",

  "landing.referrals.title": "Programa de indicados",
  "landing.referrals.subtitle":
    "Convide equipes para o Set-Api e ganhe 50% de cada fatura que elas pagarem. Compartilhe seu link e acompanhe a rede no painel.",
  "landing.referrals.teaser":
    "50/50 em cada fatura dos seus indicados. Compartilhe seu link e acompanhe o progresso no painel.",
  "landing.referrals.teaserCta": "Ver programa",
  "landing.referrals.howTitle": "Como funciona",
  "landing.referrals.panelCta": "Ir ao painel de indicados",
  "landing.referrals.step1": "Crie sua conta e abra Indicados no painel",
  "landing.referrals.step2": "Copie seu link único e compartilhe com quem quiser",
  "landing.referrals.step3":
    "Quando se cadastrarem com seu código, 50% de cada fatura paga é creditado na sua conta",
  "landing.referrals.cta": "Criar conta grátis",
  "landing.referrals.ctaSecondary": "Ver planos",

  "docs.title": "Documentação",
  "docs.subtitle": "Guias, referência e exemplos para conectar com ARCA.",
  "docs.quickstart": "Início rápido",
  "docs.toc": "Índice",
  "docs.openToc": "Abrir índice da documentação",
  "docs.delegation": "Delegação ARCA",
  "docs.delegationDesc":
    "Passos do cliente e do Set-Api para delegar Web Services em produção (PV, F.3283/E e Computador Fiscal).",
  "docs.delegationCta": "Ver guia completa",
  "docs.delegation.client": "Cliente",
  "docs.delegation.attention": "Atenção",
  "docs.automations": "Automações",
  "docs.quickstartTitle": "Comece em minutos",
  "docs.quickstartDesc": "Use a API REST, configure sua API Key e emita seu primeiro comprovante.",
  "docs.install": "Instalação",
  "docs.example": "Exemplo",
  "docs.comingSoonLang": "Em breve",
  "docs.ptoVtaNote":
    "Use ptoVta 2 ou 10 conforme sua delegação na ARCA. Monotributo costuma usar ponto de venda 2.",
  "docs.backToDocs": "Voltar à docs",
  "docs.overview": "Descrição",
  "docs.howto": "Como usar",
  "docs.requirements": "Requisitos",
  "docs.integration": "Código de integração",
  "docs.integrationHint":
    "Use sua API Key Set-Api. A API REST recebe autenticação e payloads compatíveis com a ARCA.",
  "docs.webServices": "Serviços web",

  "pricing.title": "Preço",
  "pricing.subtitle": "Planos simples. Mude quando quiser no painel.",
  "pricing.cta": "Começar",
  "pricing.custom.name": "Personalizado",
  "pricing.custom.price": "Sob medida",
  "pricing.custom.tagline": "Para volumes ou necessidades maiores que os planos padrão",
  "pricing.custom.feature0": "Limites e cotas acima dos planos padrão",
  "pricing.custom.feature1": "Condições comerciais combinadas com você",
  "pricing.custom.feature2": "Suporte e acompanhamento conforme o caso",
  "pricing.custom.feature3": "Montamos o plano juntos conforme sua operação",
  "pricing.custom.cta": "Fale conosco",

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
  "product.factura.capsTitle": "O que resolve",
  "product.factura.capsSubtitle":
    "A camada comercial sobre a emissão fiscal: do request a um comprovante utilizável no seu produto.",
  "product.factura.cap0Title": "Emissão fiscal",
  "product.factura.cap0Body":
    "Emita comprovantes via API REST e obtenha CAE e vencimento sem montar SOAP nem WSAA na mão.",
  "product.factura.cap1Title": "Estados e retentativas",
  "product.factura.cap1Body":
    "Consulte o estado do comprovante e tente de novo com Idempotency-Key para evitar duplicados em falhas de rede.",
  "product.factura.cap2Title": "PDF + QR",
  "product.factura.cap2Body":
    "A resposta inclui dados para o QR oficial e um fluxo pronto para PDF no seu produto ou cliente.",
  "product.factura.cap3Title": "Webhooks",
  "product.factura.cap3Body":
    "Receba eventos de emissão e mudança de estado no seu backend sem polling constante.",
  "product.factura.flowTitle": "Como funciona",
  "product.factura.flowSubtitle": "Um caminho típico de integração em produção.",
  "product.factura.step0":
    "Crie sua conta, obtenha uma API Key e vincule o CUIT emissor com grants explícitos.",
  "product.factura.step1":
    "Complete o PV RECE / Web Services e a delegação ARCA ao CUIT do Set-Api.",
  "product.factura.step2":
    "Emita via REST com Authorization Bearer e Idempotency-Key; guarde CAE e correlação.",
  "product.factura.step3":
    "Entregue PDF/QR ao usuário e escute webhooks ou consulte estados conforme o fluxo.",
  "product.factura.coverTitle": "Cobertura fiscal",
  "product.factura.coverSubtitle": "Tipos e variantes habituais de emissão eletrônica.",
  "product.factura.cover0": "Faturas e notas de crédito/débito A, B e C",
  "product.factura.cover1": "Regime MiPyME",
  "product.factura.cover2": "Fatura de exportação",
  "product.factura.cover3": "Comprovantes de turismo (quando aplicável)",
  "product.factura.cover4": "CAE, vencimento e dados para QR oficial",
  "product.factura.coverDocs": "Ver web service de faturamento eletrônico",
  "product.factura.reqTitle": "Requisitos",
  "product.factura.reqSubtitle": "O mínimo para emitir em produção.",
  "product.factura.req0": "CUIT ativo e certificado digital (homologação ou produção)",
  "product.factura.req1": "Ponto de venda RECE / Web Services e informar o número ao Set-Api",
  "product.factura.req2": "Delegação de cada WS ao CUIT do Set-Api (F.3283/E)",
  "product.factura.req3": "Plano Set-Api com cota de comprovantes e API Key com grant do CUIT",
  "product.factura.exampleTitle": "Exemplo de emissão",
  "product.factura.exampleBody":
    "A mesma autenticação REST do quickstart: API Key no servidor, chave de idempotência por emissão e payload com CUIT, tipo, PV e importes.",
  "product.factura.audienceTitle": "Para quem é",
  "product.factura.audienceBody":
    "Pensado para SaaS, ERPs e plataformas que precisam emitir e gerenciar comprovantes sem montar toda a camada fiscal do zero.",
  "product.factura.audienceNote":
    "Se você só precisa consumir WS ou automatizar a ARCA, comece pelo Set-Api Platform.",
};
