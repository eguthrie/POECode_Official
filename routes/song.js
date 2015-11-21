var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var Song = require('../models/song');
var request = require('request');
var handleErr = require('../utils/utils').handleErr;

var router = express.Router();
router.getSongs = function(callback) {
  Song.find().sort({ name: 1 }).exec(function(err, songs) {
    if (err)
      return handleErr(err);
    callback(null, songs);
  });
};

router.getSong = function(id, callback) {
  Song.findOne({_id: id}).exec(function(err, song) {
    if (err)
      return handleErr(err);
    callback(null, song);
  })
}
function getSpotify(name, artist, callback){
  request("https://api.spotify.com/v1/search?q=track:'" +
    encodeURIComponent(name) +
    "'+artist:'"+
    encodeURIComponent(artist || "")+
    "'&type=track", 
    function(err, response, body) {
      var song = {}
      var track = JSON.parse(body).tracks.items[0];
      if (!track){
        song.image = "songs/notfound.png"
        song.name = name
        song.artist = artist
        callback(song);
      }
      else {
        song.image = track.album.images[1].url;
        song.name = track.name;
        song.artist = track.artists[0].name;
        callback(song);
      }
    });
}

router.getPathById = function(id, callback) {
  router.getSong(id, function(err, song) {
    callback(err, song.midiPath);
  })
}

// add a new song
router.post('/', multer({ dest: './public/songs/' }), function(req, res) {
  var song = {};
  song.time = new Date();
  song.name = req.body.name;
  song.artist = req.body.artist;
  if (!req.files.midi) {
    res.end("You must submit a midi file");
  } else {
    getSpotify(song.name, song.artist, function(checkedSong) { 
      song.name = checkedSong.name;
      song.artist = checkedSong.artist;
      song.artPath = checkedSong.image;
      song.midiPath = req.files.midi.path;
      console.log(song);
      
      new Song(song).save(function(err, newSong) {
        if (err)
          return handleErr(err);
        res.redirect("/");
      });
    });
  }
});

// delete a song by id
router.delete = function(id, callback) {
  Song.findOne({ _id: id }, function(err, song) {
    if (err)
      return handleErr(err)
    if (song) {
      Song.findOneAndRemove({ _id: id }, function(err) {
        if (err)
          return handleErr(err)
        fs.unlink(song.midiPath, function(err) {
          if (err)
            return handleErr(err)
          if (callback)
            callback(err, true)
        });
      });
    }
  })
}

module.exports = router;
