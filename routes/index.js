var song = require('./song.js');

module.exports = {
  home: function(req, res) {
    song.getSongs(function(songs) {
      res.render('home', { songs: songs });
    });
  }
}