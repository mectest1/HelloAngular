

(function(){
	
	angular.module('sportsStore')
//		.constant('productListActiveClass', 'btn-primary')
//		.constant('productListPageCount', 3)
		.constant('productListConfig', {
			productListActiveClass: 'btn-primary',
			productListPageCount: 3
//		}).controller('productListCtrl', ['$scope', '$filter', 'productListActiveClass', 'productListPageCount', 
//					function($scope, $filter, productListActiveClass, productListPageCount){
		}).controller('productListCtrl', ['$scope', '$filter', 'productListConfig', 'cart',
					function($scope, $filter, config, cart){
			var selectedCategory = null;
			
			$scope.selectedPage = 1;
			$scope.pageSize = config.productListPageCount;
	
			$scope.selectCategory = function(newCategory){
				selectedCategory = newCategory;
				$scope.selectedPage = 1;
			};
			
			$scope.selectPage = function(newPage){
				$scope.selectedPage = newPage;
			}
			
			$scope.categoryFilterFn = function(product){
				return !selectedCategory || angular.equals(selectedCategory, product.category);
			};
			
			$scope.getCategoryClass = function(category){
				var retval = '';
				if(angular.equals(selectedCategory, category)){
					retval = config.productListActiveClass;
				}
				return retval;
			};
			
			$scope.getPageClass = function(page){
				var retval = '';
				if(angular.equals(page, $scope.selectedPage)){
					retval = config.productListActiveClass;
				}
				return retval;
			};
			
			$scope.addProductToCart = function(product){
				cart.addProduct(product.id, product.name, product.price);
			};
			
		}]).filter('range', ['$filter', function($filter){
			var limitTo = $filter('limitTo');
			return function (data, page, size){
				var retval = [];
				if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
					var start_index = (page - 1 ) * size;
					if(data.length < start_index){
						//return [];
						
					}else{
						//return limitTo(size, index);
						//retval = limitTo(data.splice(start_index), size);
						retval = limitTo(data, size, start_index);
					}
				}else{
					retval = data;
				}
				return retval;
			};
		}]).filter('pageCount', function(){
			return function(data, size){
				var retval = [];
				if(angular.isArray(data) && angular.isNumber(size)){
					for(var i = 0; i < Math.ceil(data.length / size); ++i){
						retval.push(i);
					}
				}else{
					retval = data;
				}
				return retval;
			};
		});
})();
