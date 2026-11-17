// Antigravity service worker: offline-first app shell, fresh lesson data when online.
const VERSION = 'v1.5.1';
const CACHE = 'antigravity-' + VERSION;
const SHELL = [
  './', 'manifest.webmanifest', 'css/styles.css',
  'js/app.js', 'js/i18n.js', 'js/store.js',
  'data/index.json', 'data/curriculum_prek.json', 'data/curriculum.json', 'data/curriculum_elementary.json',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      await Promise.allSettled(
        SHELL.map(url =>
          fetch(url, { cache: 'no-cache' }).then(res => {
            if (res.ok) return cache.put(url, res);
          }).catch(() => {})
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Network-first when online so code and lesson updates appear immediately; fallback to offline cache
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() =>
      caches.match(req).then(hit => hit || caches.match('./') || caches.match('index.html'))
    )
  );
});
