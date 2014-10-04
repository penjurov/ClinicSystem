'use strict';

app.controller('NewExaminationCtrl', ['$scope', '$location', 'examinations', 'notifier', 'identity',
    function NewExaminationCtrl($scope, $location, examinations, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.newExamination = function(examination) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                examinations
                    .addExamination(examination)
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

