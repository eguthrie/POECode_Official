// Midi file playground testing parsign and GPIO output

var fs = require("fs");
var MF = require("midi-file-parser");
var path = require("path");
var gpio = require('pi-gpio');

//var mypath = path.join(__dirname,"midi.mid");
var myBuffer = fs.readFileSync('midi1.mid','binary');
var midiFile =  MF(myBuffer);

//midiFile comprised of .header and .tracks.: .header has formatType
//trackCount, and ticksPerBeat 
//.tracks has deltaTime channel type noteNumber velocity subtype

// make note mappings
var notes = {};
for (var i = 52; i <= 81; i++) {
  notes[i] = 0x01 << 81-i+2;
}

var fretState = 0x00;
var strumState = [True, True, True, True, True, True]; // high on left, low on right
var stringPins = [[7, 11], [12, 13], [15, 16], [18, 22]]; // can add more for B+

var strumGPIO = function(string) {
  var pos = strumFromState(strumState[string]);
  var pins = stringPins[string];

  for (var i = 0; i < pos.length; i++) {
    gpio.open(pins[i], 'output', function(err) {
      gpio.write(pins[i], pos[i], function() {
        gpio.close(pins[i]);
      });
    });
  }

  strumState[string] = !strumState[string];
}

var strumFromState = function(state) {
  switch(state) {
    case  True: return [0, 1];
    case False: return [1, 0];
  }
}

var stringFromNote = function(noteNum) {
  var stringMask = 0b11111 << 2;
  for (int i = 0; i < 5; i++) {
    if (noteNum & stringMask) {
      return i;
    }

    stringMask <<= 5;
  }
  console.log("Note wasn't on a string.");
  return -1;
}

//calculating number of ticks in a beat
var ticksPerBeat = midiFile.header.ticksPerBeat;

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

var handleMidiEvent = function(track, tempo, index) {
  var midiTick = track[index];
  var type = midiTick.type;
  var subtype = midiTick.subtype;
  var noteNumber = midiTick.noteNumber;

  if (type === "meta") {

  }
  if (type === "channel" && (subtype === 'noteOn' || subtype === 'noteOff')){
    var note = notes[noteNumber];
    if (note) {
      if (subtype === 'noteOn') {
        fretState |= note;
      } else {
        fretState ^= note;
      }
      console.log(subtype, decbin(note, 32));
      console.log(decbin(fretState, 32));
      // updateFretOut(fretState)
      if (subtype === 'noteOn') {
        strumGPIO(stringFromNote(noteNum))
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
var playSong = function(midiFile, tempo) {
  handleMidiEvent(midiFile.tracks[1], tempo, 0)
}
var tempo = getTempo(midiFile)
playSong(midiFile, tempo);