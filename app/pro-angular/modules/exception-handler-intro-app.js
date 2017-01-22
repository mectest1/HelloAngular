define(['angular'], function(angular){
	return angular.module('exampleApp', [])
			.controller('defaultCtrl', ['$scope', function($scope){
				$scope.throwEx = function(){
					throw new Error('Triggered Exception');
				};
	}]);
});