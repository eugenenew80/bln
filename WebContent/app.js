angular.module("app", ["ngCookies", "ngMaterial", "common", "dictApp", "admApp", "infoApp"])

    .config(function ($httpProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");

        $httpProvider.defaults.headers.common = {
            "Accept": "application/json;charset=utf-8"
        };
    })

    
	.factory("dataServices", function (dictDataServiceFactory, dictResourceFactory, admDataServiceFactory, admResourceFactory, dictNodes, admNodes) {
	    var dataServices = [];	    
	    angular.forEach(dictNodes, function(node) {
	    	dataServices[node] = dictDataServiceFactory.newInstance(dictResourceFactory.newInstance(node));
	    })
	    
	    angular.forEach(admNodes, function(node) {
	    	dataServices[node] =admDataServiceFactory.newInstance(admResourceFactory.newInstance(node));
	    })
	    
		return dataServices;
	})


	.factory("descriptionServices", function (
		    dictUnitDescriptionService,
		    dictRegionDescriptionService,
		    dictEnergyZoneDescriptionService,
		    dictEnergyNodeDescriptionService,
		    dictDataSourceDescriptionService,
		    dictMeterTypeDescriptionService,
		    dictCurrentTransTypeDescriptionService,
		    dictVoltageTransTypeDescriptionService,
		    dictCompanyDescriptionService,
		    dictMeterDescriptionService,
		    dictCurrentTransDescriptionService,
		    dictVoltageTransDescriptionService,
		    dictEnergySourceTypeDescriptionService,
		    dictSubstationDescriptionService,
		    dictEnergySourceDescriptionService,
		    dictMeteringTypeDescriptionService,
		    dictSubstationTypeDescriptionService,
		    dictAccountingTypeDescriptionService,
		    dictMeteringPointTypeDescriptionService,
		    dictMeteringPointDescriptionService,
		    
		    admFuncDescriptionService,
		    admRoleDescriptionService,
		    admUserDescriptionService,
		    admModuleDescriptionService
	
	) {
	    var descriptionServices = [];
	    descriptionServices["dictCompany"] = dictUnitDescriptionService;
	    descriptionServices["dictRegion"] = dictRegionDescriptionService;
	    descriptionServices["dictEnergyZone"] = dictEnergyZoneDescriptionService;
	    descriptionServices["dictEnergyNode"] = dictEnergyNodeDescriptionService;
	    descriptionServices["dictDataSource"] = dictDataSourceDescriptionService;
	    descriptionServices["dictMeterType"] = dictMeterTypeDescriptionService;
	    descriptionServices["dictCurrentTransType"] = dictCurrentTransTypeDescriptionService;
	    descriptionServices["dictVoltageTransType"] = dictVoltageTransTypeDescriptionService;
	    descriptionServices["dictCompany"] = dictCompanyDescriptionService;
	    descriptionServices["dictMeter"] = dictMeterDescriptionService;
	    descriptionServices["dictCurrentTrans"] = dictCurrentTransDescriptionService;
	    descriptionServices["dictVoltageTrans"] = dictVoltageTransDescriptionService;
	    descriptionServices["dictEnergySourceType"] = dictEnergySourceTypeDescriptionService;
	    descriptionServices["dictSubstation"] = dictSubstationDescriptionService;
	    descriptionServices["dictEnergySource"] = dictEnergySourceDescriptionService;
	    descriptionServices["dictMeteringType"] = dictMeteringTypeDescriptionService;
	    descriptionServices["dictSubstationType"] = dictSubstationTypeDescriptionService;
	    descriptionServices["dictAccountingType"] = dictAccountingTypeDescriptionService;
	    descriptionServices["dictMeteringPointType"] = dictMeteringPointTypeDescriptionService;
	    descriptionServices["dictMeteringPoint"] = dictMeteringPointDescriptionService;
	    
	    descriptionServices["admFunc"] = admFuncDescriptionService;
	    descriptionServices["admRole"] = admRoleDescriptionService;
	    descriptionServices["admUser"] = admUserDescriptionService;
	    descriptionServices["admModule"] = admModuleDescriptionService;
	    
		return descriptionServices;
	})	
	
	
	.factory("authBaseUrl", function(appSettings) {
    	return appSettings.baseUrl + "blnApi/webapi/"
    });
