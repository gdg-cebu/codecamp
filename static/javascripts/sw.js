const cacheName = 'codecamp-v1';
const pathsToCache = [
  '/',
  '/faqs',
  '/coc',
  "/static/manifest.json",
  '/static/stylesheets/fonts.min.css',
  '/static/stylesheets/main.min.css',
  '/static/javascripts/main.min.js',
  '/static/javascripts/sw-register.js',
  '/static/images/logo.png',
  '/static/images/logo-md.png',
  '/static/images/gdg-logo.png',
  '/static/images/speakers/bok-thye-yeow.png',
  '/static/images/speakers/chelle-gray.jpg',
  '/static/images/speakers/erica-hanson.png',
  '/static/images/speakers/junho-choi.png',
  '/static/images/speakers/manikanta-krishnamurthy.png',
  '/static/images/speakers/sami-kizilbash.png',
  '/static/images/speakers/shad-roi.jpg',
  '/static/images/speakers/soonson-kwon.png',
  '/static/images/speakers/takuo-suzuki.png',
  '/static/images/sponsors/iec.png',
  '/static/images/sponsors/pldt-innolab.png',
  '/static/images/sponsors/prworks.png',
  '/static/fonts/droid-sans/bold.ttf',
  '/static/fonts/droid-sans/regular.ttf',
  '/static/fonts/quicksand/bold.woff2'
];


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(pathsToCache);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});


self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys()
      .then(function(cacheKeys) {
        return Promise.all(cacheKeys.map(function(cacheKey) {
          if (cacheKey !== cacheName) {
            caches.delete(cacheKey);
          }
        }));
      })
      .then(function() {
        self.clients.claim();
      })
  );
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
      .then(function(response) {
        return response || fetch(e.request);
      })
  );
});
