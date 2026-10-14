const CACHE_NAME='fazendinha-santos-v9-12';
const SHELL=['./fazendinha_santos_v9_12_mobile.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(resp=>{if(resp&&resp.ok){const copy=resp.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));}return resp;}).catch(()=>caches.match('./fazendinha_santos_v9_12_mobile.html'))));});
