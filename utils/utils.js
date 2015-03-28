module.exports = {
  handleErr: function(err, msg) {
    return console.error('Message:', msg,
      ' -- Error: ', err);
  }
}
