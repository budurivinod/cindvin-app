self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            if (windowClients.length > 0) {
                return windowClients[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});

// Listener for background pushes
self.addEventListener('push', function(event) {
    const options = {
        body: 'Your partner updated something in HealthSync!',
        icon: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
        vibrate: [200, 100, 200]
    };
    event.waitUntil(self.registration.showNotification('HealthSync Pro', options));
});
