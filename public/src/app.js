angular.module('RestProviderApp', ['ngMaterial', 'ngRoute', 'ngResource', 'ngMessages'])
	.config(function ($mdThemingProvider, $routeProvider) {
	    $routeProvider
	    	.when('/', {
				templateUrl: 'templates/home.html',
	        	controller: 'HomeController'
	    	})
	    	.otherwise({
				redirectTo: '/'
        	});
	})
	.factory('restService', function ($http, $q) {
		return {
			create: function (supplier) {
				var deferred = $q.defer();
				$http.post('/', supplier)
					.then(function (result) {
						deferred.resolve(result);
					}, function (error) {
						deferred.reject(error);
					});

				return deferred.promise;
			}
		};
	})
	.controller('HomeController', function ($scope, restService) {
		$scope.supplier = {
			action: "GET",
			url: "",
			data: "",
			code: 200,
			headers: {
				"content-type": "application/json"
			}
		};
		$scope.save = function (supplier) {
			restService
				.create(supplier)
				.then(function (result) {
					console.log("Success!");
					console.log(result);
				}, function (error) {
					console.log("Fail!");
					console.log(error);
				});
		};
	});
