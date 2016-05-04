module.exports = function(app) {
  require('./auth.js')(app);
  require('./project.js')(app);
  require('./nav.js')(app);
  // require('./crud.js')(app);
}
