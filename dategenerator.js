

 // Display date
 function displayDate(){
    // Get date
    let dateContainer = [];
    let today = new Date();
    
    let date = today.getDate();
    let day = today.getDay();
    let month = today.getMonth();
    let hour = today.getHours();
    let year = today.getFullYear();
    hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();

    let daysofweek = ['Sun', 'Mon', 'Tue','Wed','Thur','Fri','Sat','Sun'];
    let monthsofyr = ['Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'];
    // Format minute if less than 10.
    if (minute<10){
        minute = '0' + minute;
    }
    let tempDate =daysofweek[day] + ', ' + ' ' +date +'/'+monthsofyr[month]+'/'+year
    let tempTime =hour + " o'clock and " +minute +' minutes';
    dateContainer.push(tempDate);
    dateContainer.push(tempTime);

    return  dateContainer;
 }
 export {displayDate}