var gpio = require('pi-gpio');

stringPins = [
  [3, 5],
  [7, 8],
  [10, 11],
  [12, 13],
  [15, 16],
  [18, 22]
];

pins = stringPins[4];

gpio.write(pins[0], 0, function(){});

gpio.write(pins[1], 0, function(){});

var i = 0;
setInterval(function() {
  if (i%2 === 0) {
    gpio.write(pins[0], 1, function() {
      setTimeout(function() {
        gpio.write(pins[0], 0);
      }, 40);
    });
  }
  else {
    gpio.write(pins[1], 1, function() {
      setTimeout(function() {
        gpio.write(pins[1], 0);
      }, 40);
    });
  }
  i++;
}, 500);

//stringPins.forEach(function(pinList) {
//  pinList.forEach(function(pin) {
//    console.log('==========================');
//    console.log(pin);
 //   gpio.write(pin, 0, function(err) {
 //     if (err) {
 //       return console.error(err);
  //    }
  //  });
//  });