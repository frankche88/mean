angular.module('myApp.controllers', [])
    .controller('mainCtrl', function($scope, $filter,cityService) {

        $scope.message = 'la aplicacion ha sido creada';
        $scope.name = 'henry fuentes';
        $scope.toLowerCase = $filter('lowercase')($scope.name);
        console.log($scope.message);
    })
    .controller('clockCtrl', function($scope,countryService) {

        $scope.countries = countryService.getCountries();

        $scope.countryname = "pais";

        $scope.clock = {
            now: new Date()
        }

        $scope.showCountry = function(abr) {
          $scope.countryname =  countryService.searchCountry(abr);
        }
        var updateClock = function() {

            $scope.clock.now = new Date();
        }

        $scope.changeClock = function() {

            updateClock();
        }

        setInterval(function() {
            $scope.$apply(updateClock);
        }, 1000);
    })
