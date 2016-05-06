module.exports = function(app) {
  app.controller('NavMenuController', ['NavService', function(NavService) {

    var vm = this;
    vm.plz = 'plz respond';

    vm.youarehere = NavService.getLocation();

    vm.toProfessional = function() {
      NavService.toProfessional();
      vm.youarehere = NavService.getLocation();
    };
    vm.toHome = function() {
      NavService.toHome();
      vm.youarehere = NavService.getLocation();
    };

    vm.links = [
      {name: 'home', action: vm.toHome, path: '/home'},
      {name: 'professional', action: vm.toProfessional, path: '/professional'},
      {name: 'coming soon', action: vm.toHome, path: '/home'},
    ]


    return vm;

  }]);
};
