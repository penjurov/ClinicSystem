app.controller('ListPatientsCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth', 'patientsResource',
    function ($scope, $location, notifier, identity, auth, patientsResource) {
		'use strict';

        patientsResource.get().then(function (data) {
            $scope.patients = data;
        }, function () {
            notifier.error('Cannot get specialists from server!');
        });
    }]);
