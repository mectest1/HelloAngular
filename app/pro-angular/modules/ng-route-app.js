define(['angular', 
	'../components/increment',
	'angular-resource',
	'angular-ngRoute'], 
	function(angular, incrementModule){
	'use strict';
	
	return angular.module('exampleApp', ['ngResource', 'ngRoute', incrementModule.name])
		.constant('config', {
			baseUrl: 'http://localhost:5500/products/'
		})
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
	
			$routeProvider.when('/list', {
				templateUrl: '/pro-angular/views/tableView2.html'
			}).when('/edit', {
				templateUrl: '/pro-angular/views/editorView.html'
			}).when('/create', {
				templateUrl: '/pro-angular/views/editorView.html'
			}).otherwise({
				templateUrl: '/pro-angular/views/tableView2.html'
			});
		}])
		.controller('defaultCtrl', ['$scope', '$http', 'config', '$resource', '$location',
			function($scope, $http, config, $resource, $location){
		const baseUrl = config.baseUrl;
		const LIST_VIEW = '/list';
		const EDIT_VIEW = '/edit';
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
			$location.path(LIST_VIEW);
		};
		
		$scope.createProduct = function(product){
			//new productsResource(product).$save().then((newProduct) => {
			new productsResource(product).create().then((newProduct) => {
				$scope.products.push(newProduct);
				$location.path(LIST_VIEW);
			});
		};
		
		$scope.updateProduct = function(product){
			product.$save();
			$location.path(LIST_VIEW);
		};
		
		//----------------------------------------------		
		$scope.editProduct = function(product){
			$scope.currentProduct = product;
			$location.path(EDIT_VIEW);
		};
		
		$scope.saveEdit = function(product){
			if(angular.isDefined(product.id)){
				$scope.updateProduct(product);
			}else{
				$scope.createProduct(product);
			}
			$scope.currentProduct = {};
		};
		
		$scope.cancelEdit = function(){
			if($scope.currentProduct && $scope.currentProduct.$get){
				$scope.currentProduct.$get();
			}
			$scope.currentProduct = {};
			$location.path(LIST_VIEW);
		};
		
		//-------------------------------
		$scope.listProducts();
	}]);
});