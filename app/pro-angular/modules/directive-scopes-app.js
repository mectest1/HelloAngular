define(['angular', 'text!../views/directive-scopes-view.html',
		'text!../views/directive-isolated-scopes-view.html'], 
	function(angular, directiveScopesView, isolatedView){
	return angular.module('exampleApp', [])
			.directive('scopeDemo', [function(){
		return {
			template: directiveScopesView,
			scope: true
		};		
	}]).directive('isolatedScopeDemo', [function(){
		return {
			template: isolatedView,
			scope: {
				local: '@nameProp',
				localFn: '&'
			}
		};
	}]).controller('scopeCtrl', ['$scope', function($scope){
		$scope.data = {name: 'Adam'};
		$scope.city = 'London';
		
		$scope.greetings = (name) => {
			return 'Hello from Controller Scope: ' + name;
		}
	}]);
});