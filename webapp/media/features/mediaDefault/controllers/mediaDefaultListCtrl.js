angular.module("mediaApp")
	.controller("mediaDefaultListCtrl", function ($scope, $routeParams, $location, $mdDialog, $mdToast, $http, stateService, descriptionService, descriptionServices) {
		
		console.log(descriptionService);
		
		var dataService = descriptionService.dataService;
		
        //Save route parameters
        angular.forEach($routeParams, function(value, key) {
            stateService.getRouteParams()[key]=value;
        }); 		
		
		
        //Selected row index
        var selectedRowIndex;
        $scope.setSelectedRow=function(newRowIndex) { selectedRowIndex=newRowIndex;};
        $scope.getSelectedRow=function() { return selectedRowIndex; };

        //Selected row index
        var selectedRowIndexChild;
        $scope.setSelectedRowChild=function(newRowIndexChild) { selectedRowIndexChild=newRowIndexChild;};
        $scope.getSelectedRowChild=function() { return selectedRowIndexChild; };        
        
        
        //Apply search button
        $scope.applySearch = function() {            
            $scope.data.elements=dataService.findAll($scope.data.state.searchModel);
            $scope.data.state.isApplySearch = true;

            $scope.data.elements.$promise.then(
                function(data) { $scope.showToast('Запрос успешно выполнен!'); },
                function(error) { $scope.showMessage("Ошибка!", error.data.errMsg); }
            );
            $scope.data.state.selectedPage = 1;
        }
		

        //Clear search form
		$scope.resetSearch = function() {
			angular.forEach(descriptionService.sections.main.search.fields, function(value, key) {
				$scope.data.state.searchModel[value.name] = undefined;
			})
		}

		
        //Show modules
        $scope.showChilds = function(item, params) {
        	$scope.childDescriptionService= descriptionServices[params.child];
        	$scope.data.currentParentElement = item;
        	
        	$scope.parentField = $scope.childDescriptionService.parentField;
        	$scope.childField = $scope.childDescriptionService.childField;
        	
            $scope.data.childs=$scope.childDescriptionService.dataService.findAll({parentId: item.id});
            $scope.data.childs.$promise.then(
                function(data) { 
                	$scope.data.childPath=$scope.childDescriptionService.sections.header.path.items;
                	$scope.data.isChilds = true;
                	$scope.showToast('Запрос успешно выполнен!'); 
                },
                function(error) { $scope.showMessage("Ошибка!", error.data.errMsg); }
            );        	
        }
        
        
        //go back
        $scope.goBack = function(item) {  
        	$scope.data.isChilds = false;
        	$scope.data.currentParentElement = null;
        }
        

        $scope.createLines = function(item) {
            $scope.data.childs=$scope.childDescriptionService.dataService.createLines($scope.data.currentParentElement.id);
            $scope.data.state.isApplySearch = true;

            $scope.data.childs.$promise.then(
                function(data) { $scope.showToast('Запрос успешно выполнен!'); },
                function(error) { $scope.showMessage("Ошибка!", error.data.errMsg); }
            );
            $scope.data.state.selectedPage = 1;
        }

        $scope.autoFill = function() {
            $scope.data.childs=$scope.childDescriptionService.dataService.autoFill($scope.data.currentParentElement.id);
            $scope.data.state.isApplySearch = true;

            $scope.data.childs.$promise.then(
                function(data) { $scope.showToast('Запрос успешно выполнен!'); },
                function(error) { $scope.showMessage("Ошибка!", error.data.errMsg); }
            );
            $scope.data.state.selectedPage = 1;
        }


		//delete record
		$scope.remove = function(item) {
		    var confirm = $mdDialog.confirm()
		          .title('Удалить?')
		          .textContent('Вы уверены, что хотите удалить запись?')
		          .ariaLabel('Подтведить удаление')
		          .ok('Удалить')
		          .cancel('Отмена');

		    $mdDialog.show(confirm).then(
		    	function() {
		    		dataService.remove( {entityId: item.id} ).$promise.then(
		                    function(data) {
		                        var index = $scope.data.elements.indexOf(item);
		                        $scope.data.elements.splice(index, 1);		                       
		                        $scope.showToast('Запись успешно удалена!');
		                    },

		                    function(error) { $scope.showMessage("Ошибка!", error.data.errMsg); }
		                );
		    	}, 
		    	function() {}
		    );		
		}
		
		
		
		//delete record
		$scope.removeChild = function(item) {
		    var confirm = $mdDialog.confirm()
		          .title('Удалить?')
		          .textContent('Вы уверены, что хотите удалить запись?')
		          .ariaLabel('Подтведить удаление')
		          .ok('Удалить')
		          .cancel('Отмена');

		    $mdDialog.show(confirm).then(
		    	function() {
		    		$scope.childDescriptionService.dataService.remove( {parentId: item[$scope.parentField], entityId: item[$scope.childField] } ).$promise.then(
		                    function(data) {
		                        var index = $scope.data.childs.indexOf(item);
		                        $scope.data.childs.splice(index, 1);		                       
		                        $scope.showToast('Запись успешно удалена!');
		                    },

		                    function(error) { $scope.showMessage("Ошибка!", error.data.errMsg); }
		                );
		    	}, 
		    	function() {}
		    );		
		}
		
		
		$scope.showMessage = function(title, message) {
	        $mdDialog.show(
	            $mdDialog.alert()
	              .multiple(true)
	              .clickOutsideToClose(true)
	              .title(title)
	              .textContent(message)
	              .ok('Ok')
	        	);		
		}
		

		$scope.showToast = function(message) {
            var parentEl = angular.element("#list");
            $mdToast.show(
            	$mdToast.simple()
                  .textContent(message)
                  .position("top right")
                  .hideDelay(3000)
                  .parent(parentEl)
            );		
		}		
		
		
        //Handle action
        $scope.handleAction = function(source, action, item) {
        	
        	//open dialog
        	if (action.typeAction == "form" && action.form) {
        		var resolvedDescriptionService = descriptionService;
        		if ($scope.data.isChilds)
        			resolvedDescriptionService = $scope.childDescriptionService;
        		
	        	var form = resolvedDescriptionService.forms[action.form.name];        	
	        	var resolvedItem = {};
	        	
				//new empty element
				if (action.form.data=="@newElement") {
					resolvedItem={};
					
					if ($scope.data.currentParentElement) {
						resolvedItem[$scope.parentField] = $scope.data.currentParentElement.id;
						resolvedItem.parentId = resolvedItem[$scope.parentField];
					}
					
					resolvedItem["#status#"] = "create";
				}
				
				//current element
				if (action.form.data=="@currentElement") {
					resolvedItem = item;
					if ($scope.data.currentParentElement) {
						resolvedItem[$scope.parentField] = $scope.data.currentParentElement.id;
						resolvedItem.parentId = resolvedItem[$scope.parentField];
						resolvedItem.entityId = resolvedItem[$scope.childField];
					}
					resolvedItem["#status#"] = "update";
				}
				
				//clone of current element
				if (action.form.data=="@cloneElement") {
					resolvedItem = angular.copy(item);
					if ($scope.data.currentParentElement) {
						resolvedItem[$scope.parentField] = $scope.data.currentParentElement.id;
						resolvedItem.parentId = resolvedItem[$scope.parentField];
						resolvedItem.entityId = resolvedItem[$scope.childField];
					}
					resolvedItem["#status#"] = "create";
				}
				
				//if (resolvedItem.$get) 
				//	resolvedItem.$get();
					
				//open dialog
	        	$mdDialog.show({
	                templateUrl: form.templateURL,
	                controller: form.controller,
	                locals: {
	                	descriptionService: resolvedDescriptionService, 
	                	form: form, 
	                	currentElement: resolvedItem
	                }
	            });
        	}
        	
        	//go to view
            if (action.typeAction=="redirect" && action.redirect && action.redirect.url) {
                
            	var url = action.redirect.url;
                if (action.redirect.params) {
                    angular.forEach(action.redirect.params, function (value, key) {
                        
                    	if (value.startsWith("@@"))
                        	url = url.replace(":" + key, stateService.getRouteParams()[value.substr(2)]);
                        
                    	else if (value.startsWith("@"))
                        	url = url.replace(":" + key, item[value.substr(1)]);
                    });
                }
                
                $location.path(url);
            }


            //call controller method
            if (action.typeAction=="controllerMethod" && action.controllerMethod)
                $scope[action.controllerMethod.name](item, action.controllerMethodParams);
        }

        
        $scope.handle= function(action) {
            $scope.handleAction(null, action);
        }
	


        //Add data to scope

        //description service
        $scope.descriptionService=descriptionService;

        //scope data
        $scope.data={};
        $scope.data.path=descriptionService.sections.header.path.items;
        $scope.data.error = null;


        //page's state
        $scope.data.state = stateService.getState(descriptionService.name);
        $scope.data.state.rowsPerPage   = descriptionService.sections.main.table.rowsPerPage || $scope.data.state.rowsPerPage;
        $scope.data.state.isApplySearch = $scope.data.state.isApplySearch || true;
        $scope.data.state.searchModel 	= $scope.data.state.searchModel || {};


        //model data
        $scope.data.elements=[];
        if ($scope.data.state.isApplySearch)
            $scope.applySearch();
    });
