'use strict';

angular.module('exampleApp', [])
		.controller('defaultCtrl', ['$scope', '$http', 
	'$interval', '$timeout', '$log',
	function($scope, $http, $interval, $timeout, $log){
			$scope.counter = 0;
			$scope.incrementCounter = function(){
				$scope.counter++;
				
			$http.get('productData.json').then((resp) => {
				let data = resp.data;
				$scope.products = data;
				$log.log('There are ' + data.length + ' items');
			});
			
			
			$scope.intervalCounter = 0;
			$scope.timerCounter = 0;
			
			$interval(() => {
				$scope.intervalCounter++;
			}, 5000, 10);
			$timeout(() => {
				$scope.timerCounter++;
			}, 5000);
			
		};
}]).filter('labelCase', function(){
	return function(value, reverse){
		if(angular.isString(value)){
			let intermediate = reverse? value.toUpperCase() : value.toLowerCase();
			return (reverse? intermediate[0].toLowerCase() : intermediate[0].toUpperCase()) 
					+ intermediate.substr(1);
		}else{
			return value;
		}
	};
}).directive('unorderedList', function(){
	return function linkFunc(scope, element, attrs){
		let data = scope[attrs['unorderedList']];
		if(angular.isArray(data)){
			let listElem = angular.element('<ul>');
			element.append(listElem);
			data.forEach(function(item, index){
				listElem.append(angular.element('<li>').text(item.name));
			});
		}
	};
}).factory('counterService', function(){
	let counter = 0;
	return {
		incrementCounter: function(){
			counter++;
		},
		getCounter: function(){
			return counter;
		}
	};
});