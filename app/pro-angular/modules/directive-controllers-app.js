define(['angular', 'text!../views/product-item-view.html',
	'text!../views/product-table-view.html',
	'text!../views/product-reset-view.html'], 
	function(angular, productItemView, productTableView,
			productResetView){
	'use strict';
	return angular.module('exampleApp', [])
	.directive('productItem', [function(){
			return{
				template: productItemView,
				require: '^productTable',
				link: function(scope, element, attrs, tableCtrl){
					scope.$watch('item.quantity', () => {
						tableCtrl.updateTotal();
					});
				}
			};			
	}]).directive('productTable', function(){
		return {
			transclude: true,
//			template: '<tbody ng-transclude></tbody>',
			template: productTableView,
			scope: {
				value: '=productTable',
				data: '=productData'
			},
			controller: ['$scope', function($scope){
				//$scope.updateTotal = () => { //other controllers will not get this one
				this.updateTotal = () => {
					var retval = 0;
					$scope.data.forEach((item) => {
						retval += parseInt(item.quantity);
					});
					$scope.totalValue = retval;
				};
			}]
		};
	}).directive('resetTotals', function(){
		return {
			scope: {
				data: '=productData',
				propName: '@propertyName'
			},
			template: productResetView,
			require: '^productTable',
			link: function(scope, element, attrs, productTable){
				scope.reset = () => {
					scope.data.forEach(item => {
						item[scope.propName] = 0;
					});
					productTable.updateTotal();
				};
			}
		}
	}).controller('defaultCtrl', ['$scope', function($scope){
		$scope.products=[
			{name: 'Apple', price: 1.20, quantity: 2},
			{name: 'Bananas', price: 2.42, quantity: 3},
			{name: 'Pears', price: 2.02, quantity: 1}
		];			
	}]);
});