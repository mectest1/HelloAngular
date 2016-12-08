
angular.module('sportsStore')
		.constant('productListActiveClass', 'btn-primary')
		.controller('productListCtrl', ['$scope', '$filter', 'productListActiveClass', 
					function($scope, $filter, productListActiveClass){
			var selectedCategory = null;
	
			$scope.selectCategory = function(newCategory){
				selectedCategory = newCategory;
			};
			
			$scope.categoryFilterFn = function(product){
				return !selectedCategory || angular.equals(selectedCategory, product.category);
			};
			
			$scope.getCategoryClass = function(category){
				var retval = '';
				if(angular.equals(selectedCategory, category)){
					retval = productListActiveClass;
				}
				return retval;
			};
		}]);