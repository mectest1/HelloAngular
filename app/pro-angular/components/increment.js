define(['angular'], function(angular){
	'use strict';
	return angular.module('increment', [])
	.directive('increment', [function(){
		return {
			restrict: 'AE',
			scope: {
				//value: '=value'
				item: '=item',
				property: '@propertyName',
				restful: '@restful',
				method: '@methodName'
			},
			link: function(scope, element, attrs){
				let button = angular.element('<button>').text('+');
				button.addClass('btn btn-primary btn-xs');
				element.append(button);
				button.on('click', () => {
					scope.$apply(() => {
						//scope.value++;
						scope.item[scope.property]++;
						if(scope.restful){
							scope.item[scope.method]();
						}
					});
				});
			}
		};
	}]);
});