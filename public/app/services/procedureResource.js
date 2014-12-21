app.factory('procedureResource', ['$resource', function ($resource) {
    'use strict';

    var procedureApi = '/api/procedure',
        medicineResource = $resource( procedureApi, null, {
            update: {method: 'PUT', isArray: false},
            post: {method: 'POST', isArray: false },
            get: {method:'GET', isArray:true}
        });

    return {
        add: function add(procedure) {
            return medicineResource.post(procedure);
        },
        get: function get(){
            return medicineResource.get();
        },
        update: function update(procedure){
            return medicineResource.update(procedure);
        }
    };
}]);
