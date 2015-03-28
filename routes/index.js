var song = require('./song.js');

module.exports = {
	home: function(req, res) {
		song.getSongs(function(songs) {
			console.log('songs');
			console.log(songs);
			res.render('home', songs);
		});
	}
}