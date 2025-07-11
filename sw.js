/**
 * SERVICE WORKER - AI SECURITY PORTFOLIO
 * Advanced PWA with offline capabilities and smart caching
 */

const CACHE_NAME = '0x-professor-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Resources to cache immediately
const PRECACHE_RESOURCES = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/offline.html'
];

// Network-first resources (always try network first)
const NETWORK_FIRST_PATTERNS = [
    /^https:\/\/api\.github\.com/,
    /^https:\/\/fonts\.googleapis\.com/,
    /^https:\/\/cdnjs\.cloudflare\.com/
];

// Cache-first resources (check cache first)
const CACHE_FIRST_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
    /\.(?:css|js|wasm)$/,
    /^https:\/\/fonts\.gstatic\.com/
];

// Install event - precache essential resources
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('💾 Precaching resources');
                return cache.addAll(PRECACHE_RESOURCES);
            })
            .then(() => {
                console.log('✅ Service Worker installed successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Service Worker installation failed:', error);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // Handle different types of requests
    if (shouldUseNetworkFirst(request)) {
        event.respondWith(networkFirst(request));
    } else if (shouldUseCacheFirst(request)) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(staleWhileRevalidate(request));
    }
});

// Network-first strategy for dynamic content
async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🌐 Network failed, trying cache:', request.url);
        
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
        }
        
        throw error;
    }
}

// Cache-first strategy for static resources
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        // Update cache in background
        fetch(request)
            .then((networkResponse) => {
                if (networkResponse.ok) {
                    cache.put(request, networkResponse.clone());
                }
            })
            .catch(() => {
                // Ignore network errors for cache-first strategy
            });
        
        return cachedResponse;
    }
    
    // If not in cache, fetch from network
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Cache-first failed:', request.url, error);
        throw error;
    }
}

// Stale-while-revalidate strategy for general content
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Always try to fetch from network in background
    const networkPromise = fetch(request)
        .then((networkResponse) => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch(() => {
            // Ignore network errors for stale-while-revalidate
        });
    
    // Return cached version immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // If no cache, wait for network
    return networkPromise;
}

// Helper functions
function shouldUseNetworkFirst(request) {
    return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(request.url));
}

function shouldUseCacheFirst(request) {
    return CACHE_FIRST_PATTERNS.some(pattern => pattern.test(request.url));
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('🔄 Background sync triggered:', event.tag);
    
    if (event.tag === 'github-sync') {
        event.waitUntil(syncGitHubData());
    }
});

async function syncGitHubData() {
    try {
        console.log('🔄 Syncing GitHub data...');
        
        // Fetch fresh GitHub data
        const response = await fetch('https://api.github.com/users/0x-Professor/repos');
        if (response.ok) {
            const data = await response.json();
            
            // Cache the data
            const cache = await caches.open(CACHE_NAME);
            cache.put('github-data', new Response(JSON.stringify(data)));
            
            console.log('✅ GitHub data synced successfully');
        }
    } catch (error) {
        console.error('❌ GitHub sync failed:', error);
    }
}

// Push notifications for updates
self.addEventListener('push', (event) => {
    console.log('🔔 Push notification received');
    
    const options = {
        body: event.data?.text() || 'New update available!',
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/icon-48x48.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icon-48x48.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('0x-Professor Portfolio', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('https://0x-professor.me')
        );
    }
});

// Share target handling
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    if (url.pathname === '/share' && event.request.method === 'GET') {
        event.respondWith(handleShare(event.request));
    }
});

async function handleShare(request) {
    const url = new URL(request.url);
    const title = url.searchParams.get('title') || '';
    const text = url.searchParams.get('text') || '';
    const shareUrl = url.searchParams.get('url') || '';
    
    // Redirect to main page with shared content
    const targetUrl = `/?shared=true&title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    
    return Response.redirect(targetUrl, 302);
}

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
    console.log('⏰ Periodic sync triggered:', event.tag);
    
    if (event.tag === 'portfolio-update') {
        event.waitUntil(updatePortfolioData());
    }
});

async function updatePortfolioData() {
    try {
        console.log('🔄 Updating portfolio data...');
        
        // Update GitHub stats
        await syncGitHubData();
        
        // Could add more periodic updates here
        
        console.log('✅ Portfolio data updated successfully');
    } catch (error) {
        console.error('❌ Portfolio update failed:', error);
    }
}

// Handle message from main thread
self.addEventListener('message', (event) => {
    console.log('📨 Message received:', event.data);
    
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data?.type === 'CACHE_GITHUB_DATA') {
        event.waitUntil(syncGitHubData());
    }
});

// Error handling
self.addEventListener('error', (event) => {
    console.error('❌ Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Service Worker unhandled rejection:', event.reason);
});

// Cleanup on beforeunload
self.addEventListener('beforeunload', () => {
    console.log('🧹 Service Worker cleanup');
});

console.log('🚀 Service Worker script loaded successfully');