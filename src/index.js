'use strict';
const angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('../bower_components/angular-route-styles/route-styles.js')
// require('style!css!./styles/home.css');

const app = angular.module('AnkiApp', ['ngRoute', 'routeStyles', 'ngSanitize']);

require('./services/index.js')(app);
require('./controllers/index.js')(app);
require('./directives/index.js')(app);

app.config(['$routeProvider', '$locationProvider', function(router, $locationProvider) {
  $locationProvider.html5Mode(false); //maybe remove
  router
    .when('/', {
      controller: 'ProfessionalController',
      controllerAs: 'profCtrl',
      templateUrl: './views/professional.html',
      css: ['./styles/vendors/bootstrap.min.css', './styles/base.css', './styles/layout.css', './styles/nav-menu.css', './styles/media-queries.css']
    })
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
      css: ['./styles/vendors/bootstrap.min.css', './styles/base.css', './styles/layout.css', './styles/nav-menu.css', './styles/media-queries.css']
    })
    .when('/project-crud', {
      controller: 'ProjectCrudController',
      controllerAs: 'crudCtrl',
      templateUrl: './views/project-crud.html',
      css: ['./styles/vendors/bootstrap.min.css', './styles/base.css', './styles/layout.css']
    })
    .when('/signin', {
      controller: 'UserController',
      controllerAs: 'userCtrl',
      templateUrl: './views/signin.html'
    })

}]);
