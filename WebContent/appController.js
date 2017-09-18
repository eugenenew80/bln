angular.module("app")
    .controller("appController", function ($scope, $rootScope, $http, $location, authenticationService) {
        
    	$scope.data = {};
        $scope.data.app = {
    		header: "Информационная система Билинг",
    		current: "info",
    		topMenu: [
	        	{
	        		name:  "info",
	        		desc:   "Главная",
	        		url:   "#",
	        		active: true
	        	},
	        	
	        	{
	        		name:  "dict",
	        		desc:   "НСИ",
	        		url:   "#",
	        		active: false
	        	},
	        	
	        	{
	        		name:  "adm",
	        		desc:   "Администрирование",
	        		url:   "#",
	        		active: false
	        	},
	        	
	        	{
	        		name:  "data",
	        		desc:   "Данные ",
	        		url:   "#",
	        		active: false
	        	},
	        	
	        	{
	        		name:  "calc",
	        		desc:   "Расчёты",
	        		url:   "#",
	        		active: false
	        	},   	        	        	
	        	
	        	{
	        		name:  "report",
	        		desc:   "Отчёты",
	        		url:   "#",
	        		active: false
	        	},   	        	        	
	        	
	        	{
	        		name:  "fin",
	        		desc:   "Финансы",
	        		url:   "#",
	        		active: false
	        	},
	        	
	        	{
	        		name:  "edoc",
	        		desc:   "Документооборот",
	        		url:   "#",
	        		active: false
	        	},
	        	
	        	{
	        		name:  "client",
	        		desc:   "Личный кабинет",
	        		url:   "#",
	        		active: false
	        	}, 
	        	
	        	{
	        		name:  "rfc",
	        		desc:   "РФЦ",
	        		url:   "#",
	        		active: false
	        	} 	        	
	        ]        			
        };
        
        
		
        $scope.data.auth = {
          isAuth: false,
          user: ""          
        };
        
        
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
    						orgId: 102, userId: 1, name: "Гость" 
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
        
    });
	
