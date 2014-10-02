'use strict';

app.controller('ContactCtrl', ['$rootScope', '$scope', '$location', 'notifier', 'identity',
    function ContactCtrl($rootScope, $scope, $location, notifier, identity) {
        $scope.map = {
            center: {
                latitude: 42.679143,
                longitude:  23.311655
            },
            zoom: 19
        };
    }]);
