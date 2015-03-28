var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var Song = require('../models/song');
var handleErr = require('../utils/utils').handleErr;

var router = express.Router();

router.get('/', function(req, res) {
  Song.find().sort({ name: 1 }).exec(function(err, songs) {
    if (err)
      return handleErr(err, 'song:11');
    res.json(songs);
  });
});

// get an song by id
router.get('/:id', function(req, res) {
  res.end();
});

// add a new song
router.post('/', multer({ dest: './songs/' }), function(req, res) {
  var song = {};
  song.time = new Date();
  song.name = req.body.name;
  song.artist = req.body.artist;
  song.artPath = req.files.art.path;
  song.midiPath = req.files.midi.path;
  
  new Song(song).save(function(err, song) {
    if (err)
      return handleErr(err, 'song:33');

    res.json(song);
  });
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
