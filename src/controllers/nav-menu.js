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
      {name: 'home', action: vm.toHome},
      {name: 'professional', action: vm.toProfessional}
    ]


    return vm;

  }]);
};
