angular.module("admApp")
    .controller("admController", function ($scope, $location) {        
    	var imagePath = "img/list/menu_item.jpg";

    	$scope.menu = {
	             name: "root",
	             nodes: [
	                  {
						name: "func",
						desc: "Функции",
						notes: "Список бизнес-функций",
						face : imagePath,
						params: [ ],
						hasNodes: false,
						nodes: []	                	  
		              },
		              
	                  {
						name: "role",
						desc: "Роли",
						notes: "Список бизнес-ролей",
						face : imagePath,
						params: [ ],
						hasNodes: false,
						nodes: []	                	  
		              },  
		              
	                  {
						name: "user",
						desc: "Пользователи",
						notes: "Список пользователей системы",
						face : imagePath,
						params: [ ],
						hasNodes: false,
						nodes: []	                	  
		              }		              
	             ]
	    };
                        
        $scope.onSelectedMenu = function (name) {
            $location.path("/adm/" + name + "/list/");
        };
                
        $location.path("/adm/logo/");
    });
	