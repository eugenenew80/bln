(function () {
    angular.module("mediaApp")
        .factory('mediaResourceFactory', function ($resource, mediaBaseUrl) {
            return {
                newInstance: function (path) {

                    return $resource(
                    	mediaBaseUrl + path + "/" + ":entityId",
                        {entityId: "@id"},

                        {
                            findAll: {
                                method: 'GET',
                                isArray: true		
                            },

                            findById: {
                                method: 'GET'	
                            },                            
                            
                            findByName: {
                                method: 'GET',
                                url:	mediaBaseUrl + path + "/" + ":entityName",
                                param: 	{entityName: "@entityName"}
                            },  
                            
                            create: {
                                method: "POST",
                                url:	mediaBaseUrl + path	
                            },

                            update: {
                                method: "PUT"
                            },
                            
                            remove: {
                                method: "DELETE"
                            }
                        }
                    );
                }
            }
        })
        
        .factory("mediaDataServiceFactory", function ($filter) {
            return {
                newInstance: function (resource) {

                    var elements = null;

                    return {

                    	getElements: function () {
                            if (elements==null)
                            	elements = resource.findAll();
                            
                            return elements;
                        },
                        
                    	findAll: function (params) {
                            elements = resource.findAll(params);
                            return elements;
                        },
                        

                        findById: function (id) {
                            return resource.findById({entityId: id});
                        },

                        
                        findByName: function (name) {
                            return resource.findByName({entityName: name});
                        },                        
                        

                        create: function (entity) {
                            return resource.create(entity);
                        },  
                        

                        update: function (entity) {
                            return resource.update(entity);
                        }, 
                        
                        
                        remove: function (entity) {
                            return resource.remove(entity);
                        }
                    }

                }
            }
        })
        
        .factory('mediaParentChildResourceFactory', function ($resource, mediaBaseUrl) {
            return {
                newInstance: function (path) {

                    return $resource(
                    	mediaBaseUrl + path + "/" + ":entityId",
                        {parentId: "@parentId", entityId: "@entityId"},

                        {
                            findAll: {
                                method: 'GET',
                                isArray: true		
                            },

                            findById: {
                                method: 'GET'	
                            },                            
                            
                            create: {
                                method: "POST",
                                url:	mediaBaseUrl + path,	
                            },

                            update: {
                                method: "PUT"
                            },
                            
                            remove: {
                                method: "DELETE"
                            },

                            createLines: {
                                method: "GET",
                                url:	mediaBaseUrl + path + "/createLines",
                                isArray: true
                            },

                            autoFill: {
                                method: "GET",
                                url:	mediaBaseUrl + path + "/autoFill",
                                isArray: true
                            },
                        }
                    );
                }
            }
        })
        
        .factory("mediaParentChildDataServiceFactory", function ($filter) {
            return {
                newInstance: function (resource) {

                    var elements = null;

                    return {
                    	getElements: function () {
                            if (elements==null)
                            	elements = resource.findAll();
                            
                            return elements;
                        },
                        
                    	findAll: function (params) {
                            elements = resource.findAll(params);
                            return elements;
                        },                        

                        findById: function (id) {
                            return resource.findById({entityId: id});
                        },                        

                        create: function (entity) {
                            return resource.create(entity);
                        },  
                        

                        update: function (entity) {
                            return resource.update(entity);
                        }, 
                        
                        
                        remove: function (entity) {
                            return resource.remove(entity);
                        },

                         createLines: function (parentId) {
                             return resource.createLines({parentId: parentId});
                         },

                         autoFill: function (parentId) {
                             return resource.autoFill({parentId: parentId});
                         }
                    }

                }
            }
        })        
        
})();