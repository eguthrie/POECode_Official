var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var Song = require('../models/song');
var handleErr = require('../utils/utils').handleErr;

var router = express.Router();
router.getSongs = function(callback) {
  Song.find().sort({ name: 1 }).exec(function(err, songs) {
    if (err)
      return handleErr(err, 'song:11');
    callback(songs);
  });
}

router.get('/', function(req, res) {
  router.getSongs(function(songs) {
    res.json(songs);
  });
});

// get an song by id
router.get('/:id', function(req, res) {
  res.end();
});

// add a new song
router.post('/', multer({ dest: './public/songs/' }), function(req, res) {
  var song = {};
  song.time = new Date();
  song.name = req.body.name;
  song.artist = req.body.artist;
  if (!req.files.art) req.files.art.path = "songs/default.png";
  song.artPath = "songs/"+req.files.art.name;

  if (!req.files.midi) {
    res.end("You must submit a midi file");
  } else {
    song.midiPath = req.files.midi.path;
    
    new Song(song).save(function(err, newSong) {
      if (err)
        return handleErr(err, 'song:33');
      res.redirect("/");
    });
  }
});

// // delete an article by id
// router.delete('/:id', function(req, res) {
//   Article.findOneAndRemove({ _id: req.params.id }, function(err) {
//     if (err)
//       return handleErr(err, 'article:46')

//     res.json({ success: true });
//   })
// });

module.exports = router;
