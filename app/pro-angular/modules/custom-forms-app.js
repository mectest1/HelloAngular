define(['angular', 'text!../views/tri-directive-view.html'], 
	function(angular, triButtonView){
	'use strict';
	return angular.module('exampleApp', [])
			.directive('triButton', [function(){
			return {
				require: 'ngModel',
				template: triButtonView,
				link: function(scope, element, attrs, modelCtrl){
					element.on('click', function(event){
						setSelected(event.target.innerText);
						scope.$apply(function(){
							modelCtrl.$setViewValue(event.target.innerText);
						});
					});
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
					//setSelected(scope.dataValue);
					modelCtrl.$render = function(){
						validateParser(modelCtrl.$viewValue);
						setSelected(modelCtrl.$viewValue || scope.options[2]);
					};
					
					modelCtrl.$formatters.push(function(value){
						return 'Huh?' == value ? 'Not Sure' : value;
					});
					
					function validateParser(value){
						let valid = ('Yes' == value || 'No' == value);
						modelCtrl.$setValidity('confidence', valid);
						//return valid ? value : undefined;
						return value;
					};
					
					modelCtrl.$parsers.push(validateParser);
				}
			};
	}]).controller('defaultCtrl', ['$scope', function($scope){
			$scope.options = ['Yes', 'No', 'Not Sure', 'Huh?'];
			$scope.dataValue = $scope.options[2];	//'Not Sure;		
	}]);
});