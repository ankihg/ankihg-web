'use strict';
console.log('running index');
const angular = require('angular');
console.log('required angular');
require('angular-route');
console.log('required angular route');
// require('style!css!./styles/home.css');


const app = angular.module('AnkiApp', ['ngRoute']);

require('./controllers/index.js')(app);
console.log('required controllers');

app.config(['$routeProvider', function(router) {
  router
    .when('/home', {
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
      templateUrl: './views/home.html'
    });

}]);
