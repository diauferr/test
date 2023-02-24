var urlsToCache = [
	"assets/images/article-2.svg",
	"assets/images/auction.svg",
	"assets/images/book-2.svg",
	"assets/images/book.svg",
	"assets/images/books.svg",
	"assets/images/folder.svg",
	"assets/images/informativos.svg",
	"assets/images/logo-icon-02.svg",
	"assets/images/logo.png",
	"assets/images/logout.svg",
	"assets/images/marketing.png",
	"assets/images/megaphone-2.svg",
	"assets/images/periodicos.svg",
	"assets/images/supportLogo.svg",
	"assets/images/video-camera.svg",
	"favicon.ico",
	"index.html",
	"manifest.json"
];

self.addEventListener("install", evt => {
	evt.waitUntil(
		caches.keys().then(key => {
			key.forEach(k => {
				if (k === "forumCache") {
					return caches.delete(k);
				}
			});
		})
	);

	evt.waitUntil(
		caches.open("commonForumCache").then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("fetch", event => {
	if (
		event.request.method === 'POST' ||
		event.request.method === 'PUT' ||
		event.request.method === 'DELETE'
	) {

		return
	}

	event.respondWith(
		caches.open("forumCache").then(async cache => {
			return cache.match(event.request).then(response => {




				return (
					response ||
					fetch(event.request).then(res => {
						if (res.type === "cors" && /^(?:.*)(?:\/api\/search)(?:.*)$/.test(res.url)) {
							cache.put(event.request, res.clone());
						}
						return res;
					})

				);
			});
		})
	);
});

self.addEventListener("message", event => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});
