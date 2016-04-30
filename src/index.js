'use strict';
const angular = require('angular');
require('angular-route');
// require('style!css!./styles/home.css');


const app = angular.module('AnkiApp', []);

require('./controllers/index.js')(app);

app.config(['$routeProvider', function(router) {
  router
    .when('/home', {
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
      templateUrl: './views/home.html'
    });

}]);
