var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Roku = require('roku');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});




/**
 * Need to create a new Roku instance for each connection
 */
var device = new Roku('http://192.168.1.188:8060/');




io.on('connection', function(socket){
  
  console.log('a user connected');

  socket.on('remote button clicked', function(key){
    
    console.log('key pressed: ' + key);
    //console.log(Roku)
    device.press(Roku.UP);

  });  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});