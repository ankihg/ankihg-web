module.exports = function(app) {

  app.factory('ProjectService', ['$http', function($http) {

    var projects = [
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

    var path = require('../../config').serverUrl+'/projects';
    var tags = null;

    this.getProjects = function(next) {
      // if (projects) return projects;
      $http.get(path)
        .then(res => {
          console.log(res.data);
          projects = res.data.data;
          if (next) next(projects);
        })
        .catch(err => {
          console.log(err);
        })
    }

    this.getTags = function() {
      return tags || calcTags();
    }

    var calcTags = function() {
      return tags = projects.map(function(p) {
        return p.tags;
      }).reduce(function(uniqueTags, projectTags) {
        projectTags.filter(function(tag) {
          return uniqueTags.indexOf(tag) < 0;
        }).forEach(function (tag) {
          uniqueTags.push(tag);
        });
        return uniqueTags;
      }, []);
    }

    return this;

  }]);

}
