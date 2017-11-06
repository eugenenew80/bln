angular.module("admApp")
    .controller("admController", function ($scope, $location, $http, metaBaseUrl) {        
    	$scope.menu = {
			name: "root",
			nodes: []
	    };
    	    	
    	$http({method: "GET", url: metaBaseUrl + "metaAdm"}).then(
    		
    		function successCallback(response) { 
    			$scope.menu.nodes = response.data 
    		}, 
    		
    		function errorCallback(error) {}
    	);      	
    	                        
        $scope.onSelectedMenu = function (name) {
            $location.path("/adm/" + name + "/list/");
        };
                
        $location.path("/adm/logo/");
    });
	