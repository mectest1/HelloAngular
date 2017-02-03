define(['angular'], function(angular){
	'use strict';
	return angular.module('exampleApp', [])
			.directive('promiseWorker', ['$q', function($q){
				let deferred = $q.defer();
				return {
					link: function(scope, element, attrs){
						element.find('button').on('click', function(event){
							let buttonText = event.target.innerText;
							if('Abort' === buttonText){
								deferred.reject(buttonText);
							}else{
								deferred.resolve(buttonText);
							}
						});
					},
					controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
						this.promise = deferred.promise;
					}]
				};
	}]).directive('promiseObserver', [function(){
		return {
			require: '^promiseWorker', 
			link: function(scope, element, attrs, ctrl){
				ctrl.promise.then((result) => {
					element.text(result);
				}, (reason) => {
					element.text('Fail (' + reason + ')');
				});
			}
		};
	}])
			.controller('defaultCtrl', ['$scope', function($scope){
					
	}]);
});