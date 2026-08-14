# Set-Api — Web

Frontend del producto Set-Api para administrar organizaciones, CUITs autorizados,
API Keys, uso, comprobantes y facturación ARCA.

La integración pública es REST contra `Backend`. El gateway ARCA es interno y
no debe confundirse con la API pública de `SET_API_ARCA`.

## Stack y estructura

- TanStack Start + Vite/Nitro
- React + TypeScript
- Tailwind CSS + Radix UI
- TanStack Router + React Query

```text
src/
  routes/                 # páginas públicas, onboarding y dashboard
  components/set-api/     # organismos y componentes de producto
  components/ui/          # primitives
  lib/api.ts              # cliente REST de sesión
  lib/auth-context.tsx    # sesión y organización activa
  content/                # catálogo y contenido documental
```

## Desarrollo

```bash
npm install
npm run dev
```

Comandos de calidad:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

`npm run lint` analiza `src/`. Las reglas de formato se ejecutan aparte con
Prettier para no mezclar validación de estilo con ESLint.

## Variables públicas

Crear `.env.local` con valores públicos únicamente:

```dotenv
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=
```

Nunca incluir API Keys, tokens ARCA, secretos JWT ni credenciales privadas en
variables `VITE_*`.

## Flujo de activación

1. Crear la cuenta y verificar el email.
2. Completar onboarding.
3. Registrar uno o más CUITs en **CUITs autorizados**.
4. Crear una API Key y conservar el valor completo solo en el servidor consumidor.
5. Consultar puntos de venta.
6. Ejecutar una primera llamada REST con `Idempotency-Key`.

Una API Key solo puede operar sobre los CUITs otorgados y con los permisos
asignados. Si se pierde el valor completo, debe rotarse; no se puede recuperar.

## Documentación visible

- `/docs/quickstart`: integración REST con `curl`.
- `/docs`: catálogo de servicios y automatizaciones.
- `/app/cuits`: alta, alias y revocación de CUITs.
- `/app/keys`: emisión, rotación, permisos y alcance de API Keys.

El frontend no llama directamente al gateway ARCA. Todas las operaciones pasan
por `Backend`, que aplica autorización, metering, límites, idempotencia y
auditoría.
