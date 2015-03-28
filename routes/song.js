var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
// var Song = require('../models/song');
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
  req.body.created = new Date();
  var artName = req.files.art.name;
  var midiName = req.files.
  console.log(req.files);
  // new Song(req.body).save(function(err, article) {
  //   if (err)
  //     return handleErr(err, 'article:33');

  //   res.json(article);
  // });
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
