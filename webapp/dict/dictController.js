angular.module("dictApp")
    .controller("dictController", function ($scope, $location, $http, metaBaseUrl) {
    	$scope.menu = {
			name: "root",
			nodes: []
	    };


        $scope.menu.groups = [
            {
                code: "equipment",
                name: "Оборудование"
            },

            {
                code: "meteringPoint",
                name: "Точки учёта"
            },

            {
                code: "object",
                name: "Объекты сети"
            },

            {
                code: "location",
                name: "Расположение"
            },

            {
                code: "other",
                name: "Прочие справочники"
            }
        ];
        $scope.menu.selectedGroup = "equipment";
        $scope.menu.selectedGroupName = "Оборудование";

    	$http({method: "GET", url: metaBaseUrl + "metaDict"}).then(
    		function successCallback(response) { $scope.menu.nodes = response.data; },
    		function errorCallback(error) {}
    	);      	
    	                        
        $scope.onSelectedMenu = function (name) {
            $location.path("/dict/" + name + "/list/");
        };
                
        $location.path("/dict/logo/");
    });
	