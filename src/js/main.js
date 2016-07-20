var $ = require('jquery');
var socket = require('socket.io-client')();
var $remote = $('#remote');

$remote.on('click', '.button', function(e){

    e.preventDefault();

    socket.emit('remote button clicked', $(e.currentTarget).data('key'));

});




      
