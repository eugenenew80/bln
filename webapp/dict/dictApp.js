angular.module("dictApp", ["ngMaterial", "ngResource", "ngRoute", "ngAnimate", "common"])
    .constant("rowsPerPage", 5)
    .constant("idField", "id")

    .factory("dictBaseUrl", function(appSettings) {
    	return appSettings.baseUrl + "blnDictApi/webapi/dict/"
    })
    
    .factory("dictNodes", function() {
    	return [
    		"dictMeterType",
			"dictCurrentTransType",
			"dictVoltageTransType",
			"dictMeteringPoint",
			"dictMeter",
			"dictCurrentTrans",
			"dictVoltageTrans",
			"dictSubstationType",
			"dictEnergySourceType",
			"dictSubstation",
			"dictEnergySource",
			"dictMeteringType",
			"dictMeteringPointType",
			"dictAccountingType",
			"dictUnit",
			"dictOrganization",
			"dictRegion",
			"dictEnergyZone",
			"dictEnergyNode",
			"dictDataSource",    		
			"dictBusinessPartner"
    	];
    })
    
    
    .factory("dictChildNodes", function() {
    	return [
    		{ child: "dictSubstationBusinessPartner",   parent: "dictSubstation" },
    		{ child: "dictSubstationMeteringPoint",   	parent: "dictSubstation" },
    		{ child: "dictEnergySourceBusinessPartner", parent: "dictEnergySource" },
    		{ child: "dictEnergySourceMeteringPoint", 	parent: "dictEnergySource" },
    		{ child: "dictMeteringPointMeter", 			parent: "dictMeteringPoint" },
    		{ child: "dictMeteringPointCurrentTrans", 	parent: "dictMeteringPoint" },
    		{ child: "dictMeteringPointVoltageTrans", 	parent: "dictMeteringPoint" },
    	];
    })
    
    
    .config(function ($routeProvider) {    	
		$routeProvider.when("/dict/:dict/list", {
			templateUrl: "dict/features/dictDefault/views/list.html",
			controller: "dictDefaultListCtrl",
			
			resolve: {
				descriptionService: function(descriptionServices, $route) {
					return descriptionServices[$route.current.params.dict];
				}				
			}			
		});     	
    			
		$routeProvider.when("/dict/logo", {
			templateUrl: "dict/logo.html",
		});	
		
		
		$routeProvider.otherwise({
            templateUrl: "dict/logo.html"
        });
    });
