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
	.factory('jsonParser', function () {
		return {
			isValid: function (data) {
				try {
					JSON.parse(data);
					return true;
				} catch (e) {
					console.log('Failed to parse');
					console.log(data);
					console.log(e);
					return false;
				}				
			}
		}
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
	.controller('HomeController', function ($scope, restService, jsonParser) {
		$scope.supplier = {
			action: 'GET',
			url: 'your/url/here',
			data: '{"your_json": "data here"}',
			code: 200,
			headers: '{"content-type": "application/json"}'
		};
		$scope.save = function (supplier) {
			if ( $scope.jsonForm.$invalid ) {
				$scope.$broadcast('record:invalid');
			} else {
			}

			if (jsonParser.isValid($scope.supplier.data) && 
				jsonParser.isValid($scope.supplier.headers)) {
				/*restService
					.create(supplier)
					.then(function (result) {
						console.log("Success!");
						console.log(result);
					}, function (error) {
						console.log("Fail!");
						console.log(error);
					});*/
				console.log("Data is valid");
			} else {
				console.log("data is invalid");
			}
		};
	})
	.value('FieldTypes', {
        text: ['Text', 'should be text'],
        textarea: ['Textarea', 'should be text'],
        number: ['Number', 'should be a number'],
        datetime: ['Datetime', 'should be a datetime'],
        password: ['Password', 'should be a password']
    })
	.directive('formField', function (FieldTypes) {
		return {
			restrict: 'EA',
            templateUrl: 'templates/form-field.html',
            replace: true,
            scope: {
                record: '=',
                field: '@',
                datatype: '@'
            },
            link: function ($scope, element, attr) {
            	$scope.types = FieldTypes;
                $scope.$on('record:invalid', function () {
                    $scope[$scope.field].$setDirty();
                });
            }
		};
	})
	.filter('labelCase', function () {
        return function (input) {
            input = input.replace(/([A-Z])/g, ' $1');
            return input[0].toUpperCase() + input.slice(1);
        };
    });
