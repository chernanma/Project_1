
// when the user inputs characters in the search bar
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

// when the user clicks on the auto complete li
$('#autopopu').on('click', function(event){

    $('#search').val($(event.target).text());
    submitForm();
});

// when the form is submitted
$('#searchInputForm').on('submit',function(event){
    event.preventDefault();
    submitForm();
});

// when the user clicks on one of the test sites li
$("#LiLocations").on('click',function(event){


    let lat = $(event.target).parents('#site-location').attr('data-lat');
    let lng = $(event.target).parents('#site-location').attr('data-lng');
    let coords = {
        lat: lat,
        lng: lng
    };

    // center location in map
    centerLocationInMap(coords, 10);

});

// when users clicks the search icon
$('#searchIcon').on('click', submitForm);

// open details
$('#open-details').on('click', ()=> {

    let $icon = $('#open-close');
    let $detailedStats = $('.detailed-stats')

    if($icon.text() === "expand_less"){
        $detailedStats.removeClass('slide-in');
        $detailedStats.addClass('slide-out');
        $icon.text('expand_more');
    } else {
        $detailedStats.removeClass('slide-out');
        $detailedStats.addClass('slide-in');
        $icon.text('expand_less');
    }
    
});

// when someone selects the drop down list
$('select').on('change', event => {
    let $select = $(event.target);
    let newValue = $select.val();
    if($select.hasClass('select-state')){
        countyList(newValue);
    }
    findLatLong(newValue);
});

// resize height based on window size
window.addEventListener('resize', () => {
    $('#main-content-wrapper').height(
    $(window).height() - $('nav').height()
    );
});

// call back function for form submit
function submitForm(){ 

     
     let address = $("#search").val();

     $('#autopopu').empty();
     $('#LiLocations').empty();

     if(address) {
        userInput = address;
        findLatLong(address)
     }
     

}
