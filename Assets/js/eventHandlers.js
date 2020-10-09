
/**
 * when the user inputs characters in the search bar
 */
$("#search").keydown(function(event) {
    // count the number of text
    let $this = $(this);
    let input = $this.val();

    searchAutoComplete(input);

    let code = (event.keyCode ? event.keyCode : event.which);
    if(code == 13) { //Enter keycode
        
        let topLi  = $('#autopopu').children()[0];
        let topAddress = $(topLi).text();
        // console.log($topLi);
        if(topAddress) {
            $('#search').val(topAddress);
        }
        $('#searchInputForm').submit();
    }

    if(code == 9) {
        event.preventDefault();
        let topLi  = $('#autopopu').children()[0];
        let topAddress = $(topLi).text();
        if(topAddress) {
            $('#search').val(topAddress);
        }
    }

})

/**
 * when the user clicks on the auto complete li
 */
$('#autopopu').on('click', function(event){

    // debug
    console.log("Clicked on the auto complete list element")
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
    // if(!$('.map').hasClass('active')){
    //     $('#maindashboard').collapsible('open', 1);       
    // }
    

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
    
     $('#search').val();
     $('#autopopu').empty();
     $('#LiLocations').empty();
 
     let address = $("#search").val();
     userInput = address;
     findLatLong(address)

}