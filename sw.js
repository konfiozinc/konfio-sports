/* KONFÍO SPORTS — Service Worker v2 */
'use strict';

const CACHE_NAME = 'konfio-sports-v5';
const PRECACHE = [
  '/konfio-sports/',
  '/konfio-sports/index.html',
  '/konfio-sports/manifest.json',
  '/konfio-sports/assets/icon-192.png',
  '/konfio-sports/assets/icon-512.png',
  '/konfio-sports/assets/icon-maskable.png',
  '/konfio-sports/assets/apple-touch-icon.png',
  '/konfio-sports/assets/favicon-16.png',
  '/konfio-sports/assets/favicon-32.png',
  '/konfio-sports/assets/favicon.ico',
  '/konfio-sports/assets/logos/gol-caracol.png',
  '/konfio-sports/assets/logos/rcn.png',
  '/konfio-sports/assets/logos/telefe.png',
  '/konfio-sports/assets/logos/canal13.png',
  '/konfio-sports/assets/logos/canal5.png',
  '/konfio-sports/assets/logos/rtve-deportes.png',
  '/konfio-sports/assets/logos/fifa-plus.png',
  '/konfio-sports/assets/logos/pluto-tv.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Datos de agenda: siempre red primero (datos frescos)
  if (url.pathname.includes('/api/')) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // Navegación: red primero, offline -> index.html cacheado
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('/konfio-sports/index.html')));
    return;
  }

  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

self.addEventListener('push', (event) => {
  let data = { title: 'KONFÍO SPORTS ⚽', body: 'Hay un partido en juego', url: '/konfio-sports/' };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/konfio-sports/assets/icon-192.png',
      badge: '/konfio-sports/assets/favicon-32.png',
      vibrate: [200, 100, 200],
      tag: 'konfio-sports-match',
      data: { url: data.url }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/konfio-sports/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) { c.navigate(url); return c.focus(); }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
