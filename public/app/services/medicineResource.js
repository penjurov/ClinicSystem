app.factory('medicineResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    var medicineApi = baseServiceUrl + '/api/medicine';
    var medicineResource = $resource( medicineApi, null, {
        update: {method: 'PUT', isArray: false},
        post: {method: 'POST', isArray: false },
        get: {method:'GET', isArray:true}
    });

    return {
        add: function (medicine) {
            return medicineResource.post(medicine);
        },
        get: function(){
            return medicineResource.get();
        },
        update: function(medicine){
            return medicineResource.update(medicine);
        }
    };
}]);
