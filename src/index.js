'use strict';
const angular = require('angular');
require('angular-route');

const app = angular.module('AnkiApp', []);

require('./controller/index.js')(app);

app.config(['$routeProvider', function(router) {
  router
    .when('/home', {
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
      templateUrl: './views/home.html'
    });

}]);
