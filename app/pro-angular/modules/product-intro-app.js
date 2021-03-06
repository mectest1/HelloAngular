define(['angular', 
	'../components/increment',
	'angular-resource'], 
	function(angular, incrementModule){
	'use strict';
	
	return angular.module('exampleApp', ['ngResource', incrementModule.name])
		.constant('config', {
			baseUrl: 'http://localhost:5500/products/'
		})
		.controller('defaultCtrl', ['$scope', '$http', 'config',
			function($scope, $http, config){
		$scope.displayMode = 'list';
		$scope.currentProduct = null;
		const baseUrl = config.baseUrl;
		const LIST_VIEW = 'list';
		const EDIT_VIEW = 'edit';
		
		$scope.listProducts = function(){
//			$scope.products = [
//				{id: 0, name: 'Dummy1', category: 'Test', price: 1.25},
//				{id: 1, name: 'Dummy2', category: 'Test', price: 2.25},
//				{id: 2, name: 'Dummy3', category: 'Test', price: 4.25}
//			];t
			$http.get(baseUrl).then((resp) => {
				let data = resp.data;
				$scope.products = data;
			});
		};
		
		$scope.deleteProduct = function(product){
			//$scope.products.splice($scope.products.indexOf(product), 1);
			$http({
				method: 'DELETE',
				url: baseUrl + product.id
			}).then((resp) => {
				//let data = resp.data;
				$scope.products.splice($scope.products.indexOf(product), 1);
			});
		};
		
		$scope.createProduct = function(product){
			$http.post(baseUrl, product).then((resp) => {
				let respProduct = resp.data;
				//$scope.products.push(product);
				$scope.products.push(respProduct);
				$scope.displayMode = LIST_VIEW;
			});
		};
		
		$scope.updateProduct = function(product){
			$http({
				url: baseUrl + product.id,
				method: 'PUT',
				data: product
			}).then(resp => {
				const data = resp.data;
				$scope.products.forEach((item, index, array) => {
					if(item.id === data.id){
						array[index] = data;
					}
				});
				$scope.displayMode = LIST_VIEW;
			});
		};
		
		//----------------------------------------------		
		$scope.editOrCreateProduct = function(product){
			$scope.currentProduct = product ? angular.copy(product) : {};
			$scope.displayMode = EDIT_VIEW;
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
			$scope.displayMode = LIST_VIEW;
		};
		
		//-------------------------------
		$scope.listProducts();
	}]);
});