angular.module("dictApp")
	.controller("dictDefaultEditCtrl", function ($scope, $mdDialog, $mdToast, descriptionServices, descriptionService, form, currentElement) {

        $scope.action = currentElement["#status#"];
        $scope.currentElement = angular.copy(currentElement);

        var parentId = $scope.currentElement.parentId;
        var entityId = $scope.currentElement.entityId;

        if (currentElement.$get) {
        	currentElement.$get().then(
                function(data) {
                    $scope.currentElement = angular.copy(data);
                    $scope.currentElement.parentId = parentId;
                    $scope.currentElement.entityId = entityId;
                    angular.forEach(form.fields, function(field, key) {
                        if (field.controls[0].dataType=="date" && angular.isDefined($scope.currentElement[field.name]) )
                            $scope.currentElement[field.name] = new Date($scope.currentElement[field.name]);
                    })

                    currentElement.parentId = $scope.currentElement.parentId;
                    currentElement.entityId = $scope.currentElement.entityId;
                },
                function(error) {
                	$scope.showMessage("Ошибка!", error.data.errMsg);
                }
            );
        }

		dataService=descriptionService.dataService;
		$scope.data = {};
        $scope.descriptionService = descriptionService;
        $scope.form = form;
        $scope.actions = {};


        //Save the current element and switch to table mode
        $scope.actions.save = function () {
        	dataService[$scope.action]($scope.currentElement).$promise.then(
				function(newItem) {
					if (currentElement.$get)
						currentElement.$get();
					else {
						if (descriptionService.parentField)
							newItem = dataService.findById(newItem[descriptionService.parentField], newItem[descriptionService.childField]);
					}

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
        	$mdDialog.cancel();
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
