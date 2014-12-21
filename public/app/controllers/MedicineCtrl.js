app.controller('MedicineCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth', 'medicineResource',
    function ($scope, $location, notifier, identity, auth, medicineResource) {
        'use strict';

        medicineResource.get().$promise.then(function (data) {
            $scope.medicines=data;
        });

        $scope.add = function addMedicine(medicine) {
            if ($scope.createMedicine.$valid) {
                medicineResource.add(medicine).$promise.then(function () {
                    notifier.success(medicine.name + " added!");
                    $location.path('/');
                }, function () {
                    notifier.error(medicine.name + ' exists!');
                });
            }
        };

        $scope.update = function update(medicine) {
            if ($scope.createMedicine.$valid) {
                medicineResource.update(medicine).$promise.then(function () {
                   notifier.success('Drug information is updated!');
                    $location.path('/');
                }, function () {
                    notifier.error("Cant update with invalid data");
                });
            }
        };

    }]);

