var fs = require("fs");
var MF = require("midi-file-parser");
var path = require("path");
// var gpio = require('pi-gpio');
// var spi = require('pi-spi').intialize('/dev/spidev0.0');

// make note mappings
var notes = {};
for (var i = 52; i <= 81; i++) {
  notes[i] = 0x01 << 81-i+2;
}

var fretState;
var strumState; // high on left, low on right
var stringPins; // can add more for B+

var resetState = function() {
  fretState = 0x00;
  strumState = [True, True, True, True, True, True]; // high on left, low on right
  stringPins = [[7, 11], [12, 13], [15, 16], [18, 22]]; // can add more for B+

  for (var i = 0; i < stringPins.length; i++) {
    strumGPIO(i);
  }
}

var strumGPIO = function(string) {
  var pos = strumFromState(strumState[string]);
  var pins = stringPins[string];

  console.log('strumState:', pins, pos);
  // for (var i = 0; i < pos.length; i++) {
  //   gpio.open(pins[i], 'output', function(err) {
  //     gpio.write(pins[i], pos[i], function() {
  //       gpio.close(pins[i]);
  //     });
  //   });
  // }

  strumState[string] = !strumState[string];
}

var fretSPI = function(state) {
  var stateBuff = Buffer(state)
  // console.log('fretState:', decbin(state, 32));
  spi.transfer(stateBuff, stateBuff.length, function(err) {
    if (err) {
      return console.error(err);
    }
  });
}

var strumFromState = function(state) {
  switch(state) {
    case  True: return [0, 1];
    case False: return [1, 0];
  }
}

var stringFromNote = function(noteNum) {
  var stringMask = 0b11111 << 2;
  for (var i = 0; i < 5; i++) {
    if (noteNum & stringMask) {
      return i;
    }

    stringMask <<= 5;
  }
  console.log("Note wasn't on a string.");
  return -1;
}

//tempo is micros/beat for whatever the time signature says a beat is
var getTempo = function(mf) {
	for (var i = 0; i < mf.tracks[0].length; i++) {
		var metaTick = mf.tracks[0][i];
		if (metaTick.subtype === "setTempo") {
			return metaTick.microsecondsPerBeat;
		}
	};
}

function decbin(dec,length){
  var out = "";
  while(length--)
    out += (dec >> length ) & 1;    
  return out;  
}

var handleMidiEvent = function(track, tempo, index, callback) {
  var midiTick = track[index];
  var type = midiTick.type;
  var subtype = midiTick.subtype;
  var noteNumber = midiTick.noteNumber;

  if (type === "meta") {
    if (subtype === "endOfTrack") {
      return callback(null);
    }
  }
  if (type === "channel" && (subtype === 'noteOn' || subtype === 'noteOff')){
    var note = notes[noteNumber];
    if (note) {
      if (subtype === 'noteOn') {
        fretState |= note;
      } else {
        fretState ^= note;
      }
      fretSPI(fretState);

      if (subtype === 'noteOn') {
        strumGPIO(stringFromNote(noteNum));
      }
    }
  }

  var midiTickNext = track[index+1];

  var deltaTimeTicks = midiTickNext.deltaTime; // number of ticks since last event
  var waitMillis = (tempo/ticksPerBeat)*deltaTimeTicks/1000;

  setTimeout(function() {
    handleMidiEvent(track, tempo, index+1)
  }, waitMillis);
}

//generating output of the note
var playSong = function(midiFile, tempo, callback) {
  handleMidiEvent(midiFile.tracks[1], tempo, 0, callback)
}

// code starts running

module.exports.play = function(midiPath, callback) {
  var midiFile = MF(fs.readFileSync(midiPath, 'binary'));
  var tempo = getTempo(midiFile);
  //calculating number of ticks in a beat
  global.ticksPerBeat = midiFile.header.ticksPerBeat;
  resetState();
  playSong(midiFile, tempo, function(err) {
    resetState();
    callback(err);
  });
}