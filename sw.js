importScripts('localforage.min.js');


(function() {

  // Update 'version' if you need to refresh the cache
  var staticCacheName = 'static';
  var version = 'v1::';

  // Store core files in a cache (including a page to display when offline)
  function updateStaticCache() {
    return caches.open(version + staticCacheName)
      .then(function(cache) {
        return cache.addAll([]);
      });
  };

  self.addEventListener('install', function(event) {
    event.waitUntil(updateStaticCache());
  });

  self.onmessage = function(msg) {
    if (!msg.data.theme) {
      return;
    }

    localforage.setItem('theme', msg.data.theme);
  }

  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys()
      .then(function(keys) {
        // Remove caches whose name is no longer valid
        return Promise.all(keys
          .filter(function(key) {
            return key.indexOf(version) !== 0;
          })
          .map(function(key) {
            return caches.delete(key);
          })
        );
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    var request = event.request;
    // Always fetch non-GET requests from the network
    if (request.method !== 'GET') {
      event.respondWith(
        fetch(request)
        .catch(function() {
          return caches.match('/offline.html');
        })
      );
      return;
    }

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
//     if (request.headers.get('Accept').indexOf('text/html') !== -1) {
      event.respondWith(
        Promise.resolve()
        .then(() => request && request.url ? request.url.indexOf('/bulmaswatch/') >= 0 || request.url.indexOf('kb-style.css') >= 0 || request.url.indexOf('highlight.js') >= 0 : false)
        .then((shouldChange) => shouldChange ? localforage.getItem('theme').then((theme) => createNewThemeRequest(theme, request)) : request)
        .then((newRequest) => fetch(newRequest))
      );
      return;
//     }
  });

})();

function createNewThemeRequest(theme, request) {
  if (theme === 'kb-dark-theme') {
    
    let newUrl = request.url
      .replace('bulmaswatch/default/', 'bulmaswatch/superhero/')
      .replace('kb-style.css', 'kb-dark-style.css')
      .replace(/\/styles\/.*$/, '/styles/dracula.css');

    let darkThemeRequest = new Request(newUrl, {
      method: request.method
    });

    return darkThemeRequest;
  }

  return request;
}
