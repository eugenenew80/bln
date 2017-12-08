angular.module("app", ["ngCookies", "ngMaterial", "ui.bootstrap", "common", "dictApp", "admApp", "infoApp", "mediaApp"])

    .config(function ($httpProvider, $locationProvider, $mdDateLocaleProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");

        $httpProvider.defaults.headers.common["Accept"] = "application/json;charset=utf-8";
        $httpProvider.defaults.headers.common["lang"] = "RU";

        $mdDateLocaleProvider.formatDate = function(date) {
            return date ? moment(date).format('DD.MM.YYYY') : null;
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD.MM.YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
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
		    dictEnergyDistrictDescriptionService,
		    dictDataSourceDescriptionService,
		    dictMeterTypeDescriptionService,
		    dictCurrentTransTypeDescriptionService,
		    dictVoltageTransTypeDescriptionService,
		    dictOrganizationDescriptionService,
		    dictMeterDescriptionService,
		    dictVoltageClassDescriptionService,
		    dictEnergySourceTypeDescriptionService,
		    dictSubstationDescriptionService,
		    dictEnergySourceDescriptionService,
		    dictMeteringTypeDescriptionService,
		    dictSubstationTypeDescriptionService,
		    dictAccountingTypeDescriptionService,
		    dictMeteringPointTypeDescriptionService,
		    dictMeteringPointDescriptionService,
		    dictSubstationBusinessPartnerDescriptionService,
		    dictSubstationMeteringPointDescriptionService,
		    dictEnergySourceBusinessPartnerDescriptionService,
		    dictEnergySourceMeteringPointDescriptionService,
		    dictMeteringPointMeterDescriptionService,
		    dictMeteringPointCurrentTransDescriptionService,
		    dictMeteringPointVoltageTransDescriptionService,
		    dictBusinessPartnerDescriptionService,
		    dictCountryDescriptionService,
		    dictBankDescriptionService,
            dictReactorDescriptionService,
            dictPowerTransformerDescriptionService,
            dictPowerLineTypeDescriptionService,
            dictPowerLineDescriptionService,
            dictPowerLinePartDescriptionService,

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
	    descriptionServices["dictEnergyDistrict"] = dictEnergyDistrictDescriptionService;
	    descriptionServices["dictDataSource"] = dictDataSourceDescriptionService;
	    descriptionServices["dictMeterType"] = dictMeterTypeDescriptionService;
	    descriptionServices["dictCurrentTransType"] = dictCurrentTransTypeDescriptionService;
	    descriptionServices["dictVoltageTransType"] = dictVoltageTransTypeDescriptionService;
	    descriptionServices["dictOrganization"] = dictOrganizationDescriptionService;
	    descriptionServices["dictMeter"] = dictMeterDescriptionService;
	    descriptionServices["dictVoltageClass"] = dictVoltageClassDescriptionService;
	    descriptionServices["dictEnergySourceType"] = dictEnergySourceTypeDescriptionService;
	    descriptionServices["dictSubstation"] = dictSubstationDescriptionService;
	    descriptionServices["dictEnergySource"] = dictEnergySourceDescriptionService;
	    descriptionServices["dictMeteringType"] = dictMeteringTypeDescriptionService;
	    descriptionServices["dictSubstationType"] = dictSubstationTypeDescriptionService;
	    descriptionServices["dictAccountingType"] = dictAccountingTypeDescriptionService;
	    descriptionServices["dictMeteringPointType"] = dictMeteringPointTypeDescriptionService;
        descriptionServices["dictMeteringPoint"] = dictMeteringPointDescriptionService;
        descriptionServices["dictBusinessPartner"] = dictBusinessPartnerDescriptionService;
        descriptionServices["dictCountry"] = dictCountryDescriptionService;
        descriptionServices["dictBank"] = dictBankDescriptionService;
        descriptionServices["dictReactor"] = dictReactorDescriptionService;
        descriptionServices["dictPowerTransformer"] = dictPowerTransformerDescriptionService;
        descriptionServices["dictPowerLineType"] = dictPowerLineTypeDescriptionService;
        descriptionServices["dictPowerLine"] = dictPowerLineDescriptionService;
        descriptionServices["dictPowerLinePart"] = dictPowerLinePartDescriptionService;

        descriptionServices["dictSubstationBusinessPartner"] = dictSubstationBusinessPartnerDescriptionService;
        descriptionServices["dictSubstationMeteringPoint"] = dictSubstationMeteringPointDescriptionService;
        descriptionServices["dictEnergySourceBusinessPartner"] = dictEnergySourceBusinessPartnerDescriptionService;
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
