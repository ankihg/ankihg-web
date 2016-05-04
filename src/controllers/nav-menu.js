module.exports = function(app) {
  app.controller('NavMenuController', ['NavService', function(NavService) {

    var vm = this;
    vm.plz = 'plz respond';

    vm.toProfessional = NavService.toProfessional;
    vm.toHome = NavService.toHome;

    vm.links = [
      {name: 'home', action: vm.toHome},
      {name: 'professional', action: vm.toProfessional}
    ]

    return vm;

  }]);
};
