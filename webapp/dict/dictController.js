angular.module("dictApp")
    .controller("dictController", function ($scope, $location, $http, metaBaseUrl) {
    	$scope.menu = {
			name: "root",
			nodes: []
	    };

    	$http({method: "GET", url: metaBaseUrl + "metaDictGroup"}).then(
    		function successCallback(response) {
    		    $scope.menu.dictGroups = response.data;
                $scope.menu.selectedGroup = "equipment";
                $scope.menu.selectedGroupName = "Оборудование";
    		},
    		function errorCallback(error) {}
    	);

    	$http({method: "GET", url: metaBaseUrl + "metaDict/byUser"}).then(
    		function successCallback(response) { $scope.menu.nodes = response.data; },
    		function errorCallback(error) {}
    	);      	
    	                        
        $scope.onSelectedMenu = function (name) {
            $location.path("/dict/" + name + "/list/");
        };
                
        $location.path("/dict/logo/");
    });
	