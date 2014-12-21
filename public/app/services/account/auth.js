app.factory('auth', function($http, $q, identity, UsersResource) {
    'use strict';

    var deferred = $q.defer();

    return {
        signup: function signup(user) {
            var newUser = new UsersResource(user);

            newUser.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        update: function update(user) {
            var updatedUser = new UsersResource(user);

            updatedUser._id = identity.currentUser._id;
            updatedUser.$update().then(function() {
                identity.currentUser.firstName = updatedUser.firstName;
                identity.currentUser.lastName = updatedUser.lastName;
                identity.currentUser.specialty = updatedUser.specialty;
                identity.currentUser.uin = updatedUser.uin;
                identity.currentUser.email = updatedUser.email;
                identity.currentUser.phone = updatedUser.phone;
                identity.currentUser.age = updatedUser.age;
                identity.currentUser.gender = updatedUser.gender;
                identity.currentUser.medicalHistory = updatedUser.medicalHistory;
                identity.currentUser.patientNumber = updatedUser.patientNumber;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        close: function close(user) {
            var deleteUser = new UsersResource(user);

            deleteUser._id = identity.currentUser._id;

            $http.delete('/api/users', deleteUser)
                .success(function(response) {
                    localStorage.removeItem('bootstrappedUserObject');
                    deferred.resolve();
                })
                .error(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        login: function login(user){
            $http.post('/login', user)
                .success(function(response) {
                    if (response.success) {
                        var user = new UsersResource();
                        angular.extend(user, response.user);
                        identity.currentUser = user;
                        window.bootstrappedUserObject = user;
                        localStorage.setItem("bootstrappedUserObject", JSON.stringify(user));
                        deferred.resolve(true);
                    }
                    else {
                        deferred.reject(response);
                    }
                })
                .error(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        logout: function logout() {
            $http.post('/logout').success(function() {
                identity.currentUser = undefined;
                localStorage.removeItem('bootstrappedUserObject');
                deferred.resolve();
            });

            return deferred.promise;
        },
        isAuthenticated: function isAuthenticated() {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        isAuthorizedForRole: function isAuthorizedForRole(role) {
            if (identity.isAuthorizedForRole(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    };
});