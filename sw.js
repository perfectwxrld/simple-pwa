const CACHE_NAME = 'pwa-player-v1';
const urlsToCache = [
    './index.html',
    './manifest.json',
    './sw.js',
    './track.mp3' // Добавляем наш аудиофайл в кэш!
];

// Установка и кэширование ресурсов
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Перехват запросов (работа приложения из кэша)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});