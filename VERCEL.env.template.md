# Vercel Environment Variables — Frontend (Set-Api Web)

**Proyecto Vercel:** `triple-d-pay` / `set-api-web`  
**Root Directory:** `Frontend`  
**Dominio prod:** `www.set-api.com`

Copiá en **Settings → Environment Variables → Production** (build time).

---

## Obligatorias

| Variable | Valor en Vercel |
|----------|-----------------|
| `VITE_API_URL` | `https://set-api-backend.vercel.app` |

---

## Opcionales

| Variable | Valor en Vercel |
|----------|-----------------|
| `VITE_GOOGLE_CLIENT_ID` | Mismo Client ID que `GOOGLE_CLIENT_ID` en Backend |
| `VITE_KYC_REQUIRED` | `true` para exigir KYC. Ausente/`false` = flujo deshabilitado (temporal) |

---

## Notas

- Variables `VITE_*` se embeben en el **build**. Tras cambiarlas → **Redeploy**.
- `vercel.json` ya setea `VITE_API_URL` en build; la env de Vercel la sobrescribe si existe.

---

## Local vs prod

| Entorno | `VITE_API_URL` |
|---------|----------------|
| Local (`.env`) | `http://localhost:4000` |
| Vercel Production | `https://set-api-backend.vercel.app` |
