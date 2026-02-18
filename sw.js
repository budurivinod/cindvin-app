self.addEventListener('push', function(event) {
    const options = {
        body: 'New update from your partner! ❤️',
        icon: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
        vibrate: [200, 100, 200]
    };
    event.waitUntil(self.registration.showNotification('HealthSync Pro', options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
