app.controller('SignUpCtrl', ['$scope', '$location', 'auth', 'notifier',
    function($scope, $location, auth, notifier) {
        'use strict';
        
        $scope.signup = function(user) {
            if(user.password == user.confirmPassword) {
                auth.signup(user).then(function () {
                    notifier.success('Registration successful!');
                    $location.path('/');
                }, function (err) {
                    notifier.error(err.data);
                });
            } else {
                notifier.error("Passwords don't match");
            }
        };
    }]);