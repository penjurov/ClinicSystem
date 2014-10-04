'use strict';

app.controller('LoginCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth', function($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function(user) {
        auth.login(user).then(function(result) {
            notifier.success('Successful login!');
        }, function(error) {
            notifier.error('Username/Password combination is not valid!');
        });
    };

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }

            $location.path('/');
        })
    }
}]);