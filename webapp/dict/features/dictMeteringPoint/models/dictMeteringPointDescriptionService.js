(function () {
    angular.module("dictApp")
        .factory("dictMeteringPointDescriptionService", function ($filter, dataServices, buttonBuilder, fieldBuilder, tableFieldBuilder, responsiveTableFieldBuilder) {

			var serviceName = "dictMeteringPoint";
			var serviceDescPural = "Точки учёта";
			var serviceDescSingular = "Точки учёта";

			//List fields description for search
			var searchFieldsDef = [
				
				fieldBuilder.build({
					name: "code",
					labelDesc: "Код",
                    labelClass: "col-sm-2",
                    controlClass: "col-sm-2"
				}),
				
				fieldBuilder.build({
					name: "name",
					labelDesc: "Наименование",
                    labelClass: "col-sm-2",
                    controlClass: "col-sm-4"
				}),	
			];
        	
        	
			//List actions for search
			var searchActionsDef = [
				{
                    action: "applySearch",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "applySearch"
                    },
                    
                    trigger: "button",
					button: {
						desc: "Применить",
						tooltip: "Применить",
						classes: "btn btn-primary btn-xs pull-left",
						style: "margin-left: 3px;",
						glyphicon: "glyphicon glyphicon-search",
						disabled: false
					}
				},

				{
					filter: {
						roles: ["expert", "user"]
					},

                    action: "resetSearch",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "resetSearch"
                    },					
                    
                    trigger: "button",
					button: {
						desc: "Сбросить",
						tooltip: "Сбросить",
						classes: "btn btn-warning btn-xs pull-left",
						style: "margin-left: 3px;",
						glyphicon: "glyphicon glyphicon-off",
						disabled: false
					}
				}			                        
			];    
			
			
            //List fields description for table
			var tableFieldsDef = [

  	            responsiveTableFieldBuilder.build({
		            name: "code",
		            desc: "Код",
		            headerStyle: "width: 20%",
	            }),

  	            responsiveTableFieldBuilder.build({
		            name: "name",
		            desc: "Наименование",
		            headerStyle: "width: 70%",
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
						desc: "Создать",
						tooltip: "Создать новую запись",
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
                        name: "remove"
                    },	
                    
                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Удалить",
						tooltip: "Удалить запись",
						glyphicon: "glyphicon-remove"
					})
				},
	               
				{
                    action: "meters",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "showChilds"
                    },	
                    
                    controllerMethodParams: {
                        child: "dictMeteringPointMeter"
                    },
                    
                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Счётчики",
						tooltip: "Открыть список счётчиков",
						glyphicon: "glyphicon-list-alt"
					})
				},

				{
                    action: "currentTrans",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "showChilds"
                    },

                    controllerMethodParams: {
                        child: "dictMeteringPointCurrentTrans"
                    },

                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Трансформаторы тока",
						tooltip: "Открыть список трансформаторов тока",
						glyphicon: "glyphicon-list-alt"
					})
				},

				{
                    action: "voltageTrans",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "showChilds"
                    },

                    controllerMethodParams: {
                        child: "dictMeteringPointVoltageTrans"
                    },

                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Трансформаторы напяжения",
						tooltip: "Открыть список трансформаторов напряжения",
						glyphicon: "glyphicon-list-alt"
					})
				},
            ];
            

            //return description service
            return {
                name: serviceName,
                desc: serviceDescPural,
                dataService: dataServices[serviceName],
                
                sections: {
                	
                	//header section
                	header: {
                		path: {
                			type: "breadcrumb",
                			items: ["НСИ", serviceDescPural],			
                		}
                	},

                	
					//Main section
                	main: {
                		
                		//Search form
                		search: {
                			type: "form",
                			templateURL: "common/directives/complexForm/complexFormTemplate.html",
                			header: "Панель фильтров",
                            fields:  searchFieldsDef,
                            actions: searchActionsDef,
                            
                            enable: false,
                            auto: true,
                            collapsable: true,
                            isCollapse: true,
                            criteria: {},
                            entity: {}
                		},
                		
                		
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
                        size: "lg",
                        
                        panels: [
                        	{
                        		name:   "base",
                        		title:  "Общие данные"
                        	},
                        	
                        	{
                        		name:   "object",
                        		title:  "Объект, граница раздела, учёт"
                        	},
                        	
                        	{
                        		name:   "ikue",
                        		title:  "Измерительный комплекс учета электроэнергии"
                        	},                        	
                        ],
                        
                        fields: [

            				fieldBuilder.build({
            					name: "code",
            					labelDesc: "Код",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                required: true,
                                panel: "base",
                                column: 1,
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "name",
            					labelDesc: "Наименование",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                required: true,
                                panel: "base",
                                column: 1,
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "externalCode",
            					labelDesc: "Внешний код точки учета на ОРЭ",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                panel: "base",
                                column: 1,
                                editable: true
            				}),            
            				
            				fieldBuilder.build({
            					name: "startDate",
            					labelDesc: "Дата действия с",
                                labelClass: "col-sm-7",
                                controlClass: "col-sm-5",
                                controlDataType: "date",
                                panel: "base",
                                column: 2,
                                editable: true
            				}),            				
            				
            				fieldBuilder.build({
            					name: "endDate",
            					labelDesc: "Дата действия по",
                                labelClass: "col-sm-7",
                                controlClass: "col-sm-5",
                                controlDataType: "date",
                                panel: "base",
                                column: 2,
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "ratedVoltage",
            					labelDesc: "Номинальное напряжение, кВ",
                                labelClass: "col-sm-7",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                column: 2,
                                editable: true
            				}),      
            				
              				fieldBuilder.build({
            					name: "firstBusinessPartnerId",
            					labelDesc: "Первая компания",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",					
            					dictName: "dictBusinessPartner",
            					required: true,
                                panel: "object",
                                column: 1,
                                editable: true            						
            				}),	 
            				
              				fieldBuilder.build({
            					name: "secondBusinessPartnerId",
            					labelDesc: "Вторая компания",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",					
            					dictName: "dictBusinessPartner",
            					required: true,
                                panel: "object",
                                column: 1,
                                editable: true            						
            				}),	
            				
              				fieldBuilder.build({
            					name: "accountingTypeId",
            					labelDesc: "Вид учета электроэнергии",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",					
            					dictName: "dictAccountingType",
            					required: true,
                                panel: "object",
                                column: 2,
                                editable: true            						
            				}),	
            				
              				fieldBuilder.build({
            					name: "meteringTypeId",
            					labelDesc: "Тип учета электроэнергии",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",					
            					dictName: "dictMeteringType",
            					required: true,
                                panel: "object",
                                column: 2,
                                editable: true            						
            				}),
            				
              				fieldBuilder.build({
            					name: "meteringPointTypeId",
            					labelDesc: "Тип точки учета",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",					
            					dictName: "dictMeteringPointType",
            					required: true,
                                panel: "object",
                                column: 2,
                                editable: true            						
            				}),	  
            				
            				fieldBuilder.build({
            					name: "limitError",
            					labelDesc: "Предел допустимой относительной погрешности ИКУЭ",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "ikue",
                                column: 1,
                                editable: true
            				}),               				
            				
            				fieldBuilder.build({
            					name: "transformationRate",
            					labelDesc: "Коэффициент трансформации ИКУЭ",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "ikue",
                                column: 1,
                                editable: true
            				}),     
            				
            				fieldBuilder.build({
            					name: "minLoad",
            					labelDesc: "Минимальная нагрузка в первичной цепи в классе точности, кВт",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "ikue",
                                column: 2,
                                editable: true
            				}),      
            				
            				fieldBuilder.build({
            					name: "maxLoad",
            					labelDesc: "Максимальная нагрузка в первичной цепи в классе точности, кВт",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "ikue",
                                column: 2,
                                editable: true
            				}),             				
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