angular.module("dictApp")
	.controller("dictBusinessPartnerContentEditCtrl", function ($scope, $mdDialog, $mdToast, descriptionService, form, currentElement) {
		
		dataService=descriptionService.dataService;		
		$scope.data = {};
        $scope.descriptionService = descriptionService;
        $scope.form = form;
        $scope.actions = {};
        $scope.currentElement = angular.copy(currentElement);
        $scope.action = $scope.currentElement["#status#"];

        
        angular.forEach(form.fields, function(field, key) {
        	if (field.controls[0].dataType=="date" && angular.isDefined($scope.currentElement[field.name]) )
        		$scope.currentElement[field.name] = new Date($scope.currentElement[field.name]);
        })
        

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


		$scope.fileNameChanged = function() {
            var file = document.getElementById('content');
            $scope.currentElement.fileName = file.files[0].name;
            $scope.currentElement.fileSize = file.files[0].size;

            var reader = new FileReader();
            reader.readAsBinaryString(file.files[0], "UTF-8");
            reader.onload = function (evt) {
                $scope.currentElement.contentBase64 = window.btoa(unescape(encodeURIComponent( evt.target.result)));
            }
            reader.onerror = function (evt) { console.log("Ошибка чтения файла"); }

            $scope.$apply();
            $scope.frmEdit.$setDirty();
        }
	});
