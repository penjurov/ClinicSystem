app.controller('ProcedureCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth', 'procedureResource',
    function ($scope, $location, notifier, identity, auth, procedureResource) {
        'use strict';

        procedureResource.get().$promise.then(function (data) {
            $scope.procedures = data;
        }, function () {
            notifier.error('Cannot get procedures from server!');
        });

        $scope.add = function (procedure) {
            procedureResource.add(procedure).$promise.then(function (data) {
                notifier.success(data.name + ' procedure is successfully added!');
                $location.path('/');
            }, function () {
                notifier.error('Duplicated name!');
            });
        };

        $scope.update = function (procedure) {
            if ($scope.editProcedure.$valid) {
                procedureResource.update(procedure).$promise.then(function () {
                    notifier.success('Procedure information updated!');
                    $location.path('/');
                }, function () {
                    notifier.error("Can not update procedure with invalid data");
                });
            }
        };
    }]);