app.controller('ContactCtrl', ['$rootScope', '$scope',
    function ContactCtrl($rootScope, $scope) {
        'use strict';
        
        var directionsDisplay = new google.maps.DirectionsRenderer(),
            directionsService = new google.maps.DirectionsService(),
            map;

        $rootScope.contact = true;

        (function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                });
            }
        })();

        (function() {
            var center = new google.maps.LatLng(42.679143, 23.311655),
                mapOptions = {
                    zoom: 19,
                    center: center
                };
                
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            directionsDisplay.setMap(map);
        })();

        $scope.calcRoute = function() {
            var start = $scope.currentLocation,
                end = new google.maps.LatLng(42.679143, 23.311655);
                request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                };

            map.zoom = 12;
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        };
    }]);
