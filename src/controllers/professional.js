module.exports = function(app) {

  app.controller('ProfessionalController', ['$scope', 'ProjectService', 'NavService', function($scope, ProjectService, NavService) {

    var vm = this;
    vm.tags = null;
    vm.allProjects = null;
    vm.dipslayedProjects = null;

    vm.getProjects = function() {
      ProjectService.getProjects(function(projects) {
        console.log('get projects');
        vm.allProjects = projects;
        vm.tags = ProjectService.getTags().map(function(tag) {
          return {tag: tag, display: false}
        });
        vm.setProjectsByTags(projects);
      });
    }

    vm.setProjectsByTags = function(projects) {
      projects = projects || vm.allProjects;
      vm.displayedProjects = projects.filter(function(project) {
        return project.tags.filter(function(pTag) {
          return vm.tags.filter(function(sTag) { return sTag.display })
          .map(function(sTag) { return sTag.tag })
          .indexOf(pTag) >= 0;
        }).length > 0;
      });
      return vm.displayedProjects = (vm.displayedProjects.length) ? vm.displayedProjects : vm.allProjects;
    }



    // console.log(project.tags.filter(function(pTag) {
    //   return vm.tags.filter(function(sTag) { return sTag.display })
    //   .map(function(sTag) { return sTag.tag })
    //   .indexOf(pTag) >= 0;
    // }));

    vm.education = [
      {
        title: "code 301: intermediate software development",
        place: "code fellows, seattle, wa",
        url: "https://www.codefellows.org/courses/code-301/intermediate-software-development",
        date: "january 2016"
      },
      {
        title:   "bachelor's degree in computer science",
        place: "willamette university, salem, or",
        url: "http://www.willamette.edu/cla/cs/",
        date: "2011 - 2015"
      }
    ];

    vm.toHome = function() {
      return NavService.toHome();
    };

    vm.toCrud = function() {
      return NavService.toCrud();
    };

    vm.toSignin = function() {
      return NavService.toSignin();
    };

    return vm;
  }])

}
