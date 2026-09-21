import webpush from 'web-push';

const VAPID_PUBLIC_KEY = 'BCSVowQGMdbWTlbhM2aKsuEuEBJkNOAMos6WPr87COHy-2Uh-yOhEQ_UTw8lzaUyr5s-6nm-3Lwc0m_r8vw-7ns';
const VAPID_SUBJECT = 'mailto:konfiozinc@users.noreply.github.com';
const SITE_URL = 'https://konfiozinc.github.io/konfio-sports/';
const AGENDA_URL = SITE_URL + 'api/agenda.json';

function configure(env) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16);
}

async function notifyAll(env, { title, body, url }) {
  const payload = JSON.stringify({
    title: title || 'KONFÍO SPORTS ⚽',
    body: body || 'Hay un partido en juego',
    url: url || SITE_URL
  });
  const list = await env.PUSH_KV.list({ prefix: 'sub:' });
  let ok = 0;
  let fail = 0;
  for (const k of list.keys) {
    const raw = await env.PUSH_KV.get(k.name);
    if (!raw) continue;
    try {
      await webpush.sendNotification(JSON.parse(raw), payload);
      ok++;
    } catch (e) {
      // Suscripción expirada o inválida: se elimina
      if (e && (e.statusCode === 404 || e.statusCode === 410)) {
        await env.PUSH_KV.delete(k.name);
      }
      fail++;
    }
  }
  return { ok, fail };
}

export default {
  async fetch(request, env) {
    configure(env);
    const url = new URL(request.url);

    // Registrar una suscripción
    if (url.pathname === '/subscribe' && request.method === 'POST') {
      try {
        const sub = await request.json();
        if (!sub || !sub.endpoint) return json({ error: 'suscripción inválida' }, 400);
        await env.PUSH_KV.put('sub:' + hash(sub.endpoint), JSON.stringify(sub));
        return json({ ok: true });
      } catch (e) {
        return json({ error: String(e) }, 500);
      }
    }

    // Enviar manualmente a todos (para pruebas)
    if (url.pathname === '/notify' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const r = await notifyAll(env, body);
      return json(r);
    }

    return new Response('KONFÍO SPORTS push worker', { status: 200 });
  },

  // Cron: avisa antes de cada partido de la agenda
  async scheduled(event, env) {
    configure(env);
    try {
      const agenda = await (await fetch(AGENDA_URL)).json();
      const now = new Date();
      for (const m of (agenda.matches || [])) {
        if (!m.fecha || !m.hora) continue;
        const dt = new Date(m.fecha + 'T' + m.hora + ':00-05:00');
        const diff = dt.getTime() - now.getTime();
        // Notificar entre 30 min y 1 min antes del inicio
        if (diff > 60 * 1000 && diff <= 30 * 60 * 1000) {
          const title = (m.equipoA || '') + ' vs ' + (m.equipoB || '');
          const body = (m.torneo || 'Partido') + ' · ' + (m.hora || '') + ' · ' + (m.canales || []).join(', ');
          await notifyAll(env, { title, body, url: SITE_URL + '#agenda' });
        }
      }
    } catch (e) {
      console.error('scheduled error', e);
    }
  }
};
