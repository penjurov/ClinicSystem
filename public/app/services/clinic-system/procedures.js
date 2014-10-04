'use strict';

app.factory('procedure', ['$http', '$q', '$location', 'identity', 'authorization', 'baseServiceUrl',
    function($http, $q, $location, identity, authorization, baseServiceUrl) {
        var procedureApi = baseServiceUrl + '/api/Procedures/';

        return {
            addProcedure: function(procedure) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.post(procedureApi, procedure, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getAllProcedure : function() {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.get(procedureApi,
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
            getProcedureById: function(id) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.get(procedureApi + '/' + id,
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
            },
            editProcedure: function(procedure) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.put(procedureApi + '/' + procedure.Id, procedure, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            },
            deleteProcedure: function(procedure) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.delete(procedureApi + '/' + procedure.Id, procedure, { headers: headers })
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
