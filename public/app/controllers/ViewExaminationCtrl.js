'use strict';

app.controller('ViewExaminationCtrl', ['$scope', '$resource', '$location', '$routeParams', 'examinationResource', 'notifier', 'identity',
    function ($scope, $resource, $location, $routeParams, examinationResource, notifier, identity) {
        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.username = identity.currentUser.username;

        var Examination = $resource('api/examination/:id', {id:'@id'});
        var examination = Examination.get({id:$routeParams.id}, function(result) {
            $scope.examination = {
                Information: result.Information,
                Procedure: result.Procedure,
                Medicine: result.Medicine,
                Result: result.Result
            }

            var User = $resource('api/users/:username', {username:'@username'});

            var user = User.get({username: identity.currentUser.username}, function(result) {

                $scope.searchPatient = {

                    FirstName: result.firstName,
                    LastName: result.lastName,
                    Age: parseInt(result.age),
                    Gender: result.gender,
                    History: result.medicalHistory
                }
            });
        });

    }]);


