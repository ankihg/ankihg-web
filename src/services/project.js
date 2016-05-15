module.exports = function(app) {

  app.factory('ProjectService', ['$http', 'AuthService', '$location', function($http, AuthService, $location) {

    var path = require('../../config').serverUrl+'/projects';
    var projects = null;
    var tags = null;

    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    this.getProjects = function(next) {
      if (projects) return (next) ? next(projects) : projects;
      $http.get(path)
        .then(res => {
          console.log(res.data);
          projects = res.data.data;
          projects = projects.map((project) => {
            project.date = new Date(project.date);
            project.dateStr = monthNames[project.date.getMonth()] +' '+ project.date.getFullYear();
            project.tagsStr = project.tags.reduce((str, tag) => str+'#'+tag+' ', '');
            return project;
          });
          projects.sort((a,b) => b.date - a.date);
          calcTags();
          if (next) next(projects);
        })
        .catch(err => {
          console.log(err);
        })
    }

    this.create = function(project, next) {
      console.log('create project');
      if (typeof project.tags === String) project.tags = project.tags.split(',');
      project.tags = project.tags.toString().split(',');
      $http.post(path, project, {
        headers: {
          token: AuthService.getToken()
        }
      })
        .then(res => {
          projects.push(res.data.data);
          next && next(res.data.data);
        })
        .catch(err => {
          console.log(err);
          $location.path('/signin');
        });
    }

    this.update = function(project, next) {
      console.log('update project');
      if (typeof project.tags === String) project.tags = project.tags.split(',');
      project.tags = project.tags.toString().split(',');
      $http.put(path+'/'+project._id, project, {
        headers: {
          token: AuthService.getToken()
        }
      })
        .then(res => {
          this.getProjects().forEach((proj, i, arr) => {
            if (proj._id === project._id) arr[i] = project;
          })
        })
        .catch(err => {
          console.log(err);
          $location.path('/signin');
        });
    }

    this.delete = function(project, next) {
      console.log('delete project');
      $http.delete(path+'/'+project._id, {
        headers: {
          token: AuthService.getToken()
        }
      })
        .then(res => {
          console.log('got delete response');
          this.getProjects().splice(this.getProjects().indexOf(project), 1);
        })
        .catch(err => {
          console.log(err);
          $location.path('/signin');
        });


      next && next();
    }

    this.getTags = function() {
      return calcTags();
      // return tags || calcTags();
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
