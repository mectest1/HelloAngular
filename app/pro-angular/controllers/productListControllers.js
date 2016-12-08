
angular.module('sportsStore')
		.controller('productListCtrl', ['$scope', '$filter', function($scope, $filter){
			var selectedCategory = null;
	
			$scope.selectCategory = function(newCategory){
				selectedCategory = newCategory;
			};
			
			$scope.categoryFilterFn = function(product){
				return !selectedCategory || angular.equals(selectedCategory, product.category);
			};
		}]);