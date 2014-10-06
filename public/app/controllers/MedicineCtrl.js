'use strict';

app.controller('MedicineCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth', 'medicineResource',
    function ($scope, $location, notifier, identity, auth, medicineResource) {

        $scope.add = function addMedicine(medicine) {
            if ($scope.createMedicine.$valid) {
                medicineResource.add(medicine).$promise.then(function () {
                    notifier.success(medicine.name + " added!");
                    $location.path('/');
                }, function (error) {
                    console.log(error);
                    notifier.error(medicine.name + ' exists!');
                });
            }
        };

    }]);

