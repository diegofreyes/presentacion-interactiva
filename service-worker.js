const cacheName = 'cache-v1';
const precacheResources = [
  'index.html',
  'catalog.html',
  'assets/img/sample-logo.png',
  'assets/fonts/fa-solid-900.woff2',
  'assets/fonts/Rubik-Regular.woff',
  'assets/css/animate.css',
  'assets/css/style.css',
  'assets/js/scripts.js',
  'simulator/js/jquery.js',
  'assets/media/sample.mp4',
  'assets/products.json'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
  
        // TODO 4 - Add fetched files to the cache
  
      }).catch(error => {
  
        // TODO 6 - Respond with custom offline page
  
      })
    );
  });