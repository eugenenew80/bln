angular.module("mediaApp")
	.controller("mediaDefaultEditCtrl", function ($scope, $mdDialog, $mdToast, descriptionService, form, currentElement) {

		dataService=descriptionService.dataService;		
		$scope.data = {};
        $scope.descriptionService = descriptionService;
        $scope.form = form;
        $scope.actions = {};
        $scope.currentElement = angular.copy(currentElement);
        $scope.action = $scope.currentElement["#status#"];
        
        
        console.log(currentElement);
        
        angular.forEach(form.fields, function(field, key) {
        	if (field.controls[0].dataType=="date" && angular.isDefined($scope.currentElement[field.name]) )
        		$scope.currentElement[field.name] = new Date($scope.currentElement[field.name]);
        })
        
        
        //Save the current element and switch to table mode
        $scope.actions.save = function () {
        	dataService[$scope.action]($scope.currentElement).$promise.then(
				function(newItem) {
					if (currentElement.$get) currentElement.$get();					
					
					if ($scope.action=="create")
						dataService.getElements().push(newItem);
					
					$scope.showToast('Запись успешно сохранена!');
					$mdDialog.hide();
				},

				function(error) {
					$scope.showMessage("Ошибка!", error.data.errMsg);;
				}
			);
        }        
        
        //Cancel changes and switch to table mode
        $scope.actions.cancel = function () {
        	$mdDialog.hide();
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
	});	
