
/** 
 *  COVID-19 TESTING SITES LOCATION,
 *  Finds the list of sites where testing is available
 *  website - https://developer.here.com/blog/finding-covid-19-testing-sites
 */ 

COVID_LOCATION_APIKEY = "lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js";
COVID_LOCATION_ENDPOINT = "https://discover.search.hereapi.com/v1/discover";


/** 
* GOOGLE MAPS API
*/ 
GOOGLEAPIKEY = "AIzaSyD4alQSwGW9U2s7IgAqMCMocMmTfbNuJSg";
GOOGLE_MAPS_ENDPOINT = "https://www.google.com/maps/search/?api=1&query="

/**  
 * Call to Location API  
 */

//  Import API Key and End Point Url from APIKeys js file
//  import {COVID_LOCATION_APIKEY} from './apikeys.js' 
//  import {COVID_LOCATION_ENDPOINT} from './apikeys.js' 
//  https://discover.search.hereapi.com/v1/discover?q=Covid+Rockville&at=39.08,-77.15&limit=10&apikey=lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js

var Lat;
var Lon;
var position;
var userInput;
/**
 * gets the covid stats fro world, usa, state and county
 * 
 * @param {*} region - region/ county name
 */
function getCovidStats (region) {

    let specificDay = new Date();
        let month = specificDay.getMonth()+1;
        let day = specificDay.getDate();
        let today = specificDay.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;

    let queryUrl = `https://api.covid19tracking.narrativa.com/api/${today}/country/us/region/${region.state}/sub_region/${region.county}`;
    // ajax request
    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function(response){

        console.log(response);
        let world = response.total;
        let usa = response.dates[today].countries.US;
        let state = usa.regions[0];
        let county = state.sub_regions[0];

        let wData = {
            name: world.name,
            date: world.date,
            confirmed: world.today_confirmed,
            new_confirmed: world.today_new_confirmed,
            deaths: world.today_deaths,
            new_death: world.today_new_deaths,
            recovered: world.today_recovered,
            new_recovered: world.today_new_recovered
        };

        // console.log(wData);
        worldData(wData);

        let usData = {
            name: usa.name,
            date: usa.date,
            confirmed: usa.today_confirmed,
            new_confirmed: usa.today_new_confirmed,
            deaths: usa.today_deaths,
            new_death: usa.today_new_deaths,
            recovered: usa.today_recovered,
            new_recovered: usa.today_new_recovered
        };

        getUsaHistoricalData();
        console.log(usData);
        usaData(usData);


        let sData = {
            name: state.name,
            date: state.date,
            confirmed: state.today_confirmed,
            new_confirmed: state.today_new_confirmed,
            deaths: state.today_deaths,
            new_death: state.today_new_deaths,
            recovered: state.today_recovered,
            new_recovered: state.today_new_recovered
        };

        // console.log(sData)
        stateData(sData);

        let cData = {
            name: county.name,
            date: county.date,
            confirmed: county.today_confirmed,
            new_confirmed: county.today_new_confirmed,
            deaths: county.today_deaths,
            new_death: county.today_new_deaths,
            recovered: county.today_recovered,
            new_recovered: county.today_new_recovered
        };

        // console.log(cData);
        countyData(cData)
        

    });
    
}

/**
 * finds lat and longitude of the address
 * @param {} address - complete address forward from the places api google 
 */
function findLatLong (address) {
    const MAPQUEST_API_KEY = '1AXLjWPBMJWOb33NJl8Jf0dd8cxGbjBx';
    const MAPQUEST_GEOCODING_API_ENDPOINT = 'https://www.mapquestapi.com/geocoding/v1/address';
    let queryString = `?key=${MAPQUEST_API_KEY}&location=${address}`;
    let queryUrl = MAPQUEST_GEOCODING_API_ENDPOINT + queryString;
    let URL = {
        url: queryUrl,
        method: 'GET'
    };
    // ajax request
    $.ajax(URL).then(function(response){
        // console.log(response)
        let coords = response.results[0].locations[0].latLng;
        // find test sites
        callLocationAPI(userInput,coords.lng,coords.lat);
        // find county name
        findCountyName(coords);
    });
}

/** */
function getUsaHistoricalData (){
    // ajax request
    $.ajax({
        url: 'https://api.covidtracking.com/v1/us/daily.json',
        method: 'GET'
    }).then(function(response) {

        // console.log(response);

        let data = [];
        for(let i = 0; i < 14; i ++){
            let currentData = response[i];
            let tempObj = {};
            cDate = currentData.date.toString();
            // date
            tempObj['date'] = `${cDate.substring(0,4)},${cDate.substring(4,6)},${cDate.substring(6,8)}`;
            // death
            tempObj['deathIncrease'] = currentData.deathIncrease;
            // hospitalized
            tempObj['hospitalizedIncrease'] = currentData.hospitalizedIncrease;
            // on ventilator
            tempObj['onVentilatorCurrently'] = currentData.onVentilatorCurrently
            // positiveIncrease
            tempObj['positiveIncrease'] = currentData.positiveIncrease;
            // negativeIncrease
            tempObj['negativeIncrease'] = currentData.negativeIncrease;
            // recovered
            tempObj['recovered'] = currentData.recovered;
            // total test Results
            tempObj['totalTestResultsIncrease'] = currentData.totalTestResultsIncrease;
            // pending
            tempObj['pending'] = currentData.pending;
            
            if(i === 0) {
                // latest data for usa
                // usaData(tempObj);
            }
            data.push(tempObj);
        }
        // console.log(data);
        usaHistoricalData(data);
    });
}

/** 
* 
* NARRATIVA - COVID-19 TRACKING PROJECT
*
* Collects information from different data sources to provide comprehensive 
* data for the novel coronavirus, SARS-CoV-2.
* website -https://covid19tracking.narrativa.com/index_en.html
* End point: https://api.covid19tracking.narrativa.com/api/
* Example: https://api.covid19tracking.narrativa.com/api/2020-03-10
* 
*/
// Funtion to Pull data from Narrrativa API for Total cases by country and generate a collapsable list
function casesByCountry (){

    let specificDay = new Date();
    let month = specificDay.getMonth()+1;
    let day = specificDay.getDate();
    let today = specificDay.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;

    let endPoint = 'https://api.covid19tracking.narrativa.com/api/' 
    let queryCountriesUrl = endPoint + today;      
    // making request to pull all covid data by countries
    $.ajax({
        url: queryCountriesUrl,
        method: "GET"        
    }).then(function(response){
        // console.log(response);
        countriesData(response.dates[today].countries , today);
             
    });
}

/**
 *  finds county name
 */
function findCountyName(coords){

    // debug
    console.log('Ajax request: Find the County name');

    let queryUrl = `https://geo.fcc.gov/api/census/block/find?latitude=${coords.lat}&longitude=${coords.lng}&format=json`;
    // ajax
    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function(response){
        // console.log(response.County);
        let countyName = response.County.name;
        if(countyName) {
            // console.log(response);

            // gets covid stats for usa, state and county based on the countyname
            getCovidStats({
                county: countyName,
                state: response.State.name
            });
        }
    });

}

// Function to call Locationn API 
function callLocationAPI(cityName,Long,Lati){

    // debug
    console.log("Ajax request : Test Site Location");


    var apiKeyLocation = COVID_LOCATION_APIKEY;

    var queryWords ='Covid'+'+'+cityName;   
    queryWords= queryWords.replace(/ /g, "+");
    ueryWords= queryWords.replace(/,/g,"" );
    
    var queryUrlLocation = COVID_LOCATION_ENDPOINT+'?q=Covid&at='+Lati+','+Long+'&limit=10&apikey='+apiKeyLocation;
    
    // making request to Locations API
    $.ajax({
        url: queryUrlLocation,
        method: "GET"        
    }).then(function(response){

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
            locShortName = locShortName.replace('Covid-19 Testing Site: ','');         
            spanLoc.text(response.items[i].address.label);        
            divBodyLoc.append(spanLoc);
                               
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

var locationName;
var locName;

/**
 * @param {*} searchInput - string, ajax request to get the list of possible address matching the string
 */
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

// initialize the app
(function() {

    casesByCountry();
    findLatLong('Baltimore city');

    // size of the dashboard
    $('.LiCountries').attr('style', 'height: 100px; overflow: auto;');

})();

