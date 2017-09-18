angular.module("admApp", ["ngMaterial", "ngResource", "ngRoute", "ngAnimate", "common"])
    .constant("rowsPerPage", 5)
    .constant("idField", "id")

    .factory("admBaseUrl", function(appSettings) {
    	return appSettings.baseUrl + "blnApi/webapi/adm/"
    })
    
    .factory("admNodes", function() {
    	return [
    		"admModule",
    		"admFunc",
			"admRole",
			"admUser"
    	];
    })
    
    .config(function ($routeProvider) {    	
		$routeProvider.when("/adm/:adm/list", {
			templateUrl: "adm/features/admDefault/views/list.html",
			controller: "admDefaultListCtrl",
			
			resolve: {
				descriptionService: function(descriptionServices, $route) {
					return descriptionServices[$route.current.params.adm];
				}				
			}			
		});     	
    			
		$routeProvider.when("/adm/logo", {
			templateUrl: "adm/logo.html",
		});	
		
		
		$routeProvider.otherwise({
            templateUrl: "adm/logo.html"
        });
    });
