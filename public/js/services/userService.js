angular.module('pokeApp.userServices', [])
    .service('userService', function($http, $q,$filter) {
        var _users = undefined;
        var _user = undefined;
        this.all = function() {
            if (!_users) {
                var deferred = $q.defer();

                $http.get("http://localhost:5000/api/users")
                    .success(function(response) {
                        deferred.resolve(response);
                    })
                    .error(function(response) {
                        deferred.reject(response);
                    });

                _users = deferred.promise;
            }
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
            if (!_user) {
                var deferred = $q.defer();

                $http.get("http://localhost:5000/api/users/" + id)
                    .success(function(response) {
                        deferred.resolve(response);
                    })
                    .error(function(response) {
                        deferred.reject(response);
                    });

                _user = deferred.promise;
            }
            return _user;
        };

        this.create = function() {
            return _user;
        };

        this.update = function() {
            return _user;
        };

        this.delete = function() {
            return _user;
        };

    })
