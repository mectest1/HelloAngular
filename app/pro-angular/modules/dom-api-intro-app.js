define(['angular'], function(angular){
	return angular.module('exampleApp', [])
			.controller('defaultCtrl', ['$scope', '$window', '$interval', '$timeout',
		function($scope, $window, $interval, $timeout){
				$scope.displayAlert = function(msg){
					$window.alert(msg);
				};
				
				$interval(function(){
					$scope.time = new Date().toTimeString();
				});
	}]);
});