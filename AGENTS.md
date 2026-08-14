# Set-Api — Frontend

App web (TanStack Start) del producto **Set-Api**.

- Branding y copy: **Set-Api**
- Componentes de producto: `src/components/set-api/`
- API client: `src/lib/api.ts` (`VITE_API_URL`)

Consultar skills en `.cursor/skills/` (`set-api-domain`, `frontend-atomic-react`) al tocar UI o dominio.

## Producto y seguridad

- La documentación y los botones deben hablar de **API REST**; no existe un cliente adicional público.
- Nunca mostrar ni persistir API Keys completas después de crear/rotar una key.
- El Frontend consume `Backend`; nunca debe usar `SET_API_ARCA` ni su `API_KEY`.
- Una organización puede gestionar varios CUITs desde `/app/cuits`.
- Las keys se documentan como scopes + CUIT grants, no como tokens genéricos.

## Integración documentada

El quickstart oficial está en `/docs/quickstart` y debe incluir:

- `Authorization: Bearer <API_KEY>`;
- `Idempotency-Key` para emisiones;
- endpoint base y ejemplos `curl`;
- errores `401`, `403`, `409`, `422`, `429`, `502` y `504`;
- `Retry-After`, `X-Correlation-ID`, rotación y almacenamiento server-side.

## Verificación

Después de cambiar rutas o contenido:

```bash
npx tsc --noEmit
npm run lint
npm run build
```
