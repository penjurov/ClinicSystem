'use strict';

app.factory('medicines', ['$http', '$q', '$location', 'identity', 'authorization', 'baseServiceUrl',
    function($http, $q, $location, identity, authorization, baseServiceUrl) {
        var medicineApi = baseServiceUrl + '/api/Medicines/';

        return {
            addMedicine: function(medicine) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.post(medicineApi, medicine, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getAllMedicines : function() {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.get(medicineApi,
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
            getMedicineById: function(id) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.get(medicineApi + '/' + id,
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
            editMedicine: function(medicine) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.put(medicineApi + '/' + medicine.Id, medicine, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            },
            deleteMedicine: function(medicine) {
                var deferred = $q.defer();
                var headers = authorization.getAuthorizationHeader();

                $http.delete(medicineApi + '/' + medicine.Id, medicine, { headers: headers })
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
