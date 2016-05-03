module.exports = function(app) {
  app.directive('projectCrud', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/project-crud.html'
    }
  })
}
