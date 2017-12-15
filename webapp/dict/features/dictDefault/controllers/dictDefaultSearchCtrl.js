angular.module("dictApp")
	.controller("defaultSearchCtrl", function ($scope, $mdDialog, descriptionService) {
        var dataService = descriptionService.dataService;

	    $scope.data = {};
        $scope.descriptionService = descriptionService;
        $scope.descriptionService.sections.main.searchTable = $scope.descriptionService.sections.main.searchTable || $scope.descriptionService.sections.main.table;

        $scope.isLoading = true;
        $scope.data.elements = dataService.findAll();
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

        $scope.ok = function() {
            $mdDialog.hide( $scope.data.elements[selectedRowIndex-1] );
        }

        $scope.cancel = function() {
            $mdDialog.cancel();
        }

        //Selected row index
        var selectedRowIndex=1;
        $scope.setSelectedRow=function(newRowIndex) { selectedRowIndex=newRowIndex;};
        $scope.getSelectedRow=function() { return selectedRowIndex; };
	});
