"use strict";var precacheConfig=[["./index.html","f7e761b6ba1bcb98574bdc3338002890"],["./static/css/main.b5d62f50.css","e61c8ca1a3032067ac6e298fac9e7bfc"],["./static/js/main.84a4b70f.js","71e1a370d21d335ac991398c397aed69"],["./static/media/Nunito-Bold.6f47bcfc.ttf","6f47bcfc065790f02ed3cb8b51bef56f"],["./static/media/Nunito-Light.c41c2502.ttf","c41c2502180f63ce383b6e3cc042617a"],["./static/media/Nunito-LightItalic.42441320.ttf","424413200c2a4c02e03d6edf064960aa"],["./static/media/Nunito-Regular.65bb0a15.ttf","65bb0a158ee1967292ee4d11079d45ae"],["./static/media/Nunito-SemiBold.713ac08d.ttf","713ac08dfb7141494d4a69f344ff69fd"],["./static/media/Nunito-SemiBoldItalic.1b31a505.ttf","1b31a5055cad7ed13ad2c1bc423adec6"],["./static/media/avatar-placeholder.799730dd.png","799730dd75c4215e691dd5eccf3b477a"],["./static/media/email.ec8bee23.svg","ec8bee2359e7b8d3f11c72b0fac9d002"],["./static/media/ico-alamat.20c190ec.svg","20c190ec12515c37d523667f99241d21"],["./static/media/ico-collaps.dc6e2283.svg","dc6e22839b7abc5648cca9f7cbb81c44"],["./static/media/ico-dashboard.9aa4efd9.svg","9aa4efd935efd20a12fe25c377b7e103"],["./static/media/ico-identitas.839126a6.svg","839126a6f0b2df4b32ee25e8279af0b5"],["./static/media/ico-minus.72962dda.svg","72962dda86443dda47957754795a298f"],["./static/media/ico-mutasi.738bcd80.svg","738bcd808df95659388c4dd2b81a2a0f"],["./static/media/ico-terverifikasi.dec9dea0.svg","dec9dea0b3ab3a66ab5e47d39b1a4de0"],["./static/media/ico-warning-red.9b1d022a.svg","9b1d022a08f6e8c19c5f742b4bdf0fba"],["./static/media/litle-right.78747550.svg","787475500b19b30ca2e8d4ff9531c5a2"],["./static/media/logout.474b16f2.svg","474b16f24945b914203a95bad1906a1d"],["./static/media/menu.706c529d.svg","706c529db35347dbde4b025a9a43a9c5"],["./static/media/nama-lengkap.c0960b0d.svg","c0960b0daeeaf33b1eecfd0cb9d1811c"],["./static/media/nomor-hp.7c961d72.svg","7c961d72be23d822b425a4d713274983"],["./static/media/profile-settings.3a4a29a3.svg","3a4a29a3ab1b5f6b2636eac812deb862"],["./static/media/switch.706509d6.svg","706509d60ec9e51ce456d73d6d720933"],["./static/media/transfer-saldo.839c8ce0.svg","839c8ce0dc00ed2ccda96d4ed64fd650"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,c),e=urlsToCacheKeys.has(a));var n="./index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});