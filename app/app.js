'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.version',
  'enhetsServices'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
