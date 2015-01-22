angular.module('RestProviderApp', ['ngRoute', 'ngResource', 'ngMessages'])
	.config(function ($routeProvider) {
	    $routeProvider
	    	.when('/', {
				templateUrl: 'templates/home.html',
	        	controller: 'HomeController'
	    	})
	    	.otherwise({
				redirectTo: '/'
        	});
	})
	.controller('HomeController', function ($scope) {

	});
