define(['angular'], function(angular){
	'use strict';
//	angular.module('depModule', [])
//		.directive('hello', [function(){
//		return{
////			restrict: 'AE',
////			priority: 2,
////			scope: {
////				greetings: '@',
////				name: '@'
////			},
////			template: '<div>{{geetings}} {{name}}<div>',
//			link: function(scope, element, attrs){
//				
//			}
////			,
////			controller: ['$scope', function($scope){
////					
////			}]
//		};
//	}]);
//	return angular.module('exampleApp', ['depModule'])
	return angular.module('exampleApp', [])
		.directive('hello', [function(){
			return {
				restrict: 'AE',
				//priority: 1,
				scope: {
					name: '@'
				},
				template: '<div>Hello {{name}}</div>',
				controller: ['$scope', function($scope){
					console.log('hello from Directive 1');
				}],
				link: (scope, element, attrs) => {
					console.log('hello from Directive 1.2');
				}
			};
	}]).directive('hello', [function(){
		return{
			restrict: 'AE',
			priority: -1,
//			scope: {
//				greetings: '@',
//				name: '@'
//			},
//			template: '<div>{{geetings}} {{name}}<div>',
			link: function(scope, element, attrs){
				console.log('Hello from Directive 2.1');
				let greetings = attrs['greetings'];
				let name = attrs['name'];
				element.text(greetings + ' ---------------- ' + name);
			}
//			,
//			controller: ['$scope', function($scope){
//				console.log('Hello from Directive 2');
//			}]
		};
	}])
			.controller('defaultCtrl', ['$scope', function($scope){
					
	}])
});