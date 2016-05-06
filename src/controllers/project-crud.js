module.exports = function(app) {
  app.controller('ProjectCrudController', ['ProjectService', 'NavService', function(ProjectService, NavService) {

    var vm = this;
    vm.projects = null;

    vm.read = function() {
      console.log('crud get projects');
      ProjectService.getProjects(function(projects) {
        vm.projects = projects;
      })
    }

    vm.create = function(project) {
      console.log('create', project);
      ProjectService.create(project, function() {
        console.log('back from create project');
      });
    }

    vm.update = function(project) {
      console.log('update', project);
      ProjectService.update(project, function() {
        console.log('back from update project');
      });
    };
    vm.update.displayed = null;

    vm.delete = function(project) {
      console.log('delete ', project);
      ProjectService.delete(project, function() {
        console.log('back from project delete');
      });
    }

    vm.copyProject = function(project) {
      return JSON.parse(JSON.stringify(project));
    }

    vm.toProfessional = NavService.toProfessional;


    return vm;

  }]);
}
