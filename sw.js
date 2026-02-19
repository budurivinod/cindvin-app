const CACHE_NAME = 'cindvin-cache-v1';

// Install event: Optional, helps app load faster
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Active event: Takes control of the pages immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Handle Background Notifications
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'HealthSync Pro', body: 'New update from partner! ❤️' };
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
        vibrate: [200, 100, 200],
        data: { url: self.registration.scope }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

// Open the app when a notification is clicked
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === self.registration.scope && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
