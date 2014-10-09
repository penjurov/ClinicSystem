'use strict';

app.controller('PatientExaminationsCtrl', ['$scope', '$location', 'examinationResource', 'notifier', 'identity',
    function ($scope, $location, examinationResource, notifier, identity) {
        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.examinations = examinationResource.getAllByUserId(identity.currentUser._id);
        console.log($scope.examinations);
        $scope.listExaminations = function() {
            if (identity.currentUser === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {

                $scope.examinations = examinationResource.getAllByUserId(identity.currentUser._id);
                console.log($scope.examinations)

            }
        };
    }]);


