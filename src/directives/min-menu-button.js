module.exports = function(app) {
  app.directive('minMenuButton', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/min-menu-button.html',
      link: function(scope, element, attrs, controller) {
        var ctrl = JSON.parse(attrs.ctrl);
        var link = JSON.parse(attrs.link);
        var isHere = ctrl.youarehere === link.path;

        if (isHere) {
          element.find('.flag').css('display', 'inline');
        }

      }
    }
  });
}
