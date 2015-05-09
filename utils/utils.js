module.exports = {
  handleErr: function(err) {
    console.error('Err:', err);
    return console.trace();
  }
}
