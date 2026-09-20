/* KONFÍO SPORTS — Service Worker (PWA)
   Caché de recursos estáticos para carga rápida y soporte offline básico. */
'use strict';

const CACHE = 'konfio-sports-v1';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './assets/favicon.ico',
  './assets/favicon-16.png',
  './assets/favicon-32.png',
  './assets/apple-touch-icon.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-maskable.png',
  './assets/logos/gol-caracol.png',
  './assets/logos/rcn.png',
  './assets/logos/telefe.png',
  './assets/logos/canal13.png',
  './assets/logos/canal5.png',
  './assets/logos/rtve-deportes.png',
  './assets/logos/fifa-plus.png',
  './assets/logos/pluto-tv.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
