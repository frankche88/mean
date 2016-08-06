angular.module('pokeApp.controllers', [])
    .controller('loginCtrl', function($http, pokemonServices) {
        var vm = this;
        vm.message = "Este es el login";

    })
    .controller('userCtrl', function() {
        var vm = this;
        vm.message = "Este es el admin usuario";
    })
    .controller('pokemonCtrl', function(pokemonServices,LxDialogService, LxNotificationService) {
            var vm = this;

            vm.dialogId = 'dialog-test';

            vm.infoPokemon = {};

            var getPokemons = function() {

                pokemonServices.getPokemons().then(
                    function(response) {
                        vm.pokemons = response;
                    },
                    function(response) {

                    });
            };

            vm.search = function(){

              pokemonServices.search(vm.searchPokemon).then(
                  function(response) {
                      vm.pokemons = response;
                  },
                  function(response) {

                  });
            };

            vm.openDialog = function(infoPokemon){
              vm.infoPokemon = infoPokemon;
               LxDialogService.open(vm.dialogId);
            }

            getPokemons();
    });
