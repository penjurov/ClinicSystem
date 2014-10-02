'use strict';

app.controller('SpecialistProfileCtrl', ['$scope', '$location', 'specialists', 'notifier', 'identity',
    function SpecialistProfileCtrl($scope, $location, specialists, notifier, identity) {
        (function populateSpecialistProfile() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                specialists
                    .populateSpecialistProfile()
                    .then(function (data) {
                        $scope.user = data;
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    });
            }
        })();

        $scope.updateSpecialist = function(specialist) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                specialists
                    .updateSpecialist(specialist)
                    .then(function () {
                        notifier.success('Update successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    })
            }
        }

        $scope.deleteSpecialist = function(specialist) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                specialists
                    .deleteSpecialist(specialist)
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

