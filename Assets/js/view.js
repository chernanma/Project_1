
// converts number in string with comma
const nf = new Intl.NumberFormat();

/**
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

    // console.log(world);
     
    $('.world-recovered').text(nf.format(world.recovered));
    $('.world-new-recovered').text(nf.format(world.new_recovered));

    $('.world-deaths').text(nf.format(world.deaths));
    $('.world-new-deaths').text(nf.format(world.new_death));
    
    $('.world-confirmed').text(nf.format(world.confirmed));
    $('.world-new-confirmed').text(nf.format(world.new_confirmed));
}

/**
 * @param {*} country - is an object returned from the ajax request 
 */
function countriesData(countries) {

    for(let i in countries){

        let countryId = countries[i].id;
        let formattedCountryId = "";
        for(let char of countryId) {
            if(char === "(" || char === ")" || char === "," || char === " " || char === "-") {
                char = "_";
            } 

            formattedCountryId += char;
        }

        countryId = formattedCountryId
        
        if(countryId === "taiwan*") {
            isoCode = "tw";
        } else {
            isoCode = COUNTRY_ISO[countryId].toLowerCase();
        }

        let liCountries = $('<li class="collection-item truncate clearfix">');  
        
        let spanCountry = $('<span class="left text-flow truncate">'); 
        let spanValue = $('<span class="right red-text text-darken-3">')

        spanCountry.text(countries[i].name);

        spanValue.text(nf.format(countries[i].today_confirmed));

        // iso code is available, there is a png icon
        if(isoCode) {
            let spanIcon = $('<span class="left">'); 
            let icon = $('<img class="flag-icons">').attr('src', `./Assets/Images/flag-icons/${isoCode}.png`);
            spanIcon.append(icon);
            liCountries.append(spanIcon);
        }

        liCountries.append(spanCountry);
        liCountries.append(spanValue);
        $('#LiCountries').append(liCountries);

    }; 
}

/**
 * 
 * @param {*} data - object with the latest info on usa
 *      {
 *           date: ,
 *          confirmed: ,
 *         new_confirmed: ,
 *          deaths: ,
 *          new_death: ,
 *           recovered: ,
 *          new_recovered: 
 *      }
 */
function usaData(usa) {
    
    $('.usa-stats .stats-header').text(usa.name);

    $('.usa-deaths').text(nf.format(usa.deaths));
    $('.usa-confirmed').text(nf.format(usa.confirmed));

    let r = usa.recovered === 0? "-": nf.format(usa.recovered);
    let nr = usa.new_recovered === 0? "-": nf.format(usa.new_recovered);
    $('.usa-recovered').text(r);
    $('.usa-new-recovered').text(nr);
}

/**
 * @param {*} data - object has historical data for usa.
 * 
 * date: 20201006*
 * deathIncrease: 202675
 * hospitalizedIncrease: 414461
 * negativeIncrease: 97932855
 * onVentilatorCurrently: 1609
 * pending: 8680
 * positiveIncrease: 7460634
 * recovered: 2952390
 * totalTestResultsIncrease: 110226302
 */
function usaHistoricalData(history){

    // loop and extract data
    let dates = [];
    let dataSet = {
        deathIncrease: [],
        positiveIncrease: [],
        pending: [],
        totalTestResultsIncrease: [],
        onVentilatorCurrently: [],
        negativeIncrease: [],
        hospitalizedIncrease: []
    };

    for(let i = 0; i < history.length; i++) {

        let cObj = history[i]; // current history object

        let date = new Date(cObj.date);
        date = date.getMonth() + 1 + "/" + date.getDate();

        dates.unshift(date);
        dataSet['deathIncrease'].unshift(cObj.deathIncrease);
        dataSet['positiveIncrease'].unshift(cObj.positiveIncrease);
        dataSet['pending'].unshift(cObj.pending);
        dataSet['negativeIncrease'].unshift(cObj.negativeIncrease);
        dataSet['totalTestResultsIncrease'].unshift(cObj.totalTestResultsIncrease);
        dataSet['onVentilatorCurrently'].unshift(cObj.onVentilatorCurrently)
        dataSet['hospitalizedIncrease'].unshift(cObj.hospitalizedIncrease);
        
    }
    
    let keys = Object.keys(dataSet);
    for(let index in keys) {

            const chartROW = $('.chart-container');
            const chartTABS = $('.chart-tabs');

            const li = $('<li class="tab col s2">');
            const a = $(`<a href="#tab${index}">${keys[index]}</a>`);
            li.html(a);
            chartTABS.append(li);

            // canvas
            const ctx = $('<canvas>').attr('id', 'chart-' + keys[index]);

            // create chart
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dates,
                    datasets: [{
                        label: keys[index],
                        data: dataSet[keys[index]],
                        border: 'red',
                        borderSize: '1'
                    }]
                }
            });

            const div = $(`<div id="tab${index}" class="col border rounded z-depth-1 s8 offset-s2">`);
            div.append(ctx);
            chartROW.append(div);

            // initialize the tabs
            $('.tabs').tabs();
            
       
    }
  
}

/**
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
   
    $('.state-stats .stats-header').text(state.name);

    $('.state-deaths').text(nf.format(state.deaths));
    $('.state-confirmed').text(nf.format(state.confirmed));

    let r = state.recovered === 0? "-": nf.format(state.recovered);
    let nr = state.new_recovered === 0? "-": nf.format(state.new_recovered);
    $('.state-recovered').text(r);
    $('.state-new-recovered').text(nr);

    // quick stats
    // $('.positive-num').text(nf.format(state.confirmed));
    // $('.positive-diff').text(state.new_confirmed === 0? '-': state.new_confirmed);

    // $('.death-num').text(nf.format(state.deaths));
    // $('.death-diff').text(nf.format(state.new_death));
   
}

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
function countyData(county){

    $('.county-name').text(county.name);
    $('.county-stats .stats-header').text(county.name);

    $('.county-deaths').text(nf.format(county.deaths));
    $('.county-confirmed').text(nf.format(county.confirmed));

    let r = county.recovered === 0? "-": nf.format(county.recovered);
    let nr = county.new_recovered === 0? "-": nf.format(county.new_recovered);
    $('.county-recovered').text(r);
    $('.county-new-recovered').text(nr);

    // quick stats
    $('.positive-num').text(nf.format(county.confirmed));
    $('.positive-diff').text(county.new_confirmed === 0? '-': county.new_confirmed);

    $('.death-num').text(nf.format(county.deaths));
    $('.death-diff').text(nf.format(county.new_death));


}

/**
 *  Displays the data from the ajax request
 * 
 * @param {*} data - response data from the ajax request
 */
function testLocationData(data){
    const $LiLocation = $('#LiLocations');
    $LiLocation.empty();
    // console.log(data);
    for (var i = 0; i < data.length; i++){
        // console.log(response.items[i]);     
        
        var liLocations = $('<li>');
        var divHeaderLoc = $('<div>');
        var divBodyLoc=$('<div>');
        var iHeaderLoc =$('<i>');
        var spanLoc=$('<span>');
        
        liLocations.attr('id', 'site-location');
        liLocations.attr('data-site',data[i].title);
        liLocations.attr('data-lat', data[i].position.lat);
        liLocations.attr('data-lng', data[i].position.lng);
        divHeaderLoc.attr('class','collapsible-header active');
        iHeaderLoc.attr('class','material-icons');
        divBodyLoc.attr('class','collapsible-body blue-grey px-1 lighten-4'); 
          
        var locShortName= data[i].title; 
        locShortName = locShortName.replace('Covid-19 Testing Site: ','');         
        spanLoc.text(data[i].address.label);        
        divBodyLoc.append(spanLoc);
                           
        divHeaderLoc.text(locShortName);
        iHeaderLoc.text('place'); 
        divHeaderLoc.append(iHeaderLoc); 

        liLocations.append(divHeaderLoc);
        liLocations.append(divBodyLoc);   

        $LiLocation.append(liLocations); 

    }

}

/** 
 * @param {*} predictions - is an array, with list of all places matching 
 *                           the places api ajax request
 */
function listOfPlaces(predictions) {
    
    var list = [];
    for(let item in predictions){
        let place = predictions[item].description;
        list.push(place);
    }
    $('#autopopu').show();
    $('#autopopu').empty();
    for(let i in list){
        var $li =$('<li class="collection-item">');
        $li.text(list[i])
        $('#autopopu').append($li);
    }

    // console.log(list);

    /**
     * add event listener on the doucment when uses the search api
     * When user clicks outside autocomplete, close the list and the event listener
     */
    $(window.document).on('click', function clearAutoComplete(){
        console.log("Clicked Inside Doucment");
        $('#autopopu').hide();
        $('#autopopu').empty();
        $(this).off('click', clearAutoComplete);
    });
}

// populate county list
function countyList(state){
    
    state = state.split(' ').join('_');
    let counties = states_county[state];

    let $select = $('.select-county').children('optgroup');
    $select.empty();
    counties.map(cN=>{
        $select.append(
            `<option value="${cN}" >${cN}</option>`
        );
    })
}

// populate state list
function stateList(){
    const $select = $('.select-state').children('optgroup');
    $select.empty();
    states.map(sN=>{
        $select.append(
            `<option value="${sN}" >${sN}</option>`
        );
    });
}
