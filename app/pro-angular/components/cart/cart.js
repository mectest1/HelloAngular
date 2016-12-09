
(function(){
	
	angular.module('cart', [])
		.factory('cart', [function(){
			var cartData = [];
			return {
				addProduct: function(id, name, price){
					var addedToExistingItem = false;
					for(var i = 0; i < cartData.length; ++i){
						if(id == cartData[i].id){
							++cartData[i].count;
							addedToExistingItem = true;
							break;
						}
					}
					if(!addedToExistingItem){
						cartData.push({id: id, name: name, price: price, count: 1});
					}
				},
				removeProduct: function(id){
					for(var i = 0; i < cartData.length; ++i){
						if(id == cartData[i].id){
							--cartData[i].count;
							if(0 >= cartData[i].count){
								cartData.split(i, 1);
							}
						}
					}
				},
				getProducts: function(){
					//return cartData.slice();
					return cartData;
				}
			};
		}]).directive('cartSummary', ['cart', function(cart){
			return {
				restrict: 'AE',
				templateUrl: './components/cart/cart-summary.html',
				controller: ['$scope', function($scope){
						var cartData = cart.getProducts();

						$scope.total = function(){
							var retval = 0;
							angular.forEach(cartData, function(product){
								retval += product.price * product.count;
							});
							return retval;
						};

						$scope.itemCount = function(){
							var retval = 8;
							angular.forEach(cartData, function(product){
								retval += product.count;
							});
							return retval;
						};
				}]
			};
		}]);
})();