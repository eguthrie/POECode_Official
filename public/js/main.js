var socket = io.connect('http://localhost:3001');

var $songs = $('.song-thumb');

$songs.click(function(event) {
  var $song = $(this);
  
  socket.emit('queue-add', {
    songId: $song.attr('id')
  });
});

var $removeButtons = $('.remove-song');

$removeButtons.click(function(event) {
  var songId = $(this).parent().attr('id');

  socket.emit('queue-remove', {
    songId: songId
  });
})