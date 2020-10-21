
// The markers are stored in an array.
// circlers are stored for each state, when user hovers over it, they can see stats

let map;
let markers = [];
let circles = [];
// coordinates for USA
const usa = { 
  lat: 37.0902, 
  lng: -95.7129 
};

// initialize the map
function initMap() {

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

  let coords = location.position;
  const position = new google.maps.LatLng(coords.lat,coords.lng);
  const marker = new google.maps.Marker({
    position: position,
    map: map,
    title: location.title
  });

  const contentString = `
    <ul class="collection info-window">
        <li class="collection-item">${location.title}</li>
        <li class="collection-item">Address: ${location.address.join(", ")}</li>
        <li class="collection-item"><a href="https://www.google.com/maps/place/${location.address.join("+")}/@${coords.lat},${coords.lng}" target="_blank">Open In Google</a></li>
    </ul>
  `;
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  markers.push([marker, infowindow]);
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
      showMarkers();
      markers.forEach(marker => google.maps.event.trigger(marker, 'click'))
    } else{
      circles.forEach(circle => circle.setOptions({fillOpacity: 0.35, strokeOpacity:0.3}));
      clearMarkers();
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


// given a list of test sites, adds marker to the google maps
function addTestLocationMarker(locations) {
    for(let i = 0; i < locations.length; i++) {
        addMarker(locations[i]); 
    }
}

// takes coordinates and center the map to that location with zoom level
function centerLocationInMap(coords, zoomLevel = 4) {
    map.panTo(new google.maps.LatLng(coords.lat, coords.lng));
    map.setZoom(zoomLevel);
}

// Getting State's Data (Stats and position) and generating Red circles on map. 
function createCirclesForStates(stateMapData){
  
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
        strokeWeight: 1,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: centerState,
        radius: Math.sqrt(stateMap[state].confirmed)*200,
      });

      // create info window
      const contentString = `
      <ul class="collection with-header">
          <li class="collection-header heading center">${stateMap[state].name}</li>
          <li class="collection-item"> Confirmed : ${stateMap[state].confirmed}</li>
          <li class="collection-item">Deaths: ${stateMap[state].deaths}</li>
          <li class="collection-item">Recovered: ${stateMap[state].recovered}</li>
      </ul>
  
        `;
      const infoWindow = new google.maps.InfoWindow({
          content: contentString
      })

      // add event listener to the circle, displays info window
      google.maps.event.addListener(stateCircle, 'mouseover', function(){

          if(map.getZoom() < 8){
            infoWindow.setPosition(stateCircle.getCenter());
            infoWindow.open(map);
          }
      });
      
      // add event listener to the circle, displays info window
      google.maps.event.addListener(stateCircle, 'mouseout', function(){
          infoWindow.close();
      });

      circles.push(stateCircle);
  }

}