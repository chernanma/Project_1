
/**
 * when the user inputs characters in the search bar
 */
$("#search").keydown(function(event) {

    let $this = $(this);
    let input = $this.val();
    let topLi  = $('#autopopu').children()[0];
    let topAddress = $(topLi).text();

    let code = (event.keyCode ? event.keyCode : event.which);
    if(code == 13 && topAddress) { //Enter keycode
        event.preventDefault();
        if(topAddress) {
            $('#search').val(topAddress);
        }
        $('#search').val(topAddress);
        submitForm();
    } else if (code == 9) { // Enter tab
        event.preventDefault();
        if(topAddress) {
            $('#search').val(topAddress);
        } 
    } else {
        searchAutoComplete(input);  
    }

})

/**
 * when the user clicks on the auto complete li
 */
$('#autopopu').on('click', function(event){

    // debug
    // console.log("Clicked on the auto complete list element")
    $('#search').val($(event.target).text());
    submitForm();

});

/**
 * when the form is submitted
 */
$('#searchInputForm').on('submit',function(event){
    event.preventDefault();
    submitForm();
});

/**
 * when the user clicks on one of the test sites li
 */
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

});

/**
 * when users clicks the search icon
 */
$('#searchIcon').on('click', function(){

    // debug
    console.log('Click on the search icon');
    $('#searchInputForm').submit();
});

/**
 * call back function for form submit
 */
function submitForm(){ 

     // debug
     console.log('Triggered Form Submit');
    
     let address = $("#search").val();

     $('#autopopu').empty();
     $('#LiLocations').empty();

     if(address) {
        userInput = address;
        findLatLong(address)
     }
     

}