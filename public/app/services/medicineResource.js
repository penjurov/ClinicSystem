app.factory('medicineResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    var medicineApi = baseServiceUrl + '/new-medicine';
    var medicineResource = $resource( medicineApi, null, {
        update: {method: 'PUT', isArray: false},
        post: {method: 'POST', isArray: false }
    });

    return {
        add: function (medicine) {
            return medicineResource.post(medicine);
        }
    };
}]);
