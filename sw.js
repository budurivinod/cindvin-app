const CACHE_NAME = 'cindvin-love-sync-v1';

// Install event: Pre-caches the essential logic
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Active event: Ensures the service worker takes control of the app immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// BACKGROUND NOTIFICATION LISTENER
// This is what allows the phone to buzz/show a banner even if Chrome is closed
self.addEventListener('push', function(event) {
    let data = { title: 'CindVin', body: 'New update from your partner! ❤️' };
    
    try {
        if (event.data) {
            data = event.data.json();
        }
    } catch (e) {
        console.log('Push data was not JSON, using default notification.');
    }

    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
        vibrate: [200, 100, 200],
        data: {
            url: self.registration.scope
        },
        actions: [
            { action: 'open', title: 'Open App' }
        ]
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});

// NOTIFICATION CLICK ACTION
// Redirects you straight to the app when you tap the notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            // If the app is already open, just focus it
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === self.registration.scope && 'focus' in client) {
                    return client.focus();
                }
            }
            // If the app is closed, open a new window
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
