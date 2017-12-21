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

                    currentElement.parentId = $scope.currentElement.parentId;
                    currentElement.entityId = $scope.currentElement.entityId;
                },
                function(error) {
                	$scope.showMessage("Ошибка!", error.data.errMsg);
                }
            );
        }

        var origElement = angular.copy($scope.currentElement);
		var dataService=descriptionService.dataService;
		$scope.data = {};
        $scope.descriptionService = descriptionService;
        $scope.form = form;
        $scope.actions = {};


        //Save the current element and switch to table mode
        $scope.actions.save = function () {
            angular.forEach(form.fields, function(field, key) {
                if (field.controls[0].dataType=="date" && angular.isDefined($scope.currentElement[field.name]) && !angular.isDefined(origElement[field.name]))
                    $scope.currentElement[field.name].addHours(6);
            })

        	dataService[$scope.action]($scope.currentElement).$promise.then(
				function(newItem) {
					if (currentElement.$get)
						currentElement.$get();
					else {
						if (descriptionService.parentField)
							newItem = dataService.findById(newItem[descriptionService.parentField], newItem[descriptionService.childField]);
						else
                            newItem = dataService.findById(newItem["id"]);
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


        $scope.autoFill = function (dictName) {
            $mdDialog.show({
                templateUrl: "dict/features/dictDefault/views/search.html",
                controller: "defaultSearchCtrl",
                multiple: true,
                locals: {
                    descriptionService: descriptionServices[dictName]
                }
            })
            .then(function (data) {
                angular.forEach(form.autoFill.fields, function (key) {
                    $scope.currentElement[key] = data[key];
                })
                $scope.frmEdit.$setDirty();
            });
        };
	});
