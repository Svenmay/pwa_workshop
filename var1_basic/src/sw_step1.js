importScripts('workbox-v5.1.3/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: 'workbox-v5.1.3/',
  debug: true,
});

const {precacheAndRoute} = workbox.precaching;

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

/**
 * Basic caching for JSON data (caching max. 1 day).
 */

/**
 * Basic caching for max. 200 images (caching max. 30 days).
 */

/**
 * Use a Network-first strategy for all other requests.
 */

/**
 * Basic "offline page" support
 */

/**
 * Basic "Push notification" functionality.
 */
