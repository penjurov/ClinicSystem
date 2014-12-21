app.controller('ListExaminationsCtrl', ['$scope', '$location', '$resource', 'notifier', 'identity',
    function ListExaminationsCtrl($scope, $location, $resource, notifier, identity) {
        'use strict';

        var Examinations;

        if (identity.currentUser === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        Examinations = $resource('api/examinations/specialist/:id', {id:'@id'});
        Examinations.query({id: identity.currentUser._id}, function(result) {
            console.log(result);
            $scope.examinations = result;
        });

        $scope.viewExamination = function(id) {
            if (identity.currentUser === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                $location.path('/view-examination/' + id);
            }
        };
    }]);


