define(['angular', 'text!../views/transclusion-directive-view.html'], function(angular, panelView){
	'use strict';
	
	return angular.module('exampleApp', [])
			.directive('panel', [function(){
				return {
					link: (scope, element, attrs) => {
						scope.dataSource = 'directive';
					},
					scope: true,
					template: panelView,
					transclude: true
				}
			}])
			.controller('defaultCtrl', ['$scope', ($scope) => {
		$scope.dataSource = 'controller'			
	}]);
});