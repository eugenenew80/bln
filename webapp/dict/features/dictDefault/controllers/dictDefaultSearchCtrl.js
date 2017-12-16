angular.module("dictApp")
	.controller("defaultSearchCtrl", function ($scope, $mdDialog, $mdToast, $mdDialog, $timeout, descriptionService) {
        var dataService = descriptionService.dataService;

	    $scope.data = {};
        $scope.searchValue = "";
        $scope.descriptionService = descriptionService;
        $scope.descriptionService.sections.main.searchTable = $scope.descriptionService.sections.main.searchTable || $scope.descriptionService.sections.main.table;

        $scope.applySearch = function () {
            $scope.isLoading = true;
            $timeout(function () {
                $scope.data.elements = dataService.findAll({searchValue: $scope.searchValue});
                $scope.data.elements.$promise.then(
                    function(data) {
                        $scope.isLoading = false;
                        $scope.showToast('Запрос успешно выполнен!');
                    },
                    function(error) {
                        $scope.isLoading = false;
                        $scope.showMessage("Ошибка!", error.data.errMsg);
                    }
                );
            }, 500)
        }

        $scope.ok = function() {
            $mdDialog.hide( $scope.data.elements[selectedRowIndex-1] );
        }

        $scope.cancel = function() {
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

        //Selected row index
        var selectedRowIndex=1;
        $scope.setSelectedRow=function(newRowIndex) { selectedRowIndex=newRowIndex;};
        $scope.getSelectedRow=function() { return selectedRowIndex; };

        $scope.applySearch();
	});
