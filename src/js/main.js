var $ = require('jquery');
var socket = require('socket.io-client')();
var cookie = require('./cookie');
var cookieName = 'roku_ip_address';


/**
 * Remote Event Handling
 * todo: make this a module
 */
var $remote = $('#remote');

$remote.on('click', '.button', function(e){
    e.preventDefault();
    socket.emit('remote button clicked', $(e.currentTarget).data('key'));
});



/**
 *  Keyboard Event Handling
 *  todo: make this a module
 */

$("body").on("keypress", function (e) {
    console.log(e);
});



/**
 * Ip Address form handling
 * todo: make this a module
 */

var $overlay = $('#ipOverlay');
var $form = $('#ipAddressForm');
var $input = $('#ipAddress');

//fill out previous ip address, if available
$(function(){
    var ip = cookie.get(cookieName);
    if(ip) {
        $input.val(ip);
    }
});

function toggleFormError(bool){
    toggleFormLoading(false);
    $form.toggleClass('has-error', bool);
};

function toggleFormLoading(bool){
    $form.toggleClass('has-loading', bool);
};

$form.on('submit', function(e){
    var value = $input.val().trim();

    toggleFormError(false);
    toggleFormLoading(true);

    if(value > '') {
        socket.emit('verify ip', value);
    }else{
        toggleFormError(true);
    }

    return false;
});

socket.on('ip failed', function () {
    toggleFormError(true);
});

socket.on('ip verified', function (info) {
    cookie.set(cookieName, $input.val(), 1)
    $overlay.removeClass('in');
    $input.val('');
    toggleFormLoading(false);
});

socket.on('abort', function (info) {
    window.location.reload();
});
