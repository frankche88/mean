angular.module('pokeApp.pokemonServices', [])
    .service('pokemonService', function($http, $q, $filter) {

        var _pokemons = undefined;

        this.all = function() {

          if (!_pokemons) {

              var deferred = $q.defer();

              $http.get("bd_pokemon/pokemons.json")
                  .success(function(response) {
                      deferred.resolve(response);
                  })
                  .error(function(response) {
                      deferred.reject(response);
                  });

              _pokemons = deferred.promise;
          }

            return _pokemons;
        };

        this.search = function(namePokemon) {

            var deferred = $q.defer();

            var found = $filter('filter')(_pokemons.$$state.value, {
                name: namePokemon
            }, false);
            deferred.resolve(found);
            return deferred.promise;
        };
    });
