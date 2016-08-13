angular.module('pokeApp.mainCtrl', [])
    .controller('mainCtrl', function($location, authService) {
        var vm = this;

        vm.loggedIn = function() {
            return authService.isLoggedIn();
        }

        vm.goTo = function(route){
          $location.path(route);
        }
    });
