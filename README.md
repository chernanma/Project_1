# Covid-19 Test Sites & Stats

<------ABOUT APP HERE-------->

[Click here to go to Covid-19 Stats Site](https://chernanma.github.io/Project_1/)

![picture](./Assets/images/main.jpg)

### Table of Contents
- [Description](#description)
- [How to Use](#how-to-use)
- [Screenshots](#screenshots)
- [References](#references)
- [Author Info](#author-info)
---
## Description
 
<-------DESCRIPTION OF THE PROJECT HERE ------>

##### Technologies

- Html
- jQuery
- Visual Studio Code
- Materialized Framework
- APIs
    - COVID-19 Testing Sites Location API - https://developer.here.com/blog/finding-covid-19-testing-sites
    - Google Maps API - https://developers.google.com/maps/documentation/embed
    - COVID-19 Information and Stats API - https://covid-api.com/api/

##### Code sample - JQuery
#
```js

```
##### Code sample - AJAX to get data from the nyCovidStats API
#
```js
/ covid stats  variable for us-counties
let countycity = [];

function nytCovidStats() {  
    

    // get the file from new york times
    // us of cors-anywhere server to avoid the cors block
    let corsUrl = "https://cors-anywhere.herokuapp.com/";
    let nytUrl = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv";
    $.ajax({
        url: corsUrl + nytUrl,
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
```
[Back To The Top](#Covid-19-Test-Sites-&-stats)
---
## How To Use

<---- how to use HERE -----> 

## Screenshots

- Search Input
![picture](assets/images/searchCard.png)
- Statistics Tab 
![picture](assets/images/currentWeather.png)
- Map Tab
![picture](assets/images/forecast.png)

[Back To The Top](#Covid-19-Test-Sites-&-stats)
---
## References
- w3school -- [jQuery Tutorial](https://www.w3schools.com/jquery/)
- Bootstrap -- [Build fast, responsive sites with Bootstrap](https://getbootstrap.com/)
- W3school -- [The HTML DOM Element Object](https://www.w3schools.com/jsref/dom_obj_all.asp)

- W3school -- [AJAX Introduction](https://www.w3schools.com/js/js_ajax_intro.asp)


[Back To The Top](#Covid-19-Test-Sites-&-stats)
---
## License
Copyright (c) [2020] International Team

[Back To The Top](#Covid-19-Test-Sites-&-stats)
---
## Author Info
- Linkedin -- [Cesar Martinez](https://www.linkedin.com/in/cesar-martinez-3986b3120/)

[Back To The Top](#Covid-19-Test-Sites-&-stats)