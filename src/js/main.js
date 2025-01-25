// var $ = require('jquery');
import "jquery";

var socket = require('socket.io-client')();
require('./components/ipAddressForm')(socket);
require('./components/remote')(socket);

/* If we catch a server error, just reload the page  */
socket.on('abort', function (info) {
  window.location.reload();
});

if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register("/serviceWorker.js");
  navigator.serviceWorker.register(
    new URL('./sw.js', import.meta.url),
    {type: 'module'}
  );
}