define(['angular'], function(angular){
	'use strict';

	return angular.module('exampleApp', [])
	.controller('defaultCtrl', ['$scope', '$http', function($scope, $http){
		function extractProducts(xmlString){
			let products = [];
			let productElems = angular.element(xmlString.trim()).find('product');
			for(var i = 0; i < productElems.length; ++i){
				let product = productElems.eq(i);
				products.push({
					name: product.attr('name'),
					category: product.attr('category'),
					price: product.attr('price')
				});
			}
			return products;
		}
			
		$scope.loadData = function(){
			let getPromise = $http.get('data/productData.json');
			getPromise.then((resp) => {
				$scope.products = resp.data;
				
				console.log('Status: ' + resp.status);
				console.log('Type: ' + resp.headers('content-type'));
				console.log('Length: ' + resp.headers('content-length'));
			});
		};
		$scope.loadXmlData = function(){
			$http.get('data/productData.xml').then((resp) => {
//				$scope.products = [];
//				let productElems = angular.element(resp.data.trim()).find('product');
//				for(var i = 0; i < productElems.length; ++i){
//					let product = productElems.eq(i);
//					$scope.products.push({
//						name: product.attr('name'),
//						category: product.attr('category'),
//						price: product.attr('price')
//					});
//				}
				$scope.products = extractProducts(resp.data);
			});
		};
		
		//
		$scope.loadDataAndTransform = function(){
			function analyzeRespData(data, headers){
				let products;
				if('application/xml' === headers('content-type') && angular.isString(data)){
					products = extractProducts(data);
				}else{	//application/json
					products = data;
				}
				return products;
			};
			function appendTransform(defaults, transform){
				let retval;
				retval = angular.isArray(defaults) ? defaults : [defaults];
				retval.push(transform);
				return retval;
			};
			let config = {
				transformResponse: appendTransform($http.defaults.transformResponse, analyzeRespData)
			};
			$http.get('data/productData.xml', config).then((resp) => {
				$scope.products = resp.data;
			});
		};
	}]);
});