const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    './index.html',
    './manifest.json'
];

// Установка Service Worker и кэширование файлов
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Перехват сетевых запросов и выдача данных из кэша, если нет сети
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Возвращаем из кэша, если найдено, иначе делаем запрос в сеть
                return response || fetch(event.request);
            })
    );
});