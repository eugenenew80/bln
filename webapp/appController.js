angular.module("app")
    .controller("appController", function ($scope, $rootScope, $http, $location, $http, metaBaseUrl, authenticationService) {

    	$scope.data = {
    		app: {
	    		header: "Информационная система Билинг",
	    		current: "INFO",
	    		topMenu: []    			
    		},
    		
    		auth: {
    			isAuth: false,
    			user: ""          
    		}
    	};

        $scope.$watch("data.auth.isAuth", function() {
        	if ($scope.data.auth.isAuth) {
                $http({method: "GET", url: metaBaseUrl + "metaModule"}).then(
            		function successCallback(response) { $scope.data.app.topMenu = response.data }, 
            		function errorCallback(error) {}
                );   	
        	}
        });

        authenticationService.clearCredentials();
        $scope.login = function() {
            authenticationService.login($scope.data.auth.user, $scope.data.auth.pass, function(response) {
            	if (response.success) {
                    authenticationService.setCredentials($scope.data.auth.user, $scope.data.auth.pass);
        	        $scope.data.auth = {
    					isAuth: true, 
    					user: $scope.data.auth.user,
    					pass: undefined,
    					currentResp: {
    						orgId: 102,
							userId: 1,
							name: "Гость"
    					}
    		        };
        	        $scope.data.error = undefined;
                } 
            	else {
                	$scope.data.error = response.message;
                }
            });        	
        }

		$scope.logout = function () {
			authenticationService.clearCredentials();
	        $scope.data.auth = {
				isAuth: false,
				user: $scope.data.auth.user,          
	        };
	        $location.path('/');
		};


        $scope.goto = function(page) {
            $location.path('/');
        }
    });
	
