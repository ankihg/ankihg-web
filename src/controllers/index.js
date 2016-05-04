module.exports = function(app) {
  require('./home.js')(app);
  require('./nav-menu.js')(app);
  require('./professional.js')(app);
  require('./user.js')(app);
  require('./project-crud.js')(app);
}
