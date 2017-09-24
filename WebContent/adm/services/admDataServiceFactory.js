(function () {
    angular.module("admApp")
        .factory('admResourceFactory', function ($resource, admBaseUrl) {
            return {
                newInstance: function (path) {

                    return $resource(
                    	admBaseUrl + path + "/" + ":entityId",
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
                                url:	admBaseUrl + path + "/" + ":entityName",
                                param: 	{entityName: "@entityName"}
                            },  
                            
                            create: {
                                method: "POST",
                                url:	admBaseUrl + path	
                            },

                            update: {
                                method: "PUT"
                            },
                            
                            remove: {
                                method: "DELETE"
                            },
                        }
                    );
                }
            }
        })
        
        .factory("admDataServiceFactory", function ($filter) {
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
        
        .factory('admParentChildResourceFactory', function ($resource, admBaseUrl) {
            return {
                newInstance: function (path) {

                    return $resource(
                    	admBaseUrl + path + "/" + ":entityId",
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
                                url:	admBaseUrl + path,	
                            },

                            update: {
                                method: "PUT"
                            },
                            
                            remove: {
                                method: "DELETE"
                            },
                        }
                    );
                }
            }
        })
        
        .factory("admParentChildDataServiceFactory", function ($filter) {
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
                        }
                    }

                }
            }
        })        
        
})();