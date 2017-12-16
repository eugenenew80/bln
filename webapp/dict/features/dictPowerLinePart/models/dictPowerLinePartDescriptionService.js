(function () {
    angular.module("dictApp")
        .factory("dictPowerLinePartDescriptionService", function ($filter, dataServices, buttonBuilder, fieldBuilder, tableFieldBuilder, responsiveTableFieldBuilder) {

			var serviceName = "dictPowerLinePart";
			var serviceDescPlural = "Участки линий электропередач";
			var serviceDescSingular = "Участок линии электропередач";

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
		            desc: "Наименование",
		            headerStyle: "width: 70%",
	            }),

  	            responsiveTableFieldBuilder.build({
		            name: "startDate",
		            desc: "Дата с",
		            headerStyle: "width: 10%",
		            dataType: "date"
	            }),
	            
  	            responsiveTableFieldBuilder.build({
		            name: "endDate",
		            desc: "Дата по",
		            headerStyle: "width: 10%",
		            dataType: "date"
	            }) 	            
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
                desc: serviceDescPlural,
                dataService: dataServices[serviceName],
                parentField: "powerLineId",
                childField: "id",
                
                sections: {
                	
                	//header section
                	header: {
                		path: {
                			type: "breadcrumb",
                			items: ["НСИ", "Линии электропередач", "@parentName", serviceDescPlural],
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

                        panels: [
                        	{
                        		name:   "base",
                        		title:  "Общие данные"  	
                        	}                  	
                        ],
                        
                        fields: [
            				fieldBuilder.build({
            					name: "name",
            					labelDesc: "Наименование",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                required: true,
                                panel: "base",
                                editable: true
            				}),

                            fieldBuilder.build({
                                name: "businessPartnerShortName",
                                controlValue: "businessPartnerId",
                                labelDesc: "Когмпания-владелец",
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
            					name: "length",
            					labelDesc: "Длина",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "r",
            					labelDesc: "Сопротивление, Ом",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "startDate",
            					labelDesc: "Дата с",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "date",
                                panel: "base",
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "endDate",
            					labelDesc: "Дата по",
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