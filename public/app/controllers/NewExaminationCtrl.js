'use strict'

app.controller('NewExaminationCtrl', ['$scope', '$location', 'examinationResource', 'notifier', 'identity',
    function ($scope, $location, examinationResource, notifier, identity) {
        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.medicines = [{
            Name: 'Test Medicine'
        }];

        $scope.procedures = [{
            Name: 'Test Procedure'
        }];

        $scope.findPatient = function (patient) {

            $scope.searchPatient = {
                FirstName: patient,
                LastName: patient,
                Age: 13,
                Gender: 'M',
                History: 'Some'
            }
        }

        $scope.newExamination = function (examination) {
            if (identity.currentUser === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                examinationResource
                    .add(examination)
                    .$promise
                    .then(function () {
                        notifier.success('Added successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    })
            }
        }
    }]);