module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window', function($http, $window) {
    var serverUrl = require('../../config').serverUrl;

    var token;

    var auth = {
      signUp(user, cb) {
        console.log('sign up user from auth service');
        $http.post(serverUrl+'/signup', user)
          .then(res => {
            if (!res.data.token) return console.log('signup failed');
            token = $window.localStorage.token = res.data.token;
            cb && cb(null, res)
          })
          .catch(err => {
            cb(err);
          });
      }
    }

    return auth;

  }]);
};
