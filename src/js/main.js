var $ = require('jquery');
var socket = require('socket.io-client')();


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
 * Ip Address form handling
 * todo: make this a module
 */

var $overlay = $('#ipOverlay');
var $form = $('#ipAddressForm');
var $input = $('#ipAddress');

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
    $overlay.removeClass('in');
    $input.val('');
    toggleFormLoading(false);
});

socket.on('abort', function (info) {
    window.location.reload();
});

      


