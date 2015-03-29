var song = require('./song.js');

module.exports = {
  home: function(req, res) {
    song.getSongs(function(err, songs) {
      res.render('home', { songs: songs, songQueue: global.songQueue.getSongs()});
    });
  }
}
