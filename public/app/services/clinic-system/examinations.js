'use strict';

app.factory('examinations', ['$http', '$q', '$location', 'identity', 'authorization', 'baseServiceUrl',
    function($http, $q, $location, identity, authorization, baseServiceUrl) {
        var examinationApi = baseServiceUrl + '/api/Examinations/';

        return {
            addExamination: function(examination) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.post(examinationApi, examination, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getAllExaminations : function() {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.get(examinationApi,
                    {
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'authorization': 'Bearer ' + identity.getCurrentUser()['access_token']
                        }
                    })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getExaminationById: function(id) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.get(examinationApi + '/' + id,
                    {
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'authorization': 'Bearer ' + identity.getCurrentUser()['access_token']
                        }
                    })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }
        }
    }]);
