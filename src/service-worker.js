/* eslint-disable no-restricted-globals */
/* global importScripts, workbox */ // Define global variables

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.0/workbox-sw.js');

// Ensure the __WB_MANIFEST variable is available for precaching
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  // Add other assets you want to cache
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event to serve cached assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // This returns a promise
          }
          return Promise.resolve(); // Ensure a promise is returned if the cache is not deleted
        })
      );
    })
  );
});
