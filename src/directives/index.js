module.exports = function(app) {
  require('./project.js')(app);
  require('./education.js')(app);
  require('./project-crud.js')(app);
}
