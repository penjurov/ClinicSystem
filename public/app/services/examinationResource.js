app.factory('examinationResource', ['$resource', function ($resource) {
    var examinationApi = '/api/examination';
    var examinationResource = $resource( examinationApi, null, {
        update: {method: 'PUT', isArray: false},
        post: {method: 'POST', isArray: false }
    });

    return {
        add: function (examination) {
            return examinationResource.post(examination);
        }
    };
}]);
