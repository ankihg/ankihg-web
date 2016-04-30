module.exports = function(app) {
  console.log('controllers require');
  require('./home.js')(app);
  console.log('required home');
}
