; (function () {

    angular.module('wildlife')
        .component('mapComponent', {
            template: `<div id="map"></div>`,
            controller: MapController
        });


    MapController.$inject = ['Initializer']
    function MapController(Initializer) {
        var $ctrl = this;

        Initializer.mapsInitialized.
            then(function () {
                var largeInfowindow = new google.maps.InfoWindow();
                map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 43.639056, lng: -116.195673 },
                    zoom: 17,
                    // styles: styles,
                    mapTypeControl: false
                });
                var infoWindow = new google.maps.InfoWindow({ map: map });
                if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "You are here!"
                    });


                    infoWindow.setPosition(pos);
                    infoWindow.setContent(`<div><h1>${'You Are Here!'}</h1><p>Latitude: ${pos.lat}</p><p>Longitude: ${pos.lng}</div>`);
                    map.setCenter(pos);
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }

            });
            
            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }

    }

} ());