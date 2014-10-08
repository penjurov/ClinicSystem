app.factory('examinationResource', ['$resource', function ($resource) {
    var examinationApi = '/api/examination';
    var examinationResource = $resource( examinationApi, null, {
        update: {method: 'PUT', isArray: false},
        post: {method: 'POST', isArray: false },
        get: {method:'GET', isArray:true}
    });

    return {
        add: function (examination) {
            return examinationResource.post(examination);
        },
        getAll: function(){
            return examinationResource.get();
        }
    };
}]);
