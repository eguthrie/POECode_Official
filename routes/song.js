var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var Song = require('../models/song');
var handleErr = require('../utils/utils').handleErr;

var router = express.Router();
router.getSongs = function(callback) {
  Song.find().sort({ name: 1 }).exec(function(err, songs) {
    if (err)
      return handleErr(err, 'song:11');
    callback(null, songs);
  });
};

router.getSong = function(id, callback) {
  Song.findOne({_id: id}).exec(function(err, song) {
    if (err)
      return handleErr(err, 'song:19');
    callback(null, song);
  })
}

// add a new song
router.post('/', multer({ dest: './public/songs/' }), function(req, res) {
  var song = {};
  song.time = new Date();
  song.name = req.body.name;
  song.artist = req.body.artist;
  song.artPath = req.body.artPath;

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

// delete a song by id
router.delete = function(id, callback) {
  Song.findOne({ _id: id }, function(err, song) {
    if (err)
      return handleErr(err, 'song:64')
    Song.findOneAndRemove({ _id: id }, function(err) {
      if (err)
        return handleErr(err, 'song:68')

      fs.unlink(song.artPath, function(err) {
        if (err)
          return handleErr(err, 'song:72')
        fs.unlink(song.midiPath, function(err) {
        if (err)
          return handleErr(err, 'song:75')
          if (callback)
            callback(err, true)
        });
      });
    });
  })
}

module.exports = router;
