

 // Display date
 function displayDate(){
    // Get date
    let today = new Date();
    
    let date = today.getDate();
    let day = today.getDay();
    let month = today.getMonth();
    let hour = today.getHours();
    let year = today.getFullYear();
    hour = today.getHours();
    let minute = today.getMinutes();

    let daysofweek = ['Sun', 'Mon', 'Tue','Wed','Thur','Fri','Sat','Sun'];
    let monthsofyr = ['Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'];
    // Format minute if less than 10.
    if (minute<10){
        minute = '0' + minute;
    }

    return daysofweek[day] + ', ' + monthsofyr[month] +
    ' ' +date + ' '+year + '<br>' + '@ ' +  hour + ': '+minute + ' local time.';
 }
 export {displayDate}