/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myApp = angular.module('helloUIRouter', ['ui.router']);
myApp.config(['$stateProvider', function($stateProvider){
	var helloState = {
		name: 'hello',
		url: '/hello',
		template: '<h1>Hello, World!</h1>'
	};
	
	var aboutState = {
		name: 'about',
		url: '/about',
		template: '<h3>It&quote;s the UI-Router hello world app'
	};
	
	$stateProvider.state(helloState);
	$stateProvider.state(aboutState);
}]);
