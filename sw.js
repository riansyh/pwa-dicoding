importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/pages/standing.html", revision: "1" },
    { url: "/pages/teams.html", revision: "1" },
    { url: "/pages/fav-teams.html", revision: "1" },
    { url: "/pages/home.html", revision: "1" },
    { url: "/css/style.css", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/push.js", revision: "1" },
    { url: "/icon/maskable_icon1.png", revision: "1" },
    { url: "/icon/maskable_icon2.png", revision: "1" },
    { url: "/icon/maskable_icon3.png", revision: "1" },
    { url: "/icon/icon144.png", revision: "1" },
    { url: "/icon/icon512.png", revision: "1" },
    { url: "https://i.ibb.co/cbmdPsw/banner.png", revision: "1" },
    {
      url:
        "https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700&display=swap",
      revision: "1",
    },
  ]);

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );
} else {
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "icon/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
