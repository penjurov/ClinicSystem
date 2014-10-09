'use strict';

app.controller('NewMedicineCtrl', ['$scope', '$location', 'medicines', 'notifier', 'identity',
    function NewMedicineCtrl($scope, $location, medicines, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.newMedicine = function(medicine) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                medicines
                    .addMedicine(medicine)
                    .then(function () {
                        notifier.success('Added successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.message);
                        $location.path('/');
                    });
            }
        };
    }]);
