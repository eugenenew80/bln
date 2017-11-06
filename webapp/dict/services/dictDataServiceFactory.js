(function () {
    angular.module("dictApp")
        .factory('dictResourceFactory', function ($resource, dictBaseUrl) {
            return {
                newInstance: function (path) {

                    return $resource(
                    	dictBaseUrl + path + "/" + ":entityId",

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
                                url:	dictBaseUrl + path + "/" + ":entityName",
                                param: 	{entityName: "@entityName"}
                            },  
                            
                            create: {
                                method: "POST",
                                url:	dictBaseUrl + path	
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
        
        .factory("dictDataServiceFactory", function ($filter) {
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
    
        
        .factory('dictParentChildResourceFactory', function ($resource, dictBaseUrl) {
            return {
                newInstance: function (path) {

                    return $resource(
                    	dictBaseUrl + path + "/" + ":entityId",
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
                                url:	dictBaseUrl + path,	
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
        
        .factory("dictParentChildDataServiceFactory", function ($filter) {
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
                      

                        findById: function (parentId, id) {
                        	console.log({parentId: parentId, entityId: id});
                            return resource.findById({parentId: parentId, entityId: id});
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