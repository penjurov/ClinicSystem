'use strict';

app.controller('ViewExaminationCtrl', ['$scope', '$location', 'examinationResource', 'notifier', 'identity',
    function ViewExaminationCtrl($scope, $location, examinationResource, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        ($scope.viewExamination = function(id) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                examinationResource
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


