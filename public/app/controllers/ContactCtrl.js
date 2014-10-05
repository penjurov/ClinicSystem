'use strict';

app.controller('ContactCtrl', ['$rootScope', '$scope',
    function ContactCtrl($rootScope, $scope) {
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;

        $rootScope.contact = true;

        ($scope.getCurrentLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                });
            }
        })();

        ($scope.initialize = function() {
            directionsDisplay = new google.maps.DirectionsRenderer();
            var center = new google.maps.LatLng(42.679143, 23.311655);
            var mapOptions = {
                zoom: 19,
                center: center
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            directionsDisplay.setMap(map);
        })();

        $scope.calcRoute = function() {
            var start = $scope.currentLocation;
            var end = new google.maps.LatLng(42.679143, 23.311655);
            var request = {
                origin:start,
                destination:end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            map.zoom = 12;
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
    }]);
