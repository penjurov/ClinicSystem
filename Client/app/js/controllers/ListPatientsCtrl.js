'use strict';

app.controller('ViewPatientsCtrl', ['$scope', '$location', 'patients', 'notifier', 'identity',
    function ViewPatientsCtrl($scope, $location, patients, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        ($scope.viewExamination = function(id) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                patients
                    .getAllPatients()
                    .then(function (data) {
                        $scope.patients = data;
                        $location.path('/view-patients');
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    })
            }
        })();
    }]);


