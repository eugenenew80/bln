angular.module('app')  
	.factory('authenticationService', ["$http", "$cookies", "$rootScope", "authBaseUrl", function ($http, $cookies, $rootScope, authBaseUrl) {
        var service = {};
 
        service.login = function (userName, password, callback) {
            $http.post(authBaseUrl + "auth", { userName: userName, password: password })
                .success(function (response) {
                    callback(response);
                });
        };
  
        service.setCredentials = function (userName, password) {
            var authData = window.btoa(unescape(encodeURIComponent(userName + ":" + password)));    
            $rootScope.globals = {
                currentUser: {
                    username: userName,
                    authData: authData
                }
            };
  
            $http.defaults.headers.common["Authorization"] = 'Basic ' + authData; 
            $cookies.put("globals", $rootScope.globals);
        };
  
        service.clearCredentials = function () {
            $rootScope.globals = {};
            $cookies.remove("globals");
            $http.defaults.headers.common.Authorization = "Basic ";
        };
  
        return service;
    }]);