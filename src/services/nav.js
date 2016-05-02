module.exports = function(app) {
  app.factory('NavService', ['$location', function($location) {

    this.toProfessional = function() {
      $location.path('/professional');
    }

    this.toHome = function() {
      $location.path('/home');
    };

    return this;
  }]);
}
