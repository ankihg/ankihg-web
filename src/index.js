'use strict';
const angular = require('angular');
require('angular-route');
require('../bower_components/angular-route-styles/route-styles.js')
// require('style!css!./styles/home.css');

const app = angular.module('AnkiApp', ['ngRoute', 'routeStyles']);

require('./services/index.js')(app);
require('./controllers/index.js')(app);
require('./directives/index.js')(app);

app.config(['$routeProvider', function(router) {
  router
    .when('/home', {
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
      templateUrl: './views/home.html',
      css: './styles/home.css'
    })
    .when('/professional', {
      controller: 'ProfessionalController',
      controllerAs: 'profCtrl',
      templateUrl: './views/professional.html',
      css: ['./styles/base.css', './styles/layout.css', 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css']
    })
    .when('/project-crud', {
      controller: 'ProjectCrudController',
      controllerAs: 'crudCtrl',
      templateUrl: './views/project-crud.html',
      css: ['./styles/base.css', './styles/layout.css', 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css']
    })
    .when('/signin', {
      controller: 'UserController',
      controllerAs: 'userCtrl',
      templateUrl: './views/signin.html'
    })

}]);
