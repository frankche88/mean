angular.module('myApp.services', [])
    .service('cityService', function($filter) {
        this.getCity = function(abr) {
            return abr + "lima";
        }
    })
    .service('countryService', function($filter) {

        var countries = [
          {
            code: "PE",
            name: "Peru"
        }, {
            code: "CH",
            name: "Chile"
        }, {
            code: "BZ",
            name: "Brasil"
        },{
            code: "AR",
            name: "Argentina"
        }
      ];

        this.getCountries = function() {

                return countries;
            },
        this.searchCountry = function(abr) {

                var found = $filter('filter')(countries, {
                    code: abr
                }, true);

                return found[0].name;
            }
    });
