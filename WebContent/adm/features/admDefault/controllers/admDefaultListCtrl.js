angular.module("admApp")
	.controller("admDefaultListCtrl", function ($scope, $routeParams, $location, $mdDialog, $mdToast, stateService, descriptionService) {
			
		var dataService = descriptionService.dataService;
		
        //Save route parameters
        angular.forEach($routeParams, function(value, key) {
            stateService.getRouteParams()[key]=value;
        }); 		
		
		
        //Selected row index
        var selectedRowIndex;
        $scope.setSelectedRow=function(newRowIndex) { selectedRowIndex=newRowIndex;};
        $scope.getSelectedRow=function() { return selectedRowIndex; };

        
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
		    		dataService.remove(item.id).$promise.then(
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
	        	var form = descriptionService.forms[action.form.name];        	
	        	var resolvedItem = {};
	        	
				//new empty element
				if (action.form.data=="@newElement") 
					resolvedItem={};
				
				//current element
				if (action.form.data=="@currentElement") 
					resolvedItem = item;
	
				//clone of current element
				if (action.form.data=="@cloneElement")
					resolvedItem = angular.copy(item);
								
				if (resolvedItem.$get)
					resolvedItem.$get();
					
				//open dialog
	        	$mdDialog.show({
	                templateUrl: form.templateURL,
	                controller: form.controller,
	                locals: {
	                	descriptionService: descriptionService, 
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
                $scope[action.controllerMethod.name](item);
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
