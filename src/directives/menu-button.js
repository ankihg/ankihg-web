module.exports = function(app) {
  app.directive('menuButton', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/menu-button.html',
      link: function(scope, element, attrs, controller) {
        element.on('mouseover', function() {
          console.log('hover');
          var ctrl = JSON.parse(attrs.ctrl);
          var link = JSON.parse(attrs.link);
          // console.log(link.name);
          console.log(ctrl.youarehere === '/'+link.name);
        })
      }
    }
  });
}
