define(['angular', 
	'../components/increment',
	'angular-resource',
	'angular-ngRoute'], 
	function(angular, incrementModule){
	'use strict';
	
	return angular.module('exampleApp', ['ngResource', 'ngRoute', incrementModule.name])
		.constant('config', {
			baseUrl: 'http://localhost:5500/products/',
			LIST_VIEW: '/list',
			EDIT_VIEW: 'edit'
		}).factory('productsResource', ['$resource', 'config', function($resource, config){
			return $resource(config.baseUrl + ':id', {id: '@id'}, {
						create: {
							method: 'POST'
						},
						save: {
							method: 'PUT'
						}
					});	
		}]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
	
			$routeProvider
//			.when('/list', {
//				templateUrl: '/pro-angular/views/tableView2.html',
//				controller: 'tableCtrl', 
//				resolve: {
//					data: ['$productsResource', function(productsResource){
//						return productsResource.query();
//					}]
//				}
//			})
			.when('/edit/:id', {
				templateUrl: '/pro-angular/views/editorView2.html',
				controller: 'editCtrl'
			})
			.when('/edit/:id/:data*', {
				templateUrl: '/pro-angular/views/editorView2.html'
			}).when('/create', {
				templateUrl: '/pro-angular/views/editorView2.html',
				controller: 'editCtrl'
//			}).otherwise({
//				templateUrl: '/pro-angular/views/tableView2.html'
//			});
			}).otherwise({
				templateUrl: '/pro-angular/views/tableView2.html',
				controller: 'tableCtrl', 
				resolve: {
					data: ['productsResource', function(productsResource){
						return productsResource.query();
					}]
				}
			});
	}]).controller('defaultCtrl', ['$scope', '$http', 'config', '$resource', '$location', 
				'$routeParams', 'productsResource',
			function($scope, $http, config, $resource, $location, $routeParams, productsResource){
		const baseUrl = config.baseUrl;
		const LIST_VIEW = config.LIST_VIEW;	//'/list';
		const EDIT_VIEW = config.EDIT_VIEW;	//'/edit';
//		$scope.displayMode = LIST_VIEW;
		$scope.data = {};
//		$location.path(LIST_VIEW);
		
//		$scope.currentProduct = null;
//		$scope.$on('$routeChangeSuccess', function(){
//			if(0 === $location.path().indexOf('/edit/')){
//				let id = $routeParams['id'];
//				$scope.products.forEach((item) => {
//					if(id === item.id){
//						$scope.currentProduct = item;
//					}
//				});
//			}
//		});
		
//		const productsResource = $resource(baseUrl + ':id', {id: '@id'}, {
//			create: {
//				method: 'POST'
//			},
//			save: {
//				method: 'PUT'
//			}
//		});
		
//		$scope.listProducts = function(){
//			$scope.products = productsResource.query();
//		};
		
		$scope.deleteProduct = function(product){
			product.$delete().then(() => {
//				$scope.products.splice($scope.products.indexOf(product), 1);
				$scope.data.products.splice($scope.products.indexOf(product), 1);
			});
			$location.path(LIST_VIEW);
		};
		
		$scope.createProduct = function(product){
			//new productsResource(product).$save().then((newProduct) => {
//			new productsResource(product).create().then((newProduct) => {
//				$scope.products.push(newProduct);
//				$location.path(LIST_VIEW);
//			});
			new productsResource(product).create().then((newProduct) => {
				$scope.data.products.push(newProduct);
				$location.path(LIST_VIEW);
			});
		};
		
//		$scope.updateProduct = function(product){
//			product.$save();
//			$location.path(LIST_VIEW);
//		};
//		
//		//----------------------------------------------		
////		$scope.editProduct = function(product){
////			$scope.currentProduct = product;
////			$location.path(EDIT_VIEW);
////		};
//		
//		$scope.saveEdit = function(product){
//			if(angular.isDefined(product.id)){
//				$scope.updateProduct(product);
//			}else{
//				$scope.createProduct(product);
//			}
//			$scope.currentProduct = {};
//		};
//		
//		$scope.cancelEdit = function(){
//			if($scope.currentProduct && $scope.currentProduct.$get){
//				$scope.currentProduct.$get();
//			}
//			$scope.currentProduct = {};
//			$location.path(LIST_VIEW);
//		};
		
		//-------------------------------
//		$scope.listProducts();
	}]).controller('tableCtrl', ['$scope', '$location', '$route', 'data', 
		function($scope, $location, $route, data){
			$scope.data.products = data;
			
			$scope.refreshProducts = function(){
				$route.reload();
			};
			
	}]).controller('editCtrl', ['$scope', '$location', '$routeParams', 'config', function($scope, $location, $routeParams, config){
		const LIST_VIEW = config.LIST_VIEW;
		const EDIT_VIEW = config.EDIT_VIEW;
		
		$scope.currentProduct = null;
//		$scope.$on('$routeChangeSuccess', function(){
		if(0 === $location.path().indexOf('/edit/')){
			let id = $routeParams['id'];
//			$scope.products.forEach((item) => {
			$scope.data.products.forEach((item) => {
				if(id === item.id){
					$scope.currentProduct = item;
				}
			});
		}
//		});
		
		$scope.updateProduct = function(product){
			product.$save();
			$location.path(LIST_VIEW);
		};
		
		//----------------------------------------------		
//		$scope.editProduct = function(product){
//			$scope.currentProduct = product;
//			$location.path(EDIT_VIEW);
//		};
		
		$scope.saveEdit = function(product){
			if(angular.isDefined(product.id)){
				$scope.updateProduct(product);
			}else{
				$scope.createProduct(product);
			}
			$scope.currentProduct = {};
		};
		
		$scope.cancelEdit = function(){
//			if($scope.currentProduct && $scope.currentProduct.$get){
//				$scope.currentProduct.$get();
//			}
//			$scope.currentProduct = {};
			$location.path(LIST_VIEW);
		};
	}]);
});