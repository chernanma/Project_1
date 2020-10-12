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
    // console.log(world);
    // console.log(county);
    let nf = new Intl.NumberFormat(); // converts number in string with comma
    $('.world-recovered').text(nf.format(world.recovered));
    $('.world-deaths').text(nf.format(world.deaths));
    $('.world-confirmed').text(nf.format(world.confirmed));
}

/**
 * 
 * @param {*} country - is an object returned from the ajax request 
 */
function countriesData(countries, today) {
    
    for(let i in countries){

        let liCountries = $('<li class=" truncate clearfix">');   
        let spanCountry = $('<span class="left text-flow truncate">'); 
        let spanValue = $('<span class="right red-text text-darken-3">')

        spanCountry.text(countries[i].name);
        spanValue.text(countries[i].today_confirmed)

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
    
    // console.log(usa);
    let nf = new Intl.NumberFormat(); // converts number in string with comma
    $('.usa-recovered').text(nf.format(usa.recovered));

    // console.log(typeof usa.deaths);
    
    let deaths = nf.format(usa.deaths);
    $('.usa-deaths').text(deaths);
    $('.usa-confirmed').text(nf.format(usa.confirmed));
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
  
    // console.log(history);

    
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
        // console.log(Object.keys(cObj));

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
            // canvas
            var ctx = $('<canvas>').attr('id', 'chart-'+keys[index]);
            // console.log(ctx);
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: keys[index],
                        data: dataSet[keys[index]],
                        borderColor: 'red',
                        borderWidth: 1
                    }]
                },
                 options : {
                    tooltipTemplate: "<%= value %>",
                  
                    showTooltips: true,
                  
                    onAnimationComplete: function() {
                      this.showTooltip(this.datasets[0].points, true);
                    },
                    tooltipEvents: []
                  }
            });

            // console.log(ctx);
            if(ctx.attr('id') === 'chart-positiveIncrease'){
                // console.log('---------')
                // console.log(ctx);
                // console.log($('.dashboard-chart'));
                $('.dashboard-chart').append(ctx);
                // console.log("---------")
            }

            $('.chart-container').append(ctx);
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
   
    // console.log(county);
    let nf = new Intl.NumberFormat(); // converts number in string with comma
    $('.state-name').text(state.name);
    $('.state-recovered').text(nf.format(state.recovered));
    $('.state-deaths').text(nf.format(state.deaths));
    $('.state-confirmed').text(nf.format(state.confirmed));
   
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
    // console.log(county);
    let nf = new Intl.NumberFormat(); // converts number in string with comma
    $('.county-name').text(county.name);
    $('.county-recovered').text(nf.format(county.recovered));
    $('.county-deaths').text(nf.format(county.deaths));
    $('.county-confirmed').text(nf.format(county.confirmed));
  
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
        $('#autopopu').empty();
        $(this).off('click', clearAutoComplete);
    });
}