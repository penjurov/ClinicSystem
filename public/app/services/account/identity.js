app.factory('identity', function($window, UsersResource) {
    'use strict';
    
    var user,
        logged = localStorage.getItem('bootstrappedUserObject');

    if (logged) {
        user = new UsersResource();
        angular.extend(user, JSON.parse(logged));
    }
    return {
        currentUser: user,
        isAuthenticated: function isAuthenticated() {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function isAuthorizedForRole(role) {
            return (!!this.currentUser && this.currentUser.role === role);
        }
    };
});