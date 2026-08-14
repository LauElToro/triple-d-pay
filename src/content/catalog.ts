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

export const QUICKSTART_CODE = `curl -X POST https://set-api-backend.vercel.app/api/arca/comprobantes \\
  -H "Authorization: Bearer $SET_API_KEY" \\
  -H "Idempotency-Key: invoice-unique-id" \\
  -H "Content-Type: application/json" \\
  -d '{"cuit_emisor":"20111111112","cbteTipo":11,"ptoVta":10,"concepto":1,"docTipo":99,"docNro":0,"cbteFch":"20260814","impTotal":121,"impNeto":100,"impIVA":21}'`;

export const AUTOMATION_SAMPLE_CODE = `curl https://set-api-backend.vercel.app/api/arca/comprobantes/ultimo/11/10 \\
  -H "Authorization: Bearer $SET_API_KEY"`;
