app.controller('ViewExaminationCtrl', ['$scope', '$resource', '$location', '$routeParams', 'examinationResource', 'notifier', 'identity',
    function ($scope, $resource, $location, $routeParams, examinationResource, notifier, identity) {
        'use strict';

        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.username = identity.currentUser.username;

        var Examination = $resource('api/examination/:id', {id:'@id'});
        var examination = Examination.get({id:$routeParams.id}, function(result) {
            console.log(result);

            $scope.examination = {
                Specialist: result.Specialist.firstName + ' ' + result.Specialist.lastName,
                Patient: result.Patient,
                Information: result.Information,
                Procedure: result.Procedure.name,
                Medicine: result.Medicine.name,
                Result: result.Result
            };
        });
    }]);


