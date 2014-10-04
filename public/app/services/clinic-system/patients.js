'use strict';

app.factory('patients', ['$http', '$q', '$location', 'identity', 'authorization', 'baseServiceUrl',
    function($http, $q, $location, identity, authorization, baseServiceUrl) {
        var patientApi = baseServiceUrl + '/api/Patients/';

        return {
            populatePatientProfile: function (user) {
                var deferred = $q.defer();

                $http.get(patientApi + '/' + identity.getCurrentUser()['userName'])
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            updatePatient: function(user) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.put(patientApi + '?name=' + identity.getCurrentUser()['userName'], user, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            },
            deletePatient: function(user) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.delete(patientApi + '?name=' + identity.getCurrentUser()['userName'], user, { headers: headers })
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