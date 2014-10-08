'use strict';

app.controller('ListSpecialistsCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth', 'specialistsResource',
    function ($scope, $location, notifier, identity, auth, specialistsResource) {

        specialistsResource.get().then(function (data) {
            $scope.specialists = data;
        }, function () {
            notifier.error('Cannot get specialists from server!');
        });
    }]);

