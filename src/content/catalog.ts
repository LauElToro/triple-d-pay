export const WEB_SERVICE_SLUGS = [
  "facturacion-electronica",
  "comprobantes-turismo",
  "factura-exportacion",
  "padron",
  "constatacion-comprobantes",
  "carta-porte",
  "remito-carnico",
  "factura-mipyme",
  "web-service-generico",
] as const;

export const AUTOMATION_SLUGS = [
  "mis-comprobantes",
  "monotributo",
  "certificado-desarrollo",
  "certificado-produccion",
  "autorizar-ws-desarrollo",
  "autorizar-ws-produccion",
  "delegar-ws",
  "aceptar-delegacion",
  "administracion-certificados",
  "domicilio-fiscal-electronico",
  "mis-retenciones",
  "crear-punto-venta",
  "listar-puntos-venta",
  "nuestra-parte",
  "ccma",
  "mis-facilidades",
] as const;

export const TOOL_SLUGS = [
  "constatar-cae",
  "calculadora-precio",
  "generar-certificado",
  "constancia-inscripcion",
] as const;

export const INTEGRATION_SLUGS = [
  "javascript",
  "api-rest",
  "php",
  "python",
  "ruby",
  "java",
  "dotnet",
  "flutter",
  "golang",
  "n8n",
  "make",
  "bubble",
  "zapier",
  "pipedream",
] as const;

export type WebServiceSlug = (typeof WEB_SERVICE_SLUGS)[number];
export type AutomationSlug = (typeof AUTOMATION_SLUGS)[number];
export type ToolSlug = (typeof TOOL_SLUGS)[number];
export type IntegrationSlug = (typeof INTEGRATION_SLUGS)[number];

export function catalogKey(
  kind: "ws" | "auto" | "tool" | "integration",
  slug: string,
  field: "title" | "desc" | "body" | "howto" | "requirements",
) {
  return `catalog.${kind}.${slug}.${field}`;
}

export const PLATFORM_STATS = {
  requests: "24.267.381",
  cuits: "4.238",
} as const;

export const QUICKSTART_CODE = `import { SetApi } from "@set-api/sdk";

const api = new SetApi({
  apiKey: process.env.SET_API_KEY!,
});

// Factura A — cbteTipo 1 (WSFE). cuit_emisor opcional si está en la org.
// ptoVta: usá 2 o 10 según tu delegación ARCA (Monotributo suele usar PV 2).
const result = await api.comprobantes.create({
  cbteTipo: 1,
  ptoVta: 2,
  concepto: 1,
  docTipo: 99,
  docNro: 0,
  cbteFch: "20260805",
  impTotal: 1210,
  impNeto: 1000,
  impIVA: 210,
  iva: [{ id: 5, baseImp: 1000, importe: 210 }],
});

console.log(result);`;

export const AUTOMATION_SAMPLE_CODE = `import { SetApi } from "@set-api/sdk";

const api = new SetApi({ apiKey: process.env.SET_API_KEY! });

// Último comprobante emitido en el punto de venta
const ultimo = await api.comprobantes.ultimo(1, 2);

// Padrón + constancia del receptor
const padron = await api.contribuyente.get("30123456789");`;
