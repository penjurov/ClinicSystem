app.controller('ProfileCtrl',
    function ProfileCtrl($scope, $route, $location, notifier, identity, auth) {
        'use strict';
        
        $scope.user = {
            firstName: identity.currentUser.firstName,
            lastName: identity.currentUser.lastName,
            specialty: identity.currentUser.specialty,
            uin: identity.currentUser.uin,
            email: identity.currentUser.email,
            phone: identity.currentUser.phone,
            age: parseInt(identity.currentUser.age, 10),
            gender: identity.currentUser.gender,
            medicalHistory: identity.currentUser.medicalHistory,
            patientNumber: identity.currentUser.patientNumber
        };

        $scope.update = function(user) {
            if(user.password == user.confirmPassword) {
                auth.update(user).then(function() {
                    $scope.firstName = user.firstName;
                    $scope.lastName = user.lastName;
                    notifier.success('Update successful!');
                    $location.path('/');
                });
            } else {
                notifier.error("Passwords don't match");
            }
        };

        $scope.close = function(user) {
            auth.close(user).then(function() {
                auth.logout().then(function () {
                    notifier.success('Close successful!');
                    if ($scope.user) {
                        $scope.user.username = '';
                        $scope.user.password = '';
                    }

                    $location.path('/');
                    $route.reload();
                }, function (err) {
                    notifier.error(err.message);
                });
            }, function (err) {
                notifier.error(err.message);
            });
        };
    });

