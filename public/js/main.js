var socket = io.connect('http://localhost:3001');

socket.on('queue-update', function(update) {
  var queue = Handlebars.partials.songQueue({
    songQueue: update.queue
  });
  $('#song-queue-wrapper').html(queue);

  bindEvents()
})

bindEvents()

function bindEvents() {
  var $songs = $('.song-thumb');
  var $removeButtons = $('.remove-song');

  $songs.one('click', function(event) {
    var $song = $(this);
    
    socket.emit('queue-add', {
      songId: $song.attr('id')
    });
  });

  $removeButtons.one('click', function(event) {
    var songId = $(this).parent().attr('id');

    socket.emit('queue-remove', {
      songId: songId
    });
  })
}