
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.

let map;
let markers = [];

function initMap() {
  // coordinates for baltimore
  const baltimore = { lat: 39.299236, lng: -76.609383 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: baltimore
  });

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
function centerLocationInMap(coords, zoomLevel = 13) {

    map.panTo(new google.maps.LatLng(coords.lat, coords.lng));
    map.setZoom(zoomLevel);

}

/**
 * click event listener call back function
 * displays the data in the infp window
 */
function displayMarkerInfo(event) {
  console.log(this.getPosition());
}