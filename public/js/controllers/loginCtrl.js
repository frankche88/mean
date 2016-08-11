angular.module('pokeApp.loginCtrl', [])
    .controller('loginCtrl', function($http, authService) {
        var vm = this;
        vm.message = "Este es el login";
        vm.login = function(username,password) {
            authService.login(username,password);
        }
    });
