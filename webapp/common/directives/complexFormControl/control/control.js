angular.module("common")
	.directive("simpleControl", function ($filter, $mdDialog, idField, descriptionServices, dataServices, stateService, urlParamsBuilder) {
		return {

			link: function (scope, element, attrs) {

				scope.search = function () {
					if (!scope.control.dict)
						return;

					$mdDialog.show({
                        templateUrl: "dict/features/dictDefault/views/search.html",
                        controller: "defaultSearchCtrl",
                        multiple: true,
                        locals: {
                            descriptionService: descriptionServices[scope.control.dict]
                        }
                    })
					.then(function (data) {
                        scope.currentElement[scope.control.name] = data[scope.fieldDisplayName];
                        scope.currentElement[scope.control.value] = data[scope.fieldValueName];
						scope.form.$setDirty();
					});
                };


				scope.clear = function () {
					if (!scope.control.dict)
						return;

					scope.currentElement[scope.control.name] = null;
					scope.currentElement[scope.control.value] = null;
					scope.form.$setDirty();
                };


				scope.fieldValue=idField;
				scope.fieldDisplayName=scope.control.dictDisplayName;
				scope.fieldValueName=scope.control.dictValueName || idField;

				scope.templateURL="common/directives/complexFormControl/control/";
				switch(scope.control.control) {
					case "input":
						if(scope.control.dataType=="string" && !scope.control.dict)
							scope.templateURL=scope.templateURL + "stringInput.html";
						else if(scope.control.dataType=="string" && scope.control.dict)
							scope.templateURL=scope.templateURL + "stringInputSearch.html";
						else if(scope.control.dataType=="integer")
							scope.templateURL=scope.templateURL + "integerInput.html";
						else if(scope.control.dataType=="number")
							scope.templateURL=scope.templateURL + "numberInput.html";
						else if(scope.control.dataType=="date")
							scope.templateURL=scope.templateURL + "dateInput.html";
						else if(scope.control.dataType=="datetime")
							scope.templateURL=scope.templateURL + "dateTimeInput.html";
						else
							scope.templateURL=scope.templateURL + "stringInput.html";

						break;

					case "select":
                        scope.templateURL=scope.templateURL + "select.html";
						break;

					case "checkbox":
						scope.templateURL=scope.templateURL + "inputCheckbox.html";
						break;

					case "radio":
						scope.templateURL=scope.templateURL + "inputRadio.html";
						break;
						
					case "textarea":
						scope.templateURL=scope.templateURL + "stringTextArea.html";
						break;

					default:
						scope.templateURL=scope.templateURL + "stringInput.html";
				}


				//Bootstrap UI datepicker options
				scope.datepicker={
					opened:false,
					options: {
						
					},
					
					format: "dd.MM.yyyy",
					
					modelOptions: {
						timezone: "0"
					}					
				};


				//Bootstrap UI datepicker options
				scope.dateTimePicker={
					opened:false,
					options: {

					},

					format: "dd.MM.yyyy HH:mm",

					modelOptions: {
						timezone: "0"
					}
				};


				scope.dict={};


				//Processing dictParams
				var dictParams={};
				if (scope.control.dictParams)
					dictParams=urlParamsBuilder.build(scope.control.dictParams, scope.currentElement);

				//Bind dict to select
				if (scope.control.dict && scope.control.control=="select" && scope.control.name!='energyObjectId')
					scope.dict[scope.control.name] = dataServices[scope.control.dict].getElements(dictParams);

				if (scope.control.dict && scope.control.control=="select" && scope.control.name=='energyObjectId') {
					scope.$watch("currentElement.energyObjectType", function (newValue, oldValue) {
						if (!newValue) return;

                        if (newValue=='ENERGY_SOURCE')
                            scope.dict[scope.control.name] = dataServices['dictEnergySource'].getElements(dictParams);

                        if (newValue=='SUBSTATION')
                            scope.dict[scope.control.name] = dataServices['dictSubstation'].getElements(dictParams);
					})
                }


				//Watching for dependency fields
				angular.forEach(scope.control.dictParams, function(value) {
					if (value && angular.isString(value) && value.startsWith("@") && !value.substr(1).startsWith("@") ) {
						var watchedField=value.substr(1);
						scope.$watch("currentElement['" + watchedField + "']", function(newValue, oldValue) {
							if (!newValue) return;

							var dictParams=urlParamsBuilder.build(scope.control.dictParams, scope.currentElement);
							if (scope.control.control=="select")
								scope.dict[scope.control.name]=dataServices[scope.control.dict].findAll(dictParams);
						});
					}
				});
			},

			restrict: "EA",
			replace: true,

			scope: {
				currentElement: "=element",
				form: 			"=form",
				control: 		"=control",
				field: 			"=field"
			},

			template: "<ng-include src='templateURL'></ng-include>"
		}
	});