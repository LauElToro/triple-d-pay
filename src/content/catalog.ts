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
  field: "title" | "desc" | "body",
) {
  return `catalog.${kind}.${slug}.${field}`;
}

export const PLATFORM_STATS = {
  requests: "24.267.381",
  cuits: "4.238",
} as const;

export const QUICKSTART_CODE = `import { SetApi } from "@set-api/sdk";

const api = new SetApi({ apiKey: process.env.SET_API_KEY });

await api.invoices.create({
  cuit: "30-71234567-8",
  tipo: "FC_A",
  items: [{ descripcion: "Servicio", total: 155364 }],
});`;

export const AUTOMATION_SAMPLE_CODE = `import { SetApi } from "@set-api/sdk";

const api = new SetApi({ apiKey: process.env.SET_API_KEY });

const result = await api.automations.run("mis-comprobantes", {
  cuit: "30123456789",
  filters: { tipo: "E", fechaEmision: "01/01/2026 - 31/01/2026" },
});

console.log(result);`;
