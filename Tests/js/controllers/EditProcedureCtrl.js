'use strict';

app.controller('EditProcedureCtrl', ['$scope', '$location', 'procedures', 'notifier', 'identity',
    function EditProcedureCtrl($scope, $location, procedures, notifier, identity) {
        (function getProcedures() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                procedures
                    .getAllProcedures()
                    .then(function (data) {
                        $scope.procedure = data;
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    });
            }
        })();

        $scope.change = function() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                procedures
                    .getProcedureById($scope.selectedProcedure)
                    .then(function (procedure) {
                        $scope.procedure = {
                            Id: procedure.Id,
                            Name: procedure.Name,
                            Price: procedure.Information
                        };
                    }, function (err) {
                        notifier.error(response.message);
                        $location.path('/');
                    })
            }
        };

        $scope.editProcedure = function() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                procedures
                    .editProcedure($scope.procedure)
                    .then(function () {
                        notifier.success('Update successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    })
            }
        };

        $scope.deleteProcedure = function(procedure) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                procedures
                    .deleteProcedure(procedure)
                    .then(function () {
                        $scope.procedure = null;
                    }, function (err) {
                        notifier.error(err.message);
                    });
            }
        };
    }]);
