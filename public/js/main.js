var socket = io()

socket.on('queue-update', function(update) {
  var queue = Handlebars.partials.songQueue({
    songQueue: update.queue
  });
  $('#song-queue-wrapper').html(queue);

  bindRemove()
})

function bindRemove() {
  $('.remove-song').click(function(event) {
    var songId = $(this).parent().attr('id');

    socket.emit('queue-remove', {
      songId: songId
    });
  })
}

var $songs = $('.song-thumb');

$songs.click(function(event) {
  var $song = $(this);
  
  socket.emit('queue-add', {
    songId: $song.attr('id')
  });
});

bindRemove()