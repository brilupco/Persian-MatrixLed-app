const CACHE_NAME = "persian-led-pwa-v2"; // نسخه را عوض کن تا SW جدید نصب شود

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/brilup-icon-192.png",
  "./icons/brilup-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
