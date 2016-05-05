module.exports = function(app) {
  app.directive('menuButton', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/menu-button.html',
      link: function(scope, element, attrs, controller) {
        element.on('mouseover', function() {
          console.log('hover');
          console.log(attrs.ctrl.youarehere);
          console.log(attrs.link.name);
          console.log(attrs.ctrl.youarehere === attrs.link.name);
        })
      }
    }
  });
}
