angular.module('myApp.directives', [])
    .directive('bioatt', function() {

        return {
            restrict: 'A',
            template: '<h1>hola directiva atributos<h1>'
        }

    })
    .directive('bioel', function() {

        return {
            restrict: 'E',
            template: '<h1>hola directiva elementos<h1>'
        }

    })
    .directive('clock', function() {

        return {
            restrict: 'A',
            templateUrl: 'clock.html'
        }

    })
