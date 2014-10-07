app.factory('procedureResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    'use strict';

    var procedureApi = baseServiceUrl + '/api/procedure';
    var medicineResource = $resource( procedureApi, null, {
        update: {method: 'PUT', isArray: false},
        post: {method: 'POST', isArray: false },
        get: {method:'GET', isArray:true}
    });

    return {
        add: function (procedure) {
            return medicineResource.post(procedure);
        },
        get: function(){
            return medicineResource.get();
        },
        update: function(procedure){
            return medicineResource.update(procedure);
        }
    };
}]);
