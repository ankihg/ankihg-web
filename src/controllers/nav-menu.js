module.exports = function(app) {
  app.controller('NavMenuController', ['NavService', function(NavService) {

    var vm = this;
    vm.plz = 'plz respond';

    vm.youarehere = 'home';

    vm.toProfessional = function() {
      console.log('menu to prof');
      vm.youarehere = 'professional';
      NavService.toProfessional();
    };
    vm.toHome = function() {
      console.log('menu to home');
      vm.youarehere = 'home';
      NavService.toHome();
    };

    vm.links = [
      {name: 'home', action: vm.toHome, url:'#/home'},
      {name: 'professional', action: vm.toProfessional, url:'#/professional'}
    ]


    return vm;

  }]);
};
