/* ============================================================
   MENTOR — Service worker
   Stratégie : cache-first pour la coquille de l'application
   (index.html, manifest.json), réseau direct pour les API
   (Gemini, Twelve Data) qui ne doivent JAMAIS être mises en
   cache ici — la fraîcheur des données et la confidentialité
   priment. Le cache applicatif permet d'ouvrir MENTOR dans
   l'avion : leçons, journal, portefeuille aux derniers cours
   connus restent consultables.
   ============================================================ */
'use strict';

const CACHE_NOM = 'mentor-coquille-v11'; // incrémenté à chaque livraison : purge l'ancienne version en cache
const FICHIERS_COQUILLE = [
  './',
  './index.html',
  './manifest.json'
];

// Installation : on met la coquille en cache immédiatement.
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NOM)
      .then((cache) => cache.addAll(FICHIERS_COQUILLE))
      .then(() => self.skipWaiting())
  );
});

// Activation : purge des anciennes versions du cache.
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((noms) =>
      Promise.all(noms.filter((n) => n !== CACHE_NOM).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evt) => {
  const url = new URL(evt.request.url);

  // Les appels API partent toujours sur le réseau, sans cache SW.
  // (Le cache des cours est géré côté application, dans localStorage,
  // pour respecter les quotas Twelve Data.)
  const estAPI = url.hostname.includes('generativelanguage.googleapis.com')
    || url.hostname.includes('twelvedata.com')
    || url.hostname.includes('api.anthropic.com');
  if (estAPI || evt.request.method !== 'GET') return; // laisser passer

  // Coquille : cache d'abord, réseau en secours, puis mise à jour
  // silencieuse du cache quand le réseau répond (stale-while-revalidate).
  evt.respondWith(
    caches.match(evt.request, { ignoreSearch: true }).then((enCache) => {
      const depuisReseau = fetch(evt.request).then((rep) => {
        if (rep && rep.ok && url.origin === self.location.origin) {
          const copie = rep.clone();
          caches.open(CACHE_NOM).then((c) => c.put(evt.request, copie));
        }
        return rep;
      }).catch(() => enCache); // hors-ligne : on retombe sur le cache
      return enCache || depuisReseau;
    })
  );
});
