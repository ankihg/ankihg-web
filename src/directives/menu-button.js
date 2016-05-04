module.exports = function(app) {
  app.directive('menuButton', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/menu-button.html'
    }
  });
}
