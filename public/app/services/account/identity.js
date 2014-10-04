app.factory('identity', function($window, UsersResource) {
    var user;
    var logged = localStorage.getItem('bootstrappedUserObject');
    if (logged) {
        user = new UsersResource();
        angular.extend(user, JSON.parse(logged));
    }
    return {
        currentUser: user,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function(role) {
            return (!!this.currentUser && this.currentUser.role === role);
        }
    }
});