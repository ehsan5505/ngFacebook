


angular.module('ess.templates', ['ngRoute'])

.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/template',{
        templateUrl : 'template/template.html',
        controller : 'tempCntr'
    });
}])
.controller('tempCntr',[function(){
    console.log("There is a issue");
}]);

// 'use strict';

// angular.module('ess.templates', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/template', {
//     templateUrl: 'template/template.html',
//     controller: 'TempCntr'
//   });
// }])

// .controller('TempCntr', [function() {

// }]);