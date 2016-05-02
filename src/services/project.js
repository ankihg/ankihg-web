module.exports = function(app) {

  app.factory('ProjectService', ['$http', function($http) {

    var path = require('../../config').serverUrl+'/projects';
    var projects = null;
    var tags = null;

    this.getProjects = function(next) {
      if (projects) return (next) ? next(projects) : projects;
      $http.get(path)
        .then(res => {
          console.log(res.data);
          projects = res.data.data;
          calcTags();
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
