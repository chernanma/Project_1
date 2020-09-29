/** 
 * 
 *              COVID-19 LOCATION APIKEY AND ENDPOINT
 * 
 *         Finds the list of sites where testing is available
 * 
 *  website - https://developer.here.com/blog/finding-covid-19-testing-sites
 * 
 */ 

// APIKEY 
const COVID_LOCATION_APIKEY = "lZLEGOEVL9DV9PZrgak4xPaYgxI8C3gtBlB6hWpY0Js";

// API EndPoint
// example - https://discover.search.hereapi.com/v1/discover?q=Covid&at=30.22,-92.02&limit=10&apikey={{APIKEY}}
const COVID_LOCATION_ENDPOINT = "https://discover.search.hereapi.com/v1/discover";



/** 
 * 
 *              COVID-19 INFORMATION AND STATS
 *  
 *         Information about active cases, deaths etc for different regions
 * 
 *  website - https://covid-api.com/api/
 * 
 */ 
 
 // APIKEY NOT NEEDED

 // Re
 const COVID_STATS_ENDPOINTS = {

     /**
      *     request the list for all the regions - country
      * 
      *     WORKING EXAMPLE - https://covid-api.com/api/regions
      */ 
     regions: "https://covid-api.com/api/regions",



     /**
      *     requests the list of all the provinces/state in the region/country {ISO CODE}
      * 
      * 
      *     WORKING EXAMPLE - https://covid-api.com/api/provinces/USA 
      */
     provinces: "https://covid-api.com/api/provinces/",


     /**
      *     reports all the cases
      * 
      *     endpoint pattern
      *     
      *    1. date {query} - format - YYYY-MM-DD / Defaults to last added date
      *                      example, 2020-04-16
      * 
      *    2. q {query} -   the query string for search, format - counter/region and province 
      *                     example, US Alabama
      * 
      *    3. iso {query} - filter by country ISO code 
      *                     example, USA
      * 
      *    4. region_name {query} - filter by country/region name
      *                     example, US
      * 
      *    5. region_province {query} - filter by province name
      *                         example, Alabama
      * 
      *    6. city_name {query} - filter by city name (only for ISO code = USA)
      *                            example, Autauga
      *                    
      * 
      *    WORKING EXMAPLE - https://covid-api.com/api/reports?date=2020-04-16&q=US%20Alabama&iso=USA&region_name=US&region_province=Alabama&city_name=Autauga    
      */
     reports: "https://covid-api.com/api/reports",


     /**
      *     total cases and deaths from all the regions available
      *     
      *             BASED ON DATE
      * 
      *     date {query} - The date of report in the format YYYY-MM-DD
      *                     example, 2020-09-25
      *
      *     
      *     WORKING EXAMPLE  -  https://covid-api.com/api/reports/total?date=2020-09-25
      */
     totalCases: "https://covid-api.com/api/reports/total"

 };