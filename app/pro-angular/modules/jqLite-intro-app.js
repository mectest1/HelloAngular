define(['angular'], function(angular){
	const ORANGE_ITEM = 'Oranges';
	const TAG_LI_NAME = 'li';
	const TEXT_COLOR = 'green';
	return angular.module('exampleApp', [])
			.directive('demoDirective', function(){
				return function linkFunc(scope, element, attrs){
					let items = element.children();
					angular.forEach(items, (item) => {
						item = angular.element(item);
						if(ORANGE_ITEM === item.text()){
							item.css('font-weight', 'bold');
							item.css('color', TEXT_COLOR);
						}
					});
					
				};
	}).directive('demoDirective2', function(){
		return (scope, element, attrs) => {
			let items = element.find(TAG_LI_NAME);
			for(let i = 0; i < items.length; ++i){
				let item = items.eq(i);	//use the .eq() method instead of [i] to get the jqLite object instead of an HTML element
				if(ORANGE_ITEM === item.text()){
					item.css('font-style', 'italic');
					item.css('color', TEXT_COLOR);
				}
			}
		};
	}).controller('defaultCtrl', ['$scope', ($scope) => {
			//controller defines no data or behaviors;
	}]);
});