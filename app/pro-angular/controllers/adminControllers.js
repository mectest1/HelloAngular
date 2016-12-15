(function(){
	angular.module('sportsStoreAdmin')
			.constant('sportsStoreAdminConfig', {
		authUrl: 'http://localhost:5500/users/login',
		orderUrl: 'http://localhost:5500/orders'
	}).controller('authCtrl', ['$scope', '$http', '$location', 'sportsStoreAdminConfig', 
		function($scope, $http, $location, config){
			$scope.authenticate = function(user, pass){
				$http.post(config.authUrl, {
					username: user,
					password: pass
				}, {
					withCredentials: true
				}).success(function(data){
					$location.path('/main');
				}).error(function(error){
					$scope.authenticationError = error;
				})
			};
		}]).controller('mainCtrl', ['$scope', function($scope){
			$scope.screens = ['Products', 'Orders'];
			$scope.current = $scope.screens[0];
			
			$scope.setScreen = function(index){
				$scope.current = $scope.screens[index];
			};
			
			$scope.getScreen = function(){
				return 'Products' == $scope.current ? 
					'./views/adminProducts.html' : './views/adminOrders.html';
			};
		}]).controller('ordersCtrl', ['$scope', '$http', 'sportsStoreAdminConfig',
				function($scope, $http, config){
			$http.get(config.orderUrl, 
				{
					withCredentials: true
				}).success(function(data){
					$scope.orders = data;
				}).error(function(error){
					$scope.error = error;
				})
			$scope.selectedOrder = null;
			
			$scope.selectOrder = function(order){
				$scope.selectedOrder = order;
			};
			
			$scope.calcTotal = function(order){
				var total = 0;
				angular.forEach(order.products, function(product){
					total += product.count * product.price;
				});
				return total;
			}
		}]);
})();