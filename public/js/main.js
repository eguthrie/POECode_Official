var socket = io()

socket.on('queue-update', function(update) {
  var songQueue = Handlebars.partials.songQueue({
    songQueue: update.queue
  });
  $('#song-queue-wrapper').html(songQueue);

  bindQueue();
})

socket.on('songs-update', function(update) {
  var songThumbs = Handlebars.partials.songThumbs({
    songs: update.songs
  });
  $('#song-thumbs-wrapper').html(songThumbs);

  bindThumbs();
})

function bindQueue() {
  $('.song-queued .remove-song').click(function(event) {
    var songId = $(this).parent().attr('id');

    socket.emit('queue-remove', {
      songId: songId
    });
  });
}

function bindThumbs() {
  $('.song-thumb .remove-song').click(function(event) {
    var $song = $(this).parent();

    socket.emit('song-delete', {
      songId: $song.attr('id')
    });
  });

  $('.song-thumb .queue-song').click(function(event) {
    var $song = $(this).parent();
    
    socket.emit('queue-add', {
      songId: $song.attr('id')
    });
  });
}

bindQueue()
bindThumbs()