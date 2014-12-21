app.factory('medicineResource', ['$resource', function ($resource) {
    'use strict';

    var medicineApi = '/api/medicine',
        medicineResource = $resource( medicineApi, null, {
            update: {method: 'PUT', isArray: false},
            post: {method: 'POST', isArray: false },
            get: {method:'GET', isArray:true}
        });

    return {
        add: function add(medicine) {
            return medicineResource.post(medicine);
        },
        get: function get(){
            return medicineResource.get();
        },
        update: function update(medicine){
            return medicineResource.update(medicine);
        }
    };
}]);
