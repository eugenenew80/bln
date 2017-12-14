angular.module("dictApp")
	.controller("defaultSearchCtrl", function ($scope, $mdDialog, $mdToast, dataServices) {
        $scope.data = {};
        $scope.data.elements = dataServices["dictAccountingType"].findAll();

        $scope.ok = function() {
            $mdDialog.hide( "qqq" );
        }
	});
