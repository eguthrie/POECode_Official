var fs = require("fs");
var MF = require("midi-file-parser");
var path = require("path");
// var gpio = require('pi-gpio');
var spi = require('pi-spi').initialize('/dev/spidev0.0');

// make note mappings
var notes = {
  // EADGBE
  40: 0b00000000000000000000000000000000,// E
  41: 0b00000000000000000000000000010000,// F
  42: 0b00000000000000000000000000001000,// F#
  43: 0b00000000000000000000000000000100,// G
  44: 0b00000000000000000000000000000010,// G#
//      |    |    |    ||    |    |    |
  45: 0b00000000000000000000000000000000,// A
  46: 0b00000000000000000000010000000000,// A#
  47: 0b00000000000000000000001000000000,// B
  48: 0b00000000000000000000000100000000,// C
  49: 0b00000000000000000000000010000000,// C#
//      |    |    |    ||    |    |    |
  50: 0b00000000000000000000000000000000,// D
  51: 0b00000000000000001000000000000000,// D#
  52: 0b00000000000000000100000000000000,// E
  53: 0b00000000000000000010000000000000,// F
  54: 0b00000000000000000001000000000000,// F#
//      |    |    |    ||    |    |    |
  55: 0b00000000000000000000000000000000,// G
  56: 0b00000000000000100000000000000000,// G#
  57: 0b00000100000000000000000000000000,// A
  58: 0b00000010000000000000000000000000,// A#
//      |    |    |    ||    |    |    |
  59: 0b00000000000000000000000000000000,// B
  60: 0b00000010000000000000000000000000,// C
  61: 0b00000001000000000000000000000000,// C#
  62: 0b00000000100000000000000000000000,// D
  63: 0b00000000010000000000000000000000,// D#
//      |    |    |    ||    |    |    |
  64: 0b00000000000000000000000000000000,// E
  65: 0b10000000000000000000000000000000,// F
  66: 0b01000000000000000000000000000000,// F#
  67: 0b00100000000000000000000000000000,// G
  68: 0b00010000000000000000000000000000,// G#
  69: 0b00001000000000000000000000000000,// A
};

var fretState;
var strumState; // high on left, low on right
var stringPins; // can add more for B+

var resetState = function() {
  fretState = 0x00000000;
  strumState = [true, true, true, true, true, true]; // high on left, low on right
  stringPins = [[7, 11], [12, 13], [15, 16], [18, 22]]; // can add more for B+

  for (var i = 0; i < stringPins.length; i++) {
    strumGPIO(i);
  }
}

var strumGPIO = function(string) {
  var pos = strumFromState(strumState[string]);
  var pins = stringPins[string];

  // console.log('strumState:', pins, pos);
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
  var stateString = decbin(fretState, 32);
  var octets = [];
  for (var i = 0; i < 4; i++) {
    octets.push(parseInt(stateString.substring(i*8, (i+1)*8), 2))
  }
  console.log(octets);
  var stateBuff = Buffer(octets);
  console.log('fretStateString: ', decbin(fretState));
  console.log('fretState:', stateBuff);
  spi.transfer(stateBuff, stateBuff.length, function(err) {
    if (err) {
      return console.error(err);
    }
  });
}

var strumFromState = function(state) {
  switch(state) {
    case  true: return [0, 1];
    case false: return [1, 0];
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
        strumGPIO(stringFromNote(noteNumber));
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