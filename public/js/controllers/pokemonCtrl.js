angular.module('pokeApp.pokemonCtrl', [])
    .controller('pokemonCtrl', function(pokemonService, LxDialogService, LxNotificationService) {
        var vm = this;

        vm.dialogId = 'dialog-test';
        vm.dialogIdEdit = 'dialog-edit';

        vm.infoPokemon = {};
        vm.model = {};

        vm.add = function() {
            vm.model = {};
            LxDialogService.open(vm.dialogIdEdit);

        };

        vm.edit = function(id) {

            pokemonService.get(id).then(
                function(response) {
                    vm.model = response;
                    LxDialogService.open(vm.dialogIdEdit);
                },
                function(response) {

                });
        };

        var getPokemons = function() {

            pokemonService.all().then(
                function(response) {
                    vm.pokemons = response;
                },
                function(response) {

                });
        };

        vm.search = function() {

            pokemonService.search(vm.searchPokemon).then(
                function(response) {
                    vm.pokemons = response;
                },
                function(response) {

                });
        };

        vm.save = function(model) {

            if (!model._id) {
                pokemonService.create(model).then(
                    function(response) {
                        LxDialogService.close(vm.dialogIdEdit);
                        getPokemons();
                    },
                    function(response) {

                    });
            } else {

                pokemonService.update(model).then(
                    function(response) {
                        LxDialogService.close(vm.dialogIdEdit);
                        getPokemons();
                    },
                    function(response) {

                    });
            }
        };

        vm.openDialog = function(infoPokemon) {
            vm.infoPokemon = infoPokemon;
            LxDialogService.open(vm.dialogId);
        };

        vm.delete = function(id) {

            pokemonService.delete(id).then(
                function(response) {
                    getPokemons();
                },
                function(response) {

                });
        };
        getPokemons();
    });
