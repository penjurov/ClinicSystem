app.factory('procedureResource', ['$resource', function ($resource) {
    'use strict';

    var procedureApi = '/api/procedure';
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
