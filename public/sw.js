// DevZone service worker — offline support.
// Strategy:
//   • /_next/static + assets  → cache-first (immutable, hashed)
//   • navigations / HTML docs  → network-first, fall back to cached page, then "/"
//   • RSC payloads (client-side nav data) → network-first, fall back to cache
//   • content APIs (modules, lessons, progress, me…) → network-first, fall back to cache
//   • auth / AI / code-eval / admin APIs → never cached (need a live server)
// Documents and RSC payloads live in SEPARATE caches: they share the same URL
// key, so mixing them would let a navigation match an RSC payload (blank page).
const VERSION = "v5";
// Cross-origin CDNs whose assets we cache for offline (Pyodide = Python runtime).
const CDN_ORIGINS = ["https://cdn.jsdelivr.net"];
const STATIC_CACHE = `devzone-static-${VERSION}`;
const PAGE_CACHE = `devzone-pages-${VERSION}`;
const RSC_CACHE = `devzone-rsc-${VERSION}`;
const API_CACHE = `devzone-api-${VERSION}`;
const KEEP = [STATIC_CACHE, PAGE_CACHE, RSC_CACHE, API_CACHE];

// Only auth-free, always-200 assets. "/" is intentionally NOT precached: if the
// SW installed on /login (logged out), it could cache the login page as "/".
// "/" gets cached on the first authenticated navigation (and by the offline download).
const PRECACHE = ["/manifest.json", "/logo.png", "/image.png", "/icon-192.png", "/icon-512.png"];
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

// Only cache real, same-origin, non-redirected success responses. A redirect to
// /login (when a request is unauthenticated) must never poison a content cache.
function isCacheable(res) {
  return res && res.ok && !res.redirected && res.type !== "opaqueredirect";
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(req);
  if (isCacheable(res) || (res && res.type === "opaque")) cache.put(req, res.clone());
  return res;
}

async function networkFirst(req, cacheName, { fallbackToRoot = false } = {}) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (isCacheable(res)) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreVary: true });
    if (hit) return hit;
    if (fallbackToRoot) {
      const root = await (await caches.open(PAGE_CACHE)).match("/", { ignoreVary: true });
      if (root) return root;
    }
    throw err;
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Approved CDNs (Pyodide runtime) → cache-first so code runs offline
  if (CDN_ORIGINS.includes(url.origin)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

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

  // RSC payloads used by client-side navigation (kept apart from documents)
  const isRSC = req.headers.get("RSC") === "1" || url.searchParams.has("_rsc");
  if (isRSC) {
    event.respondWith(networkFirst(req, RSC_CACHE));
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
