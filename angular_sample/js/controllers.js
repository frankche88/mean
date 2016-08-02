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
.controller('countryCtrl', function($scope,countryService) {

    $scope.current ="";
    $scope.myLink="http://www.google.com";

    $scope.fields = [
        {placeholder:'abbr', isRequired:true},
        {placeholder:'name', isRequired:true}

    ];

    $scope.countries = countryService.getCountries();

    $scope.countryname = "";

    $scope.showCountry = function(countryAbbr) {
      $scope.countryname =  countryService.searchCountry(countryAbbr);
    }

    $scope.calculate = function(){

      $scope.result = Number($scope.myNumber)*5;
    }

    $scope.calculateNumber = function(){

      return Math.floor((Math.random()*10)+1);
    }

    $scope.setName = function(country){
      $scope.countryValue = country;
      $scope.current =country;
    }


})
