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
//  var idNames = ['prio1','prio1bul','prio2','prio2bul',
// 'prio3','prio3bul','prio4','prio4bul','prio5','prio5bul']

 var elReport = document.getElementById('reportlimit');

// Define function that looks for user inputs
function addTask(){
    let elTask = document.querySelectorAll('ol.task-main li')
    // console.log(elTask)
    if (index >=10) {
        elReport.innerHTML = 'Maximum tasks for the day reached. Please go ahead! :) '
    }
    else {
        
        
        
        elTask.item(index).prepend(elUI.value);
        elTask.item(index).classList.add('show')       
        console.log(elUI)  
        elUI.value = '';       
        }
                        
        index++;
        if (index%2==0){
            elUI.placeholder = 'insert task'
        }
        else {
            elUI.placeholder = 'insert bullets'
        }
         
          
}

function setup(){
    elUI.focus();
}
var elUI = document.getElementById('tasksUI');
window.addEventListener('load',setup(),false)

//add event to save button

var index = 0;
var elSave = document.getElementById('saveTasks');
elSave.addEventListener('click', (event) => {
    if (elUI.value.length > 0){
        
        addTask()
        // console.log(event.target)
    }
    
}, false)


function removeTask(event) {
    // console.log(event)
    if(event.target.tagName == 'IMG'){
        event.target.parentElement.parentElement.remove()
        // console.log(event.target.tagName)   
        
    }
    else {
        event.target.parentElement.remove()
        // console.log('button event.')
      
       
        
    }
    
    console.log(event)
    // event.target.parentElement.remove()
}

// add event to delete button
let elRemoveTask = document.querySelectorAll('button.removetask')
let elRemoveImg = document.querySelectorAll('button.removetask img')
// elRemoveImg.forEach((remove))

elRemoveTask.forEach((remove) => {
    remove.addEventListener('click',(event) => {
        removeTask(event)
        console.log('button event')
    })
})
elRemoveImg.forEach((remove) => {
    remove.addEventListener('click',(event) => {
        event.stopPropagation()
        removeTask(event)
        
        
    })
})

