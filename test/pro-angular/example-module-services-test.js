'use strict';

describe('Service Tests', function(){
	beforeEach(angular.mock.module('exampleApp'));
	
	it('Increments the counter', function(){
		angular.mock.inject(['counterService', function(counterService){
			expect(counterService.getCounter()).toEqual(0);
			counterService.incrementCounter();
			expect(counterService.getCounter()).toEqual(1);
		}]);
	});
});