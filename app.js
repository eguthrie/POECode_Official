var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var async = require('async');

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
global.songQueue = {
  queue: [],
  getSongs: function(callback) {
    async.map(global.songQueue.queue, song.getSong, function(err, songList) {
      if (err)
        return console.error('Async error', err);

      callback(err, songList);
    });
  },
  addSong: function(id) {
    var songIndex = global.songQueue.queue.indexOf(id);
    if (songIndex === -1)
      global.songQueue.queue.push(id);

    global.songQueue.update();
  },
  removeSong: function(id) {
    var songIndex = global.songQueue.queue.indexOf(id);
    global.songQueue.queue.splice(songIndex, 1);

    global.songQueue.update();
  },
  update: function() {
    global.songQueue.getSongs(function(err, songs) {
      io.emit('queue-update', {
        queue: songs
      });
    });
  }
}

io.on('connection', function(socket) {
  console.log('New connection');

  // a client adds to the queue
  socket.on('queue-add', function(data) {
    global.songQueue.addSong(data.songId);
  });

  // a client removes from the queue
  socket.on('queue-remove', function(data) {
    global.songQueue.removeSong(data.songId);
  });

  socket.on('song-delete', function(data) {
    song.delete(data.songId, function(err) {
      global.songQueue.removeSong(data.songId);
    });
  });
});

server.listen(PORT, function() {
  console.log('App running on port',PORT);
});
