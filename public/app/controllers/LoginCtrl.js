app.controller('LoginCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth',
    function($scope, $location, notifier, identity, auth) {
        'use strict';

        $scope.identity = identity;

        $scope.login = function(user) {
            auth.login(user).then(function() {
                notifier.success('Successful login!');
            }, function() {
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
            });
        };
    }]);