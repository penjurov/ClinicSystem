app.factory('examinationResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    var examinationApi = baseServiceUrl + '/new-examination';
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
