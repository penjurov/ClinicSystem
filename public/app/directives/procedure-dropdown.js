'use strict';

app.directive('procedures', [function() {
    return {
        templateUrl: '/partials/directives/procedure-dropdown',
        replace:true
    };
}]);