var $ = require('jquery');

module.exports = function(socket){

    var $remote = $('#remote');
    var $doc = $(document);

    /**
     *  Remote Click Event Handling
     */
    
    $remote.on('click', '.button', function(e){
        e.preventDefault();
        socket.emit('remote button clicked', $(e.currentTarget).data('key'));
    });       

    $('#keyboardShortcutToggle').on('click', function(e){
        e.preventDefault();
        $remote.toggleClass('shortcuts-visible');
    });

    /**
     *  Keyboard Event Handling
     */
    
    $doc.on("remote_ready", function () {

        $doc.on("keydown", function (e) {            
            var keyCode = e.keyCode;
            var keys = {
                8: 'back', //delete
                9: 'instantreplay', //tab
                13: 'play', //return
                27: 'home', //escape
                32: 'select', //spacebar
                37: 'left', //left
                38: 'up', //up
                39: 'right', //right
                40: 'down', //down
                70: 'fwd', //f                
                73: 'info', //i
                82: 'rev', //r                
            };

            if ( !e.metaKey ) {
                e.preventDefault();
            }

            if (keys[keyCode]) {
                $('.button[data-key="' + keys[keyCode]  + '"]').trigger('click');
                return false;
            }

        });
    });
};

