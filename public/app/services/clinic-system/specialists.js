'use strict';

app.factory('specialists', ['$http', '$q', '$location', 'identity', 'authorization', 'baseServiceUrl',
    function($http, $q, $location, identity, authorization, baseServiceUrl) {
        var specialistApi = baseServiceUrl + '/api/Specialists/';

        return {
            populateSpecialistProfile: function (user) {
                var deferred = $q.defer();

                $http.get(specialistApi + '/' + identity.getCurrentUser()['userName'])
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            updateSpecialist: function(user) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.put(specialistApi + '?name=' + identity.getCurrentUser()['userName'], user, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            },
            deleteSpecialist: function(user) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.delete(specialistApi + '?name=' + identity.getCurrentUser()['userName'], user, { headers: headers })
                    .success(function () {
                        deferred.resolve();
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }
        }
    }]);
