
(function(){
	angular.module('sportsStore', ['customFilters', 'cart', 'ngRoute'])
		.constant('sportsStoreConfig', {
//				dataUrl: 'http://localhost:5500/productsderp'
			dataUrl: 'http://localhost:5500/products',
			orderUrl: 'http://localhost:5500/orders'
		}).config(['$routeProvider', function($routeProvider){
				$routeProvider.when('/checkout', {
					templateUrl: './views/checkoutSummary.html'
				});

				$routeProvider.when('/products', {
					templateUrl: './views/productList.html'
				});

				$routeProvider.when('/complete', {
					templateUrl: './views/thankYou.html'
				});

				$routeProvider.when('/placeorder', {
					templateUrl: './views/placeOrder.html'
				});

				$routeProvider.otherwise({
					templateUrl: './views/productList.html'
				});
		}]).controller('sportsStoreCtrl',  ['$scope', 'sportsStoreConfig', '$http', 'cart', '$location',
			function($scope, config, $http, cart, $location){
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
			});

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
			$scope.sendOrder = function(shippingDetails){
				var order = angular.copy(shippingDetails);
				order.products = cart.getProducts();
				$http.post(config.orderUrl, order).success(function(data){
					$scope.data.orderId = data.id;
					cart.getProducts().length = 0;
				}).error(function(error){
					$scope.data.orderError = error;
				}).finally(function(){
					$location.path('/complete');
				});
				
			};
	}]);
})();