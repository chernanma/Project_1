// covid stats  variable for us-counties
let countycity = [];

function nytCovidStats() {  
    

    // get the file
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv',
        method: 'GET'
    }).then(function(response){
        // // console.log(response.split('\n'));
        let table = response.split('\n');
        // store the keys in an array
        let tH = table[0].split(',');

        // loop through the rows in the table and extract the data
        for(let i = 1; i < table.length; i++) {
            let row = table[i].split(',');
            // for every row save the data
            let tempObj = {};
            for(let i = 0; i < tH.length; i++) {
                tempObj[tH[i]] = row[i];
            }
            window.localStorage.setItem(tempObj.county, JSON.stringify(tempObj));
        }
        
        
    });
}

nytCovidStats();

/**
 *      
 * @param {*} region - is an object which has a list of usa province/city/county data
 *                   for example,
 *                    region : {
 * 
 *                          provinces : [{
 *                              name: "baltimore city"
 *                              lat: 12.02323
 *                              long: 15.234
 *                              },
 *                              {},{},{}....]
 *                         }
 */
function provinceData(region){
    console.log(region);
  
}

/**
 * 
 * @param {*} state - state is an object that storest the covid stats for a paticular state
 *                      for example, 
 *                      state: {
 *                              active: 120776
 *                              active_diff: 411
 *                              confirmed: 124725
 *                              confirmed_diff: 414
 *                              date: "2020-09-30"
 *                              deaths: 3949
 *                              deaths_diff: 3
 *                              fatality_rate: 0.0317
 *                              last_update: "2020-10-01 04:23:42"
 *                              lat: "39.0639"
 *                              long: "-76.8021"
 *                              name: "Maryland"
 *                              recovered: 0
 *                              recovered_diff: 0
 *                              region: "US"
 *                              regionISO: "USA"
 *                              }
 */

 ///Display State Stats on main page
function stateData(state) {
   
    console.log(state);
    console.log(state.confirmed);
    $('#totalCasesState').text(state.confirmed);
    $('#totalRecoveredState').text(state.recovered);
    $('#totalDeathsState').text(state.deaths);
    $('#totalActiveState').text(state.active);

}

/**
 * 
 * @param {*} world - is an object which stores all the covid information for worl wide cases
 *  for example, 
 *  world : {
 *       active: 9316504
 *       active_diff: 63261
 *       confirmed: 33881272
 *       confirmed_diff: 320191
 *       date: "2020-09-30"
 *       deaths: 1012980
 *       deaths_diff: 6404
 *       fatality_rate: 0.0299
 *       last_update: "2020-10-01 04:23:42"
 *       recovered: 23551788
 *       recovered_diff: 250526
 *      }
 */
function worldData(world) {
    // // console.log(world);
    $('#totalCases').text(world.confirmed);
    $('#totalRecovered').text(world.recovered);
    $('#totalDeaths').text(world.deaths);
    $('#totalActive').text(world.active);
}

/** 
 * 
 *  COVID-19 TESTING SITES LOCATION,
 *  Finds the list of sites where testing is available
 *  website - https://developer.here.com/blog/finding-covid-19-testing-sites
 * 
 *  API  EndPoint
 *  example - https://discover.search.hereapi.com/v1/discover?q=Covid&at=30.22,-92.02&limit=10&apikey={{APIKEY}}
 */ 

COVID_LOCATION_APIKEY = "lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js";
COVID_LOCATION_ENDPOINT = "https://discover.search.hereapi.com/v1/discover";

/** 
*  COVID-19 INFORMATION AND STATS
*  Information about active cases, deaths etc for different regions
*  website - https://covid-api.com/api/
*/ 

COVID_STATS_ENDPOINTS = {

   /**
    * endpoints 
    */
   states: "https://covid-api.com/api/reports?region_province=",

   /**
    *  endpoint for all region in usa
    */
   provinces: "https://covid-api.com/api/provinces/USA",
   
    totalCases: "https://covid-api.com/api/reports/total"
  
}; 

/** 
* 
*              GOOGLE MAPS API
*  
*         Generate maps for specifict test site near by user's location
* 
* 
* 
*/ 


//website -https://developers.google.com/maps/documentation/embed
// TO GET MAP FOR A SPECIFIC TEST SITE  
GOOGLEAPIKEY = "AIzaSyD4alQSwGW9U2s7IgAqMCMocMmTfbNuJSg";
// URL for an Maps Embed API request is as follows:
//  const GOOGLE_MAPS_ENDPOINT = "https://www.google.com/maps/embed/v1/place?key="

// Example : https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Eiffel+Tower,Paris+France



// https://developers.google.com/maps/documentation/urls
// TO GET MAP FOR MULIPLES TEST SITES -- ****NO APIKEY NEEDED****  
// URL for an Maps Embed API request is as follows:
GOOGLE_MAPS_ENDPOINT = "https://www.google.com/maps/search/?api=1&query="

// Example : https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393,+123+Main+St,MD,20874


/***  Call to Location API  ***/

//Import API Key and End Point Url from APIKeys js file
//  import {COVID_LOCATION_APIKEY} from './apikeys.js' 
//  import {COVID_LOCATION_ENDPOINT} from './apikeys.js' 

//https://discover.search.hereapi.com/v1/discover?q=Covid+Rockville&at=39.08,-77.15&limit=10&apikey=lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js

var Lat;
var Lon;
var position;

function findLatLong(address) {
    const MAPQUEST_API_KEY = '1AXLjWPBMJWOb33NJl8Jf0dd8cxGbjBx';
    const MAPQUEST_GEOCODING_API_ENDPOINT = 'http://www.mapquestapi.com/geocoding/v1/address';
    let queryString = `?key=${MAPQUEST_API_KEY}&location=${address}`;
    let queryUrl = MAPQUEST_GEOCODING_API_ENDPOINT + queryString;
    let URL = {
        url: queryUrl,
        method: 'GET'
    };
    // ajax request
    $.ajax(URL).then(function(response){
        // // console.log(response)
        let coords = response.results[0].locations[0].latLng;
        console.log(coords);
        console.log(userInput);
        callLocationAPI(userInput,coords.lng,coords.lat);
        
    });
}

/**
 *  returns world wide covid stats
 */
function worldWide() {

    // query url
    let queryUrl = COVID_STATS_ENDPOINTS.totalCases;
    // url object
    let URL = {
        url: queryUrl,
        method: 'GET'
    };

    // ajax request
    $.ajax(URL).then(function(response){
        // // console.log(response.data);
        worldData(response.data);
    });

}

/**
 * returns world wide covid stats
 */
function state(stateName) {

    // query url
    let queryUrl = COVID_STATS_ENDPOINTS.states + stateName;
    // url object
    let URL = {
        url: queryUrl,
        method: 'GET'
    };

    // ajax request
    $.ajax(URL).done(function(response){


        // console.log(response);
        // stores formatted data for states
        let state = {};

        let data = response.data[0];
        // console.log(data);

        for(let keys in data){
            // console.log(keys);
            if(keys === "region"){
                // key is an object , save all the keys in side region object
                for(let k in data[keys]) {

                    if(k === "cities") {
                        continue;
                    } else if(k === "province") {
                        state['name'] = data[keys][k];
                    } else if(k === "name") {
                        state['region'] = data[keys][k];
                    } else if (k ==="iso") {
                        state['regionISO'] = data[keys][k]; 
                    } else {
                        // gets the keys and value from data[keys] object
                        state[k] = data[keys][k];
                    }
                }
            } else { 
                state[keys] = data[keys];
            }
        }

        // console.log(state);

        
        // pass the information to stateData
        stateData(state)
       
        return true;
    })
    .fail(function() {
        return false;
      })
    ;

}

/**
 * returns the province data for USA regions
 */
function provinces() {
    // query url
    let queryUrl = COVID_STATS_ENDPOINTS.provinces;
    // url object
    let URL = {
        url: queryUrl,
        method: 'GET'
    };

    // ajax request
    $.ajax(URL).then(function(response){
        // console.log(response);
        // stores province data
        let usa = {
            provinces: []
        };
        // console.log(response.data);
        for(let i = 0; i < response.data.length; i++) {
            // obj
            let obj = response.data[i];
            // temp obj
            usa.provinces.push({
                name: obj.province,
                lat: obj.lat,
                long: obj.long
            });
        }

        // view method displays provinces stats
        // usa is an object which has list of all provinces
        provinceData(usa);

    });


}

// Function to call Locationn API 
function callLocationAPI(cityName,Long,Lati){

    var apiKeyLocation = COVID_LOCATION_APIKEY;
    // var Lon = Long;
    // var Lat = Lati;
    var queryWords ='Covid'+'+'+cityName;   
    queryWords= queryWords.replace(/ /g, "+");
    ueryWords= queryWords.replace(/,/g,"" );
    console.log(queryWords);
    var queryUrlLocation = COVID_LOCATION_ENDPOINT+'?q=Covid&at='+Lati+','+Long+'&limit=10&apikey='+apiKeyLocation;
    console.log(queryUrlLocation);
    // making request to Locations API
    $.ajax({
        url: queryUrlLocation,
        method: "GET"        
    }).then(function(response){
    // console.log(response.items.length);
    //Generating List of locations automatically DOM manipulation
    for (var i = 0;i<response.items.length;i++){
        // console.log(response.items[i]);     
        
         var liLocations = $('<li>');
        var divHeaderLoc = $('<div>');
        var divBodyLoc=$('<div>');
        var iHeaderLoc =$('<i>');
        var spanLoc=$('<span>');
        liLocations.attr('id', 'site-location');
        liLocations.attr('data-site',response.items[i].title);
        divHeaderLoc.attr('class','collapsible-header active');
        iHeaderLoc.attr('class','material-icons');
        divBodyLoc.attr('class','collapsible-body blue-grey lighten-4'); 
        var locShortName= response.items[i].title;   
        locShortName= locShortName.replace('Covid-19 Testing Site: ','');         
        spanLoc.text(response.items[i].address.label);        
        divBodyLoc.append(spanLoc);
        // console.log(response);
        // console.log(response.items[i].contacts);                    
        divHeaderLoc.text(locShortName);
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


var userInput;

//Click event on Search button
$('#searchIcon').on('click',function(){

// Clearing List of locations for every search
$('#LiLocations').empty();    
//let cityPosition = getCityInfo();
//var Lon = cityPosition[0];
//var Lat = cityPosition[1];
userInput = $('#search').val();
// console.log(userInput);
// console.log(state(userInput));
if (state(userInput)){  
    alert('WOW');
}else{
    var cityCounty = JSON.stringify(localStorage.getItem(userInput));
    
    //console.log(typeof(cityCounty));
    //console.log(cityCounty);

    findLatLong(userInput);
    // console.log(position);
}


// HERE CALL TO WORLDWIDE STATS API 
worldWide();





});

var locationName;
var locName;

//Load map when click on location from Locatin list
$("#LiLocations").on('click',function(event){
    console.log(event.target);
    console.log($(event.target).parents('#site-location').attr('data-site'));
    locationName = $(event.target).parents('#site-location').attr('data-site');
    locName= locationName.replace('Covid-19 Testing Site: ','');
    locName= locName.replace(/ /g, "+");
    locName= locName.replace(/,/g,"" );
    console.log(locName);
   
    //Pullin data from google maps API 
    var queryUrl = 'https://www.google.com/maps/embed/v1/place?key='+GOOGLEAPIKEY+'&q='+locName;
    console.log(queryUrl);
    //Setting src into Iframe in maing page to display MAP
    $('#map').attr('src',queryUrl);
});


function searchAutoComplete(searchInput) {
    // api key
    let GOOGLE_API_KEY = "AIzaSyBQ030tIKWaG6RYmMth3wqf2J8dj1RlCsY";
    // api endPoint
    let GOOGLE_PLACE_AUTOCOMPLETE= "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?";
    // parameters
    let PARAMETERS = `input=${searchInput}&key=${GOOGLE_API_KEY}`;
    // queryurl
    let queryUrl = GOOGLE_PLACE_AUTOCOMPLETE+PARAMETERS;
    // ajax url object
    let URL = {
        url: queryUrl,
        methon: 'GET',
    };
    // ajax request
    $.ajax(queryUrl).then(function(response){
       
        listOfPlaces(response.predictions);
    });
}
/**
 *
 * @param {*} autoComplete - is an array, with list of all places matching the places api ajax request
 */

function listOfPlaces(predictions) {
    var list = [];
    // console.log(predictions);
    for(let item in predictions){
        let place = predictions[item].description;
        // liPop.text(places);
        // $('#autopop').append(liPop);
        list.push(place);
        // // console.log(predictions[item].description);
    }
    $('#autopopu').empty();
    for(let i in list){
        var $li =$('<li class="collection-item">');
        // $li.on('click', placesLiEventHandler);
        $li.text(list[i])
        $('#autopopu').append($li);
    }
    // console.log(list);
}

$("#search").keydown(function() {
    // count the number of text
    let $this = $(this);
    let input = $this.val();
    let textLength = input.length;
    if(parseInt(textLength/4) > 0) {
        searchAutoComplete(input);    
    }
   
});

$('#autopopu').on('click',function(event){
    let address = $(event.target).text();
    console.log(address);
    $('#search').val(address);
    $(this).empty();
    userInput = address;
    findLatLong(address);
});

