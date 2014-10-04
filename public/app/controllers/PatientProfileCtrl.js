'use strict';

app.controller('PatientProfileCtrl', ['$scope', '$location', 'patients', 'notifier', 'auth', 'identity',
    function PatientProfileCtrl($scope, $location, patients, notifier, auth, identity) {
        (function populatePatientProfile() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                patients
                    .populatePatientProfile()
                    .then(function (data) {
                        $scope.user = data;
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    });
            }
        })();

        $scope.updatePatient = function(patient) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                patients
                    .updatePatient(patient)
                    .then(function () {
                        notifier.success('Update successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    })
            }
        };

        $scope.deletePatient = function(patient) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                patients
                    .deletePatient(patient)
                    .then(function () {
                        auth.logout().then(function () {
                            notifier.success('Close successful!');
                            if ($scope.user) {
                                $scope.user.username = '';
                                $scope.user.password = '';
                            }

                            $location.path('/');
                        }, function (err) {
                            notifier.error(err.message);
                        })
                    }, function (err) {
                        notifier.error(err.message);
                    });
            }
        };
    }]);

