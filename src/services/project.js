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

    this.create = function(project, next) {
      console.log('create project');
      if (project.tags instanceof String) project.tags = project.tags.split(',');
      console.log(project);
      $http.post(path, project)
        .then(res => {
          projects.push(res.data.data);
          next && next(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }

    this.update = function(project, next) {
      console.log('update project');
      if (project.tags instanceof String) project.tags = project.tags.split(',');
      $http.put(path+'/'+project._id, project)
        .then(res => {
          this.getProjects().forEach((proj, i, arr) => {
            if (proj._id === project._id) arr[i] = project;
          })
        })
        .catch(err => console.log(err));
    }

    this.delete = function(project, next) {
      console.log('delete project');
      $http.delete(path+'/'+project._id)
        .then(res => {
          console.log('got delete response');
          this.getProjects().splice(this.getProjects().indexOf(project), 1);
        })
        .catch(err => {
          console.log(err);
        });


      next && next();
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
