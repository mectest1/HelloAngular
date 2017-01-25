define(['angular'], function(angular){
	'use strict';

	return angular.module('exampleApp', [])
	.directive('evalExpression', ['$parse', function($parse){
		return function linkFunc(scope, element, attrs){	//link func
			scope.$watch(attrs['evalExpression'], function(newVal){
				let result = null;
				try{
					let expressionFn = $parse(scope.expr);
					result = expressionFn(scope);
					result = result || 'No result';
				}catch(error){
					result = 'Cannot evaluate expression';
				}
				element.text(result);
			});
		}
	}]).directive('evalExpression2', ['$parse', function($parse){
		let expressionFn = $parse('total | currency');
		return {
			scope: {
				amount: '=',
				tax: '='
			},
			link: function(scope, element, attrs){
				scope.$watch('amount', function(newVal){
					const valNum = Number(newVal);
					let localData = {
						total: valNum + (valNum * (Number(scope.tax) / 100))
					};
					element.text(expressionFn(scope, localData));
				});
			}
		};
	}]).directive('evalExpression3', ['$interpolate', function($interpolate){
		const interpolationFn = $interpolate('The total is: {{total | currency}} (including tax)');
		return {
			scope: {
				amount: "=",
				tax: "="
			},
			link: function(scope, element, attrs){
				scope.$watch('amount', function(newVal){
					const valNum = Number(newVal);
					let localData = {
						total: valNum + (valNum * (Number(scope.tax)/100))
					};
					element.text(interpolationFn(localData));
				});
			}
		};
		
	}]).directive('evalExpression4', ['$compile', function($compile){
		return function linkFunc(scope, element, attrs){
			const content = '<ul><li ng-repeat="city in cities">{{city}}</li></ul>';
			const listElem = angular.element(content);
			const compileFn = $compile(listElem);
			compileFn(scope);	//update content wrapped in listElem
			element.append(listElem);
		};
	}]).controller('defaultCtrl', ['$scope', function($scope){
		$scope.price = '100.23';		
		$scope.cities = ['London', 'Paris', 'New York'];
	}]);
});