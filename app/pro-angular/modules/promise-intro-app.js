define(['angular'], function(angular){
	'use strict';
	return angular.module('exampleApp', [])
			.directive('promiseWorker', ['$q', function($q){
				//let deferred = $q.defer();
				let deferred = [$q.defer(), $q.defer()];
				let promises = deferred.map(d => d.promise);
				return {
					link: function(scope, element, attrs){
						element.find('button').on('click', function(event){
							let buttonText = event.target.innerText;
							let buttonGroup = event.target.getAttribute('data-group');
							if('Abort' === buttonText){
								//deferred.reject(buttonText);
								deferred[buttonGroup].reject(buttonText);
							}else{
								//deferred.resolve(buttonText);
								deferred[buttonGroup].resolve(buttonText);
							}
						});
					},
					controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
						//this.promise = deferred.promise;
						this.promise = $q.all(promises).then((results) => {
							return results.join();
						});
					}]
				};
	}]).directive('promiseObserver', [function(){
		return {
			require: '^promiseWorker', 
			link: function(scope, element, attrs, ctrl){
				ctrl.promise.then((result) => {
					return 'Success (' + result + ')';
				}, (reason) => {
					//element.text('Fail (' + reason + ')');
					return 'Fail (' + reason + ')';
				}).then((result) => {
					element.text(result);
				});
			}
		};
	}])
			.controller('defaultCtrl', ['$scope', function($scope){
					
	}]);
});