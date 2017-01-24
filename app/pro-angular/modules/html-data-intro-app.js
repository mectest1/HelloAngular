define(['angular', 'angular-sanitize'], function(angular){
	return angular.module('exampleApp', ['ngSanitize'])
			.controller('defaultCtrl', ['$scope', '$sanitize', '$sce', function($scope, $sanitize, $sce){
//		$scope.htmlData = '<p>This is <b onmouseover=alert("Attack!")>dangerous</b></p>';			
		$scope.dangerousData = '<p>This is <b onmouseover=alert("Attack!")>dangerous</b></p>';			
		
		$scope.$watch('dangerousData', (newVal) => {
			$scope.htmlData = $sanitize(newVal);
			$scope.trustedData = $sce.trustAsHtml(newVal);
		});
	}])
});