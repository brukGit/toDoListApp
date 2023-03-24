 // Get date
 today = new Date();
 elDate = document.getElementById('date');


 

 // Display date
 function displayDate(){
    date = today.getDate();
    day = today.getDay();
    month = today.getMonth();
    hour = today.getHours();
    year = today.getFullYear();
    hour = today.getHours();
    minute = today.getMinutes();

    daysofweek = ['Sun', 'Mon', 'Tue','Wed','Thur','Fri','Sat','Sun'];
    monthsofyr = ['Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'];
    // Format minute if less than 10.
    if (minute<10){
        minute = '0' + minute;
    }

    elDate.innerHTML = daysofweek[day] + ', ' + monthsofyr[month] +
    ' ' +date + ' '+year + '<br>' + '@ ' +  hour + ': '+minute + ' local time.';
 }
displayDate();

 
 // array containing IDs.
 var idNames = ['prio1','prio1bul','prio2','prio2bul',
'prio3','prio3bul','prio4','prio4bul','prio5','prio5bul']

 var elReport = document.getElementById('reportlimit');

// Define function that looks for user inputs
function addTask(pos){
   
    if (pos >=10) {
        elReport.innerHTML = 'Maximum tasks for the day reached. Please go ahead! :) '
    }
    else {
        if (elUI.value.length > 0){
            var local_index = pos%idNames.length;
            let newTask = elUI.value;
            
            newText = document.createTextNode(newTask);
            let newElement = document.createElement('p');     
            newElement.appendChild(newText);
            
            let taskHolder = document.getElementById(idNames[local_index]);
            taskHolder.innerHTML = '';
            taskHolder.appendChild(newElement);
            // more text
            if (pos%2==0){
                listnum = ((pos/2)+1).toString();
                listText = document.createTextNode(listnum + '.' +' ');
                newTextElement = document.createElement('b');
                newTextElement.appendChild(listText);
                taskHolder.insertBefore(newTextElement,newElement)
                
            }
            else {
                
            }
                        
            index++;
        }
        
    }
    elUI.value = ''; 
    

    
    
}

function setup(){
    elUI.focus();
}
var elUI = document.getElementById('tasksUI');
window.addEventListener('save',setup(),false)

//add event to button

var index = 0;
var elSave = document.getElementById('saveTasks');
elSave.addEventListener('click', function(e){
    addTask(index)
}, false)

