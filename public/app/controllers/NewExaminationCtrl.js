'use strict'

app.controller('NewExaminationCtrl', ['$scope', '$location', '$resource', 'notifier', 'identity', 'examinationResource', 'medicineResource', 'procedureResource',
    function ($scope, $location, $resource, notifier, identity, examinationResource, medicineResource, procedureResource) {
        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.medicines = medicineResource.get();
        $scope.procedures = procedureResource.get();

        $scope.findPatient = function (patient) {
            var User = $resource('api/users/:username', {username:'@username'});
            var user = User.get({username:patient.toLowerCase()}, function(result) {
                $scope.examination.patientId = result._id;

                $scope.searchPatient = {

                    FirstName: result.firstName,
                    LastName: result.lastName,
                    Age: parseInt(result.age),
                    Gender: result.gender,
                    History: result.medicalHistory
                }
            });
        }

        $scope.newExamination = function (examination) {
            if (!identity.isAuthorizedForRole('specialist')) {
                notifier.error('Please login as specialist!');
                $location.path('/');
            } else {
                examination.specialistId = identity.currentUser._id;

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