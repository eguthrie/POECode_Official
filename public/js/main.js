var socket = io.connect('http://localhost:3001');

var $songs = $(".song-thumb");

$songs.click(function(event) {
  var $song = $(this);
  
  socket.emit('queue-add', {
    songId: $song.attr('id')
  });
});