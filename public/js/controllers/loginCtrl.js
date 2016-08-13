angular.module('pokeApp.loginCtrl', [])
    .controller('loginCtrl', function($http, $location,authService) {
        var vm = this;
        vm.message = "Este es el login";

        vm.login = function(username,password) {
            authService.login(username,password);
        }

        var verifyIsLoggedIn = function verifyIsLoggedIn() {
          if(authService.isLoggedIn())
          {
            $location.path('/users');
          }
        };

          verifyIsLoggedIn();

    });
