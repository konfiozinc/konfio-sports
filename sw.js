/* KONFÍO SPORTS — Service Worker v2 */
'use strict';

const CACHE_NAME = 'konfio-sports-v4';
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
