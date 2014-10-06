'use strict';

app.directive('medicines', [function() {
    return {
        templateUrl: '/partials/directives/medicine-dropdown',
        replace:true
    };
}]);