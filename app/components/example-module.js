'use strict';

angular.module('exampleApp', [])
		.controller('defaultCtrl', ['$scope', function($scope){
				$scope.counter = 0;
				$scope.incrementCounter = function(){
					$scope.counter++;
				};
}]);