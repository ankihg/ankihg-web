module.exports = function(app) {
  require('./project.js')(app);
  require('./nav.js')(app);
  // require('./crud.js')(app);
}
