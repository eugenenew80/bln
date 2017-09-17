angular.module("admApp")
	.controller("admDefaultEditCtrl", function ($scope, $mdDialog, dataService, descriptionService, form, currentElement) {

		$scope.data = {};
        $scope.descriptionService = descriptionService;
        $scope.form = form;
        $scope.actions = {};
        $scope.currentElement = angular.copy(currentElement);
        
        angular.forEach(form.fields, function(field, key) {
        	if (field.controls[0].dataType=="date" && angular.isDefined($scope.currentElement[field.name]) )
        		$scope.currentElement[field.name] = new Date($scope.currentElement[field.name]);
        })
        
        
        //Save the current element and switch to table mode
        $scope.actions.save = function () {
			
        	var action="";
        	if (angular.isUndefined($scope.currentElement.id))
        		action="create";
        	else
        		action="update";
        	
        	dataService[action]($scope.currentElement).$promise.then(
				function(newItem) {
					if (currentElement.$get) currentElement.$get();					
					
					if (action=="create")
						dataService.getElements().push(newItem);
					
					$mdDialog.hide();
				},

				function(error) {
					
		            $mdDialog.show(
	                    $mdDialog.alert()
	                      .multiple(true)
	                      .clickOutsideToClose(true)
	                      .title('Ошибка!')
	                      .textContent(error.data.errMsg)
	                      .ariaLabel('Уведомление об ошибке')
	                      .ok('Ok')
		            );
					
					$scope.data.error=error;
				}
			);
        }        
        
        //Cancel changes and switch to table mode
        $scope.actions.cancel = function () {
        	$mdDialog.hide();
        }
	});	
