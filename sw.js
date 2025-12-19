const CACHE_NAME = 'warehouse-v2'; // قمنا بتغيير الإصدار لتحديث الملفات
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap'
];

// مرحلة التثبيت: حفظ الملفات في الذاكرة
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم حفظ الملفات في الذاكرة المؤقتة');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// مرحلة التفعيل: حذف الذاكرة القديمة إذا وجد تحديث
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('حذف الملفات القديمة');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// استراتيجية الاستجابة: جلب من الذاكرة أولاً، وإذا لم يوجد اذهب للإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );

});
