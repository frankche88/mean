angular.module('pokeApp.userServices', [])
    .service('userService', function($http, $q, $filter,GlobalInfo) {

        var _users = undefined;

        this.all = function() {

            var deferred = $q.defer();

            $http.get(GlobalInfo.apiUrl+"/users")
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            _users = deferred.promise;
            return _users;
        };

        this.search = function(nameUser) {
            var deferred = $q.defer();

            var found = $filter('filter')(_users.$$state.value, {
                name: nameUser
            }, false);
            deferred.resolve(found);
            return deferred.promise;
        };

        this.get = function(id) {

            var deferred = $q.defer();

            $http.get(GlobalInfo.apiUrl+"/users/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;

        };

        this.create = function(model) {
            var deferred = $q.defer();

            $http.post(GlobalInfo.apiUrl+"/users/", model)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        this.update = function(model) {
          var deferred = $q.defer();

          $http.put(GlobalInfo.apiUrl+"/users/"+model._id, model)
              .success(function(response) {
                  deferred.resolve(response);
              })
              .error(function(response) {
                  deferred.reject(response);
              });

          return deferred.promise;
        };

        this.delete = function(id) {
          var deferred = $q.defer();

          $http.delete(GlobalInfo.apiUrl+"/users/" + id)
              .success(function(response) {
                  deferred.resolve(response);
              })
              .error(function(response) {
                  deferred.reject(response);
              });

          return deferred.promise;
        };

    })
