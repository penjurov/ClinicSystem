app.factory('UsersResource', function($resource) {
    var UsersResource = $resource('/api/users/:id', {_id:'@id'},{
        update: {method: 'PUT', isArray: false },
        delete: {method: 'DELETE', isArray: false }
    });


    UsersResource.prototype.isSpecialist = function() {
        return (this.role && this.role === 'specialist');
    };

    return UsersResource;
});
