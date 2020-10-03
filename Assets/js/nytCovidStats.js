

/**
 * gets the covid  stats for all the  cities in usa, live data
 */
function nytCovidStats() {

    // covid stats for us-counties
    let countyData = [];
    let countyList = [];

    // get the file
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv',
        method: 'GET'
    }).then(function(response){
        // console.log(response.split('\n'));
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
            // save the obj to the table 
            countyData.push(tempObj);
            countyList.push(tempObj.county);
        }
        
        // save to local storage
        window.localStorage.setItem('countyData', JSON.stringify(countyData));
        window.localStorage.setItem('countyList', JSON.stringify(countyList));
        
    });
}

nytCovidStats();