// /**
//  * 
//  * @param {*} world - is an object which stores all the covid information for worl wide cases
//  *  for example, 
//  *  world : {
//  *       active: 9316504
//  *       active_diff: 63261
//  *       confirmed: 33881272
//  *       confirmed_diff: 320191
//  *       date: "2020-09-30"
//  *       deaths: 1012980
//  *       deaths_diff: 6404
//  *       fatality_rate: 0.0299
//  *       last_update: "2020-10-01 04:23:42"
//  *       recovered: 23551788
//  *       recovered_diff: 250526
//  *      }
//  */
// function worldData(world) {
//     // // console.log(world);
//     // console.log(county);
//     let nf = new Intl.NumberFormat(); // converts number in string with comma
//     $('.world-recovered').text(nf.format(world.recovered));
//     $('.world-deaths').text(nf.format(world.deaths));
//     $('.world-confirmed').text(nf.format(world.confirmed));
// }

// /**
//  * 
//  * @param {*} country - is an object returned from the ajax request 
//  */
// function countriesData(countries, today) {
    
//     for(let i in countries){

//         let liCountries = $('<li class=" truncate clearfix">');   
//         let spanCountry = $('<span class="left text-flow truncate">'); 
//         let spanValue = $('<span class="right red-text text-darken-3">')

//         spanCountry.text(countries[i].name);
//         spanValue.text(countries[i].today_confirmed)

//         liCountries.append(spanCountry);
//         liCountries.append(spanValue);              
//         $('#LiCountries').append(liCountries);

//     }; 
// }

// /**
//  * 
//  * @param {*} data - object with the latest info on usa
//  *      {
//  *           date: ,
//  *          confirmed: ,
//  *         new_confirmed: ,
//  *          deaths: ,
//  *          new_death: ,
//  *           recovered: ,
//  *          new_recovered: 
//  *      }
//  */
// function usaData(usa) {
    
//     console.log(usa);
//     let nf = new Intl.NumberFormat(); // converts number in string with comma
//     $('.usa-recovered').text(nf.format(usa.recovered));

//     console.log(typeof usa.deaths);
//     console.log();
//     let deaths = nf.format(usa.deaths);
//     $('.usa-deaths').text(deaths);
//     $('.usa-confirmed').text(nf.format(usa.confirmed));
// }

// /**
//  * @param {*} data - object has historical data for usa.
//  * 
//  * date: 20201006*
//  * deathIncrease: 202675
//  * hospitalizedIncrease: 414461
//  * negativeIncrease: 97932855
//  * onVentilatorCurrently: 1609
//  * pending: 8680
//  * positiveIncrease: 7460634
//  * recovered: 2952390
//  * totalTestResultsIncrease: 110226302
//  */
// function usaHistoricalData(history){
  
//     console.log(history);

    
//     // loop and extract data
//     let dates = [];
//     let dataSet = {
//         deathIncrease: [],
//         positiveIncrease: [],
//         pending: [],
//         totalTestResultsIncrease: [],
//         onVentilatorCurrently: [],
//         negativeIncrease: [],
//         hospitalizedIncrease: []
//     };

//     for(let i = 0; i < history.length; i++) {
//         let cObj = history[i]; // current history object
//         // console.log(Object.keys(cObj));

//         let date = new Date(cObj.date);
//         date = date.getMonth() + 1 + "/" + date.getDate();

//         dates.unshift(date);
//         dataSet['deathIncrease'].unshift(cObj.deathIncrease);
//         dataSet['positiveIncrease'].unshift(cObj.positiveIncrease);
//         dataSet['pending'].unshift(cObj.pending);
//         dataSet['negativeIncrease'].unshift(cObj.negativeIncrease);
//         dataSet['totalTestResultsIncrease'].unshift(cObj.totalTestResultsIncrease);
//         dataSet['onVentilatorCurrently'].unshift(parseInt(cObj.onVentilatorCurrently)/10000)
//         dataSet['hospitalizedIncrease'].unshift(cObj.hospitalizedIncrease);
        
//     }
    
   
//         let keys = Object.keys(dataSet);
//         for(let index in keys) {
//             // canvas
//             var ctx = $('<canvas>').attr('id', 'chart-'+keys[index]);
//             // console.log(ctx);
//             var myChart = new Chart(ctx, {
//                 type: 'line',
//                 data: {
//                     labels: dates,
//                     datasets: [{
//                         label: keys[index],
//                         data: dataSet[keys[index]],
//                         borderColor: 'red',
//                         borderWidth: 1
//                     }]
//                 },
//                  options : {
//                     tooltipTemplate: "<%= value %>",
                  
//                     showTooltips: true,
                  
//                     onAnimationComplete: function() {
//                       this.showTooltip(this.datasets[0].points, true);
//                     },
//                     tooltipEvents: []
//                   }
//             });

//             console.log(ctx);
//             if(ctx.attr('id') === 'chart-positiveIncrease'){
//                 console.log('inside if')
//                 $('.dashboard-chart').append(ctx);

//             }

//             $('.chart-container').append(ctx);
//         }
    
  
    
// }

// /**
//  * 
//  * @param {*} state - state is an object that storest the covid stats for a paticular state
//  *                      for example, 
//  *                      state: {
//  *                              active: 120776
//  *                              active_diff: 411
//  *                              confirmed: 124725
//  *                              confirmed_diff: 414
//  *                              date: "2020-09-30"
//  *                              deaths: 3949
//  *                              deaths_diff: 3
//  *                              fatality_rate: 0.0317
//  *                              last_update: "2020-10-01 04:23:42"
//  *                              lat: "39.0639"
//  *                              long: "-76.8021"
//  *                              name: "Maryland"
//  *                              recovered: 0
//  *                              recovered_diff: 0
//  *                              region: "US"
//  *                              regionISO: "USA"
//  *                              }
//  */
//  ///Display State Stats on main page
//  function stateData(state) {
   
//     // console.log(county);
//     let nf = new Intl.NumberFormat(); // converts number in string with comma
//     $('.state-name').text(state.name);
//     $('.state-recovered').text(nf.format(state.recovered));
//     $('.state-deaths').text(nf.format(state.deaths));
//     $('.state-confirmed').text(nf.format(state.confirmed));
   
// }

// /**
//  *      
//  * @param {*} region - is an object which has a list of usa province/city/county data
//  *                   for example,
//  *                    region : {
//  * 
//  *                          provinces : [{
//  *                              name: "baltimore city"
//  *                              lat: 12.02323
//  *                              long: 15.234
//  *                              },
//  *                              {},{},{}....]
//  *                         }
//  */
// function countyData(county){
//     // console.log(county);
//     let nf = new Intl.NumberFormat(); // converts number in string with comma
//     $('.county-name').text(county.name);
//     $('.county-recovered').text(nf.format(county.recovered));
//     $('.county-deaths').text(nf.format(county.deaths));
//     $('.county-confirmed').text(nf.format(county.confirmed));
  
// }

// /** 
//  * @param {*} predictions - is an array, with list of all places matching 
//  *                           the places api ajax request
//  */
// function listOfPlaces(predictions) {
    
//     var list = [];
//     for(let item in predictions){
//         let place = predictions[item].description;
//         list.push(place);
//     }
//     $('#autopopu').empty();
//     for(let i in list){
//         var $li =$('<li class="collection-item">');
//         $li.text(list[i])
//         $('#autopopu').append($li);
//     }
//     // console.log(list);
// }


/** 
 * 
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

        console.log(response);

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
        console.log(data);
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

// Function to pull city info base on user input
// function getCityInfo(){

//     return [lon,lat];

// }

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

$("#search").keydown(function(event) {
    // count the number of text
    let $this = $(this);
    let input = $this.val();

    searchAutoComplete(input);

    let code = (event.keyCode ? event.keyCode : event.which);
    if(code == 13) { //Enter keycode
        
        let topLi  = $('#autopopu').children()[0];
        let topAddress = $(topLi).text();
        // console.log($topLi);
        if(topAddress) {
            $('#search').val(topAddress);
        }
        $('#searchInputForm').submit();
    }

    if(code == 9) {
        event.preventDefault();
        let topLi  = $('#autopopu').children()[0];
        let topAddress = $(topLi).text();
        if(topAddress) {
            $('#search').val(topAddress);
        }
    }

})

$('#autopopu').on('click', function(event){

    // debug
    console.log("Clicked on the auto complete list element")
    $('#search').val($(event.target).text());
    submitForm();

});

$('#searchInputForm').on('submit',function(event){
    event.preventDefault();
    submitForm();
});

$("#LiLocations").on('click',function(event){
    // debug
    console.log("click on the test locaation list element");

    // console.log(event.target);
    // console.log($(event.target).parents('#site-location').attr('data-site'));
    locationName = $(event.target).parents('#site-location').attr('data-site');
    locName = locationName.replace('Covid-19 Testing Site: ','');
    locName = locName.replace(/ /g, "+");
    locName = locName.replace(/,/g,"");

    // Pullin data from google maps API 
    var queryUrl = 'https://www.google.com/maps/embed/v1/place?key='+GOOGLEAPIKEY+'&q='+locName;

    //Setting src into Iframe in maing page to display MAP
    $('#map').attr('src',queryUrl);    
    if(!$('.map').hasClass('active')){
        $('#maindashboard').collapsible('open', 1);       
    }
    

});

$('#searchIcon').on('click', function(){

    // debug
    console.log('Click on the search icon');
    $('#searchInputForm').submit();
});

// initialize the app
(function() {

    
    casesByCountry();
    findLatLong('Baltimore city');

    // size of the dashboard
    $('.LiCountries').attr('style', 'height: 100px; overflow: auto;');

})();

/**
 * call back function for form submit
 * 
 * @param {} event - form event  
 */
function submitForm(){ 

     // debug
     console.log('Triggered Form Submit');
    
     $('#search').val();
     $('#autopopu').empty();
     $('#LiLocations').empty();
 
     let address = $("#search").val();
     userInput = address;
     findLatLong(address)

}