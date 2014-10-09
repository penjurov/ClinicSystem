app.factory('examinationResource', ['$resource', function ($resource) {
    var examinationApi = '/api/examinations/:userId';
    var examinationResource = $resource( examinationApi, null, {
        update: {method: 'PUT', isArray: false},
        post: {method: 'POST', isArray: false },
        getByUserId: {method:'GET', params:{userId: '@userId'}, isArray:true}
    });

    return {
        add: function (examination) {
            return examinationResource.post(examination);
        },
        getAllByUserId: function(userId){
            return examinationResource.getByUserId({userId: userId});
        }
    };
}]);
