angular.module('pokeApp.authServices', [])
    .service('authService', function($http, $q, GlobalInfo, AuthToken, $location) {

        this.login = function(username, password) {

            return $http.post(GlobalInfo.apiUrl + '/authenticate', {
                username: username,
                password: password
            }).success(function(data) {
                AuthToken.setToken(data.token);
            })
        };

        this.logout = function() {
            AuthToken.setToken();
        };

        this.isLoggedIn = function() {

            if (AuthToken.getTokenToken())
                return true;
            else {
                return false;
            }
        };

        this.getUser = function() {

          if (AuthToken.getTokenToken())
              return false;
          else {
              return false;
          }

        };
    })
    .service('AuthToken',
    function($window) {
        this.getToken = function() {
            return $window.localStorage.getItem('token');
        };

        this.setToken = function(token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        };
    })
.service('AuthInterceptor', function($q, $location, AuthToken) {
    this.request = function(config) {
        var token = AuthToken.getToken();

        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    };

    this.responseError = function(response) {

        if (response.status == 403) {
            AuthToken.setToken();
            $location.path('/login');
        }

        return $q.reject(response);
    }
});
