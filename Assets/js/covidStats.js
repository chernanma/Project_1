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
        // console.log(response.data);
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
    $.ajax(URL).then(function(response){


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

