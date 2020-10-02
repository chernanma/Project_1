

/***  Call to Location API  ***/

//Import API Key and End Point Url from APIKeys js file
//  import {COVID_LOCATION_APIKEY} from './apikeysapikeys.js' 
//  import {COVID_LOCATION_ENDPOINT} from './apikeysapikeys.js'

var COVID_LOCATION_APIKEY = "lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js";
var COVID_LOCATION_ENDPOINT = "https://discover.search.hereapi.com/v1/discover";

//https://discover.search.hereapi.com/v1/discover?q=Covid+Rockville&at=39.08,-77.15&limit=10&apikey=lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js

// Function to call Locationn API 
function callLocationAPI(){

    var apiKeyLocation = COVID_LOCATION_APIKEY;
    var Lon = '30.22';
    var Lat = '-92.02';
    var queryWords ='Covid+Rockville';
    var queryUrlLocation = COVID_LOCATION_ENDPOINT+'?q='+queryWords+'&at='+Lon+','+Lat+'&limit=10&apikey='+apiKeyLocation;

    $.ajax({
        url: queryUrlLocation,
        method: "GET"        
    }).then(function(response){
    console.log(response);
    
    for (var i = 0;i<response.length;i++){
        console.log(response.items[i]);
    }


    });

}

callLocationAPI();