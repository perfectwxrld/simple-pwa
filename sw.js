const CACHE_NAME = 'pwa-player-v2'; // Поменяли версию кэша
const urlsToCache = [
    './index.html',
    './manifest.json',
    './sw.js',
    './track1.mp3',
    './track2.mp3',
    './track3.mp3'
];

self.addEventListener('install', event => {
    // Форсируем немедленную установку нового Service Worker'a
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    // Удаляем старый кэш, если версия изменилась
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});