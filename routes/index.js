var song = require('./song.js');

module.exports = {
  home: function(req, res) {
    song.getSongs(function(err, songs) {
      global.songQueue.getSongs(function(err, songList) {
        res.render('home', { songs: songs, songQueue: songList });
      });
    });
  },
  upload: function(req, res) {
    res.render('upload');
  }
}
