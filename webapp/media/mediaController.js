angular.module("mediaApp")
    .controller("mediaController", function ($scope, $location, $http, metaBaseUrl) {        
    	$scope.menu = {
			name: "root",
			nodes: []
	    };
    	    	
    	$http({method: "GET", url: metaBaseUrl + "metaMedia"}).then(
    		function successCallback(response) { $scope.menu.nodes = response.data }, 
    		function errorCallback(error) {}
    	);      	
    	                        
        $scope.onSelectedMenu = function (name) {
            $location.path("/media/" + name + "/list/");
        };
                
        $location.path("/media/logo/");
    });
	