

/***  Call to Location API  ***/

//Import API Key and End Point Url from APIKeys js file
//  import {COVID_LOCATION_APIKEY} from './apikeys.js' 
//  import {COVID_LOCATION_ENDPOINT} from './apikeys.js' 

var COVID_LOCATION_APIKEY = "lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js";
var COVID_LOCATION_ENDPOINT = "https://discover.search.hereapi.com/v1/discover";

//https://discover.search.hereapi.com/v1/discover?q=Covid+Rockville&at=39.08,-77.15&limit=10&apikey=lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js

// Function to call Locationn API 
function callLocationAPI(cityName,Long,Lati){

    var apiKeyLocation = COVID_LOCATION_APIKEY;
    // var Lon = Long;
    // var Lat = Lati;
    var queryWords ='Covid'+'+'+cityName;
    console.log(queryWords);
    var queryUrlLocation = COVID_LOCATION_ENDPOINT+'?q='+queryWords+'&at='+Long+','+Lati+'&limit=10&apikey='+apiKeyLocation;
    // making request to Locations API
    $.ajax({
        url: queryUrlLocation,
        method: "GET"        
    }).then(function(response){
    console.log(response.items.length);
    //Generating List of locations automatically DOM manipulation
    for (var i = 0;i<response.items.length;i++){
        console.log(response.items[i]);     
        
         var liLocations = $('<li>');
        var divHeaderLoc = $('<div>');
        var divBodyLoc=$('<div>');
        var iHeaderLoc =$('<i>');
        var spanLoc=$('<span>');
        divHeaderLoc.attr('class','collapsible-header active');
        iHeaderLoc.attr('class','material-icons');
        divBodyLoc.attr('class','collapsible-body blue-grey lighten-4');             
        spanLoc.text(response.items[i].address.label);        
        divBodyLoc.append(spanLoc);
        for(var j=0;j<response.items[i].contacts.length;j++){
            var ploc=$('<p>').text('Phone :'+ response.items[i].contacts[j].phone[0].value);
            console.log(ploc.text());
            divBodyLoc.append(ploc);
        }               
        divHeaderLoc.text(response.items[i].title);
        iHeaderLoc.text('place');        
        divHeaderLoc.append(iHeaderLoc);
        liLocations.append(divHeaderLoc);
        liLocations.append(divBodyLoc);        
        $('#LiLocations').append(liLocations); 

    }
   
    $(document).ready(function(){
        $('.collapsible').collapsible();
      });

    });

}
// $(document).ready(function(){
//     $('.collapsible').collapsible();
// });
//callLocationAPI();


// Function to pull city info base on user input
function getCityInfo(){

return [lon,lat];

}


$('#searchIcon').on('click',function(){

//let cityPosition = getCityInfo();
//var Lon = cityPosition[0];
//var Lat = cityPosition[1];
var cityName = $('#search').val();

console.log(cityName);


//HERE CALL TO POSITION API TO GET LON AND LAT FOR CITY


var Lon = 38.90; // testing purposes
var Lat = -77.03; // testing purposes

callLocationAPI("Washington",Lon,Lat);


// HERE CALL TO STATS API 


});
