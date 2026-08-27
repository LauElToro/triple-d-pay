import type { Locale } from "@/lib/i18n/types";

export type LegalBlock = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalBlock[];
};

const termsEs: LegalDoc = {
  title: "Términos y condiciones",
  updated: "Última actualización: 27 de agosto de 2026",
  intro:
    "Estos términos regulan el uso de Set-Api (set-api.com), un software de suscripción que ofrece API REST y panel para integrar facturación electrónica y servicios relacionados con ARCA/AFIP.",
  sections: [
    {
      heading: "1. Servicio",
      paragraphs: [
        "Set-Api facilita la autenticación, emisión y consulta de comprobantes y otros web services ARCA a través de una API REST, API Keys, documentación y un panel de administración. No somos ARCA, AFIP ni un organismo oficial, ni intermediamos obligaciones fiscales ajenas: la responsabilidad de emitir, declarar y conservar comprobantes conforme a la normativa vigente es siempre tuya o de tu organización.",
      ],
    },
    {
      heading: "2. Cuenta",
      bullets: [
        "Debés registrar datos veraces y mantener la confidencialidad de tu acceso, API Keys y credenciales.",
        "Sos responsable del uso de tu cuenta, organizaciones, CUITs vinculados y de las acciones hechas con tus keys.",
        "Podemos suspender o cerrar cuentas por abuso, fraude, mora o incumplimiento de estos términos.",
      ],
    },
    {
      heading: "3. Planes y pago",
      bullets: [
        "El plan Free y los planes pagos tienen límites de uso, CUITs y funcionalidades según lo publicado en /pricing.",
        "Los cambios de plan y la facturación del ciclo se gestionan desde el panel. Los medios de pago disponibles (p. ej. MercadoPago u otros que indiquemos) pueden ampliarse con el tiempo.",
        "Si hay facturas impagas o se superan los límites del plan, podemos suspender keys o restringir el servicio hasta regularizar la situación, según las reglas del producto.",
      ],
    },
    {
      heading: "4. Contenido, ARCA y terceros",
      paragraphs: [
        "Las respuestas, CAE, padrones y demás datos fiscales pueden provenir de ARCA/AFIP u otros sistemas externos. Pueden estar incompletos, demorados, rechazados o no disponibles. Set-Api no garantiza exactitud, vigencia ni disponibilidad continua de cada respuesta de terceros.",
        "Para operar en producción, el cliente debe delegar los Web Services correspondientes al CUIT de Set-Api desde el Administrador de Relaciones, informar el punto de venta Web Services y las constancias (p. ej. F.3283/E). Set-Api acepta la designación, la asigna a su Computador Fiscal/certificado y configura el CUIT en la cuenta. Sin PV RECE/Web Services o sin completar esas etapas, ARCA puede rechazar la operación (p. ej. “Computador no autorizado”).",
        "El uso de certificados, CUITs y autorizaciones WS es responsabilidad del usuario. Debés operar solo con CUITs y permisos que te correspondan. Cada servicio se delega por separado.",
      ],
    },
    {
      heading: "5. Inteligencia artificial",
      paragraphs: [
        "Parte del servicio (incluidos asistentes, sugerencias en documentación o panel, textos de ayuda, clasificaciones, resúmenes y otras funciones asistidas) puede generarse o asistirse con modelos de inteligencia artificial, propios o de terceros. Ese procesamiento puede incluir datos técnicos de uso, contenido que envíes al producto y, cuando corresponda, feedback para mejorar la experiencia.",
      ],
      bullets: [
        "Las salidas de la IA son asistencia automatizada: no constituyen asesoramiento legal, contable, fiscal ni técnico profesional, ni sustituyen la validación humana de comprobantes, CUITs, CAE u otras obligaciones ante ARCA/AFIP.",
        "Los modelos pueden equivocarse, omitir datos, desactualizarse o producir resultados incompletos o inexactos. Vos tenés que verificar cada resultado antes de usarlo en producción o ante organismos fiscales.",
        "Set-Api no garantiza que una sugerencia, texto o clasificación generada coincida con la normativa vigente, el estado real de un CUIT o la aceptación de un comprobante por ARCA.",
        "Podemos cambiar de modelo, proveedor o criterios de asistencia sin que eso implique un nuevo servicio ni responsabilidad extra. El uso de proveedores de IA se rige también por sus propias condiciones, en lo que les corresponda.",
        "No está permitido usar el servicio para entrenar modelos de terceros, extraer masivamente salidas de la IA ni presentarlas como un dictamen profesional emitido por Set-Api.",
      ],
    },
    {
      heading: "6. Uso permitido",
      bullets: [
        "Uso legítimo de tu organización para integrar y operar facturación/servicios ARCA según tu plan.",
        "No está permitido revender el acceso sin autorización, scrapear masivamente nuestra API/UI, eludir límites del plan, ni usar el servicio para actividades ilícitas o no autorizadas sobre CUITs de terceros.",
      ],
    },
    {
      heading: "7. Limitación de responsabilidad",
      paragraphs: [
        "El servicio se ofrece “tal cual”. En la máxima medida permitida por la ley aplicable, no respondemos por decisiones fiscales o comerciales, rechazo de comprobantes, pérdida de datos por mala integración, errores o inexactitudes de la IA, fallas de ARCA/AFIP, pasarelas de pago, proveedores de KYC o de modelos, ni interrupciones fuera de nuestro control razonable.",
      ],
    },
    {
      heading: "8. Cambios",
      paragraphs: [
        "Podemos actualizar estos términos. El uso continuado después de publicar cambios implica aceptación. Si no estás de acuerdo, dejá de usar el servicio y cancelá tu plan.",
      ],
    },
    {
      heading: "9. Contacto",
      paragraphs: [
        "Consultas legales o comerciales: formulario de contacto en /contact o el canal de soporte del panel (tickets).",
      ],
    },
  ],
};

const privacyEs: LegalDoc = {
  title: "Política de privacidad",
  updated: "Última actualización: 27 de agosto de 2026",
  intro:
    "Esta política describe cómo Set-Api trata datos personales cuando usás el sitio, la API y el panel.",
  sections: [
    {
      heading: "1. Responsable",
      paragraphs: [
        "Set-Api — contacto a través del formulario en /contact o del soporte del panel.",
      ],
    },
    {
      heading: "2. Datos que tratamos",
      bullets: [
        "Cuenta: nombre, email, hash de contraseña, plan, preferencias (tema, idioma) y datos de organización.",
        "Operación: CUITs vinculados, puntos de venta informados, constancias de delegación (p. ej. F.3283/E) cuando las compartís, API Keys (almacenadas de forma segura, sin exponer el secreto completo tras su emisión), uso/metering, comprobantes emitidos vía el servicio e información de onboarding/KYC cuando corresponda.",
        "Soporte: mensajes de tickets y formularios de contacto.",
        "Pagos: datos de facturación del ciclo; si usamos pasarelas (p. ej. MercadoPago), los datos de tarjeta los procesa el proveedor.",
      ],
    },
    {
      heading: "3. Finalidades",
      bullets: [
        "Prestarte el servicio (API, panel, keys, metering, facturación del plan).",
        "Seguridad, prevención de abuso, soporte y mejora del producto.",
        "Cumplir obligaciones legales y de facturación.",
        "Cuando uses funciones asistidas por IA, procesar lo necesario para generar esas asistencias.",
      ],
    },
    {
      heading: "4. Base y conservación",
      paragraphs: [
        "Tratamos datos para ejecutar el contrato de servicio y, cuando corresponde, con tu consentimiento. Conservamos la cuenta mientras esté activa y por plazos adicionales razonables por seguridad, reclamos o requisitos legales.",
      ],
    },
    {
      heading: "5. Encargados / terceros",
      paragraphs: [
        "Podemos usar proveedores de hosting, base de datos, email, KYC (p. ej. Didit), pasarelas de pago, el gateway ARCA y modelos de inteligencia artificial (p. ej. para asistencias en el producto). Solo reciben lo necesario para su función. Las salidas de IA no sustituyen tu verificación de comprobantes, CUITs ni obligaciones fiscales.",
      ],
    },
    {
      heading: "6. Tus derechos",
      paragraphs: [
        "Podés pedir acceso, corrección o eliminación de tu cuenta mediante el formulario de contacto o el soporte del panel.",
      ],
    },
    {
      heading: "7. Cookies y almacenamiento local",
      paragraphs: [
        "Usamos cookies de sesión (p. ej. refresh) para mantenerte logueado y almacenamiento local para tema e idioma. No vendemos datos personales.",
      ],
    },
    {
      heading: "8. Cambios",
      paragraphs: [
        "Podemos actualizar esta política. La fecha de “última actualización” indica la versión vigente.",
      ],
    },
  ],
};

const termsEn: LegalDoc = {
  title: "Terms of service",
  updated: "Last updated: August 27, 2026",
  intro:
    "These terms govern the use of Set-Api (set-api.com), a subscription product that provides a REST API and dashboard to integrate electronic invoicing and related ARCA/AFIP services.",
  sections: [
    {
      heading: "1. Service",
      paragraphs: [
        "Set-Api helps you authenticate, issue and query vouchers and other ARCA web services through a REST API, API Keys, documentation and an admin dashboard. We are not ARCA, AFIP or any official agency, and we do not take on your tax obligations: issuing, declaring and retaining vouchers under applicable law remains your responsibility or that of your organization.",
      ],
    },
    {
      heading: "2. Account",
      bullets: [
        "You must provide accurate information and keep your access, API Keys and credentials confidential.",
        "You are responsible for your account, organizations, linked CUITs and actions taken with your keys.",
        "We may suspend or close accounts for abuse, fraud, non-payment or breach of these terms.",
      ],
    },
    {
      heading: "3. Plans and payment",
      bullets: [
        "Free and paid plans have usage, CUIT and feature limits as published on /pricing.",
        "Plan changes and cycle billing are managed from the dashboard. Available payment methods (e.g. MercadoPago or others we enable) may expand over time.",
        "If invoices are unpaid or plan limits are exceeded, we may suspend keys or restrict the service until the account is regularized.",
      ],
    },
    {
      heading: "4. Content, ARCA and third parties",
      paragraphs: [
        "Responses, CAE, registries and other tax data may come from ARCA/AFIP or other external systems. They may be incomplete, delayed, rejected or unavailable. Set-Api does not guarantee accuracy, currency or continuous availability of third-party responses.",
        "For production, the customer must delegate the relevant Web Services to Set-Api’s CUIT in the Relationships Administrator, provide the Web Services point of sale and certificates (e.g. F.3283/E). Set-Api accepts the designation, assigns it to its Fiscal Computer/certificate and configures the CUIT on the account. Without a RECE/Web Services POS or without completing those steps, ARCA may reject the call (e.g. “Computer not authorized”).",
        "Certificates, CUITs and WS authorizations are your responsibility. Operate only with CUITs and permissions that belong to you. Each service is delegated separately.",
      ],
    },
    {
      heading: "5. Artificial intelligence",
      paragraphs: [
        "Parts of the service (including assistants, in-product or docs suggestions, help text, classifications, summaries and other assisted features) may be generated or assisted by artificial intelligence models, our own or third-party. That processing may include technical usage data, content you submit, and, where applicable, feedback to improve the experience.",
      ],
      bullets: [
        "AI outputs are automated assistance: they are not legal, accounting, tax or professional advice, and they do not replace human validation of vouchers, CUITs, CAE or other ARCA/AFIP obligations.",
        "Models can be wrong, omit data, become outdated or produce incomplete results. You must verify every result before using it in production or before tax authorities.",
        "Set-Api does not guarantee that a generated suggestion, text or classification matches current regulations, a CUIT’s real status or ARCA acceptance of a voucher.",
        "We may change models, providers or assistance criteria without creating a new service or extra liability. Third-party AI providers are also governed by their own terms where applicable.",
        "You may not use the service to train third-party models, mass-extract AI outputs, or present them as a professional opinion issued by Set-Api.",
      ],
    },
    {
      heading: "6. Acceptable use",
      bullets: [
        "Legitimate use by your organization to integrate and operate ARCA invoicing/services under your plan.",
        "Reselling access without authorization, mass scraping our API/UI, bypassing plan limits, or using the service for unlawful or unauthorized activity on third-party CUITs is not allowed.",
      ],
    },
    {
      heading: "7. Limitation of liability",
      paragraphs: [
        "The service is provided “as is”. To the fullest extent permitted by law, we are not liable for tax or commercial decisions, rejected vouchers, data loss from poor integration, AI errors or inaccuracies, ARCA/AFIP failures, payment gateways, KYC or model providers, or outages beyond our reasonable control.",
      ],
    },
    {
      heading: "8. Changes",
      paragraphs: [
        "We may update these terms. Continued use after changes are published means acceptance. If you disagree, stop using the service and cancel your plan.",
      ],
    },
    {
      heading: "9. Contact",
      paragraphs: [
        "Legal or commercial questions: contact form at /contact or in-app support tickets.",
      ],
    },
  ],
};

const privacyEn: LegalDoc = {
  title: "Privacy policy",
  updated: "Last updated: August 27, 2026",
  intro:
    "This policy describes how Set-Api handles personal data when you use the site, API and dashboard.",
  sections: [
    {
      heading: "1. Controller",
      paragraphs: [
        "Set-Api — contact via the form at /contact or in-app support.",
      ],
    },
    {
      heading: "2. Data we process",
      bullets: [
        "Account: name, email, password hash, plan, preferences (theme, language) and organization data.",
        "Operations: linked CUITs, reported points of sale, delegation certificates (e.g. F.3283/E) when you share them, API Keys (stored securely; full secret not exposed after issuance), usage/metering, vouchers issued through the service, and onboarding/KYC data when applicable.",
        "Support: ticket messages and contact forms.",
        "Payments: cycle billing data; if we use gateways (e.g. MercadoPago), card data is processed by the provider.",
      ],
    },
    {
      heading: "3. Purposes",
      bullets: [
        "Provide the service (API, dashboard, keys, metering, plan billing).",
        "Security, abuse prevention, support and product improvement.",
        "Comply with legal and invoicing obligations.",
        "When you use AI-assisted features, process what is needed to generate that assistance.",
      ],
    },
    {
      heading: "4. Legal basis and retention",
      paragraphs: [
        "We process data to perform the service contract and, where applicable, with your consent. We keep the account while active and for additional reasonable periods for security, claims or legal requirements.",
      ],
    },
    {
      heading: "5. Processors / third parties",
      paragraphs: [
        "We may use hosting, database, email, KYC (e.g. Didit), payment gateways, the ARCA gateway and artificial intelligence models (e.g. for in-product assistance). They only receive what is needed for their role. AI outputs do not replace your verification of vouchers, CUITs or tax obligations.",
      ],
    },
    {
      heading: "6. Your rights",
      paragraphs: [
        "You may request access, correction or deletion of your account via the contact form or in-app support.",
      ],
    },
    {
      heading: "7. Cookies and local storage",
      paragraphs: [
        "We use session cookies (e.g. refresh) to keep you signed in and local storage for theme and language. We do not sell personal data.",
      ],
    },
    {
      heading: "8. Changes",
      paragraphs: [
        "We may update this policy. The “last updated” date shows the current version.",
      ],
    },
  ],
};

const termsPt: LegalDoc = {
  title: "Termos e condições",
  updated: "Última atualização: 27 de agosto de 2026",
  intro:
    "Estes termos regulam o uso do Set-Api (set-api.com), um software de assinatura que oferece API REST e painel para integrar faturamento eletrônico e serviços relacionados à ARCA/AFIP.",
  sections: [
    {
      heading: "1. Serviço",
      paragraphs: [
        "O Set-Api facilita autenticação, emissão e consulta de comprovantes e outros web services ARCA por meio de API REST, API Keys, documentação e painel. Não somos ARCA, AFIP nem órgão oficial, e não assumimos obrigações fiscais alheias: emitir, declarar e conservar comprovantes conforme a norma vigente é sempre responsabilidade sua ou da sua organização.",
      ],
    },
    {
      heading: "2. Conta",
      bullets: [
        "Você deve registrar dados verdadeiros e manter a confidencialidade do acesso, API Keys e credenciais.",
        "É responsável pelo uso da conta, organizações, CUITs vinculados e ações feitas com suas keys.",
        "Podemos suspender ou encerrar contas por abuso, fraude, inadimplência ou descumprimento destes termos.",
      ],
    },
    {
      heading: "3. Planos e pagamento",
      bullets: [
        "O plano Free e os planos pagos têm limites de uso, CUITs e funcionalidades conforme /pricing.",
        "Mudanças de plano e faturamento do ciclo são geridos no painel. Meios de pagamento (p. ex. MercadoPago ou outros) podem ser ampliados com o tempo.",
        "Se houver faturas em atraso ou limites excedidos, podemos suspender keys ou restringir o serviço até regularização.",
      ],
    },
    {
      heading: "4. Conteúdo, ARCA e terceiros",
      paragraphs: [
        "Respostas, CAE, cadastros e outros dados fiscais podem vir da ARCA/AFIP ou sistemas externos. Podem estar incompletos, atrasados, rejeitados ou indisponíveis. O Set-Api não garante exatidão, vigência nem disponibilidade contínua de respostas de terceiros.",
        "Para operar em produção, o cliente deve delegar os Web Services ao CUIT do Set-Api no Administrador de Relações, informar o ponto de venda Web Services e os comprovantes (p. ex. F.3283/E). O Set-Api aceita a designação, atribui ao Computador Fiscal/certificado e configura o CUIT na conta. Sem PV RECE/Web Services ou sem concluir essas etapas, a ARCA pode rejeitar a operação (p. ex. “Computador não autorizado”).",
        "Certificados, CUITs e autorizações WS são responsabilidade do usuário. Opere apenas com CUITs e permissões que lhe correspondam. Cada serviço é delegado separadamente.",
      ],
    },
    {
      heading: "5. Inteligência artificial",
      paragraphs: [
        "Parte do serviço (incluindo assistentes, sugestões no painel ou documentação, textos de ajuda, classificações, resumos e outras funções assistidas) pode ser gerada ou assistida por modelos de inteligência artificial, próprios ou de terceiros. Esse processamento pode incluir dados técnicos de uso, conteúdo enviado ao produto e, quando couber, feedback para melhorar a experiência.",
      ],
      bullets: [
        "As saídas da IA são assistência automatizada: não constituem aconselhamento jurídico, contábil, fiscal ou técnico profissional, nem substituem a validação humana de comprovantes, CUITs, CAE ou outras obrigações perante ARCA/AFIP.",
        "Os modelos podem errar, omitir dados, desatualizar-se ou produzir resultados incompletos. Você deve verificar cada resultado antes de usá-lo em produção ou perante órgãos fiscais.",
        "O Set-Api não garante que uma sugestão, texto ou classificação gerada coincida com a norma vigente, o status real de um CUIT ou a aceitação de um comprovante pela ARCA.",
        "Podemos mudar modelo, provedor ou critérios de assistência sem que isso implique um novo serviço nem responsabilidade extra. O uso de provedores de IA também se rege pelas condições deles, no que couber.",
        "Não é permitido usar o serviço para treinar modelos de terceiros, extrair em massa saídas da IA nem apresentá-las como parecer profissional emitido pelo Set-Api.",
      ],
    },
    {
      heading: "6. Uso permitido",
      bullets: [
        "Uso legítimo da sua organização para integrar e operar faturamento/serviços ARCA conforme o plano.",
        "Não é permitido revender o acesso sem autorização, fazer scraping massivo da API/UI, burlar limites do plano nem usar o serviço para atividades ilícitas ou não autorizadas sobre CUITs de terceiros.",
      ],
    },
    {
      heading: "7. Limitação de responsabilidade",
      paragraphs: [
        "O serviço é oferecido “no estado em que se encontra”. Na máxima medida permitida pela lei, não respondemos por decisões fiscais ou comerciais, rejeição de comprovantes, perda de dados por má integração, erros ou inexatidões da IA, falhas da ARCA/AFIP, gateways de pagamento, provedores de KYC ou de modelos, nem interrupções fora do nosso controle razoável.",
      ],
    },
    {
      heading: "8. Alterações",
      paragraphs: [
        "Podemos atualizar estes termos. O uso continuado após a publicação das mudanças implica aceitação. Se não concordar, deixe de usar o serviço e cancele o plano.",
      ],
    },
    {
      heading: "9. Contato",
      paragraphs: [
        "Dúvidas legais ou comerciais: formulário em /contact ou suporte do painel (tickets).",
      ],
    },
  ],
};

const privacyPt: LegalDoc = {
  title: "Política de privacidade",
  updated: "Última atualização: 27 de agosto de 2026",
  intro:
    "Esta política descreve como o Set-Api trata dados pessoais quando você usa o site, a API e o painel.",
  sections: [
    {
      heading: "1. Responsável",
      paragraphs: [
        "Set-Api — contato pelo formulário em /contact ou suporte do painel.",
      ],
    },
    {
      heading: "2. Dados que tratamos",
      bullets: [
        "Conta: nome, email, hash de senha, plano, preferências (tema, idioma) e dados da organização.",
        "Operação: CUITs vinculados, pontos de venda informados, comprovantes de delegação (p. ex. F.3283/E) quando você os compartilha, API Keys (armazenadas com segurança; segredo completo não é exposto após a emissão), uso/metering, comprovantes emitidos e dados de onboarding/KYC quando couber.",
        "Suporte: mensagens de tickets e formulários de contato.",
        "Pagamentos: dados de faturamento do ciclo; se usarmos gateways (p. ex. MercadoPago), os dados do cartão são processados pelo provedor.",
      ],
    },
    {
      heading: "3. Finalidades",
      bullets: [
        "Prestar o serviço (API, painel, keys, metering, faturamento do plano).",
        "Segurança, prevenção de abuso, suporte e melhoria do produto.",
        "Cumprir obrigações legais e de faturamento.",
        "Quando você usa funções assistidas por IA, processar o necessário para gerar essas assistências.",
      ],
    },
    {
      heading: "4. Base e conservação",
      paragraphs: [
        "Tratamos dados para executar o contrato de serviço e, quando couber, com o seu consentimento. Conservamos a conta enquanto estiver ativa e por prazos adicionais razoáveis por segurança, reclamações ou requisitos legais.",
      ],
    },
    {
      heading: "5. Encarregados / terceiros",
      paragraphs: [
        "Podemos usar provedores de hosting, banco de dados, email, KYC (p. ex. Didit), gateways de pagamento, o gateway ARCA e modelos de inteligência artificial (p. ex. para assistências no produto). Recebem apenas o necessário para a função. As saídas de IA não substituem a sua verificação de comprovantes, CUITs nem obrigações fiscais.",
      ],
    },
    {
      heading: "6. Seus direitos",
      paragraphs: [
        "Você pode pedir acesso, correção ou exclusão da conta pelo formulário de contato ou suporte do painel.",
      ],
    },
    {
      heading: "7. Cookies e armazenamento local",
      paragraphs: [
        "Usamos cookies de sessão (p. ex. refresh) para mantê-lo logado e armazenamento local para tema e idioma. Não vendemos dados pessoais.",
      ],
    },
    {
      heading: "8. Alterações",
      paragraphs: [
        "Podemos atualizar esta política. A data de “última atualização” indica a versão vigente.",
      ],
    },
  ],
};

const TERMS: Record<Locale, LegalDoc> = {
  es: termsEs,
  en: termsEn,
  pt: termsPt,
};

const PRIVACY: Record<Locale, LegalDoc> = {
  es: privacyEs,
  en: privacyEn,
  pt: privacyPt,
};

export function getTermsDoc(locale: Locale): LegalDoc {
  return TERMS[locale] ?? TERMS.es;
}

export function getPrivacyDoc(locale: Locale): LegalDoc {
  return PRIVACY[locale] ?? PRIVACY.es;
}
