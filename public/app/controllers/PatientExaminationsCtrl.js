'use strict';

app.controller('PatientExaminationsCtrl', ['$scope', '$location', 'examinationResource', 'notifier', 'identity',
    function ($scope, $location, examinationResource, notifier, identity) {
        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.examinations = examinationResource.getAllByUserId(identity.currentUser._id);


        $scope.viewExamination = function(id) {
            if (identity.currentUser === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                $location.path('/view-examination/' + id);
            }
        };
    }]);


