module.exports = function(app) {
  app.factory('NavService', ['$location', function($location) {

    this.getLocation = function() {
      return $location.path();
    }

    this.toProfessional = function() {
      $location.path('/professional');
    }

    this.toHome = function() {
      $location.path('/home');
    };

    this.toCrud = function() {
      $location.path('/project-crud');
    };

    this.toSignin = function() {
      $location.path('/signin');
    };

    return this;
  }]);
}
