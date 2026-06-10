// DevZone service worker — offline support.
// Strategy:
//   • /_next/static + assets  → cache-first (immutable, hashed)
//   • navigations / HTML docs  → network-first, fall back to cached page, then "/"
//   • RSC payloads (client-side nav data) → network-first, fall back to cache
//   • content APIs (modules, lessons, progress, me…) → network-first, fall back to cache
//   • auth / AI / code-eval / admin APIs → never cached (need a live server)
const VERSION = "v3";
const STATIC_CACHE = `devzone-static-${VERSION}`;
const PAGE_CACHE = `devzone-pages-${VERSION}`;
const API_CACHE = `devzone-api-${VERSION}`;
const KEEP = [STATIC_CACHE, PAGE_CACHE, API_CACHE];

const PRECACHE = ["/", "/manifest.json", "/logo.png", "/image.png", "/icon-192.png", "/icon-512.png"];
const STATIC_RE = /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|gif|svg|webp|ico)$/;

// APIs that must NOT be served from cache (live data / external services only).
function isLiveOnlyApi(p) {
  return (
    p.startsWith("/api/auth") ||
    p.startsWith("/api/ai") ||
    p.startsWith("/api/hint") ||
    p.startsWith("/api/evaluate-code") ||
    p.startsWith("/api/admin")
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((c) => c.addAll(PRECACHE).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function cacheFirst(req, cacheName) {
  const hit = await caches.match(req, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === "opaque")) {
    (await caches.open(cacheName)).put(req, res.clone());
  }
  return res;
}

async function networkFirst(req, cacheName, { fallbackToRoot = false } = {}) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreVary: true });
    if (hit) return hit;
    if (fallbackToRoot) {
      const root = await caches.match("/", { ignoreVary: true });
      if (root) return root;
    }
    throw err;
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Immutable build assets & images
  if (url.pathname.startsWith("/_next/static/") || STATIC_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  // API routes
  if (url.pathname.startsWith("/api/")) {
    if (isLiveOnlyApi(url.pathname)) return; // bypass SW → offline fails naturally
    event.respondWith(networkFirst(req, API_CACHE));
    return;
  }

  // RSC payloads used by client-side navigation
  const isRSC = req.headers.get("RSC") === "1" || url.searchParams.has("_rsc");
  if (isRSC) {
    event.respondWith(networkFirst(req, PAGE_CACHE));
    return;
  }

  // Page navigations / HTML documents
  const accept = req.headers.get("accept") || "";
  if (req.mode === "navigate" || accept.includes("text/html")) {
    event.respondWith(networkFirst(req, PAGE_CACHE, { fallbackToRoot: true }));
    return;
  }

  // Any other same-origin GET
  event.respondWith(cacheFirst(req, STATIC_CACHE));
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
