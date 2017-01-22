define(['angular'], function(angular){
	return angular.module('exampleApp', [])
		.config(['$locationProvider', function($locationProvider){
				//$locationProvider.html5Mode(true);	//html5 mode requires a <base> tag to present
		}])
		.config(['$anchorScrollProvider', function($anchorScrollProvider){
			//$anchorScrollProvider.disableAutoScrolling();
		}])
		.controller('defaultCtrl', ['$scope', '$window', '$interval', '$timeout', '$location', '$anchorScroll',
		function($scope, $window, $interval, $timeout, $location, $anchorScroll){
			$scope.displayAlert = function(msg){
				$window.alert(msg);
			};

			$interval(function(){
				$scope.time = new Date().toTimeString();
			});
			
			$scope.$on('$locationChangeSuccess', (event, newUrl) => {
				$scope.url = newUrl;
			});
			
			$scope.setUrl = function(component){
				switch(component){
					case 'reset':
						$location.path('');
						$location.hash('');
						$location.search('');
						break;
					case 'path':
						$location.path('/cities/london');
						break;
					case 'hash':
						$location.hash('north');
						break;
					case 'search':
						$location.search('select', 'hotels');
						break;
					case 'url':
						$location.url('/cities/london?select=hotels#north');
						break;
				}
			};
			
			$scope.scrollTo = function(id){
				$location.hash(id);
				//$anchorScroll();
			};
	}]);
});