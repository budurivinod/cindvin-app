self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});

// Listener to handle background sync or nudges if needed later
self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
        data: { url: self.registration.scope }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});
