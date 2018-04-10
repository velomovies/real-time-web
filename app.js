const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname + '/sources'))

nunjucks.configure('sources/views', {
  autoescape: true,
  express: app
})

app.get('/', function(req, res){
  res.render('index.html')
})

io.on('connection', function(socket){
  socket.on('piano tone', function(tone){
    io.emit('piano tone', tone);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening');
})
    