'use strict';

app.controller('PatientExaminationsCtrl', ['$scope', '$location', 'examinationResource', 'notifier', 'identity',
    function PatientExaminationsCtrl($scope, $location, examinationResource, notifier, identity) {
        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.listExaminations = function() {
            if (identity.currentUser === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                $scope.examinations = examinationResource.getAll();
            }
        };
    }]);


