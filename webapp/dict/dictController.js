angular.module("dictApp")
    .controller("dictController", function ($scope, $location, $http, metaBaseUrl) {
    	$scope.menu = {
			name: "root",
			nodes: []
	    };

    	$http({method: "GET", url: metaBaseUrl + "metaDict"}).then(
    		function successCallback(response) { $scope.menu.nodes = response.data }, 
    		function errorCallback(error) {}
    	);      	
    	                        
        $scope.onSelectedMenu = function (name) {
            $location.path("/dict/" + name + "/list/");
        };
                
        $location.path("/dict/logo/");
    });
	