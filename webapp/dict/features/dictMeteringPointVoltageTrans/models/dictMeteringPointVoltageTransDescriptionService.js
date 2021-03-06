(function () {
    angular.module("dictApp")
        .factory("dictMeteringPointVoltageTransDescriptionService", function ($filter, dataServices, buttonBuilder, fieldBuilder, tableFieldBuilder, responsiveTableFieldBuilder) {

			var serviceName = "dictMeteringPointVoltageTrans";
			var serviceDescPural = "Трансформаторы напряжения";
			var serviceDescSingular = "Трансформатор напряжения";

			//List fields description for search
			var searchFieldsDef = [
			];
        	
        	
			//List actions for search
			var searchActionsDef = [
			];    
			
			
            //List fields description for table
			var tableFieldsDef = [
  	            responsiveTableFieldBuilder.build({
		            name: "name",
		            desc: "Тип трансформатора",
		            headerStyle: "width: 50%",
	            }),

  	            responsiveTableFieldBuilder.build({
		            name: "manufacturer",
		            desc: "Производитель",
		            headerStyle: "width: 40%",
	            }),
			];

			
            //List actions after search
            var tableActionsDef = [
				{
                    action: "create",
                    typeAction: "form",

                    form: {
                        name: "edit",
                        data: "@newElement",

                        ok: {
                            action: "@create",
                            data: "@element"
                        },

                        cancel: {
                            action: "@close"
                        }
                    },	

					trigger: "button",
					button: {
						desc: "Добавить",
						tooltip: "Добавить новую запись",
						classes: "btn btn-primary btn-xs",
						style: "",
						glyphicon: "glyphicon",
						disabled: false
					}
				},
				
				
				{
                    action: "back",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "goBack"
                    },	
                    
                    trigger: "button",
					button: {
						desc: "Назад",
						tooltip: "Вернуться назад",
						classes: "btn btn-primary btn-xs",
						style: "",
						glyphicon: "glyphicon",
						disabled: false
					}
				},				
            ];
			
            
            //List actions for row
            var rowActionsDef = [     
				
                {
                    action: "edit",
                    typeAction: "form",

                    form: {
                        name: "edit",
                        data: "@currentElement",

                        ok: {
                            action: "@update",
                            data: "@element"
                        },

                        cancel: {
                            action: "@close"
                        }
                    },	

                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Изменить",
						tooltip: "Изменить запись",
						glyphicon: "glyphicon-pencil"
					})
                },

				{
                    action: "remove",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "removeChild"
                    },	
                    
                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Удалить",
						tooltip: "Удалить запись",
						glyphicon: "glyphicon-remove"
					})
				},
	                
            ];
            

            //return description service
            return {
                name: serviceName,
                desc: serviceDescPural,
                dataService: dataServices[serviceName],
                parentField: "meteringPointId",
                childField: "id",
                
                sections: {
                	
                	//header section
                	header: {
                		path: {
                			type: "breadcrumb",
                			items: ["НСИ", "Точки учёта", "@parentName", serviceDescPural],		
                		}
                	},

                	
					//Main section
                	main: {
                		
                		//Search form
                		search: {},
                		
                		
		                table: {
		                	//params
		                	type: "table",
		                	data: "elements",
		                    tableType: "responsive",
		                    templateURL: "common/directives/complexView/complexViewTable/complexViewTableTemplate.html",
		                    tableClass: "table table-hover table-condensed table-bordered",
		                    tableStyle: "table-layout: fixed; word-wrap: break-word;",
		                    rowsPerPage: 10,
		                    
		                    liveSearch: {
		                    	enabled: true,
		                    	text: "Быстрый поиск"
		                    },
		                    
		                    search: {
		                    	enabled: true,
		                    	text: "Панель фильтров"
		                    },
		                    
		                    //fields
		                    fields: tableFieldsDef,

		                    //table actions
	                		tableActions: {
	                			type: "actions",		                    
								items: tableActionsDef
	                		},
                			
	                		//row actions
                            rowActions: {
                                type: "actions",
                                items: rowActionsDef                             
                            }
	                		
		                }
                	}
                },

                //Modal forms
                forms: {
                    //Form edit user
                    edit: {
                        type: "modalForm",
                        templateURL: "dict/features/dictDefault/views/edit.html",
                        controller: "dictDefaultEditCtrl",
                        header: serviceDescSingular,
                        style: "min-width: 400px;",

                        autoFill: {
                            dictName: "dictVoltageTransType",
                            desc: "Тип трансформатора напряжения",
                            tooltip: "Выбрать тип трансформатора напряжения",
                            fields: [
                                "name",
                                "manufacturer",
                                "accuracyClass",
                                "ratedVoltage1",
                                "ratedVoltage2"
                            ]
                        },

                        panels: [
                        	{
                        		name:   "base",
                        		title:  "Общие данные"  	
                        	}                  	
                        ],
                        
                        fields: [
            				fieldBuilder.build({
            					name: "name",
            					labelDesc: "Тип, Марка, Модель",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                required: true,
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "manufacturer",
            					labelDesc: "Производитель",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                required: true,
                                panel: "base",
                                editable: true
            				}),

                            fieldBuilder.build({
                                name: "businessPartnerShortName",
                                controlValue: "businessPartnerId",
                                labelDesc: "Компания-владелец",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                dictName: "dictBusinessPartner",
                                dictValueName: "id",
                                dictDisplayName: "shortName",
                                panel: "base",
                                editable: true,
                                control: "input"
                            }),

            				fieldBuilder.build({
            					name: "ratedVoltage1",
            					labelDesc: "Номинальное напряжение первичной обмотки, В",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "ratedVoltage2",
            					labelDesc: "Номинальное напряжение вторичной обмотки, В",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "accuracyClass",
            					labelDesc: "Класс точности",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "startDate",
            					labelDesc: "Дата монтажа",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "date",
                                panel: "base",
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "endDate",
            					labelDesc: "Дата демонтажа",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "date",
                                panel: "base",
                                editable: true
            				})	            				
                        ],
                        
                        
                        actions: [
    							{
    			                    action: "cmdSave",
    			                    typeAction: "controllerMethod",

    			                    controllerMethod: {
    			                        name: "save"
    			                    },	
    			                    
    								trigger: "button",
    								button: {
    									desc: "Сохранить",
    									tooltip: "Сохранить изменения",
    									classes: "btn btn-primary btn-sm",
    									disabled: false
    								}
    							},
    							
    							{
    			                    action: "cmdCancel",
    			                    typeAction: "controllerMethod",

    			                    controllerMethod: {
    			                        name: "cancel"
    			                    },	
    			                    
    								trigger: "button",
    								button: {
    									desc: "Закрыть",
    									tooltip: "Закрыть окно",
    									classes: "btn btn-warning btn-sm",
    									disabled: false
    								}
    							}								                          
                        ]                          
                    }
                                       
                    
                }
            }
        });
})();