module.exports = function(app) {
  app.directive('navMenu', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/nav-menu.html',
      controller: 'NavMenuController',
      controllerAs: 'navMenuCtrl'
    }
  });
}
