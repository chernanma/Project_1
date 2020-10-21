
// The markers are stored in an array.
// circlers are stored for each state, when user hovers over it, they can see stats

let map;
let markers = [];
let circles = [];

// initialize the map
function initMap() {

  // coordinates for USA
  const usa = { 
    lat: 37.0902, 
    lng: -95.7129 
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: usa,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.RIGHT_TOP,
    }
  });
  // add event listeners to map
  addEventListenersToMap();
  
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

/** Google Map Event Listener */

function addEventListenersToMap() {

  // when user zooms remove circle based on zoom level
  map.addListener("zoom_changed", () => {
    if (map.getZoom() > 7){
      circles.forEach(circle => circle.setOptions({fillOpacity:0, strokeOpacity:0}));
    } else{
      circles.forEach(circle => circle.setOptions({fillOpacity: 0.35, strokeOpacity:0.3}));
    }
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event) => {
    let coords = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
    }
    // console.log(coords);
    findCountyName(coords);
  });


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
function addTestLocationMarker(locations) {

    for(let i = 0; i < locations.length; i++) {
        let coords = locations[i];
        let myLatlng = new google.maps.LatLng(coords.lat,coords.lng);
        addMarker(myLatlng)
     
    }
}

// takes coordinates and center the map to that location with zoom level
function centerLocationInMap(coords, zoomLevel = 4) {
    // map.panTo(new google.maps.LatLng(coords.lat, coords.lng));
    map.setZoom(zoomLevel);
}

// click event listener call back function displays the data in the infp window
function displayMarkerInfo(event) {
  console.log(this.getPosition());
}

// Getting State's Data (Stats and position) and generating Red circles on map. 
function createCirlesForStates(stateMapData){
  
  let stateMap = stateMapData;   
  for (let state in stateMap) {
    let centerState = { 
      lat: parseFloat(stateMap[state].lat) , 
      lng: parseFloat(stateMap[state].long) 
    };    
    // Add the circle for this state to the map.
    const stateCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: centerState,
        radius: Math.sqrt(stateMap[state].confirmed)*200,
      });
     circles.push(stateCircle);
  }

}