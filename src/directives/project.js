module.exports = function(app) {
  app.directive('project', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/project.html'
    }
  });
}
