'use strict';

app.controller('NewProcedureCtrl', ['$scope', '$location', 'procedures', 'notifier', 'identity',
    function NewProcedureCtrl($scope, $location, procedures, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.newProcedure = function(procedure) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                procedures
                    .addProcedure(procedure)
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
