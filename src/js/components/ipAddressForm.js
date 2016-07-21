var $ = require('jquery');
var cookie = require('../cookie');
var cookieName = 'roku_ip_address';

module.exports = function(socket){

  var $overlay = $('#ipOverlay');
  var $form = $('#ipAddressForm');
  var $input = $('#ipAddress');

  //fill out previous ip address, if available
  $(function(){
      var ip = cookie.get(cookieName);
      if(ip) {
          $input.val(ip);
      }
      $input.focus();
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
      $(document).trigger('remote_ready');
  });

};
