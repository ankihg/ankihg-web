module.exports = function(app) {
  app.controller('ProjectCrudController', ['ProjectService', function(ProjectService, CrudService) {

    var vm = this;
    vm.projects = null;

    vm.read = function() {
      console.log('crud get projects');
      ProjectService.getProjects(function(projects) {
        vm.projects = projects;
      })
    }

    vm.create = function(project) {

    }

    vm.update = function(project) {
      console.log('update', project);
    };

    vm.delete = function(project) {
      console.log('delete ', project);
      ProjectService.delete(project, function() {
        console.log('back from project delete');
      });
    }




    return vm;

  }]);
}
