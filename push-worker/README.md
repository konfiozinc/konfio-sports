# KONFÍO SPORTS — Worker de Push (Cloudflare)

Backend de notificaciones push para avisar antes de que empiecen los partidos.

## Qué hace

- `POST /subscribe` — guarda una suscripción de navegador en KV.
- `POST /notify` — envía una notificación a todos los suscriptores (pruebas).
- **Cron cada 5 minutos** — lee `api/agenda.json` y avisa 30 min antes de cada partido.

## Requisitos

- Cuenta de Cloudflare con Workers + KV.
- `wrangler` instalado y autenticado (`npx wrangler login`).

## Despliegue (una sola vez)

```bash
cd push-worker
npm install

# 1. Crear el namespace de KV y copiar su id
npx wrangler kv namespace create PUSH_KV
#   -> reemplaza "REEMPLAZAR_CON_TU_KV_NAMESPACE_ID" en wrangler.toml con el id devuelto

# 2. Guardar la clave PRIVADA de VAPID como secreto (NO en el código)
npx wrangler secret put VAPID_PRIVATE_KEY
#   -> pega: VzEgYdOd-C-IwfEr0CASP8ydsyAGhJf_hB4ta6qB14k

# 3. Desplegar
npx wrangler deploy
```

Al terminar, `wrangler deploy` imprime la URL del worker, por ejemplo:
`https://konfio-sports-push.<tu-subcuenta>.workers.dev`

## Conectar el sitio

En `index.html`, busca la línea:

```js
const PUSH_ENDPOINT = '';
```

y reemplázala por:

```js
const PUSH_ENDPOINT = 'https://konfio-sports-push.<tu-subcuenta>.workers.dev';
```

## Probar

```bash
curl -X POST https://konfio-sports-push.<tu-subcuenta>.workers.dev/notify \
  -H 'Content-Type: application/json' \
  -d '{"title":"Prueba","body":"Hola desde KONFÍO SPORTS"}'
```

## Notas de seguridad

- La clave **privada** de VAPID va como `secret` (no en el repositorio).
- La clave **pública** va en el cliente (`index.html`) y en este worker.
- Las suscripciones se guardan en KV; las caducadas se eliminan automáticamente.
