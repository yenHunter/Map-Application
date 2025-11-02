window.onload = Init;

function Init() {
    // HTML element
    const mapElement = document.getElementById('mapid');

    // Map layers
    const GoogleStreets = L.tileLayer('https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 23,
    });

    const GoogleHybrid = L.tileLayer('https://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
    });

    // Map initialization
    const myMap = L.map(mapElement, {
        center: [23.77, 90.40],
        zoom: 7,
        zoomControl: false,
        attributionControl: false,
        layers: [
            GoogleStreets
        ]
    });

    const baseMaps = {
        "Google Streets": GoogleStreets,
        "Google Hybrid": GoogleHybrid
    };

    // Marker on click
    let currentMarker = null;
    myMap.on('click', function (event) {
        console.log("Location found: " + event.latlng.toString());
        if (currentMarker) {
            myMap.removeLayer(currentMarker);
        }
        currentMarker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(myMap);
    });

    // Controls
    L.control.scale({
        position: 'bottomleft',
        metric: true,
        imperial: false,
        maxWidth: 200
    }).addTo(myMap);

    const zoomControl = L.control.zoom({
        position: 'bottomleft'
    }).addTo(myMap);

    var basemapControl = L.basemapControl({
        position: 'bottomright',
        layers: [
            {
                layer: GoogleStreets
            },
            {
                layer: GoogleHybrid
            }
        ]
    }).addTo(myMap);

    // myMap.locate({
    //     setView: true,
    //     maxZoom: 12
    // });

    myMap.on('locationfound', function (e) {
        L.marker(e.latlng).addTo(myMap);
    });

    // L.Routing.control({
    //     waypoints: [
    //         L.latLng(24.795587, 89.395752),
    //         L.latLng(23.763224, 90.41748)
    //     ],
    //     position: 'topleft',
    //     routeWhileDragging: true,
    //     // geocoder: L.Control.Geocoder.nominatim(),
    //     router: L.Routing.mapbox('pk.eyJ1IjoieWVuaHVudGVyIiwiYSI6ImNtZ3l3cWkyNjFpb2IybXI3a2poaWh0M2QifQ.2m2V9QcQBZp8dsZqnYWFqA')
    // }).addTo(myMap);

    // Sidebar control
    // var sidebar = L.control.sidebar('sidebar', {
    //     position: 'left'
    // });
    // myMap.addControl(sidebar);
    // // sidebar.show();

    // // Easy button control
    // L.easyButton('fa-bars', function () {
    //     sidebar.toggle();
    // }).addTo(myMap);
    var sidebar = L.control.sidebar({ container: 'sidebar' })
        .addTo(myMap);

    // add panels dynamically to the sidebar
    sidebar
        .addPanel({
            id: 'js-api',
            tab: '<i class="fa fa-gear"></i>',
            title: 'JS API',
            pane: '<p>The Javascript API allows to dynamically create or modify the panel state.<p/><p><button onclick="sidebar.enablePanel(\'mail\')">enable mails panel</button><button onclick="sidebar.disablePanel(\'mail\')">disable mails panel</button></p><p><button onclick="addUser()">add user</button></b>',
        })
        // add a tab with a click callback, initially disabled
        .addPanel({
            id: 'mail',
            tab: '<i class="fa fa-envelope"></i>',
            title: 'Messages',
            button: function () { alert('opened via JS callback') },
            disabled: true,
        })

    // be notified when a panel is opened
    sidebar.on('content', function (ev) {
        switch (ev.id) {
            case 'autopan':
                sidebar.options.autopan = true;
                break;
            default:
                sidebar.options.autopan = false;
        }
    });

    var userid = 0
    function addUser() {
        sidebar.addPanel({
            id: 'user' + userid++,
            tab: '<i class="fa fa-user"></i>',
            title: 'User Profile ' + userid,
            pane: '<p>user ipsum dolor sit amet</p>',
        });
    }

    // Polyline measure control
    var polylineMeasure = L.control.polylineMeasure({
        position: 'topright',
        unit: 'metres',
        showBearings: true,
        clearMeasurementsOnStop: false,
        showClearControl: true,
        showUnitControl: true
    }).addTo(myMap);

    // add Leaflet-Geoman controls with some options to the map  
    myMap.pm.addControls({
        position: 'topright',
        drawCircleMarker: false,
        rotateMode: false,
    });

    myMap.on('pm:create', e => {
        console.log(e);
    });
}