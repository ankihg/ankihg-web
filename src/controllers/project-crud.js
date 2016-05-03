module.exports = function(app) {
  app.controller('ProjectCrudController', ['ProjectService', function(ProjectService) {

    var vm = this;
    vm.projects = null;

    vm.getProjects = function() {
      console.log('crud get projects');
      ProjectService.getProjects(function(projects) {
        vm.projects = projects;
      })
    }




    return vm;

  }]);
}
