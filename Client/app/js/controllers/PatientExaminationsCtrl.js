'use strict';

app.controller('PatientExaminationsCtrl', ['$scope', '$location', 'examinations', 'notifier', 'identity',
    function PatientExaminationsCtrl($scope, $location, examinations, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        ($scope.listExaminations = function() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                examinations
                    .getAllExaminations()
                    .then(function (data) {
                        $scope.examinations = data;
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    })
            }
        })();
    }]);


