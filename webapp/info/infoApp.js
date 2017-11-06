angular.module("infoApp", ["ngMaterial", "ngResource", "ngRoute", "ngAnimate", "common"])
    .constant("rowsPerPage", 5)
    .constant("idField", "id")

    .factory("infoBaseUrl", function(appSettings) {
    	return appSettings.baseUrl + "blnApi/webapi/info/"
    })
    
    .config(function ($routeProvider) {
		$routeProvider.otherwise({
            templateUrl: "info/logo.html"
        });
    });
