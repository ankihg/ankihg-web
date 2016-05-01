module.exports = function(app) {

  app.controller('ProfessionalController', ['$scope', function($scope) {

    var vm = this;

    vm.projects = [
      {
        name: "PORTLAND BRIDGES",
        url: "http://ankihg.ucoz.com/index/portland_bridges/0-92",
        imgSrc: "http://ankihg.ucoz.com/pdx_br/portland_bridges.png",
        date:"2015-12-10",
        tags: ["HTML", "CSS", "JavaScript", "Google Maps API"],
        about: "<h4>Like an interstate, </h4><p> &nbsp &nbsp the Willamette River tears the metropolis.</p><h4 style='text-align:center'> Cross me to connect.</h4><h3>Explore bridges and other crossings </h3><h4 style='text-align:right'> in the U.S. state of Oregon.</h4>"
      },
      {
        name: "ZANREADS . INFO",
        url: "http://www.zanreads.info/",
        imgSrc: "http://ankihg.ucoz.com/zanreads/zanreads2.png",
        date:"2015-10-31",
        tags: ["HTML", "CSS", "JavaScript", "website management"],
        about: "<p>My client Zan requested a spooky website to display book reviews.</p> &nbsp; &nbsp; &nbsp; &nbsp; Midnight moon illuminates literary alarm <br>&nbsp; &nbsp; &nbsp; &nbsp; Fiction is found in the forest <br> &nbsp; &nbsp; &nbsp; &nbsp; Ghosts grab ominous novels <br>&nbsp; &nbsp; &nbsp; &nbsp; Eerie reads for a cyberchill to the bone<br>"
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
