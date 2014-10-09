app.factory('examinationResource', ['$resource', function ($resource) {
    var examinationApi = '/api/examination/:id';
    var examinationResource = $resource( examinationApi, null, {
        update: {method: 'PUT', isArray: false},
        post: {method: 'POST', isArray: false },
        getByUserId: {method:'GET', params:{id: '@id'}, isArray:true}
    });

    return {
        add: function (examination) {
            return examinationResource.post(examination);
        },
        getAllByUserId: function(id){
            return examinationResource.getByUserId({id: id});
        }
    };
}]);
