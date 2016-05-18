module.exports = function(app) {
  app.directive('minNavMenu', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/min-nav-menu.html',
      controller: 'NavMenuController',
      controllerAs: 'navMenuCtrl'
    }
  });
}
