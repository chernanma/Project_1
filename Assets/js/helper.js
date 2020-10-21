
// date yyyy-mm-dd
function dateToday(){
    let specificDay = new Date();
    let month = specificDay.getMonth()+1;
    let day = specificDay.getDate();
    let today = specificDay.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;

    return today;    
}
