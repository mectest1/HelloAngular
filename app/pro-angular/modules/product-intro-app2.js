define(['angular', 
	'../components/increment',
	'angular-resource'], 
	function(angular, incrementModule){
	'use strict';
	
	return angular.module('exampleApp', ['ngResource', incrementModule.name])
		.constant('config', {
			baseUrl: 'http://localhost:5500/products/'
		})
		.controller('defaultCtrl', ['$scope', '$http', 'config', '$resource',
			function($scope, $http, config, $resource){
		const baseUrl = config.baseUrl;
		const LIST_VIEW = 'list';
		const EDIT_VIEW = 'edit';
		$scope.displayMode = LIST_VIEW;
		
		const productsResource = $resource(baseUrl + ':id', {id: '@id'}, {
			create: {
				method: 'POST'
			},
			save: {
				method: 'PUT'
			}
		});
		$scope.listProducts = function(){
			$scope.products = productsResource.query();
		};
		
		$scope.deleteProduct = function(product){
			product.$delete().then(() => {
				$scope.products.splice($scope.products.indexOf(product), 1);
			});
			$scope.displayMode = LIST_VIEW;
		};
		
		$scope.createProduct = function(product){
			//new productsResource(product).$save().then((newProduct) => {
			new productsResource(product).create().then((newProduct) => {
				$scope.products.push(newProduct);
				$scope.displayMode = LIST_VIEW;
			});
		};
		
		$scope.updateProduct = function(product){
			product.$save();
			$scope.displayMode = LIST_VIEW;
		};
		
		//----------------------------------------------		
		$scope.editOrCreateProduct = function(product){
			$scope.currentProduct = product ? product : {};
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
			if($scope.currentProduct && $scope.currentProduct.$get){
				$scope.currentProduct.$get();
			}
			$scope.currentProduct = {};
			$scope.displayMode = LIST_VIEW;
		};
		
		//-------------------------------
		$scope.listProducts();
	}]);
});