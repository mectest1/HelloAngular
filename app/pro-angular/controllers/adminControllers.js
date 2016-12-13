(function(){
	angular.module('sportsStoreAdmin')
			.constant('sportsStoreAdminConfig', {
		authUrl: 'http://localhost:5500/users/login'		
	}).controller(['$scope', '$http', '$location', 'sportsStoreAdminConfig', 
		function($scope, $http, $location, config){
			$scope.authenticate = function(user, pass){
				$http.post(config.authUrl, {
					username: user,
					password: pass
				}, {
					withCredentials: true
				}).success(function(data){
					$location.path('/main');
				}).error(function(error){
					$scope.authenticationError = error;
				})
			};
		}]);
})();