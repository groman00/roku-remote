var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Roku = require('roku');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  
  console.log('a user connected');

  socket.on('remote button clicked', function(key){
    console.log('key pressed: ' + key);
    if(socket.device) {
      socket.device.press(Roku[key.toUpperCase()]);
    } else {
      socket.emit('abort');
    }
  }); 

  socket.on('verify ip', function(ip){
    console.log('verifying roku at ' + ip);
    var device = new Roku('http://' + ip + ':8060/');
    device.info(function(error, info){
      if(error) {
        console.log('error', error);
        socket.emit('ip failed');
      } else {
        console.log(ip + ' verified');
        socket.device = device;
        socket.emit('ip verified', info);
      }
    });
  }); 

});


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

http.listen(app.get('port'), app.get('ip'), function(){
  console.log('listening on *:3000');
});
