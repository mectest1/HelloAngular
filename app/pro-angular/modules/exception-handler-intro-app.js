define(['angular'], function(angular){
	return angular.module('exampleApp', [])
			.factory('$exceptionHandler', ['$log', function($log){
				return function(exception, cause){
					$log.error(`Message: ${exception.message || exception} (Cause: ${cause} )`);
				};
	}])
			.controller('defaultCtrl', ['$scope', '$exceptionHandler', function($scope, $exceptionHandler){
				$scope.throwEx = function(){
					try {
						throw new Error('Triggered Exception');
					}catch(ex){
						$exceptionHandler(ex.message, 'Button Click');
					}
				};
	}]);
});