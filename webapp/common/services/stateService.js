(function() {

	angular.module("common")
		.factory("stateService", function($filter) {

			var states = [];
			var routeParams={};
			var currentResp = {};
			
			var user = {
				name: 'user'
			};

			return {
				states: states,

				getStates: function() {
					return states;
				},

				clearStates: function () {
					states = [];
                },

				getState: function(entityName) {

					var stateDef = {
						name:			entityName,
						isSearchOpened: false,
						isApplySearch:	false,
						rowsPerPage: 	5,
						selectedPage:	1,
						search:			{}
					}

					var state = $filter('filter')(states, {name: entityName}, true)[0];
					if (!state)
						states.push(stateDef);

					return $filter('filter')(states, {name: entityName}, true)[0];
				},

				getUser: function() {
					return user;
				},
				
				setUser: function(newUser) {
					user.name=newUser.userName;
				},

				getRouteParams: function() {
					return routeParams;
				},
				
				setRouteParams: function(newRouteParams) {
					routeParams = newRouteParams;
				},
				
				
				getCurrentResp: function() {
					return currentResp;
				},
				
				setCurrentResp: function (newCurrentResp) {
					currentResp = newCurrentResp;
				}
			}
		})

		.factory("appSettings", function() {
			return {
				baseUrl: "/"
			}
		});
})()
