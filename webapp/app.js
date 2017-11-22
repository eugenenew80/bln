angular.module("app", ["ngCookies", "ngMaterial", "ui.bootstrap", "common", "dictApp", "admApp", "infoApp", "mediaApp"])

    .config(function ($httpProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");

        $httpProvider.defaults.headers.common = {
            "Accept": "application/json;charset=utf-8"
        };
    })

    
	.factory("dataServices", function (dictDataServiceFactory, dictResourceFactory, dictParentChildDataServiceFactory, dictParentChildResourceFactory, admDataServiceFactory, admResourceFactory, metaDataServiceFactory, metaResourceFactory, admParentChildDataServiceFactory, admParentChildResourceFactory, mediaDataServiceFactory, mediaResourceFactory, mediaParentChildDataServiceFactory, mediaParentChildResourceFactory, dictNodes, dictChildNodes, admNodes, admChildNodes, metaNodes, mediaNodes, mediaChildNodes) {
	    var dataServices = [];	    
	    angular.forEach(dictNodes, function(node) {
	    	dataServices[node] = dictDataServiceFactory.newInstance(dictResourceFactory.newInstance(node));
	    })
	    
	    angular.forEach(dictChildNodes, function(node) {
	    	dataServices[node.child] = dictParentChildDataServiceFactory.newInstance(dictParentChildResourceFactory.newInstance(node.parent + "/:parentId/" + node.child));
	    })
	    
	    
	    angular.forEach(admNodes, function(node) {
	    	dataServices[node] = admDataServiceFactory.newInstance(admResourceFactory.newInstance(node));
	    })
	    
	    angular.forEach(admChildNodes, function(node) {
	    	dataServices[node.child] = admParentChildDataServiceFactory.newInstance(admParentChildResourceFactory.newInstance(node.parent + "/:parentId/" + node.child));
	    })
	    

	    angular.forEach(metaNodes, function(node) {
	    	dataServices[node] = metaDataServiceFactory.newInstance(metaResourceFactory.newInstance(node));
	    })
	    
	    
	    angular.forEach(mediaNodes, function(node) {
	    	dataServices[node] = mediaDataServiceFactory.newInstance(mediaResourceFactory.newInstance(node));
	    })
	    
	    angular.forEach(mediaChildNodes, function(node) {
	    	dataServices[node.child] = mediaParentChildDataServiceFactory.newInstance(mediaParentChildResourceFactory.newInstance(node.parent + "/:parentId/" + node.child));
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
		    dictSubstationCompanyDescriptionService,
		    dictSubstationMeteringPointDescriptionService,
		    dictEnergySourceCompanyDescriptionService,
		    dictEnergySourceMeteringPointDescriptionService,
		    dictMeteringPointMeterDescriptionService,
		    dictMeteringPointCurrentTransDescriptionService,
		    dictMeteringPointVoltageTransDescriptionService,
		    dictBusinessPartnerDescriptionService,

		    admFuncDescriptionService,
		    admRoleDescriptionService,
		    admUserDescriptionService,
		    admRoleModuleDescriptionService,
		    admRoleFuncDescriptionService,
		    admRoleDictDescriptionService,
		    admUserRoleDescriptionService,
		    
		    metaModuleDescriptionService,
		    metaDictDescriptionService,
		    metaAdmDescriptionService,
		    metaMediaDescriptionService,
		    
		    mediaGroupDescriptionService,
		    mediaGroupMeteringPointDescriptionService,
		    mediaDocTypeDescriptionService,
		    mediaDocMeteringReadingHeaderDescriptionService,
		    mediaDocMeteringReadingLineDescriptionService,
            mediaDocMeterReplacingHeaderDescriptionService,
            mediaDocMeterReplacingLineDescriptionService,
            mediaDocUnderAccountingHeaderDescriptionService,
            mediaDocUnderAccountingMeasLineDescriptionService,
            mediaDocUnderAccountingCalcLineDescriptionService
	) {
	    var descriptionServices = [];
	    descriptionServices["dictUnit"] = dictUnitDescriptionService;
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
        descriptionServices["dictBusinessPartner"] = dictBusinessPartnerDescriptionService;

        descriptionServices["dictSubstationCompany"] = dictSubstationCompanyDescriptionService;
        descriptionServices["dictSubstationMeteringPoint"] = dictSubstationMeteringPointDescriptionService;
        descriptionServices["dictEnergySourceCompany"] = dictEnergySourceCompanyDescriptionService;
        descriptionServices["dictEnergySourceMeteringPoint"] = dictEnergySourceMeteringPointDescriptionService;
        descriptionServices["dictMeteringPointMeter"] = dictMeteringPointMeterDescriptionService;
        descriptionServices["dictMeteringPointCurrentTrans"] = dictMeteringPointCurrentTransDescriptionService;
        descriptionServices["dictMeteringPointVoltageTrans"] = dictMeteringPointVoltageTransDescriptionService;
        descriptionServices["dictMeteringPointMeter"] = dictMeteringPointMeterDescriptionService;

	    descriptionServices["admFunc"] = admFuncDescriptionService;
	    descriptionServices["admRole"] = admRoleDescriptionService;
	    descriptionServices["admUser"] = admUserDescriptionService;
	    descriptionServices["admRoleModule"] = admRoleModuleDescriptionService;
	    descriptionServices["admRoleFunc"] = admRoleFuncDescriptionService;
	    descriptionServices["admRoleDict"] = admRoleDictDescriptionService;
	    descriptionServices["admUserRole"] = admUserRoleDescriptionService;
	    
	    descriptionServices["metaModule"] = metaModuleDescriptionService;
	    descriptionServices["metaDict"] = metaDictDescriptionService;
	    descriptionServices["metaAdm"] = metaAdmDescriptionService;
	    descriptionServices["metaMedia"] = metaMediaDescriptionService;
	    
	    descriptionServices["mediaGroup"] = mediaGroupDescriptionService;
	    descriptionServices["mediaGroupMeteringPoint"] = mediaGroupMeteringPointDescriptionService;
	    descriptionServices["mediaDocType"] = mediaDocTypeDescriptionService;
	    descriptionServices["mediaDocMeteringReadingHeader"] = mediaDocMeteringReadingHeaderDescriptionService;
	    descriptionServices["mediaDocMeteringReadingLine"] = mediaDocMeteringReadingLineDescriptionService;
	    descriptionServices["mediaDocMeterReplacingHeader"] = mediaDocMeterReplacingHeaderDescriptionService;
	    descriptionServices["mediaDocMeterReplacingLine"] = mediaDocMeterReplacingLineDescriptionService;
	    descriptionServices["mediaDocUnderAccountingHeader"] = mediaDocUnderAccountingHeaderDescriptionService;
	    descriptionServices["mediaDocUnderAccountingMeasLine"] = mediaDocUnderAccountingMeasLineDescriptionService;
	    descriptionServices["mediaDocUnderAccountingCalcLine"] = mediaDocUnderAccountingCalcLineDescriptionService;

	    return descriptionServices;
	});
