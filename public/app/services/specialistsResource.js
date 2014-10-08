app.factory('specialistsResource', function ($http, $q, $resource) {
    'use strict';

    return {
        get: function() {
            var deferred = $q.defer();

            $http.get('/api/specialists').success(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };
});
