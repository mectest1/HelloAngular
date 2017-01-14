define(['angular'], function(angular){
//define([], function(){	//use this format if the angular.js has been imported into page by <script>
	return angular.module('exampleApp', [])
		.controller('defaultCtrl', ['$scope', function($scope){
			$scope.products = [
				{name: 'Apples', category: 'Fruit', price: 1.20, expiry: 10},
				{name: 'Bananas', category: 'Fruit', price: 2.42, expiry: 7},
				{name: 'Pears', category: 'Fruit', price: 2.02, expiry: 6},
			];
			
			$scope.incrementPrices = function(){
				angular.forEach($scope.products, function(product){
					++product.price;
				})
			};
		}]).directive('unorderedList', [function(){
			return function linkFunc(scope, element, attrs){	//aka postLink function; 
				const data = scope[attrs['unorderedList']];
				const propertyName = attrs['listProperty'] || 'name';
				if(angular.isArray(data)){
					let listElem = angular.element('<ul>');
					element.append(listElem);
					data.forEach((item, index) => {
//						console.log(`Item: ${JSON.stringify(item)}`);
//						listElem.append(angular.element('<li>').text(item.name));
						listElem.append(angular.element('<li>').text(item[propertyName]));
					});
				}
			};
		}]).directive('unorderedListExpr', [function(){
			return function linkFunc(scope, element, attrs){	//aka postLink function; 
				//const data = scope[attrs['unorderedList']];
				const data = scope.$eval(attrs['unorderedListExpr']);
				const propertyExpression = attrs['listProperty'] || 'name';
				if(angular.isArray(data)){
					let listElem = angular.element('<ul>');
					element.append(listElem);
					data.forEach((item, index) => {
//						console.log(`Item: ${JSON.stringify(item)}`);
//						listElem.append(angular.element('<li>').text(item.name));
//						listElem.append(angular.element('<li>').text(item[propertyName]));
						//listElem.append(angular.element('<li>').text(scope.$eval(propertyExpression, item)));
						var itemElement = angular.element('<li>');
						listElem.append(itemElement);
						var watcherFn = function(watchScope){
							return watchScope.$eval(propertyExpression, item);
						}
						scope.$watch(watcherFn, (newValue, oldValue) => {
							itemElement.text(newValue);
						});
					});
				}
			};
		}]);
});