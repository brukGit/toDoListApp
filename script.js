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


// let elRemoveImg =  document.querySelectorAll('img.delete_task');
 let elReport = document.getElementById('reportlimit');
 let elRemoveImg =  document.querySelectorAll('div.delImgContainer');
 function removeTask(event) {   
    
    // update list index - used for identifying main and sub task lists.
    index -= event.target.parentElement.parentElement.children.length
  
    event.target.parentElement.parentElement.remove()    
       
    }

// Define function that looks for user inputs


function addTask(){
    elTask = document.querySelector('ol.task-main')
    let elList = document.createElement('li')

    if(index%2!=0){
        let elUlist = document.createElement('ul')
        elList.innerText = elUI.value
        elUlist.setAttribute('class','subTask')
        elUlist.append(elList)
       // bullet poins categroy
        let elsubtasks = document.querySelectorAll('li')
        // console.log(elsubtasks)
        elsubtasks.item(index-1).append(elUlist)

        elUI.placeholder = 'New task title..'

    }
    else {
        // let textDiv = document.createElement('em')
        // textDiv.innerText = elUI.value
        // elList.append(textDiv)
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
        if(elImgs.length == 3){
            // if there is no image for testing bubbline, 
            //  then make one.
            if(document.querySelectorAll('.stopprop').length <1){
                
                elImg.classList.add('stopprop')
                let imgStopProp = document.querySelector('.stopprop')
                imgStopProp.addEventListener('click', (event) => {
                event.stopPropagation()
                console.log('Not going to delete.')
                }
                )
            }          
        
        }
        elUI.placeholder = 'Add bullet points..'
    }
    index++;  
    elUI.value = ''
    //refocus on textArea
    setup()
   
}

function setup(){
    elUI.focus();
}
var elUI = document.getElementById('tasksUI');
window.addEventListener('load',setup(),false)

//add event to save button

let index = 0;
let n_times = 0;

let elTask = document.querySelector('ol.task-main')
let elImgs = document.querySelectorAll('img')
let elSave = document.getElementById('saveTasks');
elSave.addEventListener('click', (event) => {
    if (elUI.value.length > 0){
        
        addTask()
        // console.log(event.target)
    }
    
}, false)

// Delegate task to ol - main container for task lists. 
elTask.addEventListener('click',(event)=> {
    // see if event comes from 'delete' img.
    if(event.target.tagName === 'IMG'){
        removeTask(event)
    }
})











