; (function () {

    angular.module('wildlife')
        .component('mapComponent', {
            template: `<div id="map"></div>`,
            controller: MapController
        });


    MapController.$inject = ['Initializer', '$state', '$stateParams', 'WildlifeService', '$http']

    function MapController(Initializer, $state, $stateParams, WildlifeService, $http) {
        var $ctrl = this;
        $ctrl.sightings = [];
        $ctrl.markers = [];

/*MAP BUTTON CONSTRUCTORS CREATED PER GOOGLE.  CAN'T SAY I'M A FAN. HAS TO BE A BETTER WAY. THESE ARE CALLED DOWN IN THE MAP INITIALIZATION*/
        function LogControl(controlDiv, map) {
            // Set CSS for the control border.
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to recenter the map';
            controlDiv.appendChild(controlUI);

            // Set CSS for the control interior.
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '38px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'Log It!';
            controlUI.appendChild(controlText);

            controlUI.addEventListener('click', function () {
                $state.go('sighting');
            });
        }

        function FieldGuideControl(controlDiv, map) {
           
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to check field guide';
            controlDiv.appendChild(controlUI);

            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '38px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'View Field Guide';
            controlUI.appendChild(controlText);

            controlUI.addEventListener('click', function () {
             $state.go('fieldGuide');
            });
        }

        function LogBookControl(controlDiv, map) {

            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to check Log Book';
            controlDiv.appendChild(controlUI);

            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '38px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'View Log Book';
            controlUI.appendChild(controlText);

            controlUI.addEventListener('click', function () {
                $state.go('logBook');
            });
        }

/*BEGIN MAP*/
        Initializer.mapsInitialized.
            then(function () {

                $http.get("api/sightings").then(function (res) {
                    $ctrl.sightings = res.data
                    /*ONCE SIGHTINGS ARRAY IS POPULATED, RETRIEVE DATA TO POPULATE MARKER OBJECT*/
                    $ctrl.createMarkerData();
                })

                /*WINDOW VARIABLE CREATED. FOR MARKER ON CLICK*/
                var largeInfowindow = new google.maps.InfoWindow();

                /*MAP INITIALIZATION*/
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 43.639056, lng: -116.195673 },
                    zoom: 17,
                    // styles: styles,
                    mapTypeControl: false,
                });

               /*BEGIN CREATING THE CONTROL BUTTONS*/

                var logControlDiv = document.createElement('div');
                var logControl = new LogControl(logControlDiv, map);
                logControlDiv.index = 1;
                map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(logControlDiv);


                var fieldGuideControlDiv = document.createElement('div');
                var fieldGuideControl = new FieldGuideControl(fieldGuideControlDiv, map);
                fieldGuideControlDiv.index = 1;
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(fieldGuideControlDiv);


                var logBookControlDiv = document.createElement('div');
                var logBookControl = new LogBookControl(logBookControlDiv, map);
                logBookControlDiv.index = 1;
                map.controls[google.maps.ControlPosition.RIGHT_TOP].push(logBookControlDiv);

                /*END BUTTONS*/


                 /*INFO WINDOW FOR CURRENT USER POSITION
                   GEO LOCATION ESTABLISHED*/
                var infoWindow = new google.maps.InfoWindow({ map: map });
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
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


                $ctrl.createMarkerData = function () {
                    for (var i = 0; i < $ctrl.sightings.length; i++) {
                        var sighting = $ctrl.sightings[i];
                        var id = i
                        var position = sighting.sightingLocation;
                
                        WildlifeService.getWildlifeById(sighting.speciesId, function (res) {
                            var title = res.data.commonName;
                            var img = res.data.imageUrl
                            // console.log(res.data)
                            /*ONCE ANIMAL DATA IS RETRIEVED CREATE MARKER*/
                            createMarker(position, title, img, id)
                        })
                    }
                }

                function createMarker(pos, title, img, i) {
                    var marker = new google.maps.Marker({
                        position: pos,
                        title: title,
                        img: img,
                        animation: google.maps.Animation.DROP,
                        id: i

                    });
                    // Push the marker to our array of markers.
                    $ctrl.markers.push(marker);
                    console.log($ctrl.markers)
                    // Create an onclick event to open an infowindow at each marker.
                    marker.addListener('click', function (e) {
                        populateInfoWindow(this, largeInfowindow);
                    });
                    if($ctrl.markers.length == $ctrl.sightings.length){
                        /*ONCE MARKERS ARRAY IS FULL, DISPLAY MARKERS*/
                    showMarker();
                    }
                }

                       function showMarker() {
                    // var bounds = new google.maps.LatLngBounds();
                    // Extend the boundaries of the map for each marker and display the marker
                    for (var i = 0; i < $ctrl.markers.length; i++) {
                        $ctrl.markers[i].setMap(map);
                        // bounds.extend($ctrl.markers[i].position);
                    }
                    // map.fitBounds(bounds);
                }

                function populateInfoWindow(marker, infowindow) {
                    // Check to make sure the infowindow is not already opened on this marker.
                    if (infowindow.marker != marker) {
                        infowindow.marker = marker;
                        infowindow.setContent(`<div><img src=${marker.img} width = '100px'><h2>${marker.title}</h2><p>${marker.position}</p></div>`);
                        infowindow.open(map, marker);
                        // Make sure the marker property is cleared if the infowindow is closed.
                        infowindow.addListener('closeclick', function () {
                            infowindow.marker = null;
                        });
                    }
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