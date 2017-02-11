'use strict';

describe('Directive Tests', function(){
	let mockScope;
	let compileService;
	
	beforeEach(angular.mock.module('exampleApp'));
	beforeEach(angular.mock.inject(['$rootScope', '$compile', 
		function($rootScope, $compile){
			mockScope = $rootScope.$new();
			compileService = $compile;
			mockScope.data = [
				{name: 'Apples', category: 'Fruite', price: 1.20},
				{name: 'Bananas', category: 'Fruit', price: 2.42},
				{name: 'Pears', category: 'Fruit', price: 2.02}
			];
	}]));

	it('Generates list elements', function(){
		let compileFn = compileService('<div unordered-list="data"></div>');
		let elem = compileFn(mockScope);
		
		expect(elem.children('ul').length).toEqual(1);
		expect(elem.find('li').length).toEqual(3);
		expect(elem.find('li').eq(0).text()).toEqual('Apples');
		expect(elem.find('li').eq(1).text()).toEqual('Bananas');
		expect(elem.find('li').eq(2).text()).toEqual('Pears');
	});
});