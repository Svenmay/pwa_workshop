importScripts('workbox-v5.1.3/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: 'workbox-v5.1.3/',
  debug: true,
});

const {registerRoute} = workbox.routing;
const {NetworkFirst, CacheFirst} = workbox.strategies;
const {precacheAndRoute} = workbox.precaching;
const {ExpirationPlugin} = workbox.expiration;

const index = './index.html';
const page2 = './page2.html';
const programmers1 = './images/programmers1.jpg'
const programmers2 = './images/programmers2.jpg'

/**
 * Pages to precache
 */
precacheAndRoute([
  {url: index, revision: '123456'},
  {url: page2, revision: null},
  {url: programmers1, revision: null},
  {url: programmers2, revision: null},
]);

/**
 * Basic caching for HTML pages, CSS+JS (caching max. 1 week).
 */
registerRoute(
  /\.(?:html|htm|js|css)$/,
  new NetworkFirst({
    cacheName: 'html_css_js',
  })
);

/**
 * Basic caching for JSON data (caching max. 1 day).
 */

/**
 * Basic caching for max. 200 images (caching max. 30 days).
 */
registerRoute(
  ({event}) => event.request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        // Cache images for 30 days
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Only cache 200 images.
        maxEntries: 200,
      }),
    ],
  })
);

/**
 * Use a Network-first strategy for all other requests.
 */

/**
 * Basic "offline page" support
 */

/**
 * Basic "Push notification" functionality.
 */
