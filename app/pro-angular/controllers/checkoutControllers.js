(function(){
	angular.module('sportsStore')
			.controller('cartSummaryController', ['$scope', 'cart', 
				function($scope, cart){
					$scope.cartData = cartDtaa.getProducts();
					
					$scope.totle = function(){
						var total = 0;
						angular.forEach($scope.cartData, function(item){
							total += item.price * item.count;
						});
						return total;
					};
					
					$scope.remove = function(id){
						cart.removeProduct(id);
					};
				}]);
})();