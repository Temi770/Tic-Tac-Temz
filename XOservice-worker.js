self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('temz-cache').then(cache => {
      return cache.addAll([
        'XO.html',
        'XO.css',
        'XO.js',
        'click.mp3.wav',
        'win.mp3.wav',
        'draw.mp3.wav',
        'XOicon.png.png',
        'XOicon.png.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
