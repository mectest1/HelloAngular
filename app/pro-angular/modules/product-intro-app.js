define(['angular', 'angular-resource'], function(angular){
	'use strict';
	
	return angular.module('exampleApp', ['ngResource'])
		.controller('defaultCtrl', ['$scope', function($scope){
		$scope.displayMode = 'list';
		$scope.currentProduct = null;
		
		$scope.listProducts = function(){
			$scope.products = [
				{id: 0, name: 'Dummy1', category: 'Test', price: 1.25},
				{id: 1, name: 'Dummy2', category: 'Test', price: 2.25},
				{id: 2, name: 'Dummy3', category: 'Test', price: 4.25}
			];
		};
		
		$scope.deleteProduct = function(product){
			$scope.products.splice($scope.products.indexOf(product), 1);
		};
		
		$scope.createProduct = function(product){
			$scope.products.push(product);
			$scope.displayMode = 'list';
		};
		
		$scope.updateProduct = function(product){
			$scope.products.forEach((item, index, array) => {
				if(item.id === product.id){
					array[index] = product;
				}
			});
			$scope.displayMode = 'list';
		};
		
		//----------------------------------------------		
		$scope.editOrCreateProduct = function(product){
			$scope.currentProduct = product ? angular.copy(product) : {};
			$scope.displayMode = 'edit';
		};
		
		$scope.saveEdit = function(product){
			if(angular.isDefined(product.id)){
				$scope.updateProduct(product);
			}else{
				$scope.createProduct(product);
			}
		};
		
		$scope.cancelEdit = function(){
			$scope.currentProduct = {};
			$scope.displayMode = 'list';
		};
		
	}]);
});