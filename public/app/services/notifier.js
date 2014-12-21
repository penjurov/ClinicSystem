app.factory('notifier', ['toastr', function(toastr) {
	'use strict';
	
    return {
        success: function success(msg) {
            toastr.success(msg);
        },
        error: function error(msg) {
            toastr.error(msg);
        }
    };
}]);