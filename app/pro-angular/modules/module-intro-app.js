define(['angular'], function(angular){
	return angular.module('exampleApp', [])
	.directive('triButton', ['logService', function(logService){
		return {
			scope: {
				counter: '=',
			},
			link: function(scope, element, attrs){
				element.on('click', event => {
					//console.log('Button click ' + event.target.innerText);
					logService.log('Button click ' + event.target.innerText);
					scope.$apply(function(){//the following expression is called outside of the angular framwork,
											//thus should be wrapped in a Scope.$apply() so that the 
											//proper $digeset() cycle will be triggerd.
						++scope.counter;		
					});
				});
			}
		};		
	}]).factory('logService', [function(){
		let messageCount = 0;
		return {
			log: function(msg){
				console.log(`(LOG ${messageCount++}) ${msg}`);
			}
		};
	}]).provider('advancedLog', [function(){	//the provider function is actually a provider constructor
		let prefix = '##';
		let providerInstance = {
//			prefix: function(){
//				let retval = null;
//				if(arguments && 0 < arguments.length){
//					prefix = arguments[0];
//					retval = this;
//				}else{
//					retval = prefix;
//				}
//				return retval;
//			},
			$get: [function(){
				return {
					log: (msg) => {
						console.log(prefix + ' ' + msg);
					}
				};
			}]
		};
		Object.defineProperty(providerInstance, 'prefix', {
			enumerable: false,
			//value: prefix,
			get: () => prefix,
			set: (newVal) => prefix = newVal
		});
		return providerInstance;
	}]).controller('defaultCtrl', ['$scope', 'logService', 'advancedLog',
		function($scope, logService, advancedLog){
			$scope.data = {
				cities: ['London', 'New York', 'Paris'],
				totalClicks: 0
			};
			
			$scope.$watch('data.totalClicks', (newVal) => {
				//console.log('Total click count: ' + newVal);
				logService.log('Total click count: ' + newVal);
				advancedLog.log('totalClicked: ' + newVal);
			});
	}]).config(['advancedLogProvider', function(advancedLogProvider){
		console.log('current log prefix: ' + advancedLogProvider.prefix);
		advancedLogProvider.prefix = '$$';
		console.log('new log prefix; ' + advancedLogProvider.prefix);
	}]);;
});