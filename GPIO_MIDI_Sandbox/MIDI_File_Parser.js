// Midi file playground testing parsign and GPIO output

var fs = require("fs");
var MF = require("midi-file-parser");
var path = require("path");

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
    var state = subtype === 'noteOn' ? 1:0;
    // noteNumberMapping(notes, state, midiTick);
    // updateOutput(output, notes);
    var note = notes[noteNumber];
    if (note) {
      if (subtype === 'noteOn') {
        fretState |= note;
      } else {
        fretState ^= note;
      }
      console.log(subtype, decbin(note, 32));
      console.log(decbin(fretState, 32));
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