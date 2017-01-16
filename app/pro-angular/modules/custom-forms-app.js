define(['angular', 'text!../views/tri-directive-view.html'], 
	function(angular, triButtonView){
	'use strict';
	return angular.module('exampleApp', [])
			.directive('triButton', [function(){
			return {
				require: 'ngModel',
				template: triButtonView,
				link: function(scope, element, attrs, modelCtrl){
					let setSelected = function(value){
						let buttons = element.find('button');
						buttons.removeClass('btn-primary');
						angular.forEach(buttons, button => {
							let btn = angular.element(button);
							if(value == btn.text()){
								btn.addClass('btn-primary');
							}
						});
					};
					setSelected(scope.dataValue);
				}
			};
	}]).controller('defaultCtrl', ['$scope', function($scope){
			$scope.options = ['Yes', 'No', 'Not Sure'];
			$scope.dataValue = $scope.options[2];	//'Not Sure;		
	}]);
});