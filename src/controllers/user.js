module.exports = function(app) {
  app.controller('UserController', ['AuthService', '$location', function(AuthService, $location) {
    var vm = this;

    vm.signIn = function(user) {
      AuthService.signIn(user, function(err, res) {
        if (err) return console.log(err);
        console.log('successful signup');
        $location.path('/project-crud');
      });
    }


    return vm;

  }]);
}
