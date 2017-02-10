//karma start karma.conf.js
describe('First Test', function(){
	//Arrange (set up a scenario)
	let counter;
	
	beforeEach(function(){
		counter = 0;
	});
	
	it('increments value', function(){
		++counter;
		
		expect(counter).toEqual(1);
	});
	
	it('decrements value', function(){
		--counter;
//		expect(counter).toEqual(0);
		expect(counter).toEqual(-1);
	});
	
});