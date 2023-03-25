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
 function removeTask(event) {
    // console.log(event)
    // console.log(event.target)
    event.target.parentElement.remove()
    
       
    }

// Define function that looks for user inputs
function addTask(){
    let elTask = document.querySelector('ol.task-main')
    let elList = document.createElement('li')

    if(index%2!=0){
        let elUlist = document.createElement('ul')
        elList.innerText = elUI.value
        elUlist.append(elList)
       // bullet poins categroy
        let elsubtasks = document.querySelectorAll('li')
        console.log(elsubtasks)
        elsubtasks.item(index-1).append(elUlist)

    }
    else {
        elList.innerText = elUI.value
        elTask.append(elList)
        console.log(elTask)

        let elImg = document.createElement('img')
        elImg.src = "images/trash_can.png"
        elImg.setAttribute('class', 'delete_task')
        elTask.append(elImg)

        elRemoveImg = document.querySelectorAll('img.delete_task')
        elRemoveImg.forEach((remove) => {
            remove.addEventListener('click',(event) => {
                // event.stopPropagation()
                // console.log('img event triggered.')
                removeTask(event)
                
                
            })
        })
        // console.log(elRemoveImg)
    }
    index++;
    // elUI.value = '';
    
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






// Deleting task lists.
let elRemoveImg = document.querySelectorAll('img.delete_task')


