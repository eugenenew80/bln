angular.module("admApp")
    .controller("admController", function ($scope, $location, $http, appSettings) {        
    	$scope.menu = {
			name: "root",
			nodes: []
	    };
    	    	
    	$http({method: "GET", url: appSettings.baseUrl + "blnApi/webapi/meta/adm"}).then(
    		function successCallback(response) { $scope.menu.nodes = response.data }, 
    		function errorCallback(error) {}
    	);      	
    	                        
        $scope.onSelectedMenu = function (name) {
            $location.path("/adm/" + name + "/list/");
        };
                
        $location.path("/adm/logo/");
    });
	