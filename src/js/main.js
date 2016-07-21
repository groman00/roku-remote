var $ = require('jquery');
var socket = require('socket.io-client')();
require('./components/ipAddressForm')(socket);
require('./components/remote')(socket);

/* If we catch a server error, just reload the page  */
socket.on('abort', function (info) {
  window.location.reload();
});
