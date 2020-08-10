import {skipWaiting, clientsClaim} from 'workbox-core';
import {registerRoute, setDefaultHandler, setCatchHandler} from 'workbox-routing';
import {NetworkFirst, CacheFirst, NetworkOnly} from 'workbox-strategies';
import {precacheAndRoute} from 'workbox-precaching';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';

/**
 * A new version of the Service Worker will immediately take control.
 */
skipWaiting();
clientsClaim();

/**
 * Pages to precache
 */
precacheAndRoute(self.__WB_MANIFEST);

/**
* Do not cache any POST requests by default.
*/
registerRoute(
  /./,
  new NetworkOnly(),
  'POST'
)

/**
 * Basic caching for HTML pages, CSS+JS (caching max. 1 week).
 */
registerRoute(
  /\.(?:html|htm|js|css)$/,
  new NetworkFirst({
    networkTimeoutSeconds: 5,
    cacheName: 'html_css_js',
    plugins: [
      new ExpirationPlugin({
        // Cache files for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Only cache 30 files.
        maxEntries: 30,
      }),
      new CacheableResponsePlugin({statuses: [200]}),
    ],
  })
);

/**
 * Basic caching for JSON data (caching max. 1 day).
 */
registerRoute(
  /\.json$/,
  new NetworkFirst({
    networkTimeoutSeconds: 30,
    cacheName: 'json',
    plugins: [
      new ExpirationPlugin({
        // Cache pages for a day
        maxAgeSeconds: 24 * 60 * 60,
        // Only cache 10 files.
        maxEntries: 10,
      }),
      new CacheableResponsePlugin({statuses: [200]}),
    ],
  })
);

/**
 * Basic caching for max. 200 images (caching max. 30 days).
 */
registerRoute(
//  /\.(?:png|gif|jpg|jpeg|svg)$/,
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
       new CacheableResponsePlugin({statuses: [200]}),
    ],
  })
);


/**
 * Use a Network-first strategy for all other requests.
 */
setDefaultHandler(
  new NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'defaultCache',
    plugins: [
      new CacheableResponsePlugin({statuses: [0, 200]}),
    ]
  })
);

/**
 * Basic "offline page" support
 */
setCatchHandler(({event}) => {
  switch (event.request.destination) {
    case 'document':
      // Only provide fallback for navigational requests
      if (event.request.mode === 'navigate')
        return caches.match(offlinePage);
      else
        return Response.error();
      break;

    case 'image':
      return caches.match(offlineImage);
      break;

    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});

/**
 * Basic "Push notification" functionality.
 */
self.addEventListener('push', (event) => {
  const title = 'Example push notification';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
