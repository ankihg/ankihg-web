module.exports = function(app) {
  app.directive('education', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/education.html'
    }
  });
}
