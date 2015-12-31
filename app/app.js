'use strict';

// Declare app level module which depends on views, and components
angular.module('ess', [
  'ngRoute',
  'ngFacebook',
  'ess.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
