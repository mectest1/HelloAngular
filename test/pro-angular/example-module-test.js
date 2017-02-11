'use strict';

describe('Example Module Test', function(){
	//Arrange;
	let mockScope = {};
	let controller;
	let backend;
	let mockInterval;
	let mockTimeout;
	let mockLog;
	
	beforeEach(angular.mock.module('exampleApp'));
	beforeEach(angular.mock.inject['$httpBackend', function($httpBackend){
		backend = $httpBackend;
		backend.expect('GET', 'productData.json').respond(
			[
				{"name": "Apples","category": "Fruit","price": 1.20,"expiry": 10},
				{"name": "Bananas","category": "Category","price": 2.42,"expiry": 7},
				{"name": "Pears","category": "Fruit","price": 2.02,"expiry": 6}
			]
		);
	}]);
	beforeEach(angular.mock.inject(['$controller', '$rootScope', '$http', 
		'$interval', '$timeout', '$log',
		function($controller, $rootScope, $http, $interval, $timeout, $log){
			mockScope = $rootScope.$new();
			mockInterval = $interval;
			mockTimeout = $timeout;
			mockLog = $log;
			controller = $controller('defaultCtrl', {
				$scope: mockScope,
				$http: $http,
				$interval: mockInterval,
				$timeout: mockTimeout,
				$log: mockLog
			});
			backend.flush();
	}]));

	//Act and Access
	it('Create Variables', function(){
		expect(mockScope.counter).toEqual(0);
	});
	
	it('Increments counter', function(){
		mockScope.incrementCounter();
		expect(mockScope.counter).toEqual(1);
	});
	
	it('Makes an Ajax request', function(){
		backend.verifyNoOutstandingExpectation();
	});
	
	it('Processing the data', function(){
		expect(mockScope.products).toBeDefined();
		expect(mockScope.products.length).toEqual(3);
	});
	
	it('Processing the data', function(){
		expect(mockScope.products[0].name).toEqual('Apples');
		expect(mockScope.products[1].name).toEqual('Bananas');
		expect(mockScope.products[2].name).toEqual('Pears');
	});
	
	it('Limits interval to 10 updates', function(){
		for(let i = 0; i < 10; ++i){	//or is it 10?
			mockInterval.flush(5000);
		}
		expect(mockScope.intervalCounter).toEqual(10);
	});
	it('Increments timer counter', function(){
		mockTimeout.flush(5000);
		expect(mockScope.timerCounter).toEqual(1);
	});
	
	it('Writes log messages', function(){
		expect(mockLog.log.logs.length).toEqual(1);
	});
});