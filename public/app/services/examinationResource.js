app.factory('examinationResource', ['$resource', function ($resource) {
    'use strict';
    
    var examinationApi = '/api/examinations/:userId',
        examinationResource = $resource( examinationApi, null, {
            update: {method: 'PUT', isArray: false},
            post: {method: 'POST', isArray: false },
            getByUserId: {method:'GET', params:{userId: '@userId'}, isArray:true}
        });

    return {
        add: function add(examination) {
            return examinationResource.post(examination);
        },
        getAllByUserId: function getAllByUserId(userId){
            return examinationResource.getByUserId({userId: userId});
        }
    };
}]);
