

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
function stateData(state) {
    console.log(state);

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
    console.log(world);
}