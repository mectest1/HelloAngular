'use strict';

describe('Filter Tests', function(){
	let filterInstance;
	
	beforeEach(angular.mock.module('exampleApp'));
	
	beforeEach(angular.mock.inject(['$filter', function($filter){
		filterInstance = $filter('labelCase');	
	}]));
	
	it('Change Cases', function(){
		let result = filterInstance('test phrase');
		expect(result).toEqual('Test phrase');
	});
	
	it('Reverse Case', function(){
		let result = filterInstance('test phrase', true);
		expect(result).toEqual('tEST PHRASE');
	});
});