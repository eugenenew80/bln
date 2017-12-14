angular.module("dictApp")
	.controller("defaultSearchCtrl", function ($scope, $mdDialog, descriptionService) {
        var dataService = descriptionService.dataService;

	    $scope.data = {};
        $scope.data.elements = dataService.findAll();
        $scope.descriptionService = descriptionService;

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
