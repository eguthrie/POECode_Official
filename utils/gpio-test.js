var gpio = require('pi-gpio');

stringPins = [
  [3, 5],
  [7, 8],
  [10, 11],
  [12, 13],
  [15, 16],
  [18, 22]
];

function doshit() {
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
}

doshit();

function openshit() {
  stringPins.forEach(function(pinList) {
    pinList.forEach(function(pin) {
      console.log('==========================');
      console.log(pin);
      gpio.open(pin, 'output pulldown', function(err) {
        if (err) {
          return console.error(err);
        }
      });
    });
  });
}
