const C='dongasia-v1';
self.addEventListener('install',e=>{ self.skipWaiting(); });
self.addEventListener('activate',e=>{ self.clients.claim(); });
self.addEventListener('fetch',e=>{
  if(e.request.mode!=='navigate'){ e.respondWith(fetch(e.request).catch(()=>caches.match(e.request))); return; }
  e.respondWith(fetch(e.request).then(r=>{ caches.open(C).then(c=>c.put(e.request,r.clone())); return r.clone(); }).catch(()=>caches.match(e.request).then(r=>r||Response.error())));
});