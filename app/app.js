'use strict';

// Declare app level module which depends on views, and components
angular.module('ess', [
  'ngRoute',
  'ess.view1',
  'ess.view2',
  'ess.templates'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/template'});
}]);
