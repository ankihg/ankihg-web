module.exports = function(app) {
  app.controller('NavMenuController', ['NavService', function(NavService) {

    var vm = this;
    vm.plz = 'plz respond';

    vm.location = 'home';

    vm.toProfessional = function() {
      location = 'professional';
      NavService.toProfessional();
    };
    vm.toHome = function() {
      location = 'home';
      NavService.toHome();
    };

    vm.links = [
      {name: 'home', action: vm.toHome, url:'#/home'},
      {name: 'professional', action: vm.toProfessional, url:'#/professional'}
    ]


    return vm;

  }]);
};
