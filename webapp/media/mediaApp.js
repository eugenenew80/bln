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
    		"mediaDocMeteringReadingHeader",
    		"mediaDocMeterReplacingHeader",
    		"mediaDocUnderAccountingHeader"
    	];
    })
        
    .factory("mediaChildNodes", function() {
    	return [
    		{ child: "mediaGroupMeteringPoint", parent: "mediaGroup" },
    		{ child: "mediaDocMeteringReadingLine", parent: "mediaDocMeteringReadingHeader" },
    		{ child: "mediaDocMeterReplacingLine", parent: "mediaDocMeterReplacingHeader" },
    		{ child: "mediaDocUnderAccountingMeasLine", parent: "mediaDocUnderAccountingHeader" },
    		{ child: "mediaDocUnderAccountingCalcLine", parent: "mediaDocUnderAccountingHeader" }
    	];
    })    
    
    .config(function ($routeProvider) {
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
