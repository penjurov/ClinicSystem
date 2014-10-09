'use strict';

app.controller('ListExaminationsCtrl', ['$scope', '$location', 'examinations', 'notifier', 'identity',
    function ListExaminationsCtrl($scope, $location, examinations, notifier, identity) {
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


