module.exports = function(app) {
  app.directive('menuButton', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/menu-button.html',
      link: function(scope, element, attrs, controller) {
        var ctrl = JSON.parse(attrs.ctrl);
        var link = JSON.parse(attrs.link);
        var isHere = ctrl.youarehere === link.path;

        if (isHere) {
          element.find('.flag').css('display', 'inline');
        }
        // element.on('mouseover', function() {
        //   console.log('hover');
        //   if (isHere) element.find('.flag').attr('src', '../../media/flags/flag_red.gif');
        // })
        //
        // element.on('mouseleave', function() {
        //   console.log('hover');
        //   if (isHere) element.find('.flag').attr('src', '../../media/flags/flag_red.png');
        // })
      }
    }
  });
}
