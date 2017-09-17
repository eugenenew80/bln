angular.module("admApp", ["ngMaterial", "ngResource", "ngRoute", "ngAnimate", "common"])
    .constant("rowsPerPage", 5)
    .constant("idField", "id")

    .factory("admBaseUrl", function(appSettings) {
    	return appSettings.baseUrl + "blnApi/webapi/adm/"
    })
    
    .config(function ($routeProvider) {
		$routeProvider.when("/adm/func/list", {
			templateUrl: "adm/features/admDefault/views/list.html",
			controller: "admDefaultListCtrl",
			
			resolve: {
				dataService: function(admFuncDataService) {
					return admFuncDataService;
				},
				
				descriptionService: function(admFuncDescriptionService) {
					return admFuncDescriptionService;
				}				
			}
		}); 

		
		$routeProvider.when("/adm/role/list", {
			templateUrl: "adm/features/admDefault/views/list.html",
			controller: "admDefaultListCtrl",
			
			resolve: {
				dataService: function(admRoleDataService) {
					return admRoleDataService;
				},
				
				descriptionService: function(admRoleDescriptionService) {
					return admRoleDescriptionService;
				}				
			}
		}); 

		
		$routeProvider.when("/adm/user/list", {
			templateUrl: "adm/features/admDefault/views/list.html",
			controller: "admDefaultListCtrl",
			
			resolve: {
				dataService: function(admUserDataService) {
					return admUserDataService;
				},
				
				descriptionService: function(admUserDescriptionService) {
					return admUserDescriptionService;
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
