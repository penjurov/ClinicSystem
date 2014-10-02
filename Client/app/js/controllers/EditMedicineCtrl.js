'use strict';

app.controller('EditMedicineCtrl', ['$scope', '$location', 'medicines', 'notifier', 'identity',
    function EditMedicineCtrl($scope, $location, medicines, notifier, identity) {
        (function getMedicines() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                medicines
                    .getAllMedicines()
                    .then(function (data) {
                        $scope.medicines = data;
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
                medicines
                    .getMedicineById($scope.selectedMedicine)
                    .then(function (medicine) {
                        $scope.medicine = {
                            Id: medicine.Id,
                            Name: medicine.Name,
                            Price: medicine.Description
                        };
                    }, function (err) {
                        notifier.error(response.message);
                        $location.path('/');
                    })
            }
        };

        $scope.editMedicine = function() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                medicines
                    .editMedicine($scope.medicine)
                    .then(function () {
                        notifier.success('Update successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    })
            }
        };

        $scope.deleteMedicine = function(medicine) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                medicines
                    .deleteMedicine(medicine)
                    .then(function () {
                        $scope.medicine = null;
                    }, function (err) {
                        notifier.error(err.message);
                    });
            }
        };
    }]);
