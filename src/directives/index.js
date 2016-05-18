module.exports = function(app) {
  require('./project.js')(app);
  require('./education.js')(app);
  require('./project-crud.js')(app);
  require('./nav-menu.js')(app);
  require('./menu-button.js')(app);
  require('./min-nav-menu.js')(app);
  require('./min-menu-button.js')(app);

}
