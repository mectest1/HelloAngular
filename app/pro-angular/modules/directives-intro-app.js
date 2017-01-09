define([], function(){
	return angular.module('exampleApp', [])
				.controller('defaultCtrl', ['$scope', function($scope){
					$scope.products = [
						{name: 'Apples', category: 'Fruit', price: 1.20, expiry: 10},
						{name: 'Bananas', category: 'Fruit', price: 2.42, expiry: 7},
						{name: 'Pears', category: 'Fruit', price: 2.02, expiry: 6},
					];
		}]).directive('unorderedList', [function(){
			return function linkFunc(scope, element, attrs){	//aka postLink function; 
				var data = scope[attrs['unorderedList']];
				if(angular.isArray(data)){
					let listElem = angular.element('<ul>');
					element.append(listElem);
					data.forEach((item, index) => {
//						console.log(`Item: ${JSON.stringify(item)}`);
						listElem.append(angular.element('<li>').text(item.name));
					});
				}
			};
		}]);
});