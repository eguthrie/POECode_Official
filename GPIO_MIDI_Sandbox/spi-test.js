var SPI = require('pi-spi');

var spi = SPI.initialize("/dev/spidev0.0");
var test = Buffer("Hello, World!");

// reads and writes simultaneously
spi.transfer(test, test.length, function (err, data) {
  if (err)
    console.error(err);
  else
    console.log("Got \"" + data.toString() + "\" back.");

  if (test.toString() === data.toString()) {
    console.log(data);
  } else {
    // NOTE: this will likely happen unless MISO is jumpered to MOSI
    console.warn(data);
    process.exit(-2);
  }
});