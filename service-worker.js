const CACHE_NAME = 'app-cache-v8';
const CACHED_URLS = [
  'favicon.ico',
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
  'assets/products.json',
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(precache);
});

async function precache()
{
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(CACHED_URLS);
}

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME !== cacheName &&  cacheName.startsWith("app-cache")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  
  event.respondWith(fromCache( event.request ));

  event.waitUntil( update(event.request ));

});

async function fromCache( request )
{
  const cache = await caches.open(CACHE_NAME);
  const matching = await cache.match(request);
  return matching || Promise.reject('no-match');
}

async function update ( request )
{
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(request);
  return cache.put(request, response);
}

