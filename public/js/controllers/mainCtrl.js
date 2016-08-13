angular.module('pokeApp.mainCtrl', [])
    .controller('mainCtrl', function($location, authService) {
        var vm = this;

        vm.loggedIn = function() {
            return authService.isLoggedIn();
        }

        vm.logOut = function() {
           authService.logOut();

           $location.path('/login');
        }
        vm.goTo = function(route){
          $location.path(route);
        }
    });
