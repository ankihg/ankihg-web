module.exports = function(app) {

  app.controller('ProfessionalController', ['$scope', 'ProjectService', function($scope, ProjectService) {

    var vm = this;
    vm.tags = ProjectService.getTags().map(function(tag) {
      return {tag: tag, display: false}
    });

    vm.setProjectsByTags = function() {
      ProjectService.getProjects(function(projects) {
        projects.filter(function(project) {
          return project.tags.filter(function(pTag) {
            return vm.tags.filter(function(sTag) { return sTag.display })
            .map(function(sTag) { return sTag.tag })
            .indexOf(pTag) >= 0;
          }).length > 0;
        });
        return vm.projects = (projects.length) ? projects : ProjectService.getProjects();
      })
    }

   vm.setProjectsByTags();


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


    /*<script src="vendor/page.js"></script>

    <script src="scripts/indexController.js"></script>

    <script src="scripts/project.js"></script>
    <script src="scripts/projectView.js"></script>
    <script src="scripts/projectController.js"></script>

    <script src="scripts/education.js"></script>

    <script src="scripts/aboutController.js"></script>

    <script src="scripts/routes.js"></script>*/

    // require('./professional-scripts/aboutController.js')($scope);
    // require('./professional-scripts/education.js')($scope);
    // require('./professional-scripts/indexController.js')($scope);
    // require('./professional-scripts/project.js')($scope);
    // require('./professional-scripts/projectController.js')($scope);
    // require('./professional-scripts/projectView.js')($scope);
    // require('./professional-scripts/routes.js')($scope);
    // require('./professional-scripts/treeCanvas.js')($scope);

    console.log('professional controller created');
    return vm;
  }])

}
