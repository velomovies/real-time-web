const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const http = require('http').Server(app)
const io = require('socket.io')(http)

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

app.use(express.static(__dirname + '/sources'))

nunjucks.configure('sources/views', {
  autoescape: true,
  express: app
})

app.get('/', function (req, res){
  res.render('index.html', {
    color: getRandomColor()
  })
})


io.on('connection', function (socket) {  
  socket.on('piano tone', function (tone) {
    socket.broadcast.emit('piano tone', tone)
  })
  socket.on('disconnect', function () {
    console.log('user disconnected');
  })
})

http.listen(process.env.PORT || 5000, function () {
  console.log('listening');
})
    