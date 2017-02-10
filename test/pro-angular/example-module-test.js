'use strict';

describe('Example Module Test', function(){
	//Arrange;
	let mockScope = {};
	let controller;
	
	beforeEach(angular.mock.module('exampleApp'));
	beforeEach(angular.mock.inject(['$controller', '$rootScope', function($controller, $rootScope){
		mockScope = $rootScope.$new();
		controller = $controller('defaultCtrl', {
			$scope: mockScope
		});
	}]));

	//Act and Access
	it('Create Variables', function(){
		expect(mockScope.counter).toEqual(0);
	});
	
	it('Increments counter', function(){
		mockScope.incrementCounter();
		expect(mockScope.counter).toEqual(1);
	});
});