//  import {load_data} from '/loading.js'
 
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


// ------------------ GLOBAL VARIABLES --------------------------------- //
// HTML components
let elReport = document.getElementById('reportlimit');
let elRemoveImg =  document.querySelectorAll('div.delImgContainer');
let elUI = document.getElementById('tasksUI');
let elTask = document.querySelector('ol.task-main')
let elImgs = document.querySelectorAll('img')
let elSave = document.getElementById('saveTasks');

// Variables(index counters) for addTask functionalities
let index = 0;
let n_times = 0;
// Data store and load variables
let loaddata = false;
let index_loaddata = 0;
let taskDataContainer = []


// ------------------    EVENTS             -----------------  //
// focus on text area when page loads.
window.addEventListener('load',setup(),false)

elSave.addEventListener('click', (event) => {
    if (elUI.value.length > 0){        
        addTask()       
    }
    
}, false)

// Delegate task to ol - main container for task lists. 
elTask.addEventListener('click',(event)=> {
    // see if event comes from 'delete' img.
    if(event.target.tagName === 'IMG'){
        removeTask(event)
    }
})

// Window loading setup
function setup(){
    
    // load previous task list from local storage
    tasksFromLocalStorage()
    // focus to textArea
    elUI.focus();            
}
//  ------------------ Function that removes tasks. ----------------- //
 function removeTask(event) {   
    
    // update list index - used for identifying main and sub task lists.
    index -= event.target.parentElement.parentElement.children.length
  
    event.target.parentElement.parentElement.remove()    
       
    }


// ----------------  Function that adds task lists  ----------------------- //

function addTask(){
    elTask = document.querySelector('ol.task-main')
    
    if(loaddata){
        index = index_loaddata;
        console.log(index)
    }
    if(index%2!=0){
        let elUlist = document.createElement('ul')
       
       
        const items = elUI.value.split("\n");
        let html = "";
        for (let i = 0; i < items.length; i++) {
            // see if new line has content.
            if(items[i].length>0){
                // html += "<li>" + items[i] + "</li>";
                let elList = document.createElement('li')
                elList.append(items[i])
                elUlist.append(elList)
               
            }        
        }
        // elList.innerHTML = html;
        elUlist.setAttribute('class','subTask')
        // elUlist.append(elList)

        
       // bullet poins categroy
        let elsubtasks = document.querySelectorAll('li.taskTitle')
        elsubtasks[(index-1)/2].append(elUlist)

        elUI.placeholder = 'New task title..'

    }
    else {
        let elList = document.createElement('li')
       
        elList.innerText = elUI.value 
        elList.setAttribute('class','taskTitle') 

        // elList.classList.add('')     
        let imgDiv = document.createElement('div')
        imgDiv.setAttribute('class','delImgContainer')
        let elImg = document.createElement('img')
        elImg.src = "images/trash_can.png"
        elImg.setAttribute('class', 'deleteTask')
        

        imgDiv.append(elImg)
        elList.append(imgDiv)
        elTask.append(elList)

        // This code snippet below is used only to see event.stopPropagation()
        //  functionality to stop bubbling. 
        elImgs = document.querySelectorAll('img.deleteTask')
        if(elImgs.length == 2){
            // if there is no image for testing bubblindg, 
            //  then make one.
            if(document.querySelectorAll('.stopprop').length <1){
                
                elImg.classList.add('stopprop')
                let imgStopProp = document.querySelector('.stopprop')
                imgStopProp.addEventListener('click', (event) => {
                event.stopPropagation()
               
                let data_to_store = store_data()
                
                localStorage.setItem('tasks',data_to_store)
                               
                }
                )
            }          
        
        }
        elUI.placeholder = 'Add bullet points..'
    }
  
    index++;  
    elUI.value = ''
    elUI.focus()
        
}


// ------------------------- fcn that loads task lists from local storage . ------------- //
function tasksFromLocalStorage(){
    let data_to_load = JSON.parse(localStorage.getItem('tasks'))    
    let taskName = ''
    
    if(data_to_load){
        // console.log(data_to_load.length)
        loaddata = true;
        data_to_load.forEach((data, outer_index) => {
            if (outer_index%2 == 0){
                taskName = data.title
            }
            else {
                let substring = ''
                data.subtask.forEach((data) => {
                    substring += data + '\n';
                }  )             
                    
                taskName = substring;
            }
            elUI.value = taskName
            index_loaddata = outer_index;
            
            addTask()
        
        })
            loaddata = false
    }
    
}
        
// ---------------- fcn that stores data on the ocal storage  ------------------------  //
function store_data(){
    
    let allTasks = document.querySelector('ol')
    taskDataContainer = []
    
    // collect data and store in local storage
    
    for(let i=0; i<allTasks.children.length; i++){
    
        let data = allTasks.children.item(i).innerText      
        let dataFrmtd = data.split('\n')
        // console.log(dataFrmtd, dataFrmtd.length)
        let subTasks = []
        let taskTitles = []
        dataFrmtd.forEach((data,index) => {
            if(index>0){
                subTasks.push(data)
            }
            else{
                taskTitles.push(data);              
            }
        })
        
        taskDataContainer.push({'title':taskTitles})
        taskDataContainer.push({'subtask':subTasks})  
        
        }
        return JSON.stringify(taskDataContainer)
}
       
