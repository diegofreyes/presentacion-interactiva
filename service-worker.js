const CACHE_NAME = 'app-cache-v8';
const CACHED_URLS_BASIC = [
  'favicon.ico',
  'assets/img/sample-logo.png',
  'assets/fonts/fa-solid-900.woff2',
  'assets/fonts/Rubik-Regular.woff',
  'assets/fonts/Rubik-Bold.woff',
  'assets/css/animate.css',
  'assets/css/style.css',
  'assets/js/scripts.js',
  'simulator/js/jquery.js',
];

const CACHED_URLS_INDEX = [
  'index.html',
  'assets/media/sample.mp4',
]

const CACHED_URLS_MAP = [
  'map.html', //Activos del mapa
  'assets/img/map.png',
  'assets/img/qr-example.png',
]

const CACHED_URLS_CATALOG = [
  'catalog.html',
  'assets/products.json',
  'assets/products/AM13423.jpg',
  'assets/products/AR1000.jpg',
  'assets/products/CA0541.jpg',
  'assets/products/COM8028.jpg',
  'assets/products/CS2330.jpg',
  'assets/products/ES4103.jpg',
  'assets/products/MC3000.jpg',
  'assets/products/MN3710.jpg',
  'assets/products/MTV17519.jpg',
  'assets/products/SF9459.jpg',
]

const CACHED_URLS_SIMULATOR = [
  'simulator/index.html',
]

const CACHED_URLS = [
  ...CACHED_URLS_BASIC,
  ...CACHED_URLS_INDEX,
  ...CACHED_URLS_CATALOG,
  ...CACHED_URLS_MAP,
  ...CACHED_URLS_SIMULATOR
]

console.log( CACHED_URLS )



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

