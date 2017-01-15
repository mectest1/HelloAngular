define(['angular', 'text!../views/product-item-view.html'], 
	function(angular, productItemView){
	'use strict';
	return angular.module('exampleApp', [])
	.directive('productItem', [function(){
			return{
				template: productItemView
			};			
	}]).directive('productTemplate', function(){
		return {
			transclude: true,
			template: '<tbody ng-transclude></tbody>',
			scope: {
				value: '=productTable',
				data: '=productData'
			}
		};
	}).controller('defaultCtrl', ['$scope', function($scope){
		$scope.products=[
			{name: 'Apple', price: 1.20, quantity: 2},
			{name: 'Bananas', price: 2.42, quantity: 3},
			{name: 'Pears', price: 2.02, quantity: 1}
		];			
	}]);
});