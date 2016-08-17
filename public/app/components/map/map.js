; (function () {

    angular.module('wildlife')
        .component('mapComponent', {
            template: `<div id="map"></div>`,
            controller: MapController
        });


    MapController.$inject = ['Initializer', '$state', '$stateParams']
    function MapController(Initializer, $state, $stateParams) {
        var $ctrl = this;

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

            // Setup the click event listeners: simply set the map to Chicago.
            controlUI.addEventListener('click', function () {
                // map.setCenter(chicago);
                alert("Log Your beast!")
                //  $state.go('logBook');
            });

        }

        function FieldGuideControl(controlDiv, map) {

            // Set CSS for the control border.
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

            // Set CSS for the control interior.
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '38px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'View Field Guide';
            controlUI.appendChild(controlText);

            // Setup the click event listeners: simply set the map to Chicago.
            controlUI.addEventListener('click', function () {
                // map
                // alert("What do you see!")
                $state.go('fieldGuide');
            });

        }

        function LogBookControl(controlDiv, map) {

            // Set CSS for the control border.
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

            // Set CSS for the control interior.
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '38px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'View Log Book';
            controlUI.appendChild(controlText);

            // Setup the click event listeners: simply set the map to Chicago.
            controlUI.addEventListener('click', function () {
                // map
                // alert("What have you caught!")
                $state.go('logBook');
                
            });

        }

        Initializer.mapsInitialized.
            then(function () {
               
                var largeInfowindow = new google.maps.InfoWindow();

                map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 43.639056, lng: -116.195673 },
                    zoom: 17,
                    // styles: styles,
                    mapTypeControl: false,
            });
                    // if(map) {google.maps.event.trigger(map, 'resize');}
              


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