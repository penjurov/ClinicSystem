app.factory('specialistsResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    'use strict';

    var specialistsApi = baseServiceUrl + '/api/specialists';
    var specialistsResource = $resource( specialistsApi, null, {
        get: {method:'GET', isArray:true}
    });

    return {
        get: function(){
            return specialistsResource.get();
        }
    };
}]);
