define(['angular'], function(angular){
	return angular.module('exampleApp', [])
			.config(['$provide', function($provide){
					$provide.decorator('$log', ['$delegate', function($delegate){
							const originalLog = $delegate.log;
							$delegate.log = function(message){
								originalLog('Decorated: ' + message);
							}
							return $delegate;
					}]);
	}])
			.controller('defaultCtrl', ['$scope', '$log', '$injector', '$rootElement', 
				function($scope, $log, $injector, $rootElement){
				let counter = 0;
				let logClick = function($log, $exceptionHandler, message){
					if(0 === counter){
						$log.log(message);
						++counter;
					}else{
						$exceptionHandler('Already Clicked');
					}
				};
				
				let log2 = ['$log', 'msg', ($log, msg) => {
						$log.log('here is log2. msg: ' + msg);
				}];
				let log3 = (logger, msg) => logger.log('here is log3. msg: ' + msg);
				log3.$inject = ['$log', 'msg'];
				
				$scope.handleClick = function(){
					let deps = $injector.annotate(logClick);
					$log.log('Button Clicked');
					$log.log('logClick dependency: ' + deps.join());
					$log.log('$injector === $rootElement.injector() ? ' + ($injector === $rootElement.injector()));
					
					$injector.invoke(logClick, null, {message: 'Derp'});
					$injector.invoke(log2, null, {msg: 'Derp2'});
					$injector.invoke(log3, null, {msg: 'Derp3'});
				};
	}]);
});