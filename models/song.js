var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Song', new Schema({
  name: String,
  artist: String,
  midiPath: String,
  artPath: String,
  created: Date
}));
