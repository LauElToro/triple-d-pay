import type { Locale } from "@/lib/i18n/types";

/** Example-only data (never use real taxpayer identifiers in docs). */
export const DELEGATION_EXAMPLE = {
  clientName: "Acme Ejemplo S.A.",
  clientCuit: "30-71234567-8",
  providerName: "Set Api Demo S.A.",
  providerCuit: "30-70987654-3",
  posNumber: "00001",
  posApi: "1",
  computerAlias: "set-api-prod-01",
  adminName: "Persona administradora de ejemplo",
} as const;

export type GuideStep = {
  title: string;
  lead?: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
  warn?: string;
  table?: { headers: string[]; rows: string[][] };
};

export type DelegationGuide = {
  title: string;
  eyebrow: string;
  subtitle: string;
  updated: string;
  exampleBadge: string;
  importantTitle: string;
  important: string[];
  orderTitle: string;
  order: string[];
  exchangeTitle: string;
  exchangeIntro: string;
  exchangeProviderTitle: string;
  exchangeProvider: string[];
  exchangeClientTitle: string;
  exchangeClient: string[];
  exampleTitle: string;
  exampleLines: string[];
  servicesTitle: string;
  servicesIntro: string;
  servicesTable: { headers: string[]; rows: string[][] };
  servicesRecommended: string[];
  servicesRecommendedTitle: string;
  servicesNotes: string[];
  partATitle: string;
  partAIntro: string;
  partASteps: GuideStep[];
  partBTitle: string;
  partBIntro: string;
  partBSteps: GuideStep[];
  checklistClientTitle: string;
  checklistClient: string[];
  checklistProviderTitle: string;
  checklistProvider: string[];
  verifyTitle: string;
  verifyIntro: string;
  verify: string[];
  verifyNote: string;
  troubleshootTitle: string;
  troubleshoot: { title: string; bullets: string[] }[];
  revokeTitle: string;
  revokeClient: string[];
  revokeProvider: string[];
  requestTitle: string;
  requestBody: string[];
};

const es: DelegationGuide = {
  title: "Delegación de Web Services ARCA",
  eyebrow: "Guía operativa · Producción",
  subtitle:
    "Manual paso a paso para que un cliente autorice a Set-Api a operar un Web Service de ARCA en su nombre. Incluye lo que hace el cliente (Parte A) y lo que hace Set-Api (Parte B).",
  updated: "Última revisión: 27 de agosto de 2026",
  exampleBadge: "Todos los CUIT, razones sociales y nombres de esta página son de ejemplo",
  importantTitle: "Importante antes de empezar",
  important: [
    "La delegación se usa en producción. En homologación no se delega desde el Administrador de Relaciones: se crea una autorización en WSASS para el alias, CUIT representado y servicio.",
    "Una habilitación productiva tiene este orden (punto de venta primero): PV Web Services → delegación del cliente → aceptación Set-Api → asignación al Computador Fiscal.",
    "Sin PV tipo RECE / Web Services la API no puede emitir aunque la delegación esté perfecta. Por eso el cliente completa el PV antes de la relación.",
    "Si falta cualquiera de las etapas de delegación (aceptar o asignar computador), ARCA puede responder: “Computador no autorizado a acceder al servicio”.",
    "Cada servicio se delega individualmente. Delegar Facturación Electrónica no habilita WSFEX, WSCDC, Carta de Porte ni otros servicios.",
  ],
  orderTitle: "Orden obligatorio de una habilitación productiva",
  order: [
    "Cliente adhiere Puntos de venta (si no ve la empresa) y da de alta el PV Web Services.",
    "Cliente delega el servicio al CUIT de Set-Api.",
    "Set-Api acepta la designación.",
    "Set-Api asigna el servicio al Computador Fiscal / certificado.",
    "Set-Api configura el CUIT y los servicios en la organización / API Key y verifica con una consulta sin efectos.",
  ],
  exchangeTitle: "Datos que deben intercambiarse",
  exchangeIntro:
    "Set-Api informa al cliente los datos del representante. El cliente informa los datos del representado, el PV y las constancias. En operación real usá tus datos; acá solo hay ejemplos.",
  exchangeProviderTitle: "Set-Api informa al cliente",
  exchangeProvider: [
    "Razón social del proveedor.",
    "CUIT de Set-Api / proveedor (representante).",
    "Nombre exacto de cada Web Service solicitado.",
    "Ambiente: producción.",
    "Fecha y responsable de la solicitud.",
  ],
  exchangeClientTitle: "El cliente informa a Set-Api",
  exchangeClient: [
    "Razón social.",
    "CUIT representado (empresa emisora).",
    "Número de punto de venta Web Services (obligatorio, ej. 00001 / 00002).",
    "Constancia del PV (sistema RECE / Web Services).",
    "Servicios delegados.",
    "Nombre y contacto del Administrador de Relaciones.",
    "Constancia F.3283/E de cada delegación.",
  ],
  exampleTitle: "Plantilla de ejemplo",
  exampleLines: [
    `CUIT representado (cliente): ${DELEGATION_EXAMPLE.clientCuit}`,
    `Razón social: ${DELEGATION_EXAMPLE.clientName}`,
    `Punto de venta Web Services (número) — OBLIGATORIO: ${DELEGATION_EXAMPLE.posNumber}`,
    `En API se usa ptoVta: ${DELEGATION_EXAMPLE.posApi}`,
    `CUIT representante (Set-Api): ${DELEGATION_EXAMPLE.providerCuit}`,
    `Razón social proveedor: ${DELEGATION_EXAMPLE.providerName}`,
    "Servicios:",
    "  - Facturación Electrónica (wsfe)",
    "  - Consulta a Padrón Alcance 13",
    "  - Consulta a Padrón Constancia de Inscripción",
    `Administrador de Relaciones: ${DELEGATION_EXAMPLE.adminName}`,
    "Fecha: 2026-08-27",
  ],
  servicesTitle: "Servicios bajo ARCA → WebServices",
  servicesIntro:
    "En el buscador de servicios la navegación es siempre: ARCA → WebServices → <nombre del servicio>. No elegir otro organismo. No se habilitan todos de una vez: una relación por cada servicio.",
  servicesTable: {
    headers: ["Si necesitan…", "Marcar en pantalla (aprox.)", "ID técnico"],
    rows: [
      ["Emitir facturas A/B/C, NC, ND, FCE", "Facturación Electrónica", "wsfe"],
      ["Facturas de exportación", "Factura Electrónica de exportación", "wsfex"],
      ["Validar CAE de comprobantes recibidos", "Constatación de Comprobantes (WSCDCV1)", "wscdc"],
      ["Consultar datos de un CUIT (padrón)", "Consulta a Padrón Alcance 13", "ws_sr_padron_a13"],
      [
        "Condición IVA / impuestos / constancia",
        "Consulta a Padrón Constancia de Inscripción",
        "ws_sr_constancia_inscripcion",
      ],
      ["Comprobantes de turismo", "Web Service Turismo / Comprobantes de Turismo", "wsct"],
      ["Carta de porte electrónica", "Carta de Porte Electrónica (WSCPE)", "wscpe"],
      ["Remito electrónico cárnico", "Remito Electrónico Cárnico", "wsremcarne"],
    ],
  },
  servicesRecommended: [
    "Marcar Facturación Electrónica (wsfe) → confirmar esa relación.",
    "Volver a Nueva Relación y marcar Consulta a Padrón Alcance 13.",
    "Volver a Nueva Relación y marcar Consulta a Padrón Constancia de Inscripción.",
    "Agregar los demás solo si el cliente los usa (exportación, constatación, turismo, CPE, remito).",
  ],
  servicesRecommendedTitle: "Recomendado para el uso típico de Set-Api",
  servicesNotes: [
    "Padrón A13 y Constancia están en el mismo aplicativo ARCA / WebServices que Facturación Electrónica; no buscarlos en otro organismo.",
    "No elegir el antiguo Alcance 5 (ws_sr_padron_a5): está deprecado.",
    "Los rótulos de la UI pueden variar; confirmar por la descripción o el ID técnico.",
    "Si no aparece bajo ARCA → WebServices, revisar filtros o permisos de Administrador de Relaciones.",
  ],
  partATitle: "Parte A — Lo que debe hacer el cliente",
  partAIntro:
    "Esta parte la realiza el Administrador o Subadministrador de Relaciones del CUIT que será representado. Orden obligatorio: primero el punto de venta, después la relación (delegación). No empezar por Nueva Relación si todavía no hay PV Web Services.",
  partASteps: [
    {
      title: "Paso 1 — Ingresar a ARCA",
      bullets: [
        "Abrir https://www.arca.gob.ar/.",
        "Presionar Iniciar sesión.",
        "Ingresar CUIT/CUIL/CDI personal y Clave Fiscal.",
        "Verificar que la cuenta tenga Clave Fiscal nivel 3 (o superior). Es el nivel mínimo para administrar relaciones, delegar Web Services y operar puntos de venta.",
      ],
      warn:
        "Sin nivel 3 no podrá completar el PV ni la delegación. Si tiene nivel 1 o 2, elevarlo antes de seguir.",
      paragraphs: [
        "Opciones oficiales para obtener o elevar la clave: App ARCA Móvil (Herramientas → Solicitud y/o recupero de clave fiscal), homebanking del banco, o turno presencial con DNI y Formulario 206. Guía oficial de ARCA: Obtener la Clave Fiscal.",
      ],
    },
    {
      title: "Paso 2 — Adherir Puntos de venta (si la empresa no aparece)",
      lead:
        "Si al abrir Gestión de puntos de venta el CUIT de la empresa no figura en “Seleccione la Empresa a representar”, primero hay que adherir el servicio.",
      bullets: [
        "Abrir Administrador de Relaciones de Clave Fiscal.",
        "Elegir como representado el CUIT de la empresa emisora (no la persona física).",
        "Adherir Servicio.",
        "Buscar Administración de puntos de venta y domicilios (o “PVE - Gestión de puntos de venta”).",
        "Adherirlo para la empresa emisora.",
        "Volver a Mis Servicios → abrir de nuevo Puntos de venta.",
      ],
      note:
        "Delegar Web Services no habilita PVE. Son permisos distintos. Si el selector solo muestra la persona física u otra SA, no continuar con Factura en Línea de otra empresa.",
    },
    {
      title: "Paso 3 — Alta del punto de venta Web Services",
      lead:
        "Obligatorio antes de la relación. Sin este PV, Set-Api no puede obtener CAE.",
      bullets: [
        "Mis Servicios → Administración de puntos de venta y domicilios.",
        "Seleccione la Empresa a representar → CUIT de la empresa emisora.",
        "A/B/M de puntos de venta → Agregar.",
      ],
      table: {
        headers: ["Campo", "Valor"],
        rows: [
          [
            "Número",
            `El que asigne ARCA (ej. ${DELEGATION_EXAMPLE.posNumber}) — obligatorio informar a Set-Api`,
          ],
          ["Domicilio", "Domicilio fiscal/comercial de la empresa en ARCA"],
          ["Actividad", "Actividad principal con la que facturan"],
          [
            "Sistema",
            "RECE para aplicativo y Web Services (RI). Si es Monotributo: Factura Electrónica - Monotributo - Web Services.",
          ],
        ],
      },
      paragraphs: [
        `Confirmar, descargar la constancia y anotar el número de PV. Enviar a Set-Api el número exacto (ej. ${DELEGATION_EXAMPLE.posNumber} → en API se usa ptoVta: ${DELEGATION_EXAMPLE.posApi}).`,
        "El número de PV es obligatorio. Sin ese dato no se puede configurar ni emitir. “Tengo un PV” no alcanza: hay que pasar el número concreto.",
      ],
      note: `Correcto en la constancia: Sistema “RECE para aplicativo y web services”. Incorrecto para la API (hay que modificar o crear otro PV): “Factura en Línea - Responsable Inscripto”.`,
      warn:
        "Si en Sistema solo aparece Remito u otras opciones: revisar domicilio y actividad de la empresa, guardar y reabrir el formulario.",
    },
    {
      title: "Paso 4 — Abrir Administrador de Relaciones (para delegar)",
      lead: "Recién ahora se inicia la relación / delegación.",
      bullets: [
        "Buscar Administrador de Relaciones de Clave Fiscal.",
        "Abrir el servicio.",
        "En el selector de representados, elegir la empresa/cliente correcto.",
      ],
      warn:
        "No elegir por error a la persona física administradora. La pantalla debe mostrar el CUIT de la empresa que delegará el Web Service.",
    },
    {
      title: "Paso 5 — Iniciar una nueva relación",
      bullets: [
        "Seleccionar Nueva Relación.",
        "Revisar que el Representado sea el CUIT del cliente.",
        "En Servicio, presionar Buscar.",
      ],
    },
    {
      title: "Paso 6 — Elegir el servicio",
      paragraphs: [
        "Navegación: ARCA → WebServices → <nombre del servicio>. Abrir el ícono / agrupación ARCA (ex AFIP). Marcar solo el servicio que desean habilitar en esa relación.",
      ],
      note:
        "Ver la tabla de servicios más arriba. Uso típico del gateway Set-Api: wsfe + padrón A13 + constancia de inscripción.",
    },
    {
      title: "Paso 7 — Designar a Set-Api",
      bullets: [
        "En Representante, presionar Buscar.",
        "Elegir la opción para ingresar CUIT/CUIL/CDI.",
        `Escribir el CUIT de Set-Api/proveedor, sin guiones (ejemplo de documentación: ${DELEGATION_EXAMPLE.providerCuit.replace(/-/g, "")}).`,
        "Presionar Buscar.",
        "Verificar que ARCA muestre la razón social correcta.",
        "Seleccionar ese representante.",
      ],
      warn:
        "No elegir un Computador Fiscal del cliente: se está tercerizando el servicio y el representante debe ser el CUIT de Set-Api.",
    },
    {
      title: "Paso 8 — Confirmar",
      lead: "Antes de confirmar, revisar:",
      bullets: [
        "Representado: CUIT del cliente.",
        "Servicio: Web Service solicitado.",
        "Representante: CUIT de Set-Api.",
        "Presionar Confirmar (y confirmar nuevamente si ARCA presenta revisión).",
        "Descargar o imprimir la constancia F.3283/E.",
        "Enviar la constancia a Set-Api, junto con el número de PV del Paso 3.",
      ],
    },
    {
      title: "Paso 9 — Repetir por cada servicio",
      paragraphs: [
        "Volver a Nueva Relación y repetir los pasos 5 a 8 para cada WSN que quieran habilitar. ARCA genera una relación y constancia separada por servicio.",
        "Ejemplo: si el cliente pide facturar y consultar CUIT, deben quedar al menos tres relaciones: Facturación Electrónica, Padrón Alcance 13 y Constancia de Inscripción.",
      ],
    },
  ],
  partBTitle: "Parte B — Lo que debe hacer Set-Api",
  partBIntro:
    "Esta parte la realiza el Administrador de Relaciones del CUIT que recibió la delegación. Aceptar la designación todavía no habilita el backend: falta asignarla a un Computador Fiscal y configurar la cuenta del cliente.",
  partBSteps: [
    {
      title: "Paso 10 — Aceptar la designación",
      bullets: [
        "Ingresar a ARCA con Clave Fiscal.",
        "Abrir Administrador de Relaciones de Clave Fiscal.",
        "Seleccionar el CUIT de Set-Api como representado.",
        "Abrir Aceptación de Designación / Designaciones pendientes (según la interfaz vigente).",
        "Buscar la relación enviada por el CUIT cliente.",
        "Verificar CUIT del cliente, servicio delegado y fecha de designación.",
        "Presionar Aceptar, guardar la constancia y repetir para todos los servicios.",
      ],
      warn:
        "Aceptar la designación todavía no habilita el backend. Falta asignarla a un Computador Fiscal.",
    },
    {
      title: "Paso 11 — Elegir el cliente como representado",
      bullets: [
        "Volver al menú principal del Administrador de Relaciones.",
        "Seleccionar Nueva Relación.",
        "En Representado, elegir el CUIT del cliente.",
      ],
      note:
        "Después de aceptar, el CUIT del cliente debe aparecer entre los representados. Si no aparece: cerrar sesión y volver a entrar, verificar que la designación fue aceptada, confirmar que el cliente delegó al CUIT correcto de Set-Api.",
    },
    {
      title: "Paso 12 — Seleccionar el servicio delegado",
      bullets: [
        "Presionar Buscar en Servicio.",
        "La lista debe mostrar únicamente los servicios que el cliente autorizó a Set-Api.",
        "Seleccionar el servicio correspondiente.",
      ],
      note:
        "Si el servicio no aparece: el cliente delegó otro servicio, la designación sigue pendiente, se eligió otro CUIT representado, o la relación fue revocada.",
    },
    {
      title: "Paso 13 — Asignar el Computador Fiscal",
      bullets: [
        "En Representante, presionar Buscar.",
        "Seleccionar el Computador Fiscal asociado al certificado productivo que usa el gateway.",
        "No ingresar otro CUIT: una subdelegación no puede continuar hacia una tercera empresa.",
        `Confirmar el alias/nombre del computador (ejemplo: ${DELEGATION_EXAMPLE.computerAlias}).`,
      ],
    },
    {
      title: "Paso 14 — Confirmar la subdelegación",
      lead: "Revisar:",
      bullets: [
        "Representado: CUIT del cliente.",
        "Servicio: WSN delegado.",
        "Representante: computador/certificado Set-Api.",
        "Presionar Confirmar (y la pantalla final).",
        "Descargar la constancia F.3283/E.",
        "Repetir por cada servicio y cliente.",
      ],
    },
    {
      title: "Paso 15 — Configurar el cliente en Set-Api",
      paragraphs: [
        "Se asocia el CUIT y los servicios autorizados a la organización / API Key del cliente en el panel Set-Api (grants de CUIT y scopes).",
        "Luego se valida con una consulta sin efectos (por ejemplo puntos de venta o padrón) antes de emitir comprobantes.",
      ],
    },
  ],
  checklistClientTitle: "Checklist del cliente",
  checklistClient: [
    "Entró como administrador del CUIT correcto",
    "Adhirió Puntos de venta para la empresa (si no aparecía en el selector)",
    "Dio de alta PV con RECE para aplicativo y Web Services",
    "Envió a Set-Api el número de PV (ej. 00001 / 00002) — obligatorio",
    "Seleccionó al cliente como representado",
    "Marcó el servicio correcto en ARCA → WebServices",
    "Ingresó el CUIT correcto de Set-Api",
    "Confirmó la relación",
    "Guardó F.3283/E",
    "Repitió el circuito para cada servicio a habilitar",
    "Avisó a Set-Api que las designaciones están pendientes de aceptación",
  ],
  checklistProviderTitle: "Checklist de Set-Api",
  checklistProvider: [
    "Recibió número de PV Web Services y constancia del cliente",
    "Aceptó cada designación",
    "El cliente aparece como representado",
    "Seleccionó el mismo servicio delegado",
    "Asignó el Computador Fiscal productivo correcto",
    "Guardó cada F.3283/E",
    "Configuró CUIT/servicios en la cuenta / API Key",
    "Probó puntos de venta u otra operación sin efectos",
  ],
  verifyTitle: "Parte D — Verificar la delegación",
  verifyIntro: "La delegación está técnicamente correcta cuando:",
  verify: [
    "WSAA entrega un TA para el servicio.",
    "La respuesta no contiene “Computador no autorizado”.",
    "El WSN responde datos o un error funcional de negocio.",
  ],
  verifyNote:
    "Un error funcional de punto de venta, actividad o datos no significa necesariamente que la delegación esté mal: indica que la autenticación fue superada y falta resolver una condición del servicio.",
  troubleshootTitle: "Solución de problemas",
  troubleshoot: [
    {
      title: "La designación no aparece en Set-Api",
      bullets: [
        "Verificar el CUIT representante usado por el cliente.",
        "Confirmar que el cliente presionó Confirmar.",
        "Solicitar la constancia F.3283/E.",
        "Cerrar sesión y volver a ingresar.",
        "Revisar Designaciones pendientes.",
      ],
    },
    {
      title: "El cliente no aparece como representado",
      bullets: [
        "Confirmar que Set-Api aceptó la designación.",
        "Verificar que se ingresó con el Administrador del CUIT Set-Api correcto.",
        "Cerrar sesión y reingresar.",
      ],
    },
    {
      title: "El servicio no aparece al crear la subdelegación",
      bullets: [
        "Seleccionar al cliente como representado.",
        "Confirmar que el cliente delegó exactamente ese WSN.",
        "Revisar que la relación no esté revocada.",
      ],
    },
    {
      title: "“Computador no autorizado a acceder al servicio”",
      bullets: [
        "Certificado de producción contra endpoints de producción.",
        "service / wsid correcto.",
        "Cliente delegó el WSN a Set-Api.",
        "Set-Api aceptó la designación.",
        "Set-Api asignó ese WSN y cliente al computador correcto.",
        "El backend firma con el certificado de ese computador.",
        "El CUIT enviado es el CUIT representado delegado.",
      ],
    },
    {
      title: "La delegación está bien pero ARCA rechaza",
      bullets: [
        "Revisar requisitos de negocio: punto de venta/emisión, régimen y actividad, domicilios, roles registrales, numeración y datos obligatorios.",
      ],
    },
  ],
  revokeTitle: "Revocar una delegación",
  revokeClient: [
    "Ingresar a Administrador de Relaciones.",
    "Seleccionar al cliente como representado.",
    "Abrir Consultar → buscar a Set-Api entre los representantes.",
    "Abrir el detalle de relaciones → Revocar junto al servicio → Confirmar.",
    "Guardar la constancia y repetir por cada servicio.",
  ],
  revokeProvider: [
    "Retirar el CUIT/servicio de la organización / API Key.",
    "Revocar o eliminar la subdelegación al computador si aún figura.",
    "Limpiar el TA del servicio.",
    "Rotar la API Key del cliente si finalizó la relación.",
  ],
  requestTitle: "Solicitud modelo para enviar al cliente",
  requestBody: [
    "Asunto: Delegación de Web Service ARCA a Set-Api",
    "",
    "Solicitamos delegar desde el Administrador de Relaciones de Clave Fiscal:",
    "",
    `Representado: ${DELEGATION_EXAMPLE.clientName} — CUIT ${DELEGATION_EXAMPLE.clientCuit}`,
    `Representante: ${DELEGATION_EXAMPLE.providerName} — CUIT ${DELEGATION_EXAMPLE.providerCuit}`,
    "",
    "Servicios:",
    "- Facturación Electrónica",
    "- Consulta a Padrón Alcance 13",
    "- Consulta a Padrón Constancia de Inscripción",
    "",
    "Por cada servicio:",
    "1. Ingresar como Administrador de Relaciones del cliente.",
    "2. Nueva Relación.",
    "3. Buscar el servicio dentro de Web Services.",
    "4. Seleccionar como representante el CUIT de Set-Api.",
    "5. Confirmar.",
    "6. Enviar la constancia F.3283/E y el número de PV Web Services.",
    "",
    "La delegación debe realizarse una vez por cada servicio.",
  ],
};

/** EN/PT: same structure, full operational detail. */
const en: DelegationGuide = {
  ...es,
  title: "ARCA Web Service delegation",
  eyebrow: "Operations guide · Production",
  subtitle:
    "Step-by-step manual so a customer can authorize Set-Api to operate an ARCA Web Service on their behalf. Covers customer steps (Part A) and Set-Api steps (Part B).",
  updated: "Last reviewed: August 27, 2026",
  exampleBadge: "All CUITs, legal names and people on this page are examples only",
  importantTitle: "Before you start",
  important: [
    "Delegation is for production. Homologation does not use the Relationships Administrator the same way (WSASS authorization).",
    "Production enablement order (POS first): Web Services POS → customer delegation → Set-Api acceptance → Fiscal Computer assignment.",
    "Without a RECE / Web Services POS the API cannot issue even if delegation is perfect.",
    "If acceptance or Fiscal Computer assignment is missing, ARCA may respond: “Computer not authorized to access the service”.",
    "Each service is delegated individually.",
  ],
  orderTitle: "Required production order",
  order: [
    "Customer attaches Points of Sale (if company missing) and creates Web Services POS.",
    "Customer delegates the service to Set-Api’s CUIT.",
    "Set-Api accepts the designation.",
    "Set-Api assigns the service to the Fiscal Computer / certificate.",
    "Set-Api configures CUIT/services on the organization / API Key and verifies with a no-side-effect call.",
  ],
  exchangeTitle: "Data to exchange",
  exchangeIntro:
    "Set-Api shares representative data; the customer shares represented data, POS and certificates. Use real data in ARCA; examples only below.",
  exchangeProviderTitle: "Set-Api tells the customer",
  exchangeProvider: es.exchangeProvider.map((s) =>
    s
      .replace("Razón social del proveedor.", "Provider legal name.")
      .replace("CUIT de Set-Api / proveedor (representante).", "Set-Api / provider CUIT (representative).")
      .replace("Nombre exacto de cada Web Service solicitado.", "Exact name of each requested Web Service.")
      .replace("Ambiente: producción.", "Environment: production.")
      .replace("Fecha y responsable de la solicitud.", "Request date and owner."),
  ),
  exchangeClientTitle: "Customer tells Set-Api",
  exchangeClient: [
    "Legal name.",
    "Represented CUIT (issuer company).",
    "Web Services POS number (required, e.g. 00001 / 00002).",
    "POS certificate (RECE / Web Services system).",
    "Delegated services.",
    "Relationships Administrator name and contact.",
    "F.3283/E certificate for each delegation.",
  ],
  exampleTitle: "Example template",
  exampleLines: [
    `Represented CUIT (customer): ${DELEGATION_EXAMPLE.clientCuit}`,
    `Legal name: ${DELEGATION_EXAMPLE.clientName}`,
    `Web Services POS (number) — REQUIRED: ${DELEGATION_EXAMPLE.posNumber}`,
    `API uses ptoVta: ${DELEGATION_EXAMPLE.posApi}`,
    `Representative CUIT (Set-Api): ${DELEGATION_EXAMPLE.providerCuit}`,
    `Provider legal name: ${DELEGATION_EXAMPLE.providerName}`,
    "Services:",
    "  - Electronic Invoicing (wsfe)",
    "  - Padron A13",
    "  - Registration certificate padron",
    `Relationships Administrator: ${DELEGATION_EXAMPLE.adminName}`,
    "Date: 2026-08-27",
  ],
  servicesTitle: "Services under ARCA → WebServices",
  servicesIntro:
    "Always navigate: ARCA → WebServices → <service name>. One relationship per service.",
  servicesTable: {
    headers: ["If you need…", "Select (approx.)", "Technical ID"],
    rows: es.servicesTable.rows,
  },
  servicesRecommended: [
    "Select Electronic Invoicing (wsfe) → confirm.",
    "New Relationship → Padron A13.",
    "New Relationship → Registration certificate padron.",
    "Add others only if needed (export, verification, tourism, CPE, meat remito).",
  ],
  servicesRecommendedTitle: "Recommended for typical Set-Api usage",
  servicesNotes: [
    "A13 and Registration certificate live under the same ARCA / WebServices app as invoicing.",
    "Do not use deprecated Padron A5.",
    "UI labels may vary; confirm by description or technical ID.",
  ],
  partATitle: "Part A — Customer steps",
  partAIntro:
    "Done by the Relationships Administrator of the represented CUIT. Order: POS first, then delegation. Do not start New Relationship without a Web Services POS.",
  partASteps: [
    {
      title: "Step 1 — Sign in to ARCA",
      bullets: [
        "Open https://www.arca.gob.ar/.",
        "Press Sign in.",
        "Enter personal CUIT/CUIL/CDI and Fiscal Key.",
        "Confirm Fiscal Key level 3 (or higher). Minimum to manage relationships, delegate Web Services and operate POS.",
      ],
      warn: "Without level 3 you cannot complete POS or delegation. Raise the level before continuing.",
      paragraphs: [
        "Official options: ARCA Móvil app, bank homebanking, or in-person appointment with ID and Form 206.",
      ],
    },
    {
      title: "Step 2 — Attach Points of Sale (if company missing)",
      lead: "If the company CUIT is missing from “Select company to represent”, attach the service first.",
      bullets: [
        "Open Fiscal Key Relationships Administrator.",
        "Choose the issuer company CUIT as represented (not the person).",
        "Attach Service.",
        "Find Points of Sale and addresses administration (or “PVE”).",
        "Attach it for the issuer company.",
        "Return to My Services → open Points of Sale again.",
      ],
      note: "Delegating Web Services does not enable PVE. They are different permissions.",
    },
    {
      title: "Step 3 — Create Web Services POS",
      lead: "Required before the relationship. Without this POS, Set-Api cannot obtain CAE.",
      bullets: [
        "My Services → Points of Sale and addresses administration.",
        "Select company to represent → issuer company CUIT.",
        "A/B/M of points of sale → Add.",
      ],
      table: {
        headers: ["Field", "Value"],
        rows: [
          [
            "Number",
            `Assigned by ARCA (e.g. ${DELEGATION_EXAMPLE.posNumber}) — required to send to Set-Api`,
          ],
          ["Address", "Company fiscal/commercial address in ARCA"],
          ["Activity", "Main activity used for invoicing"],
          [
            "System",
            "RECE for aplicativo and Web Services (RI). Monotributo: Factura Electrónica - Monotributo - Web Services.",
          ],
        ],
      },
      paragraphs: [
        `Confirm, download the certificate and note the POS number. Send Set-Api the exact number (e.g. ${DELEGATION_EXAMPLE.posNumber} → API uses ptoVta: ${DELEGATION_EXAMPLE.posApi}).`,
        "The POS number is mandatory. “I have a POS” is not enough without the concrete number.",
      ],
      note: `Correct on certificate: System “RECE para aplicativo y web services”. Incorrect for the API: “Factura en Línea - Responsable Inscripto”.`,
      warn: "If System only shows Remito or other options: check address and activity, save and reopen the form.",
    },
    {
      title: "Step 4 — Open Relationships Administrator",
      lead: "Only now start the relationship / delegation.",
      bullets: [
        "Find Fiscal Key Relationships Administrator.",
        "Open the service.",
        "In represented selector, choose the correct company/customer.",
      ],
      warn: "Do not pick the administrator person by mistake. The screen must show the company CUIT that will delegate.",
    },
    {
      title: "Step 5 — Start a new relationship",
      bullets: [
        "Select New Relationship.",
        "Confirm Represented is the customer CUIT.",
        "Under Service, press Search.",
      ],
    },
    {
      title: "Step 6 — Choose the service",
      paragraphs: [
        "Navigate: ARCA → WebServices → <service name>. Open the ARCA group and mark only the service for that relationship.",
      ],
      note: "See the services table above. Typical Set-Api gateway: wsfe + padron A13 + registration certificate.",
    },
    {
      title: "Step 7 — Designate Set-Api",
      bullets: [
        "Under Representative, press Search.",
        "Choose enter CUIT/CUIL/CDI.",
        `Type Set-Api/provider CUIT without dashes (docs example: ${DELEGATION_EXAMPLE.providerCuit.replace(/-/g, "")}).`,
        "Press Search.",
        "Confirm ARCA shows the correct legal name.",
        "Select that representative.",
      ],
      warn: "Do not choose a customer Fiscal Computer: the representative must be Set-Api’s CUIT.",
    },
    {
      title: "Step 8 — Confirm",
      lead: "Before confirming, review:",
      bullets: [
        "Represented: customer CUIT.",
        "Service: requested Web Service.",
        "Representative: Set-Api CUIT.",
        "Press Confirm (and confirm again if ARCA shows a review).",
        "Download or print F.3283/E.",
        "Send the certificate to Set-Api with the POS number from Step 3.",
      ],
    },
    {
      title: "Step 9 — Repeat per service",
      paragraphs: [
        "Return to New Relationship and repeat steps 5–8 for each WSN. ARCA creates a separate relationship and certificate per service.",
        "Example: invoicing + CUIT lookup needs at least three relationships: Electronic Invoicing, Padron A13 and Registration certificate.",
      ],
    },
  ],
  partBTitle: "Part B — Set-Api steps",
  partBIntro:
    "Done by Set-Api’s Relationships Administrator. Accepting is not enough: assign the Fiscal Computer and configure the customer account.",
  partBSteps: [
    {
      title: "Step 10 — Accept the designation",
      bullets: [
        "Sign in to ARCA with Fiscal Key.",
        "Open Fiscal Key Relationships Administrator.",
        "Select Set-Api CUIT as represented.",
        "Open Accept Designation / Pending designations.",
        "Find the relationship sent by the customer CUIT.",
        "Verify customer CUIT, delegated service and designation date.",
        "Press Accept, save the certificate and repeat for all services.",
      ],
      warn: "Accepting still does not enable the backend. Fiscal Computer assignment is still required.",
    },
    {
      title: "Step 11 — Select the customer as represented",
      bullets: [
        "Return to the Relationships Administrator main menu.",
        "Select New Relationship.",
        "Under Represented, choose the customer CUIT.",
      ],
      note: "After acceptance the customer CUIT should appear among represented parties. If not: sign out/in, verify acceptance, confirm the customer delegated to the correct Set-Api CUIT.",
    },
    {
      title: "Step 12 — Select the delegated service",
      bullets: [
        "Press Search under Service.",
        "The list should show only services the customer authorized to Set-Api.",
        "Select the matching service.",
      ],
      note: "If missing: wrong service delegated, designation still pending, wrong represented CUIT, or relationship revoked.",
    },
    {
      title: "Step 13 — Assign the Fiscal Computer",
      bullets: [
        "Under Representative, press Search.",
        "Select the Fiscal Computer tied to the production certificate used by the gateway.",
        "Do not enter another CUIT: a sub-delegation cannot continue to a third company.",
        `Confirm the computer alias/name (example: ${DELEGATION_EXAMPLE.computerAlias}).`,
      ],
    },
    {
      title: "Step 14 — Confirm the sub-delegation",
      lead: "Review:",
      bullets: [
        "Represented: customer CUIT.",
        "Service: delegated WSN.",
        "Representative: Set-Api computer/certificate.",
        "Press Confirm (and final screen).",
        "Download F.3283/E.",
        "Repeat per service and customer.",
      ],
    },
    {
      title: "Step 15 — Configure the customer in Set-Api",
      paragraphs: [
        "Associate the CUIT and authorized services to the customer organization / API Key in Set-Api (CUIT grants and scopes).",
        "Validate with a no-side-effect call (e.g. points of sale or padron) before issuing vouchers.",
      ],
    },
  ],
  checklistClientTitle: "Customer checklist",
  checklistClient: [
    "Signed in as admin of the correct CUIT",
    "Attached Points of Sale if company was missing",
    "Created RECE / Web Services POS",
    "Sent POS number to Set-Api (required)",
    "Selected company as represented",
    "Selected correct service under ARCA → WebServices",
    "Entered correct Set-Api CUIT",
    "Confirmed relationship",
    "Saved F.3283/E",
    "Repeated for each service",
    "Notified Set-Api designations are pending",
  ],
  checklistProviderTitle: "Set-Api checklist",
  checklistProvider: [
    "Received POS number and customer certificate",
    "Accepted each designation",
    "Customer appears as represented",
    "Selected the same delegated service",
    "Assigned correct production Fiscal Computer",
    "Saved each F.3283/E",
    "Configured CUIT/services on account / API Key",
    "Tested points of sale or another no-side-effect call",
  ],
  verifyTitle: "Part D — Verify delegation",
  verifyIntro: "Delegation is technically correct when:",
  verify: [
    "WSAA returns a TA for the service.",
    "Response does not contain “Computer not authorized”.",
    "WSN returns data or a functional business error.",
  ],
  verifyNote:
    "A functional POS/activity/data error does not necessarily mean bad delegation: auth already passed.",
  troubleshootTitle: "Troubleshooting",
  troubleshoot: [
    {
      title: "Designation missing for Set-Api",
      bullets: [
        "Check representative CUIT used by customer.",
        "Confirm customer pressed Confirm.",
        "Request F.3283/E.",
        "Sign out/in and check pending designations.",
      ],
    },
    {
      title: "Customer not listed as represented",
      bullets: [
        "Confirm Set-Api accepted the designation.",
        "Confirm login as Set-Api Relationships Admin.",
        "Sign out and back in.",
      ],
    },
    {
      title: "Service missing when sub-delegating",
      bullets: [
        "Select customer as represented.",
        "Confirm exact WSN was delegated.",
        "Check relationship was not revoked.",
      ],
    },
    {
      title: "“Computer not authorized”",
      bullets: [
        "Production certificate vs production endpoints.",
        "Correct service / wsid.",
        "Customer delegated WSN to Set-Api.",
        "Set-Api accepted and assigned Fiscal Computer.",
        "Backend signs with that computer’s certificate.",
        "Request uses the delegated represented CUIT.",
      ],
    },
    {
      title: "Delegation OK but ARCA rejects",
      bullets: [
        "Check business requirements: POS, regime, addresses, roles, numbering, required fields.",
      ],
    },
  ],
  revokeTitle: "Revoke a delegation",
  revokeClient: [
    "Relationships Administrator → represented = customer.",
    "Query → find Set-Api among representatives.",
    "Revoke per service → confirm → save certificate.",
  ],
  revokeProvider: [
    "Remove CUIT/service from organization / API Key.",
    "Revoke Fiscal Computer sub-delegation if still present.",
    "Clear service TA.",
    "Rotate customer API Key if the relationship ended.",
  ],
  requestTitle: "Sample request email to the customer",
  requestBody: [
    "Subject: ARCA Web Service delegation to Set-Api",
    "",
    "Please delegate from the Fiscal Key Relationships Administrator:",
    "",
    `Represented: ${DELEGATION_EXAMPLE.clientName} — CUIT ${DELEGATION_EXAMPLE.clientCuit}`,
    `Representative: ${DELEGATION_EXAMPLE.providerName} — CUIT ${DELEGATION_EXAMPLE.providerCuit}`,
    "",
    "Services:",
    "- Electronic Invoicing",
    "- Padron A13",
    "- Registration certificate padron",
    "",
    "For each service: New Relationship → Web Services → Set-Api CUIT → Confirm → send F.3283/E and Web Services POS number.",
    "Delegate once per service.",
  ],
};

const pt: DelegationGuide = {
  ...en,
  title: "Delegação de Web Services ARCA",
  eyebrow: "Guia operacional · Produção",
  subtitle:
    "Manual passo a passo para o cliente autorizar o Set-Api a operar um Web Service da ARCA em seu nome. Inclui Parte A (cliente) e Parte B (Set-Api).",
  updated: "Última revisão: 27 de agosto de 2026",
  exampleBadge: "Todos os CUIT, razões sociais e nomes nesta página são apenas exemplos",
  importantTitle: "Importante antes de começar",
  partATitle: "Parte A — O que o cliente deve fazer",
  partBTitle: "Parte B — O que o Set-Api deve fazer",
  servicesRecommendedTitle: "Recomendado para o uso típico do Set-Api",
  checklistClientTitle: "Checklist do cliente",
  checklistProviderTitle: "Checklist do Set-Api",
  verifyTitle: "Parte D — Verificar a delegação",
  troubleshootTitle: "Solução de problemas",
  revokeTitle: "Revogar uma delegação",
  requestTitle: "Pedido modelo para enviar ao cliente",
  exchangeTitle: "Dados que devem ser trocados",
  exchangeProviderTitle: "Set-Api informa ao cliente",
  exchangeClientTitle: "O cliente informa ao Set-Api",
  exampleTitle: "Modelo de exemplo",
  servicesTitle: "Serviços em ARCA → WebServices",
  orderTitle: "Ordem obrigatória da habilitação produtiva",
};

const GUIDES: Record<Locale, DelegationGuide> = { es, en, pt };

export function getDelegationGuide(locale: Locale): DelegationGuide {
  return GUIDES[locale] ?? GUIDES.es;
}
