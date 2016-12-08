
(function(){
	angular.module('sportsStore', ['customFilters'])
			.constant('sportsStoreConfig', {
				dataUrl: 'http://localhost:5500/products'
			}).controller('sportsStoreCtrl',  ['$scope', 'sportsStoreConfig', '$http',
				function($scope, config, $http){
//				$scope.data = {
//					products: [
//						{name: 'Product #1', description: 'A poroduct', category: 'Category #1', price: 100},
//						{name: 'Product #2', description: 'A product', category: 'Category #1', price: 110},
//						{name: 'Product #3', description: 'A product', category: 'Category #2', price: 210},
//						{name: 'Product #4', description: 'A product', category: 'Category #3', price: 202}
//					]
//				};
				$scope.data = [];
				$http.get(config.dataUrl).success(function(data){
					$scope.data.products = data;
				}).error(function(error){
					$scope.data.error = error;
				})
				
				//$scope.data = data;
				
//				$scope.selectCategory = function(categoryName){
////					if(categoryName){
////						$scope.data.products = [];
////						angular.forEach($scope.data.products, function(product){
////							if(angular.equals(categoryName, product.category)){
////								$scope.data.products.push(product);
////							}
////						});
////					}else{
////						//
////					}
////					if(categoryName){
////						$scope.currentCategory = categoryName;
////					}else{
////						$scope.currentCategory = null;
////					}
//					$scope.currentCategory = categoryName || '';
//				};
//				
//				$scope.currentCategory = '';
				
	}]);
})();