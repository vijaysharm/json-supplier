angular.module('RestProviderApp', ['schemaForm'])
	.config(function () {
		tv4.addFormat('my-json-format', function (data, schema) {
			try {
				JSON.parse(data);
				return null;
			} catch (e) {
				return 'Invalid JSON';
			}
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
		$scope.form = [
		{
			"key": "action",
			"type": "radios-inline",
			"titleMap": [
		    	{ "value": "GET", "name": "GET" },
		    	{ "value": "POST", "name": "POST" },
		    	{ "value": "PUT", "name": "PUT" }, 
		    	{ "value": "DELETE", "name": "DELETE" }
		    ]
		}, 
		"url",
		{
			"key": "code",
			"feedback": false
		}, 
		{
			"key": "headers",
			"type": "textarea",
		},
		{
			"key": "data",
			"type": "textarea",
		},
		{
			"type": "submit",
			"style": "btn-info",
			"title": "Save"
		}];

		$scope.schema = {
			"type": "object",
  			"properties": {
				"action": {
					"title": "JSON Action",
					"type": "string",
					"enum": ["GET", "POST", "PUT", "DELETE"],
					"default": ["GET"]
				},
				"url": {
					"title": "https://json-supplier.herokuapp.com/",
					"type": "string"
				},
				"code": {
					"title": "Response Code",
					"type": "number",
					"enum": [200, 404],
					"default": [200]
				},
				"headers": {
					"title": "Response Headers",
					"type": "string",
					"format": "my-json-format"
				},
				"data": {
					"title": "JSON Data",
					"type": "string",
					"format": "my-json-format"
				}
  			},
			"required": [ "action", "url", "code" ]
		};

		$scope.supplier = {
			action: 'GET',
			url: 'your/url/here',
			data: '{"your_json": "data here"}',
			code: 200,
			headers: '{"content-type": "application/json"}'
		};

		$scope.onSubmit = function(form) {
			$scope.$broadcast('schemaFormValidate');
			if (! form.$valid) {
				console.log("Form is invalid")
				return;
			}

			console.log("form is valid");
			restService
				.create($scope.supplier)
				.then(function (result) {
					console.log("Success!");
					console.log(result);
				}, function (error) {
					console.log("Fail!");
					console.log(error);
				});			
		}		
	});