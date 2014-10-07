'use strict'

app.controller('NewExaminationCtrl', ['$scope', '$location', 'notifier', 'identity', 'examinationResource', 'medicineResource',
    function ($scope, $location, notifier, identity, examinationResource, medicineResource) {
        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.medicines = medicineResource.get();

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
            if (!identity.isAuthorizedForRole('specialist')) {
                notifier.error('Please login as specialist!');
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