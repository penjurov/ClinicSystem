'use strict';

app.controller('ViewExaminationCtrl', ['$scope', '$location', 'examinations', 'notifier', 'identity',
    function ViewExaminationCtrl($scope, $location, examinations, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        ($scope.viewExamination = function(id) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                examinations
                    .getExaminationById(id)
                    .then(function (data) {
                        $scope.examination = data;
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    })
            }
        })();
    }]);


