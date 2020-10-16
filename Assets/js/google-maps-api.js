
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.

let map;
let markers = [];
let circles=[];
let statemap=[];

function initMap() {
  console.log(statemap);
  // coordinates for baltimore
  const baltimore = { lat: 39.299236, lng: -76.609383 };

  const styledMapType = new google.maps.StyledMapType(    
      [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ],    
    { name: "Styled Map" }
  );


  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: baltimore,
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
    },
    
    
  });
  map.mapTypes.set("styled_map", styledMapType);
  map.setMapTypeId("styled_map");

  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event) => {

    let coords = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
    }
    addMarker(event.latLng);
    // console.log(coords);
    findCountyName(coords);

  });
  // Adds a marker at the center of the map.
  addMarker(baltimore);

  map.addListener("zoom_changed", () => {
    if (map.getZoom()>7){
      circles.forEach(circle => circle.setOptions({fillOpacity:0, strokeOpacity:0}));
    }else{
      circles.forEach(circle => circle.setOptions({fillOpacity: 0.35, strokeOpacity:0.3}));

    }
    
    console.log("Zoom: " + map.getZoom());
  });
    
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  // add event listener to the marker
  marker.addListener('click', displayMarkerInfo);
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


/** helper functions */

/**
 * given a list of test sites, adds marker to the google maps
 * 
 * @param {*} location - array , list of test sites cordinates
 *      [ 
 *          { lat: 0129301, lng: 151231 }, 
 *          {} , 
 *          {} 
 *      ]
 */
function addTestLocationMarker(location) {

    for(let i = 0; i < location.length; i++) {
        let coords = location[i];
        let myLatlng = new google.maps.LatLng(coords.lat,coords.lng);
        addMarker(myLatlng)
     
    }
}

/**
 * takes coordinates and center the map to that location with zoom level
 * 
 * @param {*} coords 
 */
function centerLocationInMap(coords, zoomLevel = 4) {

    // map.panTo(new google.maps.LatLng(coords.lat, coords.lng));
    map.setZoom(zoomLevel);

}

/**
 * click event listener call back function
 * displays the data in the infp window
 */
function displayMarkerInfo(event) {
  console.log(this.getPosition());
}


// Getting State's Data (Stats and position) and generating Red circles on map. 
function getstateData (statemapdata){
  
  statemap =statemapdata;   
  for (let state in statemap) {

    let centerstate = { lat: parseFloat(statemap[state].lat) , lng: parseFloat(statemap[state].long) };    
    // Add the circle for this state to the map.
    const stateCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: centerstate,
      radius: Math.sqrt(statemap[state].confirmed)*200,
    });
    circles.push(stateCircle);
  }

  console.log(statemap);

}