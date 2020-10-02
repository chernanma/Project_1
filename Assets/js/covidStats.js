import {COVID_STATS_ENDPOINTS} from './apikeys.js';


/**
 * returns world wide covid stats
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
        return response;
    });

}

/**
 * returns world wide covid stats
 */
function states() {

    // query url
    let queryUrl = COVID_STATS_ENDPOINTS.totalCases;
    // url object
    let URL = {
        url: queryUrl,
        method: 'GET'
    };

    // ajax request
    $.ajax(URL).then(function(response){
        return response;
    });

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

        // console.log(usa);
        return usa;

    });
}


