angular.module("infoApp")
    .controller("infoController", function ($scope, $location) {        
    	$scope.menu = {
	             name: "root",
	             nodes: [
	             ]
	    };
                        
        $scope.onSelectedMenu = function (name) {
            $location.path("/info/" + name + "/list/");
        };
                
        $location.path("/info/logo/");
    });
	