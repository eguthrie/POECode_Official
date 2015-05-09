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

//calculating duration between ticks
var ticksPerBeat = midiFile.tracks.ticksPerBeat;
// var uSecondsInMinute= 600000;
// var BPM= 120;
// var BPuS= BPM/uSecondsInMinute;
// var ticksPeruS= ticksPerbeat*BPuS;
// var uSperTick= 1/ticksPeruS;

//there are only so many note numbers we care about. 
//All in a dictionary so we can change the state of that note

// var notes = {}
// for (var i = 52; i <= 81; i++) {
// 	notes[i]=0x0;
// };

// var noteNumberMapping = function (notes, state, midiTick) {
	
// 	notes[midiTick[noteNumber]]=state;

// }

// var updateOutput = function(output, notes) {

// 	output=
// }
var getTempo = function(mf) {
	for (var i = 0; i < mf.tracks[0].length; i++) {
		var metaTick = mf.tracks[0][i];
		if (metaTick.subtype === "setTempo") {
			return metaTick.microsecondsPerBeat;
		}
	};
}

var getMicro = function(diff) {
	var hrtime = diff ? process.hrtime(diff) : process.hrtime();
	return {full: hrtime, us: hrtime[0]*1000000+hrtime[1]/1000};//current time in microseconds
}

//generating output of the note
var playSong = function(mf, tempo) {
	var lastMicro = getMicro();
	for (var i = 0; i <= midiFile.tracks[1].length - 1; i++) {
		var midiTick = midiFile.tracks[1][i];
		var deltaTimeTicks = midiTick.deltaTime;
		var waitMicro = (tempo/ticksPerBeat)*deltaTimeTicks;
		var type = midiTick.type;
		var subtype = midiTick.subtype;
		var noteNumber = midiTick.noteNumber;
		var deltaMicro = getMicro(lastMicro.full);
		while (deltaMicro.us < waitMicro) {
			//busy wait?
		}

		if (type === "meta") {

		}
		if (type === "channel" && (subtype === 'noteOn' || subtype === 'noteOff')){
			state = subtype === 'noteOn' ? 1:0;
			// noteNumberMapping(notes, state, midiTick);
			// updateOutput(output, notes);
			console.log(subtype, noteNumber);
		}
	};
}
var tempo = getTempo(midiFile)
playSong(midiFile, tempo);
