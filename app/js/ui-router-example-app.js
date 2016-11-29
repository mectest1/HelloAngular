/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//'use strict';
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
	
	
	//
	$stateProvider.state('contacts', {
		abstract: true,
		url: '/contacts',
		templateUrl: '../views/contacts.html',
		controller: function($scope){
			$scope.contacts = [{id: 0, name: 'Alice'}, {id: 1, name: 'Bob'}];
		}
	}).state('contacts.list', {
		url: '/list',
		templateUrl: '../views/contacts.list.html',
	}).state('contacts.detail', {
		url: '/:id',
		templateUrl: '../views/contacts.detail.html',
		controller: function($scope, $stateParams){
			$scope.person = $scope.contacts[$stateParams.id];
		}
	})
}]);
