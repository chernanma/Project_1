
// stores world data
var wData;
// stores usData
var usData;
// stores state data
var sData;

// get Covid-19 data for the region/county name
function getCovidStats (region) {

    let today = dateToday();
    let queryUrl = `https://api.covid19tracking.narrativa.com/api/${today}/country/us/region/${region.state}/sub_region/${region.county}`;
    let URL = {
        url: queryUrl,
        method: 'GET'
    };
    
    
    // ajax request
    $.ajax(URL).then(function(response){

        // console.log(response);
        let world = response.total;
        let usa = response.dates[today].countries.US;
        let state = usa.regions[0];
        let county = state.sub_regions[0];

        // store wData first time
        if(!wData){
            wData = {
                date: world.date,
                confirmed: world.today_confirmed,
                new_confirmed: world.today_new_confirmed,
                deaths: world.today_deaths,
                new_death: world.today_new_deaths,
                recovered: world.today_recovered,
                new_recovered: world.today_new_recovered
            };
            worldData(wData);
        }
        
        // store usData first time
        if(!usData){
            usData = {
                name: usa.name,
                date: usa.date,
                confirmed: usa.today_confirmed,
                new_confirmed: usa.today_new_confirmed,
                deaths: usa.today_deaths,
                new_death: usa.today_new_deaths,
                recovered: usa.today_recovered,
                new_recovered: usa.today_new_recovered
            };
            usaData(usData);
        }
        
        // store state data first time
        if(!sData || sData.name !== state.name){
            sData = {
                name: state.name,
                date: state.date,
                confirmed: state.today_confirmed,
                new_confirmed: state.today_new_confirmed,
                deaths: state.today_deaths,
                new_death: state.today_new_deaths,
                recovered: state.today_recovered,
                new_recovered: state.today_new_recovered
            };   

            stateData(sData);
        }
        
        if(county){
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
        }
        
        
    });
    
}

// get covid Stats for all USA states
function getCovidStatState () {

    let stateCompleteData=[];
    let stateCompletePositionData=[];
    let stateDataMerge=[];

    let today = dateToday();
        
    // https://api.covid19tracking.narrativa.com/api/2020-10-12/country/us
    
    let queryUrl = `https://api.covid19tracking.narrativa.com/api/${today}/country/us`;
    // ajax request
    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function(response){
        
        let regions = response.dates[today].countries.US.regions; 
        for (var i = 0, l = regions.length; i < l; i++) {
            let stateData = {
                name: regions[i].name,
                confirmed: regions[i].today_confirmed,                
                deaths: regions[i].today_deaths,                
                recovered: regions[i].today_recovered,
            }

            stateCompleteData.push(stateData);

        }
        
        let queryUrl = 'https://covid-api.com/api/provinces/USA';
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(data){
            for (var j=0;j<data.data.length;j++){
                let stateDataPosition ={
                    name: data.data[j].province,
                    lat: data.data[j].lat,
                    long: data.data[j].long  
                }
                stateCompletePositionData.push(stateDataPosition);
            }
            
            for (var k=0;k<stateCompleteData.length;k++){              
                for (var l=0;l<stateCompletePositionData.length;l++){                  
                    if (stateCompleteData[k].name===stateCompletePositionData[l].name){    
                        let stateMerge = {
                            name: stateCompleteData[k].name,
                            confirmed: stateCompleteData[k].confirmed,                
                            deaths: stateCompleteData[k].deaths,                
                            recovered: stateCompleteData[k].recovered,
                            lat: stateCompletePositionData[l].lat,
                            long: stateCompletePositionData[l].long
                        }
                        stateDataMerge.push(stateMerge);
                    }
                }
            }
            
            createCirclesForStates(stateDataMerge);
        });
        
   });
    
}

/**
 * finds lat and longitude of the address
 * @param {} address - complete address forward from the places api google 
 */
function findLatLong (address) {

    // map quest api and endpoint
    const apiKey = '1AXLjWPBMJWOb33NJl8Jf0dd8cxGbjBx';
    const apiEndpoint = 'https://www.mapquestapi.com/geocoding/v1/address';

    const queryString = `?key=${apiKey}&location=${address}`;
    const queryUrl = apiEndpoint + queryString;
    const URL = {
        url: queryUrl,
        method: 'GET'
    };

    // ajax request
    $.ajax(URL).then(function(response){
        
        let coords = response.results[0].locations[0].latLng;
        callLocationAPI(coords); // find test sites
        findCountyName(coords); // find county name

    });

}

// get historical data for USA
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

            data.push(tempObj);
        }

        usaHistoricalData(data);
    });
}

// get covid stats for all countries
function casesByCountry (){

    let today = dateToday();
    let endPoint = 'https://api.covid19tracking.narrativa.com/api/' 
    let queryCountriesUrl = endPoint + today;     
    let URL = {
        url: queryCountriesUrl,
        method: "GET"        
    } 

    // making request to pull all Covid data by countries
    $.ajax(URL).then(function(response){
        countriesData(response.dates[today].countries); 
    });
}

// find county name based on coordinates
function findCountyName(coords){

    let queryUrl = `https://geo.fcc.gov/api/census/block/find?latitude=${coords.lat}&longitude=${coords.lng}&format=json`;
    // ajax
    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function(response){

        let countyName = response.County.name;
        if(countyName) {

            // gets covid stats for usa, state and county based on the county name
            getCovidStats({
                county: countyName,
                state: response.State.name
            });

            callLocationAPI(coords); // find test sites
        }
    });

}

// Function to call Location API 
function callLocationAPI(coords){

    // Test Sites location api Key
    var apiKey = "lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js";
    var apiEndpoint = "https://discover.search.hereapi.com/v1/discover";

    var queryString = `?q=Covid&at=${coords.lat},${coords.lng}&limit=10&apikey=${apiKey}`;
    var queryUrl = apiEndpoint + queryString;
    var URL = {
        url: queryUrl,
        method: "GET"        
    };

    // making request to Locations API
    $.ajax(URL).then(function(response){

        // display test location data
        testLocationData(response.items);

        // test sites coordinates
        let sitesArr = [];
        for(let i = 0; i < response.items.length; i++) {
            let location = response.items[i];
            let address = location.address;
            let tempObj = {
                position: location.position,
                title: location.title,
                address: [address.houseNumber, address.street, address.city, address.stateCode, address.countryCode, address.postalCode]
            };

            sitesArr.push(tempObj);
        }

        // show test sites as markers in google map
        addTestLocationMarker(sitesArr);

    });

}

// ajax request to get the list of possible address matching the string
function searchAutoComplete(searchInput) {

    // google places api and endpoint
    let apiKey = "AIzaSyBQ030tIKWaG6RYmMth3wqf2J8dj1RlCsY";
    let cors_anywhere = "https://cors-anywhere.herokuapp.com/";
    let apiEndpoint= "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
  
    let parameters = `input=${searchInput}&key=${apiKey}`;
    let queryUrl = cors_anywhere + apiEndpoint + parameters;
    let URL = {
        url: queryUrl,
        method: 'GET',
    };

    // ajax request
    $.ajax(URL).then(function(response){
        listOfPlaces(response.predictions);
    });
}

// initialize the app
(function() {
    
    // date
    $('.date').text(dateToday());

    // size the height of the main content wrapper to take the remaining height
    $('#main-content-wrapper').height( $(window).height() - $('nav').height() );

    // hide auto pupo div - ui glitching solution
    $('#autopopu').hide();
    
    stateList();
    countyList($('.select-state').val());
    getCovidStatState ();
    casesByCountry();
    getUsaHistoricalData();
    findLatLong('baltimore');

    // size of the dashboard
    $('.LiCountries').attr('style', 'height: 100px; overflow: auto;');

})();

