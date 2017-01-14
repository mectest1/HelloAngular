define(['angular',
	'text!../views/product-liste-view.html'
], function(angular, templateView){
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
			return {	//return a directive definition object
				link: (scope, element, attrs) => {
					let data = scope[attrs['unorderedList'] || attrs['listSource']];
					let propertyExpression = attrs['listProperty'] || 'price | currency';
					if(angular.isArray(data)){
						let listElem = angular.element('<ul>');
						if('#comment' === element[0].nodeName){
							element.parent().append(listElem);
						}else{
							element.append(listElem);
						}
						data.forEach(item => {
							let itemElement = angular.element('<li>')
									.text(scope.$eval(propertyExpression, item));
							listElem.append(itemElement);
						});
					}
					
				
				},
				restrict: 'EACM'
			};
		}]).directive('unorderedListWithTemplate', [function(){
			return {
				link: (scope, element, attrs) => {
					scope.data = scope[attrs['unorderedListWithTemplate']];
				},
				template: '<ul><li ng-repeat="item in data">{{item.price | currency}}</li><ul>'
			};
		}]).directive('unorderedListWithTemplateFunc', [function(){
			return{
				//scope: true,	//a child scope
				//scope: {},		//an isolated scope
				link: (scope, element, attrs) => {
					scope.data = scope[attrs['unorderedListWithTemplateFunc']];
				},
				template: () => {
					return angular.element(document.querySelector('#listTemplate')).html();
				},
				restrict: 'A'
			}
		}]).directive('unorderedListWithTemplateUrl', [function(){
			return{
				link: (scope, element, attrs) => {
					scope.data = scope[attrs['unorderedListWithTemplateUrl']];
				},
				//templateUrl: './views/product-list-view.html',	//relative to the address of referenced html, not a good solution;
				template: templateView,
				restrict: 'A'
			}
		}]);
});