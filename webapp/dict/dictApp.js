angular.module("dictApp", ["ngMaterial", "ngResource", "ngRoute", "ngAnimate", "common"])
    .constant("rowsPerPage", 5)
    .constant("idField", "id")

    .factory("dictBaseUrl", function(appSettings) {
    	return appSettings.baseUrl + "blnDictApi/webapi/dict/"
    })
    
    .factory("dictNodes", function() {
    	return [
    	    "dictVoltageClass",
    		"dictMeterType",
			"dictCurrentTransType",
			"dictVoltageTransType",
			"dictMeteringPoint",
			"dictMeter",
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
			"dictEnergyDistrict",
			"dictDataSource",
			"dictBusinessPartner",
			"dictCountry",
			"dictBank",
			"dictReactor",
			"dictPowerTransformer",
			"dictPowerLine",
			"dictPowerLineType",
			"dictOrgType",
			"ecmContentType",
    	];
    })
    
    
    .factory("dictChildNodes", function() {
    	return [
    		{ child: "dictSubstationMeteringPoint",   	parent: "dictSubstation" },
    		{ child: "dictEnergySourceMeteringPoint", 	parent: "dictEnergySource" },
    		{ child: "dictMeteringPointMeter", 			parent: "dictMeteringPoint" },
    		{ child: "dictMeteringPointCurrentTrans", 	parent: "dictMeteringPoint" },
    		{ child: "dictMeteringPointVoltageTrans", 	parent: "dictMeteringPoint" },
    		{ child: "dictPowerLinePart", 	            parent: "dictPowerLine" },
    		{ child: "dictBusinessPartnerContact", 	    parent: "dictBusinessPartner" },
    		{ child: "dictBusinessPartnerBankAccount", 	parent: "dictBusinessPartner" },
    		{ child: "dictBusinessPartnerContent", 		parent: "dictBusinessPartner" },
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

		$routeProvider.otherwise({
            templateUrl: "dict/logo.html"
        });
    });
