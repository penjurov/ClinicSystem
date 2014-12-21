app.factory('patientsResource', function ($http, $q, $resource) {
    'use strict';

    return {
        get: function get() {
            var deferred = $q.defer();

            $http.get('/api/patients').success(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };
});
