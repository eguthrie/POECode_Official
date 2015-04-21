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

function getArt(name, callback){
  $.get("https://api.spotify.com/v1/search?q=" +
    name.replace(" ","+") +
    "&type=track", 
    function(data) {
      var image = data.tracks.items[0].album.images[1].url;
      callback(image);
    });
}

$('#uploadForm').submit(function(event) {
  event.preventDefault();
  var song = $("#uploadForm input[name=name]").val();
  var artist = $("#uploadForm input[name=artist]").val();
  var file = $('#uploadForm input[type="file"]')[0].files[0];
  var data = new FormData($("#uploadForm"));
  getArt(song, function(image) {
    data.append("artPath", image);
    $.ajax({
      url: "/song", 
      type: "POST",
      data: data,
      processData: false,
      contentType: "multipart/form-data"
    });
  });
});

bindQueue()
bindThumbs()
