'use strict';

app.controller('ViewExaminationCtrl', ['$scope', '$location', '$routeParams', 'examinationResource', 'notifier', 'identity',
    function ($scope, $location, $routeParams, examinationResource, notifier, identity) {
        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        console.log($routeParams.id);
    }]);


