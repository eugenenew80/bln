angular.module("mediaApp", ["ngMaterial", "ngResource", "ngRoute", "ngAnimate", "common"])
    .constant("rowsPerPage", 5)
    .constant("idField", "id")

    .factory("mediaBaseUrl", function(appSettings) {
    	return appSettings.baseUrl + "blnMediaApi/webapi/media/"
    })
    
    .factory("mediaNodes", function() {
    	return [
    		"mediaGroup",
    		"mediaDocType",
    		"mediaDocTemplate",
    		"mediaDocMeteringReadingHeader"
    	];
    })
        
    .factory("mediaChildNodes", function() {
    	return [
    		{ child: "mediaGroupMeteringPoint", parent: "mediaGroup" },
    		{ child: "mediaDocMeteringReadingLine", parent: "mediaDocMeteringReadingHeader" }
    	];
    })    
    
    .config(function ($routeProvider) {
    	
		$routeProvider.when("/media/mediaDayMeteringDataOper/list", {
			templateUrl: "media/features/mediaDefault/views/list.html",
			controller: "mediaDayMeteringDataOperListCtrl",
			
			resolve: {
				descriptionService: function(mediaDayMeteringDataOperDescriptionService) {
					return mediaDayMeteringDataOperDescriptionService;
				}				
			}			
		});   
    	
    	
		$routeProvider.when("/media/:media/list", {
			templateUrl: "media/features/mediaDefault/views/list.html",
			controller: "mediaDefaultListCtrl",
			
			resolve: {
				descriptionService: function(descriptionServices, $route) {
					return descriptionServices[$route.current.params.media];
				}				
			}			
		});     	
    			
		$routeProvider.when("/media/logo", {
			templateUrl: "media/logo.html",
		});	
		
		
		$routeProvider.otherwise({
            templateUrl: "media/logo.html"
        });
    });
