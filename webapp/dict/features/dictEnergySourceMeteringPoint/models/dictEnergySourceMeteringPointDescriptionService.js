(function () {
    angular.module("dictApp")
        .factory("dictEnergySourceMeteringPointDescriptionService", function ($filter, dataServices, buttonBuilder, fieldBuilder, tableFieldBuilder, responsiveTableFieldBuilder) {

			var serviceName = "dictEnergySourceMeteringPoint";
			var serviceDescPural = "Точки учёта";
			var serviceDescSingular = "Точки учёта";

			//List fields description for search
			var searchFieldsDef = [
			];
        	
        	
			//List actions for search
			var searchActionsDef = [
			];    
			
			
            //List fields description for table
			var tableFieldsDef = [

  	            responsiveTableFieldBuilder.build({
		            name: "meteringPointName",
		            desc: "Точка учёта",
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
                desc: serviceDescPural,
                dataService: dataServices[serviceName],
                parentField: "energySourceId",
                childField: "id",
                
                sections: {
                	
                	//header section
                	header: {
                		path: {
                			type: "breadcrumb",
                			items: ["НСИ", "Энергоисточники", "@parentName", serviceDescPural],		
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
            					name: "meteringPointName",
            					controlValue: "meteringPointId",
            					labelDesc: "Точка учёта",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
            					dictName: "dictMeteringPoint",
                                dictValueName: "id",
                                dictDisplayName: "name",
                                panel: "base",
                                editable: true,
                                control: "input"
            				}),

            				fieldBuilder.build({
            					name: "meteringTypeId",
            					labelDesc: "Группа учёта",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                dictName: "dictMeteringType",
                                required: true,
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