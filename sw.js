const CACHE_NAME = 'v2';

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll([
      "/sad.887dd38a200a2678ccaff72b315cedac.png",
      "/smile.a7ca688b1daef4f5a0f698e46c80e30d.png",
      "/soso.9dd4a89a033d9e1f786f3cbe8e0bc4ea.png",
    ]);
  }))
})

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) return response;
    return fetch(event.request);
  }));
})