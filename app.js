var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

// routes
var index = require('./routes/index');
var song = require('./routes/song');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);

var PORT = process.env.PORT || 3000;
var MONGO = process.env.MONGOURI_WIKI || 'mongodb://localhost/test';

mongoose.connect(MONGO);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', index.home);

//song router
app.use('/song', song);

// sockets
var SongQueue = function() {
  this.queue = []

  this.getSongs = this.queue.map(function(id) {
    return song.getSong(id)
  });

  return this;
}

global.songQueue = new SongQueue();

io.on('connection', function(socket) {
  console.log('New connection');

  socket.on('queue-add', function(data) {
    global.songQueue.queue.push(data.songId);
  });

  socket.on('queue-remove', function(data) {
    var index = global.songQueue.queue.indexOf(data.songId);
    global.songQueue.queue.splice(index, 1);
  });
})

app.listen(PORT, function() {
  console.log('App running on port',PORT);
});
