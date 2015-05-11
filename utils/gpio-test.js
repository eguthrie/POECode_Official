var gpio = require('pi-gpio');

stringPins = [
  [3, 5],
  [7, 8],
  [10, 11],
  [12, 13],
  [15, 16],
  [18, 22]
];

stringPins.forEach(function(pinList) {
  pinList.forEach(function(pin) {
    gpio.close(pin, 'output pulldown', function(err) {
      if (err) {
        return console.error(err);
      }
    });
  });
});